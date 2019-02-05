var mob = new CustomMob();

Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x
    var y = coords.relative.y
    var z = coords.relative.z
    
    if(item.id == 280){
        mob.spawn(x, y + 1, z);
    }
});


