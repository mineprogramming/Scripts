/*var hat = null;
var townHat = MobRegistry.registerEntity("townHat");
townHat.__base_type=12;
var townHatTexture = new Texture("grinding_circle_stone.png").setResolution(64,32);
var townHatModel = new EntityModel(townHatTexture);

townHatModel.setTexture(townHatTexture);
var townHatRender = new Render();
townHatModel.createAnimation(1, function(frame) {
    var partObj = [
		{type: "box",coords: {x: 0,y: -6.5,z: 0},size: {x: 10, y: 1, z: 10},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: -8,z: 0},size: {x: 8, y: 2, z: 8},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: -8.5,z: 0},size: {x: 8, y: 1, z: 8},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: -8.5+2,z: 0},size: {x: 8, y: 4, z: 8},uv: {x: 48,y: 16}},
    ];

    townHatRender.setPart("head", partObj, {});
    return townHatRender;
}, 0.5);
townHat.customizeVisual({
    getModels: function() {
        return {
            "main": townHatModel
        };

    },
});

townHat.customizeDescription({
    getHitbox: function() {
        return {
            w: 0.1,
            h: 0.1
        };
    }
});
Callback.addCallback("LevelLoaded",function(){
	hat = Entity.spawnCustom("townHat", Player.getPosition().x, Player.getPosition().y, Player.getPosition().z)
	Entity.setHealth(hat.entity,10000);
	Entity.rideAnimal(hat.entity, Player.get());
});
Callback.addCallback("tick",function(){
	if(hat){
		/*Entity.setVelocity(hat.entity, Player.getVelocity().x, Player.getVelocity().y, Player.getVelocity().z);
		if(World.getWorldTime()%2==0){
		Entity.setPosition(hat.entity, Player.getPosition().x, Player.getPosition().y, Player.getPosition().z);
		}
	}
});*/

var DangUtil={
	arrayDang:[],
	add:function(block, conditionGeneration, biome, checkPoint, define){
		this.arrayDang.push({block:block, conditionGeneration:conditionGeneration, biome:biome, checkPoint:checkPoint, define:define});
	},
	build:function(uniqueId, x, y, z){
		//Game.message(uniqueId);
		for(var i in this.arrayDang[uniqueId].block){
			var rand =Math.abs(Math.round(Math.random()*(this.arrayDang[uniqueId].block[i].IdData.length-1)));
			var blockIdData = this.arrayDang[uniqueId].block[i].IdData[rand];
			//Debug.m(rand+" "+ (this.arrayDang[uniqueId].block[i].IdData.length-1));
			World.setBlock(x+this.arrayDang[uniqueId].block[i].x, y+this.arrayDang[uniqueId].block[i].y, z+this.arrayDang[uniqueId].block[i].z, blockIdData.id, blockIdData.data);
		}
	},
	getSurface:function(uniqueId, x, z){
		Game.message(uniqueId);
		var generarion = this.arrayDang[uniqueId].conditionGeneration;
		if(generarion.isSurface){
		if(generarion.underStart){
			for(var y = generarion.minHeight; y<=generarion.maxHeight;y++){
				for(var i in generarion.blockUp){
					for( var b in generarion.blockUnder){
						if(World.getBlock(x,y,z).id==generarion.blockUp[i].id&&World.getBlock(x,y,z).data==generarion.blockUp[i].data&&World.getBlock(x,y-1,z).id==generarion.blockUnder[b].id&&World.getBlock(x,y-1,z).data==generarion.blockUnder[b].data){
					return y;
				}
					}
				}
			}
		}else{
			for(var y = generarion.maxHeight; y>=generarion.minHeight;y--){
				for(var i in generarion.blockUp){
					for( var b in generarion.blockUnder){
						if(World.getBlock(x,y,z).id==generarion.blockUp[i].id&&World.getBlock(x,y,z).data==generarion.blockUp[i].data&&World.getBlock(x,y-1,z).id==generarion.blockUnder[b].id&&World.getBlock(x,y-1,z).data==generarion.blockUnder[b].data){
					return y;
				}
					}
				}
			}
		}
	}else if(!generarion.isSurface){
		return Math.round(Math.random()*(generarion.maxHeight-generarion.minHeight))+generarion.minHeight;
	}
	},
	checkPoint:function(uniqueId, x, y, z){
		if(this.arrayDang[uniqueId].checkPoint.thisBlock){
		for(var i in this.arrayDang[uniqueId].checkPoint.check){
			var block = this.arrayDang[uniqueId].checkPoint.check[i];
				if(World.getBlock(x+block.x, y+block.y, z + block.z).id!=block.id&&World.getBlock(x+block.x, y+block.y, z + block.z).data==block.data){
					return false;
				}
			}
			return true;
		}
		
		if(!this.arrayDang[uniqueId].checkPoint.thisBlock){
		for(var i in this.arrayDang[uniqueId].checkPoint.check){
			var block = this.arrayDang[uniqueId].checkPoint.check[i];
				if(World.getBlock(x+block.x, y+block.y, z + block.z).id==block.id&&World.getBlock(x+block.x, y+block.y, z + block.z).data==block.data){
					return false;
				}
			}
			return true;
		}
	},
	chestLevel0:[],
	chestLevel1:[],
	chestLevel2:[],
	chestAddItem:function(type, id, data, count, rarity){
		if(!this[type]){
			this[type]=[];
		}
		this[type].push({id:id, data:data, count:count, rarity:rarity});
	},
	addItemToChest:function(type, x, y, z){
		var slot = 0;
		var setSlot=ModAPI.requireGlobal("Level.setChestSlot");
		var random = Math.random();
		for(var i in this[type]){
			if(slot<29){
			var item = this[type][i];
			if(random<=item.rarity){
				setSlot(x,y,z,slot, item.id, item.data, Math.round(Math.random()*(item.count.max- item.count.min))+item.count.min);
				slot++;
			}
			}
		}
	}
};
DangUtil.chestAddItem("chestLevel0", 352, 0, {min:1, max:24}, 0.1);
DangUtil.chestAddItem("chestLevel0", 367, 0, {min:1, max:24}, 0.8);
DangUtil.chestAddItem("chestLevel0", 266, 0, {min:2, max:10}, 0.40);
DangUtil.chestAddItem("chestLevel0", 265, 0, {min:1, max:7}, 0.24);
DangUtil.chestAddItem("chestLevel0", 329, 0, {min:1, max:1}, 0.15);
DangUtil.chestAddItem("chestLevel0", 388, 0, {min:1, max:3}, 0.03);

