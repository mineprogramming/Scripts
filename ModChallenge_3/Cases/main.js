IDRegistry.genBlockID("Case");
Block.createBlock("Case", [{name: "Case", texture: [["case", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.Case, "stone");
Recipes.addShaped({id: BlockID.Case, count: 1, data: 0}, [
	"odo",
	"cae",
	"obo"
], ['a', 125, 0, 'b', 266, 0, 'c', 264, 0, 'd', 265, 0, 'e', 263, 0]); 

Block.registerDropFunction("Case", function(coords, blockID, blockData, level){
var IR = Math.round(Math.random() * 5);
var pos = Player.getPosition();
if(IR == 0){
   return Entity.setHealth (Player.get(), 0)
  }
if(IR == 1){
   return [[266,Math.round(Math.random() * 2),0]] //Золото
  }
if(IR == 2){
   return [[265,Math.round(Math.random() * 2),0]] //Железо
  }
if(IR == 3){
   return [[264,Math.round(Math.random() * 2),0]] //Алмаз
  }
if(IR == 4){
   return [[263,Math.round(Math.random() * 2),0]] //Уголь
if(IR == 5){
   return [[264,Math.round(Math.random() * 2),0],[265,Math.round(Math.random() * 2),0],[266,Math.round(Math.random() * 2),0],[388,Math.round(Math.random() * 2),0], [263,Math.round(Math.random() * 2),0]]; //Джекпот
  }
  }
});