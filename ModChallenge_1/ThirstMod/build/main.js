
var Timers = {
    Once: new Array(),
    Repetetive: new Array()
};

Timers.modTick = function(){
    this.Once = this.Once.filter(function(item){
        item.Time--;
        if(item.Time <= 0){
            item.Action(item.Id, item.Data);
            return false;
        }
        else
            return true;
    });
    this.Repetetive.forEach(function(item){
        item.Time--;
        if(item.Time <= 0){
            item.Action(item.Id, item.Data);
            item.Time = item.Period;
        }
    });
}

Timers.addOnce = function(id, time, action, data){
    this.Once.push({Id:id, Time:time, Action:action, Data:data});
}

Timers.addRepetiteve = function(id, time, action, data){
    this.Repetetive.push({Id:id, Period:time, Time:time, Action:action, Data:data});
}

Timers.remove = function(id){
    this.Repetetive = this.Repetetive.filter(function(item){
        if(item.Id == id){
            return false;
        }
        else{
            return true;
        }
    });
    this.Once = this.Once.filter(function(item){
        if(item.Id == id){
            return false;
        }
        else{
            return true;
        }
    });
}
var GUI;
var layout;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var loaded = false;
var thirst = 20;

function newLevel(){
    loaded = true;
    show();
    thirst = 20;
}

Timers.addRepetiteve(0, 500, function(id, data){
    if(loaded){
        if(thirst < 0){
            Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1);
        }
        else{
            setThirst(thirst--);
        }
    }
});

function BitmapFromTexturePack(path){
    var stream = ModPE.openInputStreamFromTexturePack(path);
    return android.graphics.BitmapFactory.decodeStream(stream);
}

function setThirst(value){
    runAsGUI(function(){
        var countFull = Math.trunc(value/2);
        var countHalf = value%2;
        if(GUI != null){
            var i = 0;
            for(; i < countFull; i++){
                GUI.getContentView().getChildAt(i).setImageBitmap(BitmapFromTexturePack("water0.png"));
            }
            for(; i < countHalf + countFull; i++){
                GUI.getContentView().getChildAt(i).setImageBitmap(BitmapFromTexturePack("water1.png"));
            }
            for(; i < 10; i++){
                GUI.getContentView().getChildAt(i).setImageBitmap(BitmapFromTexturePack("water2.png"));
            }
        }
    });
}

function leaveGame(){
    loaded = false;
    hide();
}

function modTick() {
    Timers.modTick();
}

function useItem(x,y,z,itemid,blockid,side,itemDamage,blockDamage) {
    if(thirst != 20){
        if(itemid == 373 && itemDamage == 0){
            Player.addItemInventory(373, -1, 0);
            Player.addItemInventory(374, 1, 0);
            if(thirst > 15)
                thirst = 20;
            else
                thirst += 5;
            setThirst(thirst);
        }
    }
}

function deathHook(attacker,victim) {
    if(victim == getPlayerEnt()){
        thirst = 20;
        setThirst(thirst);
    }
}

function show(){
    runAsGUI(function(){
        if(GUI == null){
            layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(0);
            for(var i = 0; i < 10; i++){
                var image = new android.widget.ImageView(ctx);
                image.setImageBitmap(BitmapFromTexturePack("water0.png"));
                layout.addView(image);
            }
            GUI = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUI.setTouchable(false);
            GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 8, 35);
        }
    });    
    setThirst(thirst);
}

function hide(){
    runAsGUI(function(){
        if(GUI != null){
            GUI.dismiss();
            GUI = null;
        }
    }); 
}

function screenChangeHook(screenName) {
    if(screenName == "hud_screen" || 
      screenName == "in_game_play_screen"){
      show();
  }
  else{
      hide();
  }
}

function runAsGUI(run){
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            run();
        } catch(e){
            print(e);
        }
    }}));
}



