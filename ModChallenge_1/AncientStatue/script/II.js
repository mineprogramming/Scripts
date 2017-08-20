var entMob;
function useItem(x,y,z,i,b){
if(i==280){
entMob = Level.spawnMob(x, y+1, z, 32, 'mob/woodsStatue.png');
Entity.setHealth(entMob, 20); 
Entity.setNameTag(entMob, "Human"); 
Entity.setRenderType(entMob, EntityRenderType.human); 
Entity.setCarriedItem(entMob, 276, 1, 0);
}
}

var xx=getPlayerX();
var yy=getPlayerY();
var zz=getPlayerZ();


 function modTick() 
 { 
 var a = Player.getPointedEntity(); 
 if (Entity.getEntityTypeId(a) == 32) //woodsStatueG
Entity.setMobSkin(entMob, "mob/woodsStatueG");
 { 
Entity.setImmobile(entMob, true);
 }
for(var i=1; i<300; i++){
if(Player.getPointedBlockId()==i){
Entity.setImmobile(entMob, false);
Entity.setMobSkin(entMob, "mob/woodsStatue");
}}
}

 

