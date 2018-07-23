LIBRARY({
    name: "ScalesRPG",
    version: 1,
    shared: true,
    api: "CoreEngine"
});


var LinearLayout = android.widget.LinearLayout;
var LayoutParams = android.widget.RelativeLayout.LayoutParams;
var Gravity = android.view.Gravity;
var View = android.view.View;


var ctx = UI.getContext();

function runAsUI(func){
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
    try{
        func();
    }catch(err){
        Game.message(err);
        alert(err);
    }}}));
}


var layoutLeft;
var layoutRight
var window;


runAsUI(function(){
    //Main layout of the whole window
    var layoutMain = new LinearLayout(ctx);
    layoutMain.setOrientation(0);
    
    var params = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
    layoutMain.setLayoutParams(params);
    
    //Containers for left- and right-side scalses
    layoutLeft = new LinearLayout(ctx);
    layoutLeft.setOrientation(1);
    layoutLeft.setPadding(8, 124, 0, 0);
    layoutMain.addView(layoutLeft);
    
    var view = new View(ctx);
    params = new LinearLayout.LayoutParams(0, 0, 1);
    view.setLayoutParams(params);
    layoutMain.addView(view);
    
    layoutRight = new LinearLayout(ctx);
    layoutRight.setOrientation(1);
    layoutRight.setPadding(0, 62, 0, 10);
    layoutMain.addView(layoutRight);
    
    
    //Popup Window for displaying the staff
    window = new android.widget.PopupWindow(layoutMain, LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
    window.setTouchable(false);
    window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
});
        

var scales = [];

var ScalesRPG = {
    Scale: function(parameters){
        //Getting bitmaps
        var bmpFull = parameters.bitmaps.full;
        var bmpHalf = parameters.bitmaps.half;
        var bmpEmpty = parameters.bitmaps.empty;
        
        var shown = false;
        
        var right = (parameters.right == undefined)? false: parameters.right;
        this.right = right;
        var value = parameters.value == undefined? 20: parameters.value;
        
        var index = scales.push(this) - 1;
        
        //creating layout for the scale
        var layout;
        runAsUI(function(){
            layout = new LinearLayout(ctx);
            layout.setOrientation(0);
            layout.setPadding(0, 5, 0, 0);
            
            for(var i = 0; i < 10; i++){
                var image = new android.widget.ImageView(ctx);
                image.setImageBitmap(bmpFull);
                image.setVisibility(View.INVISIBLE);
                layout.addView(image);
            }
            
            if(right) 
                layoutRight.addView(layout);
            else 
                layoutLeft.addView(layout);
        });
        
        
        this.setValue = function(_value){
            value = _value;
            if(value < 0) 
                value = 0;
            var countFull = Math.trunc(value/2);
            var countHalf = value%2;
            runAsUI(function(){
                if(this.right){
                    var i = 9;
                    for(; i > 9 - countFull; i--){
                        layout.getChildAt(i).setImageBitmap(bmpFull);
                    }
                    for(; i > 9 - countHalf - countFull; i--){
                        layout.getChildAt(i).setImageBitmap(bmpHalf);
                    }
                    for(; i >= 0; i--){
                        layout.getChildAt(i).setImageBitmap(bmpEmpty);
                    }
                } 
                //Draw left-side scales
                else {
                    var i = 0;
                    for(; i < countFull; i++){
                        layout.getChildAt(i).setImageBitmap(bmpFull);
                    }
                    for(; i < countHalf + countFull; i++){
                        layout.getChildAt(i).setImageBitmap(bmpHalf);
                    }
                    for(; i < 10; i++){
                        layout.getChildAt(i).setImageBitmap(bmpEmpty);
                    }
                }
            });
        }
        
        this.getValue = function(){
            return value;
        }
        
        this.increase = function(){
            this.setValue(++value);
        }
        this.decrease = function(){
            this.setValue(--value);
        }
        
        this.reset = function(){
            this.setValue(20);
        }
        
        this.show = function(){
            if(!inGame || shown) return;
            runAsUI(function(){
                for(var i = 0; i < 10; i++){
                    layout.getChildAt(i).setVisibility(View.VISIBLE);
                }
            });
            this.setValue(value);
            shown = true;
        }
        
        this.isShown = function(){
            return shown;
        }
        
        this.hide = function(){
            if(!shown) return;
            runAsUI(function(){
                for(var i = 0; i < 10; i++){
                    layout.getChildAt(i).setVisibility(View.INVISIBLE);
                }
            });
            shown = false;
        }
    },
    
    resetAll: function(){
        for(var i in scales){
            scales[i].reset();
        }
    },
    
    showAll: function(){
        for(var i in scales){
            scales[i].show();
        }
    },
    
    hideAll: function(){
        for(var i in scales){
            scales[i].hide();
        }
    },
}

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "hud_screen" || 
      screenName == "in_game_play_screen"){
        inGame = true;
    }
    else{
        inGame = false;
        ScalesRPG.hideAll();
    }
});

EXPORT("ScalesRPG", ScalesRPG);




