Callback.addCallback("DestroyBlock", function(coords, block, player){
var pl = Player.getCarriedItem();
var bl = World.getBlockID(coords.x,coords.y,coords.z);
if(((pl.id==258)|| (pl.id==271)||(pl.id==275)|| (pl.id==279)|| (pl.id==286))&&((bl==17))){
var high = __config__.access("blocksHigh");
for(var i=0;i<high;i++){
World.destroyBlock(coords.x, coords.y+i, coords.z, true)
}
 }
});