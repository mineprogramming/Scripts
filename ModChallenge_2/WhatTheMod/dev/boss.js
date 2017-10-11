/*var number = Math.round(Math.random()*20);
var boss = MobRegistry.registerEntity("bossEnt");
boss.customizeEvents({
tick: function() {
var position = Entity.getPosition(this.entity);
Particles.line(Native.ParticleType.flame, {position.x, position.y , position.z}, {position.x+number, position.y+number , position.z+number}, 1, 0) 
},
death: function(attacker) {
Game.message("You win!")
},
hurtBy: function(attacker, amount) {
World.explode(this.x, this.y, this.z, 3, false)
}, 
});
boss.customizeDescription({
getHealth: function() { 
return 250;
},
getDrop: function(attacker) { 
var dropArray = [{id: 331, count: {min: 50, max: 100}, separate: true, chance: 1},
{id: 264, count: [10, 20, 30], separate: true, chance: 1}];
return dropArray;
}
});
var boss_texture = new Texture("bossIMG.png").setResolution(16, 16);
var boss_model = new EntityModel(6);
boss_model.setTexture(boss_model); */
/*
var blue_bird_texture = new Texture("bird_blue.png").setResolution(128, 64).setPixelScale(2);
var blue_bird_model = new EntityModel(); 
blue_bird_model.setTexture(blue_bird_texture); 

 blue_bird_model.createAnimation(16, function(frame) {
 var render = new Render();
 var partObj = [

        {type: "box", coords: {x: 0, y: 16, z: 0}, size: {x: 5, y: 4, z: 9}, uv: {x: 20, y: 0}}, 

        {type: "box", coords: {x: 0, y: 14, z: -4}, size: {x: 4, y: 4, z: 6}, uv: {x: 0, y: 0}},  

        {type: "box", coords: {x: 0, y: 14, z: -6.5}, size: {x: 1, y: 1, z: 3}, uv: {x: 0, y: 16}},

        {type: "box", coords: {x: 0, y: 14, z: 6}, size: {x: 3, y: 1, z: 8}, uv: {x: 20, y: 0}},  

        {type: "box", coords: {x: 0, y: 20, z: 0}, size: {x: 3, y: 4, z: 1}, uv: {x: 0, y: 11}},

    ];  
var position = Math.sin(frame / 16 * Math.PI * 2); 
 for (var i = 0; i < 5; i ++) {
	partObj.push({type: "box", size: {x: 1, y: 1, z: 8 - i}, uv: {x: 20, y: 0}, coords: {x: 2.5 + i, y: position * i + 15, z: 0}});  

    partObj.push({type: "box", size: {x: 1, y: 1, z: 8 - i}, uv: {x: 20, y: 0}, coords: {x: -2.5 - i, y: position * i + 15, z: 0}});
 };
  render.setPart("head", partObj, {});  
}, 0.5);  
blue_bird_model.setRender(render);
var entityTypeBird = MobRegistry.registerEntity("bird-blue");

entityTypeBird.customizeVisual({ 

    getModels: function() {  

        return {  

            "main": blue_bird_model  

        };  

    }  

}); 
entityTypeBird.customizeDescription({ 

    getHitbox: function() {        
		return {w: 0.3, h: 0.3}; 

    } 

}); 
entityTypeBird.customizeAI({ 
getAITypes: function() { 

return { 

"wander": { 

type: EntityAI.Wander, priority: 2, 

speed: 0.06, 

angular_speed: 0.2 

}, 

"swim": { 

type: EntityAI.Swim 

}, 

"panic": { 

type: EntityAI.Panic, priority: 1, speed: 0.18 

}, 

"panic-watcher": { 

type: EntityAI.PanicWatcher, name: "panic", panic_time: 250 

} 

} 

} 

}); */
var mobb = MobRegistry.registerEntity("mobb");
mobb.customizeEvents({
 tick: function(){
  Entity.setRender(this.entity, Native.MobRenderType.human);
  Entity.setSkin(this.entity, "images/mobb.png");
  Entity.setNameTag(this.entity, "Mob: " + Entity.getHealth(this.entity) + "/" + this.parent.description.getHealth());
 }
});
Minion.customizeDescription({
getHealth: function(){
  return 600;
  },

 getHitbox: function(){
  return {w: 1, h: 2}
 }
});
Item.registerUseFunction("darkSword", function(coords, item, block){
Entity.spawnCustom("mobb", coords.x, coords.y, coords.z);
});
Callback.addCallback("EntityDeath", function(entity){
Entity.spawnCustom("mobb", entity.x, entity.y, entity.z);
});
 Item.registerUseFunctionForID(280, function(coords, item, block){    
 coords = coords.relative; 

    Entity.spawnCustom("mobb", coords.x + .5, coords.y + .5, coords.z + .5); 

}); 