//Harvest Core by Nikolay Savenko
//API level: 1.1
var Random = {
	//Этот модуль облегчает генерацию случайных чисел
	Float:function(min,max){
		var result = ((Math.random()*max)+min);
		return result;
	},
	Int:function(min,max){
		var result = Math.round((Math.random()*max)+min);
		return result;
	}
};

var HarvestConfig = {
	//Этот модуль необходим для подключения переменных мода к библиотеке
	values:{
			StandartAge:0,
			ageSpeed:0.0001
	},
	debug:{
		CropPROTO:false
	},
	set:{
		value:{
			standartAge:function(value){
				this.values.StandartAge = value;
			},
			standartAgeSpeed:function(value){
				this.values.ageSpeed = value;
			}
		}
	}
};

var Harvest = {
	//Этот модуль является сборником полезных методов для удобной работы с растениями и деревьями
	dropWithoutDirt:{},
	registerDroppingBlock:function(iiid){
		Callback.addCallback("DestroyBlock", function(coords, block, player){
			if(World.getBlockID(coords.x,coords.y+1,coords.z)==iiid){
				World.destroyBlock(coords.x, coords.y+1, coords.z,true);
				World.removeTileEntity(coords.x, coords.y+1, coords.z);
			}
		});
		this.dropWithoutDirt[iiid] = true;
	},
	registerDrop:function(bl,itm){
		Block.registerDropFunction(bl, function(coords, blockID, blockData, level){
			return[[ itm,Random.Int(1,3),0 ]];
		});
	},
	registerDestroy:function(bl,itm){
		Block.registerDropFunction(bl, function(coords, blockID, blockData, level){
			return[[ itm, 1,0 ]];
		});
	},
	dropFruit:function(id,x,y,z){
	 Entity.setVelocity(
		World.drop(	x ,	y,	z ,	id, Random.Int(1,3), 0),
			Random.Float(-0.2,0.2),
			Random.Float(-0.2,0.2),
			Random.Float(-0.2,0.2)
		);
	},
	dropPlant:function(id,x,y,z){
	 	Entity.setVelocity(
			World.drop(	x ,	y,	z ,	id, 1 , 0),
				Random.Float(-0.2,0.2),
				Random.Float(-0.2,0.2),
				Random.Float(-0.2,0.2)
		);
	},
	checkFruit:function(x,y,z,block){   
		if((World.getBlockID(x,y-1,z)==0)&&(World.getBlockID(x-1,y-1,z)==0)&&(World.getBlockID(x+1,y-1,z)==0)&&(World.getBlockID(x,y-1,z-1)==0)&&(World.getBlockID(x,y-1,z+1)==0)){
			World.setBlock(x, y-1, z, block, 0);
			World.addTileEntity(x, y-1, z);
		}
	},
	addTree:function(type,fruit,count,x,y,z){
//Говногод написанный до 1.9.17!
			World.setBlock(x+2, y+2, z, fruit, 0);
			World.setBlock(x-2, y+2, z, fruit, 0);
			World.setBlock(x, y+2, z+2, fruit, 0);
			World.setBlock(x-2, y+2, z-2, fruit, 0);
			World.addTileEntity(x+2, y+2, z);
			World.addTileEntity(x-2, y+2, z);
			World.addTileEntity(x, y+2, z+2);
			World.addTileEntity(x, y+2, z-2);
		World.setBlock(x, y+1, z, 17, type);
		World.setBlock(x, y+2, z, 17, type);
		World.setBlock(x, y+3, z, 17, type);
		World.setBlock(x, y+4, z, 17, type);
		World.setBlock(x, y+5, z, 17, type);
		World.setBlock(x, y+5, z+1,18 , type);
		World.setBlock(x, y+5, z-1, 18, type);
		World.setBlock(x, y+4, z-2, 18, type);
		World.setBlock(x, y+4, z+2, 18, type);
		World.setBlock(x-2, y+4, z, 18, type);
		World.setBlock(x+2, y+4, z, 18, type);
		World.setBlock(x, y+3, z-1, 18, type);
		World.setBlock(x, y+3, z+1, 18, type);
		World.setBlock(x, y+4, z-1, 18, type);
		World.setBlock(x, y+4, z+1, 18, type);				
		World.setBlock(x+2, y+3, z, 18, type);
		World.setBlock(x-2, y+3, z, 18, type);
		World.setBlock(x, y+3, z+2, 18, type);
		World.setBlock(x, y+3, z-2, 18, type);		
		World.setBlock(x+1, y+3, z, 18, type);
		World.setBlock(x-1, y+3, z, 18, type);
		World.setBlock(x+1, y+3, z+1, 18, type);
		World.setBlock(x-1, y+3, z-1, 18, type);
		World.setBlock(x+1, y+3, z+1, 18, type);
		World.setBlock(x+1, y+3, z-1, 18, type);
		World.setBlock(x-1, y+3, z+1, 18, type);
		World.setBlock(x-1, y+3, z-1, 18, type);
		World.setBlock(x+2, y+3, z+1, 18, type);
		World.setBlock(x+2, y+3, z-1, 18, type);
		World.setBlock(x-2, y+3, z+1, 18, type);
		World.setBlock(x-2, y+3, z-1, 18, type);
		World.setBlock(x+1, y+3, z+2, 18, type);
		World.setBlock(x+1, y+3, z-2, 18, type);
		World.setBlock(x-1, y+3, z+2, 18, type);
		World.setBlock(x-1, y+3, z-2, 18, 0);
		World.setBlock(x+2, y+3, z+2, 18, type);
		World.setBlock(x+2, y+3, z-2, 18, type);
		World.setBlock(x-2, y+3, z+2, 18, type);
		World.setBlock(x-2, y+3, z-2, 18, type);
		World.setBlock(x+1, y+4, z, 18, type);
		World.setBlock(x-1, y+4, z, 18, type);
		World.setBlock(x+1, y+4, z+1, 18, type);
		World.setBlock(x-1, y+4, z-1, 18, type);
		World.setBlock(x+1, y+4, z+1, 18, type);
		World.setBlock(x+1, y+4, z-1, 18, type);
		World.setBlock(x-1, y+4, z+1, 18, type);
		World.setBlock(x-1, y+4, z-1, 18, type);
		World.setBlock(x+2, y+4, z+1, 18, type);
		World.setBlock(x+2, y+4, z-1, 18, type);
		World.setBlock(x-2, y+4, z+1, 18, type);
		World.setBlock(x-2, y+4, z-1, 18, type);
		World.setBlock(x+1, y+4, z+2, 18, type);
		World.setBlock(x+1, y+4, z-2, 18, type);
		World.setBlock(x-1, y+4, z+2, 18, type);
		World.setBlock(x-1, y+4, z-2, 18, type);
		World.setBlock(x+2, y+4, z+2, 18, type);
		World.setBlock(x+2, y+4, z-2, 18, type);
		World.setBlock(x-2, y+4, z+2, 18, type);
		World.setBlock(x-2, y+4, z-2, 18, type);
		World.setBlock(x+1, y+5, z, 18, type);
		World.setBlock(x-1, y+5, z, 18, type);
		World.setBlock(x+1, y+5, z+1, 18, type);
		World.setBlock(x-1, y+5, z-1, 18, type);
		World.setBlock(x+1, y+5, z+1, 18, type);
		World.setBlock(x+1, y+5, z-1, 18, type);
		World.setBlock(x-1, y+5, z+1, 18, type);
		World.setBlock(x-1, y+5, z-1, 18, type);
		World.setBlock(x, y+6, z, 18, type);
	}
};

