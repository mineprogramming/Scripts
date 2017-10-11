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