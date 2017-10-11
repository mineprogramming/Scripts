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