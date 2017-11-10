
Callback.addCallback("NativeGuiChanged", function(screenName){
    if(screenName == "hud_screen" || screenName == "in_game_play_screen"){
        Panel.open();
    }
    else{
        Panel.close();
    }
});

var tick = 0;

Callback.addCallback("tick", function(){
    if(Panel.container.isOpened()){
        var elements = Panel.container.getGuiContent().elements;
        var state = Panel.state;
        tick++;
        
        if(tick >= 5){
            var drawing = Panel.container.getGuiContent().drawing;
            for(var i = 0; i < 4; i++){
                var armor = Player.getArmorSlot(i);
                if(state[i].id != armor.id || state[i].data != armor.data){
                    Panel.container.setSlot(""+i, armor.id, armor.count, armor.data);
                    state[i].id = armor.id;
                    state[i].data = armor.data;
                    if(state[i].state == 0 || state[i].state == 3)
                        state[i].state = 1;
                    else if(state[i] == 2)
                        state[i].timer = 0;
                }
                tick = 0;
            }
        }
        
        for(var i = 0; i < 4; i++){
            if(state[i].state == 1){
                elements[""+i].x += 50;
                if(elements[""+i].x >= 0){
                    elements[""+i].x = 0;
                    state[i].state = 2;
                    state[i].timer = 0;
                }
            } else if(state[i].state == 2){
                state[i].timer++;
                if(state[i].timer >= 30){
                    state[i].state = 3;
                }
            } else if(state[i].state == 3){
                elements[""+i].x -= 50;
                if(elements[""+i].x <= -1000){
                    state[i].state = 0;
                }
            }
        }
    }
});





