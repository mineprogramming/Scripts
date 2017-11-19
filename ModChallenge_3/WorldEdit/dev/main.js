IDRegistry.genItemID("worldEditWand");
Translation.addTranslation("Builder's wand", {ru:"Жезл строителя"});
Item.createItem("worldEditWand", "Builder's wand", {name: "wand", meta: 0}, {isTech: false, stack: 1});

function getUpperBlock(x, z){
	var upperLevel = 0;
	var ub = 0;
	for(var y = 0; y < 256; y++){
		if((ub = World.getBlockID(x, y, z)) != 0) upperLevel = y;
	}
	return upperLevel;
}

function checkYLevel(){
	if(Wand.params.firstPosition.y < 0) Wand.params.firstPosition = 0;
	else if(Wand.params.firstPosition.y > 255) Wand.params.firstPosition = 255;

	if(Wand.params.secondPosition.y < 0)Wand.params.secondPosition = 0;
	else if(Wand.params.secondPosition.y > 255) Wand.params.secondPosition = 255;
}

function getSizeSelection(){
	return (Math.abs(Wand.params.firstPosition.x - Wand.params.secondPosition.x) + 1) * (Math.abs(Wand.params.firstPosition.y - Wand.params.secondPosition.y) + 1) * (Math.abs(Wand.params.firstPosition.z - Wand.params.secondPosition.z) + 1);
}

function coordsToObject(x, y, z){
	return {x: x, y: y, z: z};
}

function getChunkCoords(coords){
	return {x: Math.floor(coords.x / 16), z: Math.floor(coords.z / 16)};
}

function displayCommandInfo(context){
	if(context.argsTypes != null) Game.message(context.name + " " + context.argsTypes + " - " + context.description);
	else Game.message(context.name + " - " + context.description);
}

var DIRECTIONS_MAP = {
	north: ["n", "north", "2", coordsToObject(0, 0, -1)],
	south: ["s", "south", "3", coordsToObject(0, 0, 1)],
	east: ["e", "east", "5", coordsToObject(1, 0, 0)],
	west: ["w", "west", "4", coordsToObject(-1, 0, 0)],
	up: ["u", "up", "1", coordsToObject(0, 1, 0)],
	down: ["d", "down", "0", coordsToObject(0, -1, 0)]
}

function getCheckDirection(value){
	value = value.toLowerCase();
	for(var i in DIRECTIONS_MAP){
		for(var k in DIRECTIONS_MAP[i]){
			if(value == DIRECTIONS_MAP[i][k]) return DIRECTIONS_MAP[i][3];
		}
	}
	return null;
}

function addBlocksToSelection(dir, value, sub){
	for(var i in dir){
		if(sub){
			if(dir[i] > 0){
				if(Wand.params.firstPosition[i] > Wand.params.secondPosition[i]) Wand.params.firstPosition[i] -= value;
				else Wand.params.secondPosition[i] -= value;
			}else if(dir[i] < 0){
				if(Wand.params.firstPosition[i] < Wand.params.secondPosition[i]) Wand.params.firstPosition[i] += value;
				else Wand.params.secondPosition[i] += value;
			}
		}else{
			if(dir[i] > 0){
				if(Wand.params.firstPosition[i] > Wand.params.secondPosition[i]) Wand.params.firstPosition[i] += value;
				else Wand.params.secondPosition[i] += value;
			}else if(dir[i] < 0){
				if(Wand.params.firstPosition[i] < Wand.params.secondPosition[i]) Wand.params.firstPosition[i] -= value;
				else Wand.params.secondPosition[i] -= value;
			}
		}
	}
	checkYLevel();
}

//example to adding the command
//{name: "/command", description: "Your description", func: your function()}

