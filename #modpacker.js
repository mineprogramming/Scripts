LIBRARY({
    name: "#modpacker",
    version: 1,
    shared: false,
    api: "PrefsWinAPI"
});



var Environment = android.os.Environment;
var Scanner = java.util.Scanner;
var File = java.io.File;
var StringBuilder = java.lang.StringBuilder;
var BufferedWriter = java.io.BufferedWriter;
var FileWriter = java.io.FileWriter;

var AlertDialog = android.app.AlertDialog;
var LinearLayout = android.widget.LinearLayout;
var TextView = android.widget.TextView;
var ProgressBar = android.widget.ProgressBar;
var BitmapFactory = android.graphics.BitmapFactory;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;


var version_file = Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/mods/versions.json";
var ctx = UI.getContext();


function inThread(func) {
    (new java.lang.Thread({
        run: function() {
            try {
                func();
            } catch(e) {
                log(e);
            }
        }
    })).start();
}

function runAsUI(func){
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            func();
        }catch(e){
            log(e);
        }}
    }));
}


var DownloadHandler = {
    downloads: [],
    
    addDownload: function(url, callbacks) {
        var download = {
            url: url,
            status: "prepared",
            
            isCancelled: function() {
                return this.status == "stopped";
            },
            
            cancel: function() {
                if (!this.isCancelled() && this.status != "finishing") {
                    this.status = "stopped";
                    if (this._cancel) {
                        this._cancel();
                    }
                }
            }
        };
        
        for (var name in callbacks) {
            download["_" + name] = callbacks[name];
        }
        
        this.downloads.push(download);
        
        inThread(function() {
            if (!download.isCancelled()) {
                download.status = "running";
                if (download._start) {
                    download._start();
                }
            }
            
            try {
                var result = Network.downloadFile(url, {
                    message: function(msg) {
                        if (download._message && !download.isCancelled()) {
                            download._message(msg);
                        }
                    },
                    
                    progress: function(p) {
                        if (download._progress && !download.isCancelled()) {
                            download._progress(p);
                        }
                    },
                    
                    isCancelled: function() {
                        return download.isCancelled();
                    }
                });
            } catch(e) {
                if (download._fail) {
                    download._fail(e);
                }
            }
            
            if (!download.isCancelled()) {
                download.status = "finishing";
                if (result) {
                    if (download._complete) {
                        download._complete(result);
                    }
                }
                else {
                    if (download._fail) {
                        download._fail();
                    }
                }
                download.status = "stopped";
            }
        });
    },
    
    stop: function(url) {
        for (var i in this.downloads) {
            var download = this.downloads[i];
            if (download.url == url) {
                this.downloads.splice(i--);
                download.cancel();
            }
        }
    },
    
    stopAll: function() {
        for (var i in this.downloads) {
            this.downloads[i].cancel();
        }
        this.downloads = [];
    }
};


function getVersions(){
    var file = new File(version_file);
    if(!file.exists()){
        return {};
    }
    var sc = new Scanner(file);
    var builder = new StringBuilder();
    while(sc.hasNextLine()){
        builder.append(sc.nextLine());                     
    }
    try{
        var str = builder.toString();
        var obj = JSON.parse(str);
        if(typeof obj === "object") return obj;
        else return {};
    } catch(e){
        log(e);
        return {};
    }
}

function writeVersions(versions){
    var writer = new BufferedWriter(new FileWriter(version_file));
    writer.write(JSON.stringify(versions));
    writer.close();
}

function getCurrentVersion(id){
    return parseInt(Network.getURLContents("https://icmods.mineprogramming.org/api/version.php?id=" + id));
}


var text;
var status;
var progress;
var count;


function showUI(name, count, icon){
    runAsUI(function(){
        var builder = new AlertDialog.Builder(ctx);
        builder.setTitle(name + " | #modpacker");
        if(icon){
            icon = BitmapFactory.decodeFile(icon);
            builder.setIcon(new BitmapDrawable(icon));
        }
        
        var layout = new LinearLayout(ctx);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(15, 15, 15, 15);
        
        text = new TextView(ctx);
        text.setText("Downloading and installing mods 0/" + count);
        layout.addView(text);

        status = new TextView(ctx);
        status.setText("Downloading...");
        layout.addView(status);
        
        progress = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
        progress.setMax(count);
        layout.addView(progress);
        
        builder.setView(layout);
        builder.create().show();
    });
}


function setStatus(s){
    runAsUI(function(){
        status.setText(s);
    });
}

function addProgress(){
    runAsUI(function(){
        let p = progress.getProgress() + 1;
        if(p >= progress.getMax()){
            status.setText("Success! Restart Inner Core to proceed!");
        }
        progress.setProgress(p);
        text.setText("Downloading and installing mods " + p + "/" + count);
    });
}


function install(id, versions){
    let url = "https://icmods.mineprogramming.org/api/download.php?id=" + id;
    setStatus("Downloading...");
    DownloadHandler.addDownload(url, {
        message: function(msg) {
            setStatus(msg);
        },
        
        complete: function(result) {
            try {
                var success = Prefs.installModFile(result, {
                    message: function(msg) {
                        
                    }
                }, {
                    run: function() {
                        setStatus("Installing...");
                    }
                });
                if(success) {
                    addProgress();
                    versions["" + id] = getCurrentVersion(id);
                    writeVersions(versions);
                } 
                else {
                    setStatus("Failed to install mod!");
                    DownloadHandler.stopAll();
                }
            } catch(e) {
                setStatus("Failed to install mod! " + e);
                DownloadHandler.stopAll();
            }
        },
        
        fail: function() {
            setStatus("Failed to download mod!");
            DownloadHandler.stopAll();
        },
        
        cancel: function() {
            status("Failed to download mod!");
            DownloadHandler.stopAll();
        }
    });
}


function installAll(name, ids, icon){
    let versions = getVersions();
    count = 0;
    for(var i in ids){
        let id = ids[i];
        if(!versions["" + id]){
            count++;
        }
    }
    if(count > 0){
        showUI(name, count, icon);
        for(var i in ids){
            let id = ids[i];
            if(!versions["" + id]){
                install(id, versions);
            }
        }
    }
}


function restartInnerCore(){
    
}


var ModPack = {
    install: function(data){
        installAll(data.name, data.mods, data.icon);
    }
}


EXPORT("ModPack", ModPack);
