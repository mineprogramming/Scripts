//group of this mod: vk.com/runesrpg
//creator: Evance  vk.com/evance1488

Translation.addTranslation("Rune", {ru: "Руна"});
Translation.addTranslation("Fire rune", {ru: "Руна огня"});
Translation.addTranslation("Water rune", {ru: "Руна воды"});
Translation.addTranslation("Terra rune", {ru: "Руна земли"});
Translation.addTranslation("Air rune", {ru: "Руна воздуха"});
Translation.addTranslation("Elementum", {ru: "Элементум"});
Translation.addTranslation("Elementum ingot", {ru: "Слиток элементума"});
Translation.addTranslation("Rune Sword", {ru: "Руновый меч"});
Translation.addTranslation("Rune Pickaxe", {ru: "Руновая кирка"});
Translation.addTranslation("Rune Axe", {ru: "Руновый топор"});
Translation.addTranslation("Rune Shovel", {ru: "Руновая лопата"});
Translation.addTranslation("Rune Hoe", {ru: "Руновая мотыга"});
Translation.addTranslation("Element Pickaxe", {ru: "Элементовая кирка"});
Translation.addTranslation("Element Sword", {ru: "Элементовый меч"});
Translation.addTranslation("Rune Ore", {ru: "Руновая руда"});
Translation.addTranslation("Rune Block", {ru: "Руновый блок"});
Translation.addTranslation("Spawn Rune Traveller", {ru: "Создать Рунового Странника"});
Translation.addTranslation("Rune Ore Nether", {ru: "Адская руновая руда"});
Translation.addTranslation("Rune Ore End", {ru: "Руновая руда края"});
Translation.addTranslation("Rune Helmet", {ru: "Руновый шлем"});
Translation.addTranslation("Rune Chestplate", {ru: "Руновый нагрудник"});
Translation.addTranslation("Rune Leggings", {ru: "Руновые поножи"});
Translation.addTranslation("Rune Boots", {ru: "Руновые ботинки"});

//items

IDRegistry.genItemID("rune");
IDRegistry.genItemID("firerune");
IDRegistry.genItemID("waterrune");
IDRegistry.genItemID("terrarune");
IDRegistry.genItemID("airrune");
IDRegistry.genItemID("elementum");
IDRegistry.genItemID("elementumingot");

Item.createItem("rune", "Rune", {name: "Rune"});

Item.createItem("firerune", "Fire rune", {name: "FireRune"});

Item.createItem("waterrune", "Water rune", {name: "WaterRune"});

Item.createItem("terrarune", "Terra rune", {name: "TerraRune"});

Item.createItem("airrune", "Air rune", {name: "AirRune"});

Item.createItem("elementum", "Elementum", {name: "Elementum"});

Item.createItem("elementumingot", "Elementum ingot", {name: "IngotElementum"});

//tools

importLib("ToolType", "*");

IDRegistry.genItemID("elementsword");
IDRegistry.genItemID("elementpickaxe");
IDRegistry.genItemID("runesword");
IDRegistry.genItemID("runepickaxe");
IDRegistry.genItemID("runeaxe");
IDRegistry.genItemID("runeshovel");
IDRegistry.genItemID("runehoe");

