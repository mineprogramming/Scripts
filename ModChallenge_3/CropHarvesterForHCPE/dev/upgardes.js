IDRegistry.genItemID("upgradeRange");
Item.createItem("upgradeRange", "Upgrade range", {name: "upgradeRange", meta: 0}, {stack:5});
Recipes.addShaped({id: ItemID.upgradeRange, count: 1, data: 0}, [
        "upu",
        "ded",
        "upu"
        ], ["e", 170, 0,"d",152,0,"p",318,0,"u",266,0]);
IDRegistry.genItemID("upgradeSpeed");
Item.createItem("upgradeSpeed", "Upgrade speed", {name: "upgradeSpeed", meta: 0}, {stack:5});
Recipes.addShaped({id: ItemID.upgradeSpeed, count: 1, data: 0}, [
        "upu",
        "ded",
        "upu"
        ], ["e", 22, 0,"d",152,0,"p",318,0,"u",265,0]);
IDRegistry.genItemID("upgradePusher");
Item.createItem("upgradePusher", "Upgrade pusher", {name: "upgradePusher", meta: 0}, {stack:1});
Recipes.addShaped({id: ItemID.upgradePusher, count: 1, data: 0}, [
        "upu",
        "ded",
        "upu"
        ], ["e", 54, 0,"d",152,0,"p",318,0,"u",33,0]);