var BLOCK_TYPE_CROP = Block.createSpecialType({
	base: 59,
	opaque: false,
	rendertype: 6,
	lightopacity: 0,
	destroytime: 0
});

var BLOCK_TYPE_PLANT = Block.createSpecialType({
	base: 59,
	opaque: false,
	rendertype: 1,
	lightopacity: 0
});

var TREE_SAPLING_GROUND_TILES = {
	2: true,
	3: true,
	60: true
};

var CropRegistry = {
	cropsIDs:{},
	cropsDrop:{},
	seedCrops:{},
	cropSeed:{},
	registerWithID:function(blockID,name,texture,seed){		
		IDRegistry.genBlockID(blockID); 
		Block.createBlock(blockID, [
		{name: name, texture: [["empty", 0],["empty", 0],[texture, 0]], inCreative: false},
		{name: name, texture: [["empty", 0],["empty", 0],[texture, 1]], inCreative: false},
		{name: name, texture: [["empty", 0],["empty", 0],[texture, 2]], inCreative: false}
		],BLOCK_TYPE_CROP);
		Harvest.registerDestroy(blockID,seed);
		this.cropsIDs[blockID] = true;		
	},
	fruitPush:function(bl,fruit){
		this.cropsDrop[bl] = fruit;
	},
	registerSeed:function(seed,bblock){
		Item.registerUseFunctionForID(seed, function(coords, item, block){
			if(block.id == 60){
				World.setBlock(coords.x,coords.y+1,coords.z,bblock ,0);
				World.addTileEntity(coords.x, coords.y+1, coords.z);
				Player.setCarriedItem(seed, item.count - 1, 0);
			}
		});
		this.seedCrops[seed]=bblock;
		this.cropSeed[bblock]=seed;
	},
	getCropFromSeed:function(seedID){
		return this.seedCrops[seedID];
	},
	getSeedFromCrop:function(CropID){
		return this.cropSeed[CropID];
	},
	isCrop:function(idd){
		return this.cropsIDs[idd];
	}
};