Item.createItem("runesword", "Rune Sword", {name: "RuneSword", meta: 0}, {stack: 1});
Item.createItem("runepickaxe", "Rune Pickaxe", {name: "RunePickaxe", meta: 0}, {stack: 1});
Item.createItem("runeaxe", "Rune Axe", {name: "RuneAxe", meta: 0}, {stack: 1});
Item.createItem("runeshovel", "Rune Shovel", {name: "RuneShovel", meta: 0}, {stack: 1});
Item.createItem("runehoe", "Rune Hoe", {name: "RuneHoe", meta: 0}, {stack: 1});
Item.createItem("elementsword", "Element Sword", {name: "ElementSword", meta: 0}, {stack: 1});
Item.createItem("elementpickaxe", "Element Pickaxe", {name: "ElementPickaxe", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("rune", {durability: 500, level: 3, efficiency: 5, damage: 8, enchantability: 20});
ToolAPI.setTool(ItemID.runesword, "rune", ToolType.sword);
ToolAPI.setTool(ItemID.runepickaxe, "rune", ToolType.pickaxe);
ToolAPI.setTool(ItemID.runeaxe, "rune", ToolType.axe);
ToolAPI.setTool(ItemID.runeshovel, "rune", ToolType.shovel);
ToolAPI.setTool(ItemID.runehoe, "rune", ToolType.hoe);

ToolAPI.addToolMaterial("elementumingot", {durability: 5000, level: 4, efficiency: 15, damage: 30, enchantability: 20});
ToolAPI.setTool(ItemID.elementsword, "elementumingot", ToolType.sword);
ToolAPI.setTool(ItemID.elementpickaxe, "elementumingot", ToolType.pickaxe);

//crafting table

Recipes.addShaped({id: ItemID.firerune, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', ItemID.rune, 0, 'a', 259, 0]);
	
Recipes.addShaped({id: ItemID.waterrune, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', ItemID.rune, 0, 'a', 337, 0]);
	
Recipes.addShaped({id: ItemID.terrarune, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', ItemID.rune, 0, 'a', 2, 0]);

Recipes.addShaped({id: ItemID.airrune, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', ItemID.rune, 0, 'a', 30, 0]);

Recipes.addShaped({id: ItemID.runehelmet, count: 1, data: 0}, [
		"xxx",
		"x x",
		"   "
	], ['x', ItemID.rune, 0]);

Recipes.addShaped({id: ItemID.runeboots, count: 1, data: 0}, [
		"   ",
		"x x",
		"x x"
	], ['x', ItemID.rune, 0]);

Recipes.addShaped({id: ItemID.runechestplate, count: 1, data: 0}, [
		"x x",
		"xxx",
		"xxx"
	], ['x', ItemID.rune, 0]);

Recipes.addShaped({id: ItemID.runeleggings, count: 1, data: 0}, [
		"xxx",
		"x x",
		"x x"
	], ['x', ItemID.rune, 0]);

Recipes.addShaped({id: ItemID.runesword, count: 1, data: 0}, [
		"a",
		"a",
		"b"], ['a', ItemID.rune, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.runepickaxe, count: 1, data: 0}, [
		"aaa",
		" b ",
		" b "], ['a', ItemID.rune, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.runeaxe, count: 1, data: 0}, [
		"aa ",
		"ab ",
		" b "], ['a', ItemID.rune, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.runeshovel, count: 1, data: 0}, [
		" a ",
		" b ",
		" b "], ['a', ItemID.rune, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.runehoe, count: 1, data: 0}, [
		"aa ",
		" b ",
		" b "], ['a', ItemID.rune, 0, 'b', 280, 0]);

Recipes.addShaped({id: BlockID.runeblock, count: 1, data: 0}, [
  "aaa",
  "aaa",
  "aaa"], ["a", ItemID.rune, -1]);

Recipes.addShaped({id: ItemID.elementsword, count: 1, data: 0}, [
		"a",
		"c",
		"b"], ['a', ItemID.elementumingot, 0, 'b', 280, 0, 'c',ItemID.airrune, 0]);
		
Recipes.addShaped({id: ItemID.elementpickaxe, count: 1, data: 0}, [
		"aac",
		" b ",
		" b "
	], ['a', ItemID.elementumingot, 0, 'b', 280, 0, 'c', ItemID.airrune, 0]);
	
	Recipes.addShaped({id: ItemID.elementum, count: 1, data: 0}, [
		"bbb",
		"acd",
		"bbb"
	], ['a', ItemID.firerune, 0, 'b', 264, 0, 'c', ItemID.waterrune, 0, 'd', ItemID.terrarune, 0]);
	
//furnance

Recipes.addFurnace(ItemID.elementum, ItemID.elementumingot, 0);

//blocks

IDRegistry.genBlockID("runeblock");
Block.createBlock("runeblock", [ 	{name: "Rune Block", texture: [["RuneBlock", 0]], inCreative: true} ])

//ores

IDRegistry.genBlockID("runeore");
Block.createBlock("runeore", [
	{name: "Rune Ore", texture: [["RuneOre", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.runeore, "stone");
Block.registerDropFunction("runeore", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.rune, 1, 0]]
	}
	return [];
}, 2);


var BLOCK_TYPE_ORE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "ore");


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){

 for (var i = 0; i < 9; i++){

  var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 40);

  GenerationUtils.genMinable(coords.x, coords.y, coords.z, {
  id: BlockID.runeore,data: 0,
  size: 3,
  ratio: .3,
  checkerTile: 1, 
  checkerMode: false
  });
 }
});


IDRegistry.genBlockID("runeorenether");
Block.createBlock("runeorenether", [
	{name: "Rune Ore Nether", texture: [["RuneOreNether", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.runeorenether, "stone");
Block.registerDropFunction("runeorenether", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.rune, 1, 0]]
	}
	return [];
}, 2);


var BLOCK_TYPE_ORE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "ore");

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){

 for (var i = 0; i < 4; i++){

  var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 123);

  GenerationUtils.genMinable(coords.x, coords.y, coords.z, {
  id: BlockID.runeorenether,data: 0,
  size: 3,
  ratio: .3,
  checkerTile: 87, 
  checkerMode: false
  });
 }
});


IDRegistry.genBlockID("runeoreend");
Block.createBlock("runeoreend", [
	{name: "Rune Ore End", texture: [["RuneOreEnd", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.runeoreend, "stone");
Block.registerDropFunction("runeoreend", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.rune, 1, 0]]
	}
	return [];
}, 2);


var BLOCK_TYPE_ORE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "ore");

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){

 for (var i = 0; i < 4; i++){

  var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 2, 80);

  GenerationUtils.genMinable(coords.x, coords.y, coords.z, {
  id: BlockID.runeoreend,data: 0,
  size: 3,
  ratio: .3,
  checkerTile: 87, 
  checkerMode: false
  });
 }
});


