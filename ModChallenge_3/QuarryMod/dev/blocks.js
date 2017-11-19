Block.setPrototype("quarry", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Quarry",
            texture: [["quarry", 0]],
            inCreative: true
        }];
    }

});
Block.setBlockMaterial(BlockID.quarry, "stone", 2);

Block.setPrototype("quarryCasing", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Quarry Casing",
            texture: [["quarry", 1]],
            inCreative: true
        }];
    }

});
Block.setBlockMaterial(BlockID.quarryCasing, "stone", 2);
EU.registerWire(BlockID.quarryCasing);

Callback.addCallback("ItemUse", function (coords, item, block) {
    if(block.id === BlockID.quarryCasing){

        //Открываем интерфейс соседнего quarry
        for(let index in directions){
            let dir = directions[index];
            let tile = World.getTileEntity(coords.x + dir[0], coords.y + dir[1], coords.z + dir[2]);

            if(tile && World.getBlockID(coords.x + dir[0], coords.y + dir[1], coords.z + dir[2]) === BlockID.quarry){
                tile.container.openAs(gui);
                break;
            }
        }

    }
});