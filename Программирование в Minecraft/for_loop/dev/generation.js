
Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id == 280){
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                var x = coords.relative.x + i;
                var y = coords.relative.y;
                var z = coords.relative.z + j;
                World.setBlock(x, y, z, BlockID.testblock, 0);
                var x = coords.relative.x + i;
                var y = coords.relative.y + 1;
                var z = coords.relative.z + j;
                World.setBlock(x, y, z, BlockID.testblock, 0);
            }
            
        }
    }
});