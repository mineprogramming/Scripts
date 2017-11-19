/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 3
*/



// file: block.js

IDRegistry.genBlockID("dup");
Block.createBlockWithRotation("dup", [
{name: "Dup", texture: [["dup", 0], ["dup", 0], ["dup", 0], ["dup", 0], ["dup", 0], ["dup", 0]], inCreative: true}
]); 

var dupp = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.dup, -1, dupp);
var dup = BlockRenderer.createModel(); 
dup.addBox(0, 0, 0, 5/16, 1, 1, 57, 0); 
dup.addBox(5/16, 4/16, 0, 11/16, 12/16, 1, 57, 0); 
dup.addBox(11/16, 0, 0, 1, 1, 1, 57, 0); 

dupp.addEntry(dup)

var dup = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Dup"}},
		inventory: {standart: true},
		background: {standart: true}
		},
	drawing: 
[

],
	elements: {
		"slot": {type: "slot", x: 625, y: 250, size: 50},
     "cslot": {type: "slot", x: 575, y: 250, size: 50}
}}); 


TileEntity.registerPrototype(BlockID.dup, {
	defaultValues: {
		someValue: 0
},
	click: function(id, count, data, coords){
var cslot = this.container.getSlot("cslot"); 
while(cslot.id == ItemID.cristal && id != ItemID.cristal){
var slot = this.container.getSlot("slot");
slot.id = id;
slot.count = count;
slot.data = data;
return false; 
}
},
	getGuiScreen: function(){
		return dup;
},
})




// file: cristal.js

IDRegistry.genItemID("cristal"); 
Item.createItem("cristal", "cristal", 
{
name: "cristal", meta: 0
}, 
{
isTech: false,
stack: 64
})




// file: recipes.js

Recipes.addShaped({id: BlockID.dup, count: 1, data: 0}, [
     "xxx",
     "xax",
     "xxx"
], ['x', 266, 0, 'a', 368, 0]);