var cropPROTO = {
	isCrop:true,
	defaultValues: {
		age: 0,
		fruit:280,
		seed:0
	},	 
	
	growCrop:function(){
		this.data.age++;
		World.setBlock(this.x,this.y,this.z,World.getBlockID(this.x,this.y,this.z),this.data.age);
		if(HarvestConfig.debug.CropPROTO){
			Debug.m("age++ and now are "+this.data.age);
		}
	}, 
	fruitCollect:function(drop){
		this.data.age=0;
		if(drop){
			Harvest.dropFruit(this.data.fruit,this.x,this.y,this.z);	
		}
		World.setBlock(this.x,this.y,this.z,World.getBlockID(this.x,this.y,this.z),this.data.age);
		if(HarvestConfig.debug.CropPROTO){
			Debug.m("Fruit collected: "+this.data.fruit);
		}
	},
	destroyCrop:function(){
		World.destroyBlock(this.x, this.y, this.z,true);
		World.removeTileEntity(this.x, this.y, this.z);
		if(HarvestConfig.debug.CropPROTO){
			Debug.m("Destroy! "+World.getBlockID(this.x,this.y-1,this.z)+" tick : "+World.getThreadTime());
		}
	},
	checkFarmland:function(){
		if(World.getBlockID(this.x,this.y-1,this.z)==0){
			//this.destroyCrop();
		}
		else{
			return true;
		}
	},
	
	tick:function(){
		if(this.checkFarmland()){
			var number = HarvestConfig.values.ageSpeed;
			if(this.data.age<2){  
				if(Math.random()<number){
					this.growCrop();
				}
			}
		}
	},
	created:function(){
		this.data.fruit = CropRegistry.cropsDrop[World.getBlockID(this.x,this.y,this.z)];
		this.data.seed = CropRegistry.getSeedFromCrop(World.getBlockID(this.x,this.y,this.z));
		this.data.age = HarvestConfig.values.StandartAge;
	},
	click: function(id, count, data, coords){
		this.checkFarmland();
		if((id==351)&&(data==15)){
			if(this.data.age==2){
				this.fruitCollect(true);
			}
			else{
				this.growCrop();
			}
		}
		else{
			if(this.data.age==2){
				this.fruitCollect(true);
			}
		}
	} 	
};

