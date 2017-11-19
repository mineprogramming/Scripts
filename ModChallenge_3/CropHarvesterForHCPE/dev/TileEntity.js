importLib("Harvest_Core", "*");
importLib("energylib", "*");
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

MachineRegistry.register(BlockID.CropHarvester,{
    getEnergyStorage: function () {
        return 2000;
    },
    defaultValues: {
        index:0,
        energyNeed:10,
        speed:0.4,
        range:5
    },
    setDefault:function(){
        this.data.energyNeed = 10;
        this.data.speed = 0.4;
        this.data.range = 5;
    },
    Ework:function(){
        this.data.energy-=this.data.energyNeed
    },
    click:function(){
        if(Entity.getSneaking(Player.get())){
             Game.message("need: "+this.data.energyNeed+", speed: "+this.data.speed+", range: "+this.data.range);
        }      
    },
    tick:function(){
        var energyStorage = this.getEnergyStorage();
        this.container.setScale("energyScale", this.data.energy / energyStorage);
        this.container.setText("textInfo1", parseInt(this.data.energy) + "/");
        this.container.setText("textInfo2", energyStorage);
        
        this.checkUpgares();
        
        if(this.data.energy>this.data.energyNeed){           
            var farmlandCoords = this.findFarmland();
            if (farmlandCoords){              
                var crop = World.getTileEntity(farmlandCoords.x, farmlandCoords.y + 1, farmlandCoords.z);
                if(crop!=null){
                    if(crop.isCrop){
                    var cropAge = crop.data.age;   
                        if(cropAge==2){
                            var pput = crop.data.fruit;
                            crop.fruitCollect(false);
                            var rnd =Random.Int(1,3);
                            //  Debug.m("Random: "+rnd+"Fruit: "+ pput);
                            this.addResult("slot",pput,rnd,0);
                            this.Ework();
                        }
                    }
                }        
            }         
            if(Random.Float(0,2)<this.data.speed){
                this.GrowPlants(); 
                this.plantSeeds();
                this.makeFarmland();
            }       
            this.makeWater();
        }
    },
    checkUpgares:function(){       
        for(var s = 0; s<3; s++){
            var upgrade = this.container.getSlot("upgrage"+s);
            if(upgrade.id==ItemID.upgradeRange){               
                if(upgrade.count<6){
                    var relativeValue = parseInt(5*(1+upgrade.count));
                    var relativeEnergyNeed = parseInt(10*(1+(upgrade.count/10)));
                    if(this.data.range<relativeValue){
                        this.data.range = relativeValue; 
                        this.data.energyNeed = relativeEnergyNeed;
                    }                   
                } 
            }
            if(upgrade.id==ItemID.upgradeSpeed){
                if(upgrade.count<6){
                    var relativeValue
                    if(upgrade.count==1){
                        relativeValue = 0.4*2;
                    }
                    else{
                        relativeValue = 0.4*upgrade.count;
                    }                   
                    var relativeEnergyNeed = parseInt(10*(1+(upgrade.count/10)));
                    if(this.data.speed<relativeValue){
                        this.data.speed = relativeValue;
                        this.data.energyNeed = relativeEnergyNeed;
                    }
                }
            }
            if(upgrade.id==ItemID.upgradePusher){
                var directions = {
                    up: {x: 0, y: 1, z: 0},
                    down: {x: 0, y: -1, z: 0},
                    east: {x: 1, y: 0, z: 0},
                    west: {x: -1, y: 0, z: 0},
                    south: {x: 0, y: 0, z: 1},
                    north: {x: 0, y: 0, z: -1},
                }
                for(var i in directions){
                    var dir = directions[i];
                    var container = World.getContainer(this.x + dir.x, this.y + dir.y, this.z + dir.z);                   
                    if((container!=null)&&World.getBlockID(this.x + dir.x, this.y + dir.y, this.z + dir.z)==54){
                        var size = container.getSize();
                        for(var index = 0; index<size;index++){
                            var slot = container.getSlot(index);
                            
                            var bucket = this.container.getSlot("slotWater");
                            var seed = this.container.getSlot("slotSeed");
                            var bone = this.container.getSlot("slotBone");
                            var hoe = this.container.getSlot("slotHoe");                                   
                            
                            var Hoes = {
                                290:true,
                                291:true,
                                292:true,
                                293:true,
                                294:true
                            };      
                            if(bucket.id==0){
                                if(slot.id==325&&slot.data==8){
                                    this.container.setSlot("slotWater",325,1,8);
                                    container.setSlot(index,0,0,0);
                                }
                            }
                            if(bone.id==0||bone.id==351){
                                if(slot.id==351&&slot.data==15&&slot.count>0){
                                    var countt = bone.count;
                                    if(countt<64){
                                        this.container.setSlot("slotBone",351,countt+1,15);
                                        var ccount = slot.count;
                                        container.setSlot(index,351,ccount-1,15);
                                    }
                                } 
                            }
                            if(hoe.id==0){
                                if(Hoes[slot.id]){                            
                                    this.container.setSlot("slotHoe",slot.id,1,0);
                                    container.setSlot(index,0,0,0);
                                }
                            }
                            if(seed.id==0||slot.id==seed.id){
                                if(CropRegistry.getCropFromSeed(slot.id)!=null){
                                    var countt = seed.count;
                                    var ccount = slot.count;
                                    if(countt<64){
                                        this.container.setSlot("slotSeed",slot.id,countt+1,0);                                
                                        container.setSlot(index,slot.id,ccount-1,15);
                                    }
                                }
                            }                                                          
                        }
                    }
                }                                
            }           
        }
        var some = {
            0:this.container.getSlot("upgrage0"),
            1:this.container.getSlot("upgrage1"),
            2:this.container.getSlot("upgrage2"),
        };
        if(some[0].id==0&&some[1].id==0&&some[2].id==0){
            this.setDefault();
        }
    },
    makeWater:function(){
        var under = World.getBlockID(this.x,this.y-1,this.z);
        var uncorrect = {
            2:true,
            3:true,
            110:true,
            198:true,
            243:true 
        };
        if(uncorrect[under]){
            var WaterSlot = this.container.getSlot("slotWater");
            if(WaterSlot.id==325&&WaterSlot.data==8&&WaterSlot.count>0){
                World.setBlock(this.x,this.y-1,this.z,8,0);
                this.container.setSlot("slotWater",325,1,0);  
                this.container.validateAll();   
                this.Ework();
            }
        }
    },
    makeFarmland:function(){
        var RANGE = this.data.range;
        var pos = this.data.index % (RANGE * RANGE);
        var x = this.x - parseInt(RANGE / 2) + pos % RANGE;
        var z = this.z - parseInt(RANGE / 2) + parseInt(pos / RANGE);
        
        var dirt = {
            2:true,
            3:true,
            110:true,
            198:true,
            243:true            
        };
        
        this.data.index++;
        
        for (var y = this.y - 3; y < this.y + 4; y++){
            var Hoe = this.container.getSlot("slotHoe");
            var Hoes = {
                290:true,
                291:true,
                292:true,
                293:true,
                294:true
            };          
            if(Hoes[Hoe.id]){ 
                if(Hoe.data<Item.getMaxDamage(Hoe.id)){
                    if (dirt[World.getBlockID(x, y, z)]&&World.getBlockID(x, y+1, z)==0){
                        World.setBlock(x, y, z,60,0);
                        Hoe.data++;
                        this.Ework();
                    }
                }
                else {
                    this.container.setSlot("slotHoe",0,0,0);
                }          
            }           
        }
    },
    plantSeeds :function(){
        var farmlandCoords = this.findFarmland();
        if (farmlandCoords){          
            var cropRelative = World.getBlockID(farmlandCoords.x, farmlandCoords.y + 1, farmlandCoords.z);
            if(cropRelative==0){
                var seed = this.container.getSlot("slotSeed");
                if(seed.count>0){
                    if(CropRegistry.getCropFromSeed(seed.id)!=null){
                       var cropID = CropRegistry.getCropFromSeed(seed.id);
                        World.setBlock(farmlandCoords.x,farmlandCoords.y+1,farmlandCoords.z,cropID ,0);
                        World.addTileEntity(farmlandCoords.x, farmlandCoords.y+1, farmlandCoords.z);
                        seed.count--; 
                        this.container.validateAll();
                        this.Ework();
                    }
                }                
            }        
        }
    },
    GrowPlants:function(){
        var farmlandCoords = this.findFarmland();
        if (farmlandCoords){          
            var crop = World.getTileEntity(farmlandCoords.x, farmlandCoords.y + 1, farmlandCoords.z);
            if(crop!=null){
                if(crop.isCrop){
                var cropAge = crop.data.age;   
                if(cropAge<2){
                        var slot = this.container.getSlot("slotBone");
                        if(slot.id==351&&slot.data==15&&slot.count>0){                           
                            slot.count--;
                            crop.growCrop();
                            this.container.validateAll();
                            this.Ework();
                            //Debug.m("GROW"+slot);                            
                        }
                    }
                }
            }        
        }
    },
    findFarmland: function(){
        var RANGE = this.data.range;
        var pos = this.data.index % (RANGE * RANGE);
        var x = this.x - parseInt(RANGE / 2) + pos % RANGE;
        var z = this.z - parseInt(RANGE / 2) + parseInt(pos / RANGE);
        this.data.index++;
        
        for (var y = this.y - 3; y < this.y + 4; y++){
            if (World.getBlockID(x, y, z) == 60){
                return {
                    x: x,
                    y: y,
                    z: z
                };
            }
        }
        return null;
    },
    addResult: function(area, id, count, data){
        for (var i = 0; i < 18; i++){
            var slot = this.container.getSlot(area + i);
            if (slot.id == id && slot.data == data || slot.id == 0){
                var add = Math.min(64 - slot.count, count);
                slot.count += add;
                slot.id = id;
                slot.data = data;
                count -= add;
                if (count == 0){
                    break;
                }
            }
        }
        if (count > 0){
            World.drop(this.x + .5, this.y + 1, this.z + .5, id, count, data);
        }
    },  
    getGuiScreen: function () {
        return harvesterGui;
    }
});