var Commands = [
	{name: "//help", description: "Show all commands.", func: function(){
		for(var i in Commands) displayCommandInfo(Commands[i]);
	}},
	//SELECTION
	{name: "//wand", description: "Adding a builder's wand.", func: function(){
		Player.addItemToInventory(ItemID.worldEditWand, 1, 0);
	}},
	{name: "//pos1", description: "Set selection position #1 to the block above the one that you are standing on.", argsTypes: "[x y z]:number", func: function(args){
		if(args.length > 0){
			if(isNaN(parseInt(args[0])) || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))){
				displayCommandInfo(this);
				return;
			}else{
				Wand.params.firstPosition = coordsToObject(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]));
			}
		}else{
			var pos = Player.getPosition();
			Wand.params.firstPosition = coordsToObject(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
		}
		checkYLevel();
		Game.message("Set first position on: " + Wand.params.firstPosition.x + ", " + Wand.params.firstPosition.y + ", " + Wand.params.firstPosition.z + " (" + (Wand.params.secondPosition.y == -1 ? 0 : getSizeSelection()) + ")");
	}},
	{name: "//pos2", description: "Set selection position #2 to the block above the one that you are standing on.", argsTypes: "[x y z]:number", func: function(args){
		if(args.length > 0){
			if(isNaN(parseInt(args[0])) || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))){
				Wand.params.secondPosition = coordsToObject(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]));
			}else{
				displayCommandInfo(this);
				return;
			}
		}else{
			var pos = Player.getPosition();
			Wand.params.secondPosition = coordsToObject(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
		}
		checkYLevel();
		Game.message("Set second position on: " + Wand.params.secondPosition.x + ", " + Wand.params.secondPosition.y + ", " + Wand.params.secondPosition.z + " (" + (Wand.params.firstPosition.y == -1 ? 0 : getSizeSelection()) + ")");
	}},
	{name: "//hpos1", description: "Set selection position #1 to the block that you are looking at. (just click on the block)", func: function(){
		Wand.params.settingPositionState = 1;
	}},
	{name: "//hpos2", description: "Set selection position #2 to the block that you are looking at. (just click on the block)", func: function(){
		Wand.params.settingPositionState = 2;
	}},
	{name: "//chunk", description: "Select the chunk that you are within for your selection.", argsTypes: "[-coords:[\"w\" \"c\"] <x z>:number]", func: function(args){
		if(args.length > 0){
			if(args[0].toLowerCase() == "w" || args[0].toLowerCase() == "c"){
				if(isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))){
					displayCommandInfo(this);
					return;
				}else{
					if(args[0].toLowerCase() == "w"){
						var wc = getChunkCoords(parseInt(args[1]), parseInt(args[2]));
						Wand.params.firstPosition = coordsToObject(wc.x * 16, 0, wc.z * 16);
						Wand.params.secondPosition = coordsToObject(wc.x * 16 + 15, 255, wc.z * 16 + 15);
						Game.message("Selected chunk: " + wc.x + ", " + wc.z);
					}else if(args[0].toLowerCase() == "c"){
						Wand.params.firstPosition = coordsToObject(parseInt(args[1]) * 16, 0, parseInt(args[2]) * 16);
						Wand.params.secondPosition = coordsToObject(parseInt(args[1]) * 16 + 15, 255, parseInt(args[2]) * 16 + 15);
						Game.message("Selected chunk: " + parseInt(args[1]) + ", " + parseInt(args[2]));
					}
				}
			}else{
				displayCommandInfo(this);
				return;
			}
		}else{
			var pc = getChunkCoords(Player.getPosition());
			Wand.params.firstPosition = coordsToObject(pc.x * 16, 0, pc.z * 16);
			Wand.params.secondPosition = coordsToObject(pc.x * 16 + 15, 255, pc.z * 16 + 15);
			Game.message("Selected chunk: " + pc.x + ", " + pc.z);
		}
	}},
	{name: "//expand", description: "Expands the selection in the direction that you are looking or the specified direction (north, east, south, west, up, down).", argsTypes:"<amount>:number [direction]:[\"N\" \"E\" \"S\" \"W\" \"U\" \"D\"] [reverse-amount]:number", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var firstSize = getSizeSelection();
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var amount = parseInt(args[0]);
				if(args.length == 1){
					Game.message("WIP");
				}else if(args.length == 2){
					var dir = getCheckDirection(args[1]);
					if(dir != null){
						addBlocksToSelection(dir, amount, false);
					}else{
						displayCommandInfo(this);
						return;
					}
				}else{
					if(isNaN(parseInt(args[2]))){
						displayCommandInfo(this);
						return;
					}else{
						addBlocksToSelection(dir, amount, false);
						addBlocksToSelection(coordsToObject(dir.x * -1, dir.y * -1, dir.z * -1), args[2], false);
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Expanded on " + Math.abs(firstSize - getSizeSelection()) + " blocks.");
	}},
	{name: "//contract", description: "Contracts the selection in the direction that you are looking or the specified direction (north, east, south, west, up, down).", argsTypes:"<amount>:number [direction]:[\"N\" \"E\" \"S\" \"W\" \"U\" \"D\"] [reverse-amount]:number", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var firstSize = getSizeSelection();
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var amount = parseInt(args[0]);
				if(args.length == 1){
					Game.message("WIP");
				}else if(args.length == 2){
					var dir = getCheckDirection(args[1]);
					if(dir != null){
						addBlocksToSelection(dir, amount, true);
					}else{
						displayCommandInfo(this);
						return;
					}
				}else{
					if(isNaN(parseInt(args[2]))){
						displayCommandInfo(this);
						return;
					}else{
						addBlocksToSelection(dir, amount, true);
						addBlocksToSelection(coordsToObject(dir.x * -1, dir.y * -1, dir.z * -1), args[2], true);
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Contracted on " + Math.abs(firstSize - getSizeSelection()) + " blocks.");
	}},
	{name: "//shift", description: "Moves the selection region. It does not move the selection's contents.", argsTypes:"<amount>:number [direction]:[\"N\" \"E\" \"S\" \"W\" \"U\" \"D\"]", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var amount = parseInt(args[0]);
				if(args.length == 1){
					Game.message("WIP");
				}else{
					var dir = getCheckDirection(args[1]);
					if(dir != null){
						addBlocksToSelection(coordsToObject(dir.x * -1, dir.y * -1, dir.z * -1), amount, true);
						addBlocksToSelection(dir, amount, false);
					}else{
						displayCommandInfo(this);
						return;
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}
		Game.message("Shifted on " + parseInt(args[0]) + " blocks.");
	}},
	{name: "//size", description: "Get the size of selected region.", func: function(){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1) Game.message("Region size equals: 0");
		else Game.message("Region size equals: " + getSizeSelection());
	}},
	{name: "//count", description: "Count the number of blocks in the region.", argsTypes:"[-d] <block>", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		if(args.length > 0){
			var id = 0;
			var data = 0;
			if(args.length == 1){
				if(isNaN(parseInt(args[0]))){
					displayCommandInfo(this);
					return;
				}else{
					var id = parseInt(args[0]);
				}
			}else{
				if(args[0].toLowerCase() == "-d"){
					if(isNaN(parseInt(args[1].split(":")[0])) || isNaN(parseInt(args[1].split(":")[1]))){
						displayCommandInfo(this);
						return;
					}else{
						id = parseInt(args[1].split(":")[0]);
						data = parseInt(args[1].split(":")[1]);
					}
				}else{
					displayCommandInfo(this);
					return;
				}
			}

			var counter = 0;

			for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
				for(var y = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y); y < Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + 1; y++){
					for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
						var block = World.getBlock(x, y, z);
						if(block.id == id && block.data == data) counter++;
					}
				}
			}
			Game.message("Counted: " + counter);
		}else{
			displayCommandInfo(this);
		}
	}},
	{name: "//distr", description: "Get the block distribution in the selection.", argsTypes:"[-d]", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var blocks = [];
		if(args.length > 0){
			if(args[0].toLowerCase() == "-d"){
				for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
					for(var y = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y); y < Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + 1; y++){
						for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
							var block = World.getBlock(x, y, z);
							if(typeof(blocks[block.id + ":" + block.data]) == "undefined") blocks[block.id + ":" + block.data] = 0;
							blocks[block.id + ":" + block.data]++;
						}
					}
				}
			}else{
				displayCommandInfo(this);
				return;
			}
		}else{
			for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
				for(var y = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y); y < Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + 1; y++){
					for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
						var block = World.getBlock(x, y, z);
						if(typeof(blocks[block.id]) == "undefined") blocks[block.id] = 0;
						blocks[block.id]++;
					}
				}
			}
		}

		Game.message("# total blocks: " + blocks.length);

		var size = getSizeSelection();
		for(var i in blocks){
			Game.message(blocks[i] + " (" + Math.round(blocks[i] / size * 100000) / 1000 + "%) #" + i);
		}
	}},
	//REGION OPERATIONS
	{name: "//set", description: "Set all blocks inside the selection region to a specified block.", argsTypes: "<block>", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var count = 0;
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var id = parseInt(args[0]);
				var data = 0;
				if(typeof(args[0].split(":")[1]) != "undefined"){
					if(isNaN(parseInt(args[0].split(":")[1])) || isNaN(parseInt(args[0].split(":")[0]))){
						displayCommandInfo(this);
					}else{
						id = parseInt(args[0].split(":")[0]);
						data = parseInt(args[0].split(":")[1]);
					}
				}

				for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
					for(var y = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y); y < Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + 1; y++){
						for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
							World.setBlock(x, y, z, id, data);
							count++;
						}
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}
		Game.message("Set " + count + " blocks.");
	}},
	{name: "//replace", description: "Replace all non-air blocks inside the region or all blocks of the specified block(s) with another block inside the region.", argsTypes: "[from-block] <to-block>", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var count = 0;
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var id1 = parseInt(args[0]);
				var data1 = 0;

				if(typeof(args[0].split(":")[1]) != "undefined"){
					if(isNaN(parseInt(args[0].split(":")[1])) || isNaN(parseInt(args[0].split(":")[0]))){
						displayCommandInfo(this);
						return;
					}else{
						id1 = parseInt(args[0].split(":")[0]);
						data1 = parseInt(args[0].split(":")[1]);
					}
				}

				if(args.length == 1){
					for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
						for(var y = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y); y < Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + 1; y++){
							for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
								if(World.getBlock(x, y, z).id > 0){
									World.setBlock(x, y, z, id1, data1);
									count++;
								}
							}
						}
					}
				}else{
					if(args.length > 1){
						if(isNaN(parseInt(args[1]))){
							displayCommandInfo(this);
							return;
						}else{
							var id2 = parseInt(args[1]);
							var data2 = 0;

							if(typeof(args[1].split(":")[1]) != "undefined"){
								if(isNaN(parseInt(args[1].split(":")[1])) || isNaN(parseInt(args[1].split(":")[0]))){
									displayCommandInfo(this);
								}else{
									id1 = parseInt(args[1].split(":")[0]);
									data1 = parseInt(args[1].split(":")[1]);
								}
							}

							for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
								for(var y = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y); y < Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + 1; y++){
									for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
										if(World.getBlock(x, y, z).id == id2){
											World.setBlock(x, y, z, id2, data2);
											count++;
										}
									}
								}
							}
						}
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Replaced " + count + " blocks.");
	}},
	{name: "//overlay", description: "Place a block on top of blocks inside the region.", argsTypes: "<block>", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var count = 0;
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var id = parseInt(args[0]);
				var data = 0;

				if(typeof(args[0].split(":")[1]) != "undefined"){
					if(isNaN(parseInt(args[0].split(":")[1])) || isNaN(parseInt(args[0].split(":")[0]))){
						displayCommandInfo(this);
						return;
					}else{
						id = parseInt(args[0].split(":")[0]);
						data = parseInt(args[0].split(":")[1]);
					}
				}

				for(var x = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x); x < Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + 1; x++){
					for(var z = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z); z < Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + 1; z++){
						World.setBlock(x, getUpperBlock(x, z), z, id, data);
						count++;
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Overlaid " + count + " blocks.");
	}},
	{name: "//walls", description: "Build the walls of the region (not including ceiling and floor).", argsTypes: "<block>", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var count = 0;
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var id = parseInt(args[0]);
				var data = 0;

				if(typeof(args[0].split(":")[1]) != "undefined"){
					if(isNaN(parseInt(args[0].split(":")[1])) || isNaN(parseInt(args[0].split(":")[0]))){
						displayCommandInfo(this);
						return;
					}else{
						id = parseInt(args[0].split(":")[0]);
						data = parseInt(args[0].split(":")[1]);
					}
				}

				var minX = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
				var maxX = Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
				var minY = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
				var maxY = Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
				var minZ = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z);
				var maxZ = Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z);

				for(var x = minX; x < maxX + 1; x++){
					for(var y = minY; y < maxY + 1; y++){
						World.setBlock(x, y, minZ, id, data);
						World.setBlock(x, y, maxZ, id, data);
						count += 2;
					}
				}

				for(var z = minZ; z < maxZ + 1; z++){
					for(var y = minY; y < maxY + 1; y++){
						World.setBlock(minX, y, z, id, data);
						World.setBlock(maxX, y, z, id, data);
						count += 2;
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Set " + count + " blocks.");
	}},
	{name: "//outline", description: "Build walls, floor, and ceiling.", argsTypes: "<block>", func: function(args){
		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		var count = 0;
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var id = parseInt(args[0]);
				var data = 0;

				if(typeof(args[0].split(":")[1]) != "undefined"){
					if(isNaN(parseInt(args[0].split(":")[1])) || isNaN(parseInt(args[0].split(":")[0]))){
						displayCommandInfo(this);
						return;
					}else{
						id = parseInt(args[0].split(":")[0]);
						data = parseInt(args[0].split(":")[1]);
					}
				}

				var minX = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
				var maxX = Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
				var minY = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
				var maxY = Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
				var minZ = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z);
				var maxZ = Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z);

				for(var x = minX; x < maxX + 1; x++){
					for(var y = minY; y < maxY + 1; y++){
						World.setBlock(x, y, minZ, id, data);
						World.setBlock(x, y, maxZ, id, data);
						count += 2;
					}
				}

				for(var z = minZ; z < maxZ + 1; z++){
					for(var y = minY; y < maxY + 1; y++){
						World.setBlock(minX, y, z, id, data);
						World.setBlock(maxX, y, z, id, data);
						count += 2;
					}
				}

				for(var z = minZ; z < maxZ + 1; z++){
					for(var x = minX; x < maxX + 1; x++){
						World.setBlock(x, maxY, z, id, data);
						World.setBlock(x, minY, z, id, data);
						count += 2;
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Set " + count + " blocks.");
	}},
	{name: "//move", description: "Move the selection's contents. A block can be specified to fill in the left over area.", argsTypes: "<count>:number [direction]:[\"N\" \"E\" \"S\" \"W\" \"U\" \"D\"] [leave-id]:block", func: function(args){
		var copyToBuffer = function(leaveId, leaveData){
			var minX = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
			var maxX = Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
			var minY = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
			var maxY = Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
			var minZ = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z);
			var maxZ = Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z);
			for(var x = minX; x < maxX + 1; x++){
				Wand.params.regBuffer.push([]);
				for(var y = minY; y < maxY + 1; y++){
					Wand.params.regBuffer[((maxX - minX) - (maxX - x))].push([]);
					for(var z = minY; z < maxY + 1; z++){
						Wand.params.regBuffer[((maxX - minX) - (maxX - x))][((maxY - minY) - (maxY - y))].push(World.getBlock(x, y, z));
						World.setBlock(x, y, z, leaveId, leaveData);
					}
				}
			}
		}

		var pasteFromBuffer = function(ax, ay, az){
			for(var x in Wand.params.regBuffer){
				for(var y in Wand.params.regBuffer[x]){
					for(var z in Wand.params.regBuffer[x][y]){
						World.setBlock(ax + x, ay + y, az + z, Wand.params.regBuffer[x][y][z].id, Wand.params.regBuffer[x][y][z].data);
					}
				}
			}
			Wand.params.regBuffer = [];
		}

		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var amount = parseInt(args[0]);
				if(args.length == 1){
					Game.message("WIP");
				}else if(args.length == 2){
					var dir = getCheckDirection(args[1]);
					if(dir != null){
						copyToBuffer(0, 0);
						addBlocksToSelection(coordsToObject(dir.x * -1, dir.y * -1, dir.z * -1), amount, true);
						addBlocksToSelection(dir, amount, false);
						pasteFromBuffer(Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + (dir.x * amount), Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + (dir.y * amount), Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + (dir.z * amount));
					}else{
						displayCommandInfo(this);
						return;
					}
				}else{
					var id = parseInt(args[0]);
					var data = 0;

					if(typeof(args[0].split(":")[1]) != "undefined"){
						if(isNaN(parseInt(args[0].split(":")[1])) || isNaN(parseInt(args[0].split(":")[0]))){
							displayCommandInfo(this);
							return;
						}else{
							id = parseInt(args[0].split(":")[0]);
							data = parseInt(args[0].split(":")[1]);
						}
					}

					copyToBuffer(id, data);
					addBlocksToSelection(coordsToObject(dir.x * -1, dir.y * -1, dir.z * -1), amount, true);
					addBlocksToSelection(dir, amount, false);
					pasteFromBuffer(Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + (dir.x * amount), Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + (dir.y * amount), Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + (dir.z * amount));
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Set " + parseInt(args[0]) + " blocks.");
	}},
	{name: "//stack", description: "Stacks the selection.", argsTypes: "<count>:number [direction]:[\"N\" \"E\" \"S\" \"W\" \"U\" \"D\"]", func: function(args){
		var copyToBuffer = function(){
			var minX = Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
			var maxX = Math.max(Wand.params.firstPosition.x, Wand.params.secondPosition.x);
			var minY = Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
			var maxY = Math.max(Wand.params.firstPosition.y, Wand.params.secondPosition.y);
			var minZ = Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z);
			var maxZ = Math.max(Wand.params.firstPosition.z, Wand.params.secondPosition.z);
			for(var x = minX; x < maxX + 1; x++){
				Wand.params.regBuffer.push([]);
				for(var y = minY; y < maxY + 1; y++){
					Wand.params.regBuffer[(maxX - minX) - (maxX - x)].push([]);
					for(var z = minY; z < maxY + 1; z++){
						Wand.params.regBuffer[(maxX - minX) - (maxX - x)][(maxY - minY) - (maxY - y)].push(World.getBlock(x, y, z));
						//World.setBlock(x, y, z, leaveId, leaveData);
					}
				}
			}
		}

		var pasteFromBuffer = function(ax, ay, az){
			for(var x in Wand.params.regBuffer){
				for(var y in Wand.params.regBuffer[x]){
					for(var z in Wand.params.regBuffer[x][y]){
						World.setBlock(ax + x, ay + y, az + z, Wand.params.regBuffer[x][y][z].id, Wand.params.regBuffer[x][y][z].data);
					}
				}
			}
			Wand.params.regBuffer = [];
		}

		if(Wand.params.firstPosition.y == -1 || Wand.params.secondPosition.y == -1){
			Game.message("At first select the region!");
			return;
		}
		if(args.length > 0){
			if(isNaN(parseInt(args[0]))){
				displayCommandInfo(this);
				return;
			}else{
				var amount = parseInt(args[0]);
				if(args.length == 1){
					Game.message("WIP");
				}else{
					var dir = getCheckDirection(args[1]);
					if(dir != null){
						copyToBuffer();
						for(var i = 1; i < amount + 1; i++){
							pasteFromBuffer(Math.min(Wand.params.firstPosition.x, Wand.params.secondPosition.x) + (dir.x * i * Math.abs(Wand.params.firstPosition.x - Wand.params.secondPosition.x)) , Math.min(Wand.params.firstPosition.y, Wand.params.secondPosition.y) + (dir.y * i * Math.abs(Wand.params.firstPosition.y - Wand.params.secondPosition.y)), Math.min(Wand.params.firstPosition.z, Wand.params.secondPosition.z) + (dir.z * i * Math.abs(Wand.params.firstPosition.z - Wand.params.secondPosition.z)));
						}
					}else{
						displayCommandInfo(this);
						return;
					}
				}
			}
		}else{
			displayCommandInfo(this);
			return;
		}

		Game.message("Stacked " + parseInt(args[0]) + " times.");
	}}
];