var fruitPROTO = {
	defaultValues: {
		age: 0,
		fruit:280
	},	 	
	tick:function(){
		if(World.getBlockID(this.x,this.y+1,this.z)!=18){
			World.destroyBlock(this.x, this.y, this.z, false);
		}	
		var number = HarvestConfig.values.ageSpeed;
		if((Math.random()<number)&&(this.data.age<2)){   
			this.data.age++;
			World.setBlock(this.x,this.y,this.z,World.getBlockID(this.x,this.y,this.z),this.data.age);
		}	
	},
	created:function(){
		this.data.fruit = CropRegistry.cropsDrop[World.getBlockID(this.x,this.y,this.z)];
		this.data.age = HarvestConfig.values.StandartAge;
	},
	click: function(id, count, data, coords){
		if((id==351)&&(data==15)){
			if(this.data.age==2){
				this.data.age=0;
				Harvest.dropFruit(this.data.fruit,this.x,this.y,this.z);	
				World.setBlock(this.x,this.y,this.z,World.getBlockID(this.x,this.y,this.z),this.data.age);
			}
			else{
				this.data.age++;
				World.setBlock(this.x,this.y,this.z,World.getBlockID(this.x,this.y,this.z),this.data.age);
			}
		}
		else{
			if(this.data.age==2){
				this.data.age=0;
				Harvest.dropFruit(this.data.fruit,this.x,this.y,this.z);
				World.setBlock(this.x,this.y,this.z,World.getBlockID(this.x,this.y,this.z),this.data.age);
			}
		}
	} 	
};

var saplingPROTO = {
	tick: function(){
				if (!TREE_SAPLING_GROUND_TILES[World.getBlockID(this.x, this.y - 1, this.z)]){
					World.destroyBlock(this.x, this.y, this.z, true);
				}
				var nnumber = HarvestConfig.values.ageSpeed;
				if (Math.random() < nnumber){
					World.destroyBlock(this.x, this.y, this.z, false);
					Harvest.addTree(0,BlockID.appleBlock,4,this.x,this.y-1,this.z);
				}
			},	
			click: function(id, count, data){
				if (id == 351 && data == 15){
					if(Math.random()<0.6){
						Harvest.addTree(0,BlockID.appleBlock,4,this.x,this.y-1,this.z);
					}
					Player.setCarriedItem(id, count - 1, data);
				}
			}
};

var gardenPROTO = {
	defaultValues: {
		drop:280
	},
	created:function(){
		this.data.drop = CropRegistry.cropsDrop[World.getBlockID(this.x,this.y,this.z)];
	},
	fruitCollect:function(){
		Harvest.dropFruit(this.data.fruit,this.x,this.y,this.z);	
		this.destroyCrop();
		//Debug.m("Fruit collected: "+this.data.drop);
	},
	destroyCrop:function(){
		World.destroyBlock(this.x, this.y, this.z,false);
		World.removeTileEntity(this.x, this.y, this.z);
		//Debug.m("Destroy! "+World.getBlockID(this.x,this.y-1,this.z)+" tick : "+World.getThreadTime());
	},
	checkFarmland:function(){
		if(World.getBlockID(this.x,this.y-1,this.z)==0){
			this.destroyCrop();
		}
		else{
			return true;
		}
	},
	click: function(id, count, data, coords){
		this.destroyCrop();
		Harvest.dropPlant(this.data.drop,this.x,this.y,this.z);
	}
};

registerAPIUnit("BLOCK_TYPE_CROP", BLOCK_TYPE_CROP);
registerAPIUnit("BLOCK_TYPE_PLANT", BLOCK_TYPE_PLANT);
registerAPIUnit("TREE_SAPLING_GROUND_TILES", TREE_SAPLING_GROUND_TILES);
registerAPIUnit("Random", Random);
registerAPIUnit("HarvestConfig", HarvestConfig);
registerAPIUnit("Harvest", Harvest);
registerAPIUnit("CropRegistry", CropRegistry);
registerAPIUnit("cropPROTO", cropPROTO);
registerAPIUnit("fruitPROTO", fruitPROTO);
registerAPIUnit("saplingPROTO", saplingPROTO);
registerAPIUnit("gardenPROTO", gardenPROTO);