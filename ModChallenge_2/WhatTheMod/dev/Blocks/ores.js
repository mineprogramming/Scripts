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