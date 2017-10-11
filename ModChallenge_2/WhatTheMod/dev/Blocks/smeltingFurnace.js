IDRegistry.genBlockID("SmeltingFurnace");
Block.createBlockWithRotation("SmeltingFurnace", [
	{name: "Smelting furnace", texture: [["fef", 0], ["fef", 0], ["fef", 0], ["fdds", 0], ["fef", 0], ["fef", 0]], inCreative: true}
]);
Callback.addCallback("PostLoaded",function(){
Recipes.addShaped({id: BlockID.SmeltingFurnace, count: 1, data: 0}, [
		"eee",
		"xwx",
		"xxx"
	], ['x', 49, 0,'e',43,6,'w',327,0]);
});

var UIfire = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Smelting furnace"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		
	],
	
	elements: {
	 "tprogress": {type: "text", x: 550, y: 230, width: 300, height: 30, text: "Progress:"},
	 "ttprogress": {type: "text", x: 695, y: 230, width: 300, height: 30, text: "0"},
		"ss1": {type: "slot", x: 500, y: 150},
	
	 "ss2": {type: "slot", x: 600, y: 150},
	
	 "ss3": {type: "slot", x: 700, y: 150},
	
	"sr": {type: "slot", x: 600, y: 275}
	}
});
UI.testUI(UIfire);
TileEntity.registerPrototype(BlockID.primalGenerator, {
	defaultValues: {
		progress:0
	},
	
	getGuiScreen: function(){
		return UIfire;
	},
	tick:function(){
		this.container.setText("ttprogress", this.data.progress );
		
		AlloyRecipeRegistry(this.data.progress,
{sourceSlotFirst:this.container.ss1,
sourceSlotSecond:this.container.ss2,
sourceSlotThird:this.container.ss3},
		{sourceSlotFirst:
		{id:BlockID.oreCobalt,count:1,data:0},
		sourceSlotSecond:
		{id:BlockID.oreCobalt,count:1,data:0},
		sourceSlotThird:
		{id:BlockID.oreCobalt,count:1,data:0}},
{id:ItemID.cobaltIngot,count:1,data:0});
	}
});