Item.registerUseFunction(ItemID.worldEditWand, function(coords, item, block){
	if(Wand.params.settingPositionState == 0){
		Wand.params.firstPosition = coords;
		Game.message("Set first position on: " + Wand.params.firstPosition.x + ", " + Wand.params.firstPosition.y + ", " + Wand.params.firstPosition.z + " (" + (Wand.params.secondPosition.y == -1 ? 0 : getSizeSelection()) + ")");		
	}
	checkYLevel();
});

var Wand = {
	params: {
		firstPosition: coordsToObject(0, -1, 0),
		secondPosition: coordsToObject(0, -1, 0),
		regBuffer: [],
		buffer: [],
		undoBuffer: [],
		redoBuffer: [],
		settingPositionState: 0
	}
}

Callback.addCallback("NativeCommand", function(command){
	var cs = command.split(" "); //command splitted
	for(var i in Commands){
		if(cs[0] == Commands[i].name){
			Commands[i].func(typeof(cs[1]) != "undefined" ? command.split(cs[0] + " ")[1].split(" ") : []);
			Game.prevent();
		}
	}
});

Callback.addCallback("ItemUse", function(coords, item, block){
	if(Wand.params.settingPositionState == 1){
		Wand.params.firstPosition = coords;
		Game.message("Set first position on: " + Wand.params.firstPosition.x + ", " + Wand.params.firstPosition.y + ", " + Wand.params.firstPosition.z + " (" + (Wand.params.secondPosition.y == -1 ? 0 : getSizeSelection()) + ")");
	}else if(Wand.params.settingPositionState == 2){
		Wand.params.secondPosition = coords;
		Game.message("Set second position on: " + Wand.params.secondPosition.x + ", " + Wand.params.secondPosition.y + ", " + Wand.params.secondPosition.z + " (" + (Wand.params.firstPosition.y == -1 ? 0 : getSizeSelection()) + ")");
	}
	Wand.params.settingPositionState = 0;
});

Callback.addCallback("DestroyBlockStart", function(coords, block, player){
	if(Player.getCarriedItem().id == ItemID.worldEditWand){
		Wand.params.secondPosition = coords;
		Game.message("Set second position on: " + Wand.params.secondPosition.x + ", " + Wand.params.secondPosition.y + ", " + Wand.params.secondPosition.z + " (" + (Wand.params.firstPosition.y == -1 ? 0 : getSizeSelection()) + ")");
		Game.prevent();
	}
});