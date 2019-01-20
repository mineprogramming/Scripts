var NOT_LIVING_ENTITIES = [Native.EntityType.ARROW, Native.EntityType.SMALL_FIREBALL, Native.EntityType.FIREBALL, Native.EntityType.ITEM, Native.EntityType.PRIMED_TNT, Native.EntityType.FALLING_BLOCK, Native.EntityType.EXPERIENCE_ORB, Native.EntityType.EXPERIENCE_POTION, Native.EntityType.THROWN_POTION, Native.EntityType.LIGHTNING_BOLT, Native.EntityType.FISHING_HOOK, Native.EntityType.SNOWBALL];

function isLiving(entity){
 for (var i = 0; i < NOT_LIVING_ENTITIES.length; i++){
  if (Entity.getType(entity) == NOT_LIVING_ENTITIES[i]){
   return false;
  }
 }
 return true;
}

function findTarget(x, y, z, range){
 var target = parseInt(Entity.findNearest({x: x, y: y, z: z}, null, range));
 if (Entity.isExist(target) && isLiving(target)) return target;
}
/*
addExpAtEntity: function(entity, value){
   var coords = Entity.getPosition();
   ToolAPI.dropExpOrbs(coords.x, coords.y, coords.z, value);
  }
*/
function addExpAtEntity(entity, value){
   var coords = Entity.getPosition();
   ToolAPI.dropExpOrbs(coords.x, coords.y, coords.z, value);
  }

var AdvancedAI = {
        
 EnemyWatcher: new EntityAIWatcher({
  execute: function() {
   if (World.getThreadTime()%this.params.find_delay==0){
    var attackAI = this.getAI(this.params.attackAI);
    var followAI = this.getAI(this.params.followAI);
    if (Entity.getDistanceToCoords(Player.get(), Entity.getPosition(this.entity)) <= this.params.feelingModifier){
     this.setPriority(this.params.attackAI, this.params.priority_on_attack);
     this.setPriority(this.params.followAI, this.params.priority_on_attack);

     attackAI.data.target = parseInt(Player.get());
     followAI.data.target = Player.getPosition();
    }
    else{
     this.setPriority(this.params.attackAI, this.params.priority_on_idle);
     this.setPriority(this.params.followAI, this.params.priority_on_idle);
     attackAI.data.target = null;
     followAI.data.target = null;
    }
   }
  },

  params: {

   attackAI: "attack",

   followAI: "follow",
 
   find_delay: 20,
 
   priority_on_attack: 5,

   priority_on_idle: 0,

   feelingModifier: 10
  }
 }),

 Shooting: new EntityAIClass({
  execute: function(){
   if (this.params.isQueue){
    if (World.getThreadTime()%this.params.queue_delay == 0 && !this.data.timer){
     this.data.timer = this.params.queue_length;
    }
    if (World.getThreadTime()%this.shoot_speed == 0 && this.data.timer){
     this.shoot(this.entity, this.params.ammo_type);
     this.data.timer--;
    }
   }
   else{
    if (World.getThreadTime()%this.params.shoot_speed == 0){
     this.shoot(this.entity, this.params.ammo_type);
    }
   }
  },

  params: {
   ammo_type: Native.EntityType.FIREBALL,

   shoot_speed: 20,

   isQueue: false,

   queue_length: 3,

   projectile_speed: 0.2,

   queue_delay: 40
  },

  shoot: function(attacker, ammo){
   var coords = Entity.getPosition(attacker);
   Entity.moveToAngle(Entity.spawn(coords.x, coords.y + 1, coords.z, ammo), Entity.getLookAngle(attacker), {speed: this.params.projectile_speed});
  }
 }),

 PhaseWatcher: new EntityAIWatcher({
  execute: function(){
   var i = 0;
   var phases = this.params.phases;
   if (phases && !this.data.inited){
    this.data.inited = true;
    this.data.phase = 0;
    this.data.timer = phases[0].time;
   }
   if (this.data.timer > 0){
    this.data.timer--;
    for (i = 0; i < phases[this.data.phase].ai.length; i++){
      var phase = phases[this.data.phase];
      this.setPriority(phase.ai[i], phase.priority);
    }
   }
   else if (phases) {
    for (i = 0; i < phases[this.data.phase].ai.length; i++){
      let phase = phases[this.data.phase];
      this.setPriority(phase.ai[i], phase.other_priority);
    }
    if (!phases[++this.data.phase]){
     this.data.phase = 0;
    }
    this.data.timer = phases[this.data.phase].time;
   }
  },

  params: {
   phases: []
  }
 }),

 PlayerWatcher: new EntityAIWatcher({
  execute: function(){
   var ais = this.params.ai;
   if (ais){
    for (var i = 0; i < ais.length; i++){
     let ai = this.getAI(ais[i]);
     if (ais[i].search(/follow/) != -1){
      ai.data.targetEntity = parseInt(Player.get());
      }
     else {
      ai.data.target = parseInt(Player.get());
     }
    }
   }
  },

  params: {
   ai: []
  }
 }),

 Summoning: new EntityAIClass({
  execute: function(){
   if (World.getThreadTime()%this.params.summon_delay==0){
    var coords = Entity.getPosition(this.entity);
    coords = {x: coords.x + random(-3, 3), y: coords.y + random(-3, 3), z: coords.z + random(-3, 3)};
    var area = this.params.spawn_area;
    if (typeof this.params.entity == "string"){
     Entity.spawnCustom(this.params.entity, coords.x, coords.y, coords.z);
    }
    else {
     Entity.spawn(coords.x, coords.y, coords.z, this.params.entity);
    }
   }
  },

  params: {
   entity: Native.EntityType.ZOMBIE,

   spawn_area: 2,

   summon_delay: 30
  }
 }),

 Guarding: new EntityAIWatcher({
  execute: function() {
   if (World.getThreadTime()%this.params.find_delay==0){
    var coords = Entity.getPosition(this.entity);
    var attackAI = this.getAI(this.params.attackAI);
    var followAI = this.getAI(this.params.followAI);
    var target = findTarget(coords.x, coords.y, coords.z, this.params.feelingModifier);
    if (target){
     this.setPriority(this.params.attackAI, this.params.priority_on_attack);
     this.setPriority(this.params.followAI, this.params.priority_on_attack);

     attackAI.data.target = parseInt(target);
     followAI.data.target = Entity.getPosition(target);
    }
    else{
     this.setPriority(this.params.attackAI, this.params.priority_on_idle);
     this.setPriority(this.params.followAI, this.params.priority_on_idle);
     attackAI.data.target = null;
     followAI.data.target = null;
    }
   }
  },

  params: {

   attackAI: "attack",

   followAI: "follow",
 
   find_delay: 50,
 
   priority_on_attack: 5,

   priority_on_idle: 0,

   feelingModifier: 10
  }
 }),

 Lifetimer: new EntityAIClass({
  getDefaultPriority: function(){
   return -1;
  },

  execute: function(){
   if (World.getThreadTime()%this.params.damageTimer==0 && Entity.getHealth(this.entity) > 0){
    Entity.setHealth(this.entity, Entity.getHealth(this.entity) - 1);
   }
  },

  params: {
   damageTimer: 60
  }
 })
};

registerAPIUnit("AdvancedAI", AdvancedAI);