DangUtil.chestAddItem("chestLevel1", 352, 0, {min:16, max:48}, 0.72);
DangUtil.chestAddItem("chestLevel1", 367, 0, {min:16, max:48}, 0.62);
DangUtil.chestAddItem("chestLevel1", 266, 0, {min:2, max:16}, 0.60);
DangUtil.chestAddItem("chestLevel1", 265, 0, {min:1, max:7}, 0.44);
DangUtil.chestAddItem("chestLevel1", 264, 0, {min:1, max:3}, 0.14);
DangUtil.chestAddItem("chestLevel1", 329, 0, {min:1, max:1}, 0.15);
DangUtil.chestAddItem("chestLevel1", 388, 0, {min:1, max:3}, 0.1);
DangUtil.chestAddItem("chestLevel1", 417, 0, {min:1, max:1}, 0.05);
DangUtil.chestAddItem("chestLevel1", 418, 0, {min:1, max:1}, 0.04);
DangUtil.chestAddItem("chestLevel1", 419, 0, {min:1, max:1}, 0.02);

DangUtil.chestAddItem("chestLevel2", 352, 0, {min:16, max:48}, 0.82);
DangUtil.chestAddItem("chestLevel2", 367, 0, {min:16, max:48}, 0.72);
DangUtil.chestAddItem("chestLevel2", 266, 0, {min:7, max:25}, 0.70);
DangUtil.chestAddItem("chestLevel2", 265, 0, {min:5, max:20}, 0.54);
DangUtil.chestAddItem("chestLevel2", 264, 0, {min:1, max:5}, 0.2);
DangUtil.chestAddItem("chestLevel2", 329, 0, {min:1, max:1}, 0.25);
DangUtil.chestAddItem("chestLevel2", 388, 0, {min:1, max:3}, 0.2);
DangUtil.chestAddItem("chestLevel2", 417, 0, {min:1, max:1}, 0.1);
DangUtil.chestAddItem("chestLevel2", 418, 0, {min:1, max:1}, 0.05);
DangUtil.chestAddItem("chestLevel2", 419, 0, {min:1, max:1}, 0.02);
DangUtil.chestAddItem("chestLevel2", 361, 0, {min:1, max:5}, 0.25);
DangUtil.chestAddItem("chestLevel2", 362, 0, {min:1, max:3}, 0.05);
DangUtil.chestAddItem("chestLevel2", 366, 0, {min:1, max:5}, 0.05);
DangUtil.chestAddItem("chestLevel2", 302, 0, {min:1, max:1}, 0.05);
DangUtil.chestAddItem("chestLevel2", 303, 0, {min:1, max:1}, 0.05);
DangUtil.chestAddItem("chestLevel2", 304, 0, {min:1, max:1}, 0.05);
DangUtil.chestAddItem("chestLevel2", 305, 0, {min:1, max:1}, 0.05);
DangUtil.chestAddItem("chestLevel2", 279, 0, {min:1, max:1}, 0.1);
DangUtil.chestAddItem("chestLevel2", 278, 0, {min:1, max:1}, 0.09);
DangUtil.chestAddItem("chestLevel2", 293, 0, {min:1, max:1}, 0.2);
DangUtil.chestAddItem("chestLevel2", 341, 0, {min:1, max:24}, 0.2);
Callback.addCallback("tick", function(){
	if(World.getWorldTime()%15==0){
		Game.tipMessage(Math.floor(Player.getPosition().x)+" "+ Math.floor(Player.getPosition().y)+" "+Math.floor(Player.getPosition().z));
	}
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
	//Game.message("u");
	var randomizer=Math.random();
	var dang=[];
	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 256);
	for(var i in DangUtil.arrayDang){
		for(var b in DangUtil.arrayDang[i].biome){
			if(DangUtil.arrayDang[i].biome[b].id==World.getBiome(coords.x, coords.z)&&randomizer<=DangUtil.arrayDang[i].biome[b].rarity){
				dang.push(i);
			}
		}
	}
	
	if(dang.length){
		var dang = dang[Math.abs(Math.round(Math.random()*(dang.length-1)))];
	coords.y = DangUtil.getSurface(dang,coords.x, coords.z);
	if(DangUtil.checkPoint(dang, coords.x, coords.y, coords.z)&&coords.y!==undefined){
		DangUtil.build(dang, coords.x, coords.y, coords.z);
		DangUtil.arrayDang[dang].define(coords.x, coords.y, coords.z);
		}
	}
});
Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
	var randomizer=Math.random();
	var dang=[];
	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 128);
	for(var i in DangUtil.arrayDang){
		for(var b in DangUtil.arrayDang[i].biome){
			if(DangUtil.arrayDang[i].biome[b].id==8&&randomizer<=DangUtil.arrayDang[i].biome[b].rarity){
				dang.push(i);
			}
		}
	}
	
	if(dang.length){
		var dang = dang[Math.abs(Math.round(Math.random()*(dang.length-1)))];
	coords.y = DangUtil.getSurface(dang,coords.x, coords.z);
	if(DangUtil.checkPoint(dang, coords.x, coords.y, coords.z)&&coords.y!==undefined){
		//Game.message("u");
		DangUtil.build(dang, coords.x, coords.y, coords.z);
		DangUtil.arrayDang[dang].define(coords.x, coords.y, coords.z);
		}
	}
});
var setSpawnerEntity=ModAPI.requireGlobal("Level.setSpawnerEntityType");
var getLightLevel=ModAPI.requireGlobal("Level.getBrightness");
TileEntity.registerPrototype(52, {
	defaultValues:{
		timer:0,
		data:null,
		light:7,
		count:0
	},
	tick: function(){
		
		if(World.getWorldTime()%5==0){
			this.data.count=0;
				var mobs=Entity.getAll();
				for(var t =0; t<mobs.length; t++){
					if(Entity.getType(mobs[t])>30){
					var xx=Entity.getPosition(mobs[t]).x-this.x;
					var yy=Entity.getPosition(mobs[t]).y-this.y;
					var zz=Entity.getPosition(mobs[t]).z-this.z;
					if(xx*xx+yy*yy+zz*zz<6*6){
						this.data.count++;
					}
					}
					}
					}
		
		
		
		if(this.data.data&&!this.data.timer&&this.data.count<7){
			this.data.timer=200+Math.round(Math.random()*300);
		//	Game.message(this.data.timer+" "+this.data.data+" "+typeof(this.data.data));
			if(getLightLevel(this.x, this.y + 1, this.z)<=this.data.light){
				for(var i = 0; i<8;i++){
					var randomX= Math.round((Math.random()-0.5)*7);
					var randomZ= Math.round((Math.random()-0.5)*7);
					if(World.getBlock(this.x+randomX, this.y,randomZ+this.z).id==0&&World.getBlock(this.x+randomX, this.y+1,randomZ+this.z).id==0&&World.getBlock(this.x+randomX, this.y-1,randomZ+this.z).id!=0){
						if(typeof(this.data.data)=="number"){
							Entity.spawn(this.x+randomX, this.y, this.z+randomZ,this.data.data);
							//Game.message(randomX+" "+randomZ);
						}else{
							Entity.spawnCustom(this.data.data, this.x+randomX, this.y+1, this.z+randomZ);
						}
					}
				}
			}
			}
		if(this.data.data&&this.data.timer){
			this.data.timer--;
			if(World.getWorldTime()%5==0){
				Particles.addParticle(this.x+Math.random(), this.y+1, this.z+Math.random(), 7, 0, 0, 0,1);
			}
		}
		if(!this.data.data){
			World.removeTileEntity(this.x, this.y, this.z);
		}
	},
});
function addEntityToSpawner(data,x,y,z,light){
	World.addTileEntity(x, y, z);
	World.getTileEntity(x, y, z).data.data=data;
	World.getTileEntity(x, y, z).data.light=light;
}

ModAPI.registerAPI("DungeonCore", {
	add: DangUtil.add,
	addItemToChest: DangUtil.addItemToChest,
	chestAddItem: DangUtil.chestAddItem,
	addEntityToSpawner: addEntityToSpawner
});
