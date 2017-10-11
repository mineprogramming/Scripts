Callback.addCallback("LevelLoaded", function(){
	Game.message(ChatColor.GREEN + "AlloysMod");
	Game.message(ChatColor.WHITE + "Author: Nikolay Savenko");
	Game.message(ChatColor.WHITE + "https://vk.com/raystrike");
});	


var AlloyRecipeRegistry = {
	registerFirstLevelAlloy:function(dataProgress,slots,source,ffinal){
		if((slots.sourceSlotFirst.id==source.sourceNeedFirst.id)&&(slots.sourceSlotSecond.id==source.sourceNeedSecond.id)&&(slots.sourceSlotThird.id==source.sourceNeedThird.id)){
			if(dataProgress==1000){
				if(slots.ffinal.id==0){
					slots.ffinal.id=ffinal.id;
					if(slots.ffinal.count==0){
						slots.ffinal.count=1;
					}
					else{slots.ffinal.count++;}
				}				
			}
			else{
				dataProgress++;
			}
		}
	}
};
var ICoreGenerator = {
	genOreNormal: function(x, y, z){
		for(var xx = -1; xx < 2; xx++){
			for(var yy = -1; yy < 2; yy++){
				for(var zz = -1; zz < 2; zz++){
					var d = Math.sqrt(xx*xx + yy*yy + zz*zz);
					var r = 1.5 - Math.random()/2;
					if(d < r){GenerationUtils.setLockedBlock(x+xx, y+yy, z+zz);}
				}
			}
		}
	}
};
/*AlloyRecipeRegistry(this.data.progress,
{sourceSlotFirst:this.container.solt1,
sourceSlotSecond:this.container.solt2,
sourceSlotThird:this.container.solt3},
		{sourceSlotFirst:
		{id:ItemID.ff,count:1,data:0},
		sourceSlotSecond:
		{id:ItemID.ff,count:1,data:0},
		sourceSlotThird:
		{id:ItemID.ff,count:1,data:0}},
{id:ItemID.ada,count:1,data:0});
*/


IDRegistry.genItemID("cobaltIngot");
Item.createItem("cobaltIngot", "Cobalt ingot", {name: "cabaltIngot", data: 0});
IDRegistry.genItemID("adamantiteIngot");
Item.createItem("adamantiteIngot", "Adamantite ingot", {name: "adamantitIngot", data: 0});
IDRegistry.genItemID("mythrilIngot");
Item.createItem("mythrilIngot", "Mythril ingot", {name: "mythrilIngot", data: 0});
IDRegistry.genItemID("mysticIngot");
Item.createItem("mysticIngot", "Mystic ingot", {name: "mystycIngot", data: 0});


//Item.setMaxDamage(ItemID.ttt, 112);
IDRegistry.genItemID("cobaltSword");
Item.createItem("cobaltSword", "Cobalt sword", {name: "cobaltSword", data: 0});
Item.setMaxDamage(ItemID.cobaltSword, 7);
IDRegistry.genItemID("adamantiteSword");
Item.createItem("adamantiteSword", "Adamantite sword", {name: "adamantitSword", data: 0});
Item.setMaxDamage(ItemID.adamantiteSword, 8);
IDRegistry.genItemID("mythrilSword");
Item.createItem("mythrilSword", "Mythril sword", {name: "mythrilSword", data: 0});
Item.setMaxDamage(ItemID.mythrilSword, 9);
IDRegistry.genItemID("mysticSword");
Item.createItem("mysticSword", "Mystic sword", {name: "mysticSword", data: 0});
Item.setMaxDamage(ItemID.mysticSword, 15);
IDRegistry.genItemID("darkSword");
Item.createItem("darkSword", "Dark sword", {name: "darkSword", data: 0});
Item.setMaxDamage(ItemID.darkSword, 24);

Callback.addCallback("PostLoaded",function(){
Recipes.addShaped({id: ItemID.cobaltSword, count: 1, data: 0}, [
		" t ",
		" t ",
		" i "
	], ['i', ItemID.obsidianStick, 0,'t',ItemID.cobaltIngot,0]);
Recipes.addShaped({id: ItemID.adamantiteSword, count: 1, data: 0}, [
		" t ",
		" t ",
		" i "
	], ['i', ItemID.obsidianStick, 0,'t',ItemID.adamantiteIngot,0]);
	Recipes.addShaped({id: ItemID.mythrilSword, count: 1, data: 0}, [
		" t ",
		" t ",
		" i "
	], ['i', ItemID.obsidianStick, 0,'t',ItemID.mythrilIngot,0]);
	Recipes.addShaped({id: ItemID.mysticSword, count: 1, data: 0}, [
		" t ",
		" t ",
		" i "
	], ['i', ItemID.obsidianStick, 0,'t',ItemID.mysticIngot,0]);
	Recipes.addShaped({id: ItemID.darkSword, count: 1, data: 0}, [
		" t ",
		" t ",
		" i "
	], ['i', ItemID.obsidianStick, 0,'t',ItemID.darkStone,0]);
});


