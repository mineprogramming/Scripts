function CustomMob(){
    this.id = "customMob";
    this.mob = MobRegistry.registerEntity(this.id);
    
    this.mob.customizeDescription({
        getDrop: function(attacker) {
            return [
                {
                    id: 35,
                    count: {min: 1, max: 3},
                    data: {min: 0, max: 15},
                    chance: 0.8,
                    separate: true
                },
                {
                    id: 351,
                    count: {min: 1, max: 5},
                    data: {min: 0, max: 15},
                    chance: 0.8,
                    separate: false
                }
            ];
        }
    });
    
    var render = new Render();
    render.setPart("head", [
        {
            type: "box",
            coords: {
                x: 0,
                y: 16,
                z: 0
            },
            size: {
                x: 5,
                y: 4,
                z: 9
            },
            uv: {
                x: 20,
                y: 0
            }
        }
    ], {});
    
    var model = new EntityModel();
    model.setRender(render);
    
    this.mob.customizeVisual({
        getModels: function() {
            return {
                "main": model
            };
        }
    });
    
    this.spawn = function(x, y, z){
        Entity.spawnCustom(this.id, x, y, z);
    }
}


