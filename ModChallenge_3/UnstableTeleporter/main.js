//Блок
IDRegistry.genBlockID("unstableTeleporter");
Block.createBlock("unstableTeleporter", [{name: "Unstable Teleporter", texture: [["unstable_teleporter", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.unstableTeleporter, "stone");
//Крафт
Recipes.addShaped({id: BlockID.unstableTeleporter, count: 1, data: 0}, [
	"bbb",
	"cac",
	"bbb"
], ['a', 368, 0, 'b', 44, 0, 'c', 399, 0]); 
//Функция
Block.registerDropFunction("unstableTeleporter", function(coords, blockID, blockData, level){
var UT = Math.round(Math.random() * 3);
var pos = Player.getPosition();
var UP = Math.round(Math.random() * 30);
var SIDE = Math.round(Math.random() * 3000000);
if(UT == 0){
   return Player.setPosition(pos.x+SIDE, pos.y+UP, pos.z+SIDE);
  }
if(UT == 1){
   return Player.setPosition(pos.x+SIDE, pos.y+UP, pos.z+SIDE);
  }
if(UT == 2){
   return Player.setPosition(pos.x+SIDE, pos.y+UP, pos.z+SIDE);
  }
if(UT == 3){
   return Entity.setHealth(Player.get(), 0)
  }
});