IDRegistry.genItemID("obsidianStick");
Item.createItem("obsidianStick", "Obsidian stick", {name: "obsidianStick", data: 0});
Recipes.addShaped({id: ItemID.obsidianStick, count: 1, data: 0}, [
     " x ",
     " x",
     " x "
], ['x', BlockID.poweredObsidian, 0]); 
IDRegistry.genItemID("obsidianBall");
Item.createItem("obsidianBall", "Obsidian ball", {name: "obsidianBall", data: 0});
Recipes.addShaped({id: ItemID.obsidianBall, count: 1, data: 0}, [
     "xx ",
     "xx",
     "   "
], ['x', BlockID.poweredObsidian, 0]); 
IDRegistry.genItemID("mysticPowder");
Item.createItem("mysticPowder", "Mystic powder", {name: "smallMysticDust", data: 0});
Recipes.addShaped({id: ItemID.mysticPowder, count: 1, data: 0}, [
     "xz ",
     "   ",
     "   "
], ['x', BlockID.mysticIngot, 0,'z',318,0]); 
IDRegistry.genItemID("mysticDust");
Item.createItem("mysticDust", "Mystic dust", {name: "mysticDust", data: 0});
Recipes.addShaped({id: ItemID.mysticDust, count: 1, data: 0}, [
     "xx ",
     "xx ",
     "   "
], ['x', BlockID.mysticPowder, 0]); 
IDRegistry.genItemID("poweredCoal");
Item.createItem("poweredCoal", "Powered coal", {name: "poweredCoal", data: 0});
Recipes.addShaped({id: ItemID.poweredCoal, count: 1, data: 0}, [
     "zx ",
     "xx ",
     "   "
], ['x',331, 0,"z",263,0]); 
IDRegistry.genItemID("darkStone");
Item.createItem("darkStone", "Dark stone", {name: "darkStone", data: 0});
Recipes.addShaped({id: ItemID.poweredCoal, count: 1, data: 0}, [
     "qzt",
     "zaz",
     "tzq"
], ['a',399, 0,"z",ItemID.poweredCoal,0,"q",ItemID.mysticDust,0,"t",ItemID.obsidianBall,0]); 


var BLOCK_TYPE_ORE = Block.createSpecialType({
	base: 1,
	destroytime: 3
}, "ore");

IDRegistry.genBlockID("oreCobalt");
IDRegistry.genBlockID("oreAdamantite");
IDRegistry.genBlockID("oreMythril");

Block.createBlock("oreCobalt", [
{name: "Cobalt ore", texture: [["cobalt", 0]], inCreative: true}
],BLOCK_TYPE_ORE);
Block.registerDropFunction("oreCobalt", function(){
	return [[ItemID.cobaltIngot, 1, 0]];
});

Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
	GenerationUtils.lockInBlock(BlockID.oreCobalt, 0, 1, false);
	for(var i = 0; i < 10; i++){
		var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 64);
		ICoreGenerator.genOreNormal(coords.x, coords.y, coords.z);
	}
});

Block.createBlock("oreAdamantite", [
{name: "Adamantite ore", texture: [["adamantit", 0]], inCreative: true}
],BLOCK_TYPE_ORE);
Block.registerDropFunction("oreAdamantite", function(){
	return [[ItemID.adamantiteIngot, 1, 0]];
});

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
	GenerationUtils.lockInBlock(BlockID.oreAdamantite, 0, 1, false);
	for(var i = 0; i < 10; i++){
		var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 64);
		ICoreGenerator.genOreNormal(coords.x, coords.y, coords.z);
	}
});

Block.createBlock("oreMythril", [
{name: "Mythril ore", texture: [["mythril", 0]], inCreative: true}
],BLOCK_TYPE_ORE);
Block.registerDropFunction("oreMythril", function(){
	return [[ItemID.mythrilIngot, 1, 0]];
});

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
	GenerationUtils.lockInBlock(BlockID.oreMythril, 0, 1, false);
	for(var i = 0; i < 10; i++){
		var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 64);
		ICoreGenerator.genOreNormal(coords.x, coords.y, coords.z);
	}
});


var BLOCK_TYPE_OBSIDIAN = Block.createSpecialType({
	base: 49,
	destroytime: 5
}, "obsidian");

IDRegistry.genBlockID("poweredObsidian");
Block.createBlock("poweredObsidian", [
	{name: "Powered obsidian", texture: [["poweredObsidian", 0]], inCreative: true}
], BLOCK_TYPE_OBSIDIAN);
Recipes.addShaped({id: BlockID.poweredObsidian, count: 1, data: 0}, [
     "xxx",
     "xzx",
     "xxx"
], ['x', 49, 0, 'a', 331, 0]); 


//BLOCKS
Translation.addTranslation("Cobalt ore", {ru:"Кобальтовая руда"});
Translation.addTranslation("Adamantite ore", {ru:"Адамантиевая руда"});
Translation.addTranslation("Mythril ore", {ru:"Мифриловая руда"});

Translation.addTranslation("Powered obsidian", {ru:"Заряженный обсидиан"});

Translation.addTranslation("Smelting furnace", {ru:"Плавильня"});

//ITEMS
Translation.addTranslation("Cobalt ingot", {ru:"Кобальтовый слиток"});
Translation.addTranslation("Adamantite ingot", {ru:"Адамантиевый слиток"});
Translation.addTranslation("Mythril ingot", {ru:"Мифриловый слиток"});
Translation.addTranslation("Mystic ingot", {ru:"Мистический слиток"});

Translation.addTranslation("Cobalt sword", {ru:"Кобальтовый меч"});
Translation.addTranslation("Adamantite sword", {ru:"Адамантиевый меч"});
Translation.addTranslation("Mythril sword", {ru:"Мифриловый меч"});
Translation.addTranslation("Mystic sword", {ru:"Мистический меч"});
Translation.addTranslation("Dark sword", {ru:"Темный меч"});

Translation.addTranslation("Obsidian stick", {ru:"Обсидиановая палка"});
Translation.addTranslation("Obsidian ball", {ru:"Обсидиановый шарик"});
Translation.addTranslation("Mystic dust", {ru:"Мистическая пыль"});
Translation.addTranslation("Mystic powder", {ru:"Мистический порошок"});
Translation.addTranslation("Powered coal", {ru:"Заряженный уголь"});
Translation.addTranslation("Dark stone", {ru:"Темный камень"});


