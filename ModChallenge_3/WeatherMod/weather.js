importLib("energylib", "*");

var FURNACE_FUEL_MAP = {
	5: 300,
	6: 100,
	17: 300,
	25: 300,
	47: 300,
	53: 300,
	54: 300,
	58: 300,
	65: 300,
	72: 300,
	85: 300,
	96: 300,
	107: 300,
	134: 300,
	135: 300,
	136: 300,
	146: 300,
	151: 300,
	158: 150,
	162: 300,
	163: 300,
	164: 300,
	173: 16000,
	183: 300,
	184: 300,
	185: 300,
	186: 300,
	187: 300,
	261: 200,
	263: 1600,
	268: 200,
	269: 200,
	270: 200,
	271: 200,
	280: 100,
	281: 200,
	290: 200,
	232: 200,
	333: 1200,
	346: 200,
	369: 2400,
	427: 300,
	428: 300,
	429: 300,
	430: 300,
	431: 300
};

/*registryEnergy*/
var RF = EnergyTypeRegistry.assureEnergyType("RF", 1/4);

var MachineRegistry = {
	machineIDs: {},
	
	isMachine: function(id){
		return this.machineIDs[id];
	},
	
	
	registerPrototype: function(id, Prototype){
		// register ID
		this.machineIDs[id] = true;
		// setup energy value
		if (Prototype.defaultValues){
			Prototype.defaultValues.energy = 0;
		}
		else{
			Prototype.defaultValues = {
				energy: 0
			};
		}
		// copy functions
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		/*
		Prototype.click = function(id, count, data, coords){
			if(id==ItemID.wrench || id==ItemID.electricWrench){
				return true;
			}
		}
		*/
		
		ToolAPI.registerBlockMaterial(id, "stone");
		TileEntity.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, RF);
	},
	
	// standart functions
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.energy;
		this.data.energy += src.getAll(energyNeed);
	}
}

Translation.addTranslation("Weather Deflector", {ru: "Погодный дефдектор"});

IDRegistry.genBlockID("WeatherDeflector");
Block.createBlock("WeatherDeflector", [
	{name: "Weather Deflector", texture: [["WDEF", 1], ["WDEF", 1], ["WDEF", 0]], inCreative: true}
]);

//Gui PLAYERdetector
var guiWhDet = new UI.StandartWindow({
	standart: {
		header: {text: 
                          {text: "Weather Deflector"}
},
		inventory: {
                         standart: true
},
		background: {
                         standart: true
}
	},
	
	drawing: [
	{type: "bitmap", x: 450, y: 135, bitmap: "fire_background", scale: 3.2},
	],
	
	elements: {
		"burningScale": {type: "scale", x: 450, y: 135, direction: 1, value: 0.5, bitmap: "tigel_scale", scale: 3.2},
		"slotFuel": {type: "slot", x: 441, y: 180},
		
		"button": {type: "button", x: 441, y: 245, bitmap: "button_slot",scale: 3.2,
		clicker: {
			onClick: function(container, tileEntity){
				tileEntity.data.mode = (tileEntity.data.mode + 1) % 4;
}}}

   }
	
});

//Registry
MachineRegistry.registerPrototype(BlockID.WeatherDeflector, {

    tick: function () {
var content = this.container.getGuiContent();

		if(content){
			content.elements.button.bitmap = "deflector_" + this.data.mode;
		}
		
		var energyStorage = this.getEnergyStorage();
		this.data.energy = Math.min(this.data.energy, energyStorage);
	if(this.data.energy >= 3){
		
		var energylol = this.data.energy -= 2;
		if(this.data.mode === 0){
		}
		if(this.data.mode === 1){
		World.setWeather({
         rain: 0,
         thunder: 0
        });
		energylol;
		}
		if(this.data.mode === 2){
		World.setWeather({
         rain: 2,
         thunder: 0
        });
		energylol;
		}
		if(this.data.mode === 3){
		World.setWeather({
         rain: 2,
         thunder: 2
        });
		energylol;
		}
	}
	if(this.data.burn > 0){
			if(this.data.energy < energyStorage){
				this.data.energy = Math.min(this.data.energy + 10, energyStorage);
				this.data.burn--;
			}
		}
		else {
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
		}
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
},

getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = FURNACE_FUEL_MAP[fuelSlot.id];
			if (burn){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				return burn;
			}
			if (LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data) == "lava"){
				var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
				fuelSlot.id = empty.id;
				fuelSlot.data = empty.data;
				return 20000;
			}
		}
		return 0;
	},

    getGuiScreen: function () {
        return guiWhDet;
    },
    
    defaultValues: {
		energy_storage: 5000,
		mode: 0,
		burn: 0,
		burnMax: 0
	},
	
	getEnergyStorage: function(){
		return this.data.energy_storage;
	},
	
	energyTick: MachineRegistry.basicEnergyReceiveFunc
});

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: BlockID.spawner, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['b', 49, 0, 'b', 265, 0, 'c', 152, 0]);
});