//Armor

IDRegistry.genItemID("runehelmet");
IDRegistry.genItemID("runechestplate");
IDRegistry.genItemID("runeleggings");
IDRegistry.genItemID("runeboots");

Item.createArmorItem("runehelmet", "Rune Helmet", {name: "RuneHelmet"}, {type: "helmet", armor: 5, durability: 1980, texture: "armor/rune_1.png"});
Item.createArmorItem("runechestplate", "Rune Chestplate", {name: "RuneChestplate"}, {type: "chestplate", armor: 7, durability: 2000, texture: "armor/rune_1.png"});
Item.createArmorItem("runeleggings", "Rune Leggings", {name: "RuneLeggins"}, {type: "leggings", armor: 6, durability: 1990, texture: "armor/rune_2.png"});
Item.createArmorItem("runeboots", "Rune Boots", {name: "RuneBoots"}, {type: "boots", armor: 4, durability: 1960, texture: "armor/rune_1.png"});


//mob

var runetraveller = MobRegistry.registerEntity("runetraveller");

runetraveller.customizeEvents({
 tick: function(){
  Entity.setRender(this.entity, Native.MobRenderType.human);
  Entity.setSkin(this.entity, "images/mob/RuneTraveller.png");
 },

 attackedBy: function(attacker, amount){
  World.playSoundAtEntity(this.entity, "mob.zombie.hit", 10);
 }
});

runetraveller.customizeDescription({
 getHealth: function(){
  return 60;
 },

 getDrop: function(){
  var drop = [];
  drop.push({id: ItemID.rune, count: {min: 1, max: 5}, data: 0, separate: true, chance: .50});
  return drop;
 }
})

IDRegistry.genItemID("runespawn");
Item.createItem("runespawn", "Spawn Rune Traveller", {name: "RuneSpawn", meta: 0});

Item.registerUseFunction("runespawn", function(coords, item, block){
Entity.spawnCustom("runetraveller", coords.relative.x + 0.5, coords.relative.y + 1.5, coords.relative.z + 0.5);
});

MobSpawnRegistry.registerSpawn("runetraveller", .008)
runetraveller.customizeAI({
getAITypes: function() { return {
"wander": {
type: EntityAI.Wander, priority: 0,
speed: 0.06,
rotateHead: true,
angular_speed: 0.1,
delay_weight: 0.3,
},
"swim": {type: EntityAI.Swim

}/*,
"attack":{type: EntityAL.Attack,
attack_damage: 6,
attack_range: 2.5,
attack_rate: 12
}*/
}
}
}); 