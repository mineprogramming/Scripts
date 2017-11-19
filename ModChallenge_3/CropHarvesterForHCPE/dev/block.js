IDRegistry.genBlockID("CropHarvester");
Block.createBlockWithRotation("CropHarvester",[
        {name: "CropHarvester", texture: [["harvester_bottom", 0],["harvester_top", 0],["harvester_back",0],["harvester_front",1],["harvester_back",0],["harvester_back",0]], inCreative: true}
]);
Recipes.addShaped({id: BlockID.CropHarvester, count: 1, data: 0}, [
        "uru",
        "ded",
        "apa"
        ], ["e", 146, 0, "r", 102, 0,"a",42,0,"d",152,0,"p",292,0,"u",158,0]);//harvester_front
