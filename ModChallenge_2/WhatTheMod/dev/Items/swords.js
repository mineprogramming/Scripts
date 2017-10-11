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
