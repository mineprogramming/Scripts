LIBRARY({
    name: "ThirstLib",
    version: 3,
    shared: true,
    api: "CoreEngine"
});


IMPORT("ScalesRPG");
IMPORT("EntityState");


var BitmapFactory = android.graphics.BitmapFactory;


var THIRST_TICKS = 500;
var THIRST_WATER_RESTORES = 5;

var loaded = false;

var thirstScale = new ScalesRPG.Scale({
    bitmaps:{
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_water_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_water_1.png"),
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_water_2.png"),
    }
});

Saver.addSavesScope("ThirstValue", 
    function read(scope){
        thirstScale.setValue((scope && scope.thirst)? parseInt(scope.thirst) : 20);
    },
    function save(){
        let thirst = parseInt(thirstScale.getValue())
        return {"thirst": thirst};
    }
); 


var ticks = THIRST_TICKS;
Callback.addCallback("tick", function(){
    let state = EntityState.getPlayerState();
    if(state.checkFlags(EntityState.RUNNING) 
        || state.checkFlags(EntityState.JUMPING)
        || state.checkFlags(EntityState.SWIMMING)
        || state.checkFlags(EntityState.FLOATING))
        ticks -= 2
    else if(state.checkFlags(EntityState.WALKING))
        ticks -= 1.5;
    else 
        ticks--;
    if(ticks <= 0){
        ticks = THIRST_TICKS;
        if(loaded){
            if(thirstScale.getValue() <= 0){
                Entity.damageEntity(Player.get(), 1, "thirst");
            }
            else{
                thirstScale.decrease();
            }
        }
    }
});


Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id == 373 && item.data == 0){
        let thirst = thirstScale.getValue();
        if(thirst < 20){
            Player.decreaseCarriedItem(1);
            Player.addItemToInventory(374, 1, 0);
            
            thirst += THIRST_WATER_RESTORES;
            if(thirst > 20) thirst = 20;
            thirstScale.setValue(thirst);
        }
    }
});


Callback.addCallback("EntityDeath", function(entity){
    if(Player.isPlayer(entity)){
        ScalesRPG.resetAll();
    }
});


Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "hud_screen" || 
      screenName == "in_game_play_screen"){
        thirstScale.show();
        loaded = true;
    }
});