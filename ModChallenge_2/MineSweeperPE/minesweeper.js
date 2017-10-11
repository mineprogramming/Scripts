var itemFlag, itemMineDetector, itemFieldGenerator, blockms;

function getFreeItem(){
	for(var i = 256; i < 4096; i++)
		if(!Item.isValidItem(i)) return i;
}

function getFreeBlock(){
	for(var i = 1; i < 256; i++)
		if(Item.getName(i, 0) == "tile." + i + ".name") return i;
}

itemFlag = getFreeItem();
ModPE.setItem(itemFlag, "flag", 0, "Flag", 1);

itemMineDetector = getFreeItem();
ModPE.setItem(itemMineDetector, "mineDetector", 0, "Mine detector", 1);

itemFieldGenerator = getFreeItem();
ModPE.setItem(itemFieldGenerator, "fieldGenerator", 0, "Field generator", 16);

Player.addItemCreativeInv(itemFlag, 1, 0);
Player.addItemCreativeInv(itemMineDetector, 64, 0);
Player.addItemCreativeInv(itemFieldGenerator, 64, 0);

Item.setCategory(itemFlag, ItemCategory.TOOL);
Item.setCategory(itemMineDetector, ItemCategory.TOOL);
Item.setCategory(itemFieldGenerator, ItemCategory.TOOL);

blockms = getFreeBlock();

Block.defineBlock(blockms, "ms", [["mine", 0],["mine", 0],["mine", 0],["mine", 0],["mine", 0],["mine", 0],
["mine", 1],["mine", 1],["mine", 1],["mine", 1],["mine", 1],["mine", 1],
["mine", 2],["mine", 2],["mine", 2],["mine", 2],["mine", 2],["mine", 2],
["mine", 3],["mine", 3],["mine", 3],["mine", 3],["mine", 3],["mine", 3],
["mine", 4],["mine", 4],["mine", 4],["mine", 4],["mine", 4],["mine", 4],
["mine", 5],["mine", 5],["mine", 5],["mine", 5],["mine", 5],["mine", 5],
["mine", 6],["mine", 6],["mine", 6],["mine", 6],["mine", 6],["mine", 6],
["mine", 7],["mine", 7],["mine", 7],["mine", 7],["mine", 7],["mine", 7],
["mine", 8],["mine", 8],["mine", 8],["mine", 8],["mine", 8],["mine", 8],
["mine", 9],["mine", 9],["mine", 9],["mine", 9],["mine", 9],["mine", 9],
["mine", 10],["mine", 10],["mine", 10],["mine", 10],["mine", 10],["mine", 10],
["mine", 11],["mine", 11],["mine", 11],["mine", 11],["mine", 11],["mine", 11],
["mine", 12],["mine", 12],["mine", 12],["mine", 12],["mine", 12],["mine", 12],
["mine", 13],["mine", 13],["mine", 13],["mine", 13],["mine", 13],["mine", 13]], 1, false);

var minefields = [];

var d = 3;
var lcx, lcz;
var chunksLoaded = {};

var worldSeed;

function to16(num, maxPow){
	if(num < 0) return (Math.pow(16, maxPow) + num).toString(16);
	return new Array(maxPow - num.toString(16).length + 1).join("0").concat(num.toString(16));
}

function from16(num){
	if(parseInt(num, 16) > Math.pow(16, num.length) / 2 - 1) return parseInt(num, 16) - Math.pow(16, num.length);
	return parseInt(num, 16);
}

function toHex(arr){
	var pat = [5, 2, 5, 1, 1];
	var str = new String();
	
	for(var i in arr) str += to16(arr[i], pat[i]);
	
	var str2 = new String();
	
	for(var i = 0; i < str.length; i+=2) str2 += String.fromCharCode(parseInt(str[i] + str[i + 1], 16));
	return str2;
}

function fromHex(str){
	var pat = [5, 2, 5, 1, 1];
	
	var arr = [];
	
	var str2 = new String();
	for(var i = 0; i < str.length; i++){
		if(str[i].toString(16) < 16) str2 += "0" + str[i].toString(16);
		else str2 += str[i].toString(16);
	}
	
	var c = 0;
	for(var i in pat){
		arr.push(str2.splice(c, pat[i]));
		c += pat[i];
	}
	
	return arr;
}

var getWorldSeed = function(){
	var worldsPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftWorlds/";
	var leveldat = worldsPath + Level.getWorldDir() + "/level.dat";

	if(!java.io.File(leveldat).exists()){
		return [false, 0];
	}

	var fin = new java.io.FileInputStream(leveldat);
	var nechs = [];
	var startSeed = 0;
	var seed = "";
	var str = "";
	var ch;

	while((ch = fin.read()) != -1){
		nechs.push(ch);
		str += String.fromCharCode(ch);
	}

	startSeed = str.split("RandomSeed")[0].length + 10;

	for(var i = 3; i >= 0; i--){
		if(nechs[startSeed + i] < 16){
			seed += "0" + nechs[startSeed + i].toString(16) + "";
		}else{
			seed += nechs[startSeed + i].toString(16) + "";
		}
	}

	var endSeed = parseInt(seed, 16);

	if(endSeed>(Math.pow(16, 8) / 2 - 1)){
		return [true, endSeed - Math.pow(16 ,8)];
	}

	return [true, endSeed];
}

var generate = function(cx, cz, ratio, seed){
	var generateRoom = function(w, h, b, d, l){
		for(var y = 0; y < 4; y++){
			Level.setTile(cx * 16 - 1, l + y, cz * 16 - 1, b, d);
			Level.setTile(cx * 16 + w + 1, l + y, cz * 16 - 1, b, d);
			Level.setTile(cx * 16 - 1, l + y, cz * 16 + h + 1, b, d);
			Level.setTile(cx * 16 + w + 1, l + y, cz * 16 + h + 1, b, d);
		}
		
		for(var x = -1; x <= w + 1; x++){
			for(var z = -1; z <= h + 1; z++){
				Level.setTile(cx * 16 + x, l + 4, cz * 16 + z, b, d);
			}
		}
	}
	
	var getUpperBlock = function(x, z){
		var upperLevel = 0;
		var ub = 0;
		for(var y = 0; y < 256; y++){
			if((ub = Level.getTile(x, y, z)) != 0) upperLevel = y;
		}
		
		if(ub == 8 || ub == 9 || ub == 10 || ub == 11) return -1;
		return upperLevel;
	}

	var random = new java.util.Random((seed + cx * cz + cx + cz) * 1337);
	if(random.nextFloat() <= ratio){
		var ub = getUpperBlock(cx * 16, cz * 16);
		if(ub == -1) return;
		
		var rWidth = random.nextInt(16 - 10) + 10;
		var rHeight = random.nextInt(16 - 10) + 10;
		var rRatio = random.nextFloat() * (0.25 - 0.1) + 0.1;
		minefields.push(new MineSweeperMain(cx * 16, ub, cz * 16, rWidth, rHeight, rRatio, rRatio >= 0.25 ? true : false));
		
		var mf = minefields[minefields.length - 1];
		mf.generateField();
		mf.generateReward();
		
		var df = mf.difficulty;
		if(df == "easy"){
			generateRoom(rWidth, rHeight, 5, 0, ub);
		}else if(df == "medium"){
			generateRoom(rWidth, rHeight, 48, 0, ub);
		}else if(df == "hard"){
			generateRoom(rWidth, rHeight, 98, 0, ub);
		}else if(df == "hardcore"){
			generateRoom(rWidth, rHeight, 20, 0, ub);
		}
	}
}

var MineSweeperMain = function(x, y, z, w, h, r, hard){
	var FIELD = 9;
	var MINE = 11;
	var FLAG = 10;
	var FAILED_MINE = 12;
	var NOT_MINE = 13;

	var DIFFICULTY = {
		EASY : 0.1,
		MEDIUM : 0.15,
		HARD : 0.2,
	}

	this.difficulty = "easy";
	this.hardcore = hard;
	
	var Tile = function(m){
		this.flagged = false;
		this.opened = false;
		this.mine = m;
		this.count = 0;
	}
	
	this.isGameOvered = false;
	this.position = {x: x, y: y, z: z};
	this.config = {width: w, height: h, ratio: r};
	
	r = r > 1 / 3 ? 1 / 3 : r;
	
	var tiles = [];
	var reward = [];

	var countOfMines = 0;

	var randomM = function(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	var dropReward = function(){
		var dx = x + w / 2 ;
		var dy = y + 1;
		var dz = z + h / 2 ;

		for(var i = 0; i < reward.length; i++){
			Level.dropItem(dx, dy, dz, 0.5, reward[i][0], reward[i][1]);
		}
	}

	var checkWinnable = function(){
		var countOfOpened = 0;
		for(var x = 0; x < w; x++){
			for(var y = 0; y < h; y++){
				if(tiles[x][y].opened) countOfOpened++;
			}	
		}

		if(w * h - countOfOpened == countOfMines) return true;
	}

	var gameOver = function(){
		for(var dx = 0; dx < w; dx++){
			for(var dy = 0; dy < h; dy++){
				var tile = tiles[dx][dy];
				var block = tile.mine ? ( tile.flagged ? FLAG : MINE ) : ( tile.flagged ? NOT_MINE : tile.count );
				Level.setTile(x + dx, y, z + dy, blockms, block);
			}
		}
		Entity.setHealth(Level.spawnMob(x + w / 2, y + 1, z + h / 2, 32, "mob/zombie.png"), 100);
		isGameOvered = true;
	}	

	this.generateReward = function(){
		if(this.hardcore){
			this.difficulty = "hardcore";
			reward.push([265, 64], [331, 64], [266, randomM(50, 64)], [264, randomM(32, 48)], [388, randomM(16, 32)], [348, 64]);
			return;
		}
		if(r >= DIFFICULTY.EASY && r < DIFFICULTY.MEDIUM){
			reward.push([265, randomM(10, 15)], [331, randomM(30, 40)]);
			this.difficulty = "easy";
		}else if(r >= DIFFICULTY.MEDIUM && r < DIFFICULTY.HARD){
			reward.push([265, randomM(30, 40)], [331, randomM(50, 64)], [266, randomM(15, 25)], [348, randomM(16, 32)]);
			this.difficulty = "medium";
		}else if(r >= DIFFICULTY.HARD){
			reward.push([265, randomM(50, 64)], [331, 64], [266, randomM(30, 50)], [264, randomM(15, 25)], [388, randomM(1, 4)], [348, randomM(32, 64)]);
			this.difficulty = "hard";
		}
	}
	
	this.generateField = function(){
		//generating mines and field
		for(var dx = 0; dx < w; dx++){
			tiles[dx] = [];
			for(var dy = 0; dy < h; dy++){
				Level.setTile(this.position.x + dx, this.position.y, this.position.z + dy, blockms, FIELD);
				if(Math.random() <= r){
					tiles[dx].push(new Tile(true));
					countOfMines++;
				}else{
					tiles[dx].push(new Tile(false));
				}
			}
		}
		
		//generating numbers
		for(var dx = 0; dx < w; dx++){
			for(var dy = 0; dy < h; dy++){
				if(!tiles[dx][dy].mine){
					var count = 0;
					for(var mx = -1; mx < 2; mx++){
						for(var my = -1; my < 2; my++){
							if(dx + mx >= 0 && dx + mx < w && dy + my >= 0 && dy + my < h){
								if(tiles[dx + mx][dy + my].mine) count++;
							}
						}
					}
					tiles[dx][dy].count = count;
				}
			}
		}
	}

	this.destroyField = function(){
		for(var x = 0; x < w; x++){
			for(var y = 0; y < h; y++){
				Level.setTile(this.position.x + x, this.position.y, this.position.z + y, 0, 0);
			}
		}
	}
				
	this.openTile = function(x, y){
		if(this.isGameOvered) return;
		if(x < 0 || x > w - 1 || y < 0 || y > h - 1) return;
		if(tiles[x][y].opened || tiles[x][y].flagged) return;
		tiles[x][y].opened = true;
		if(tiles[x][y].mine){
			gameOver();
			this.isGameOvered = true;
			Level.setTile(this.position.x + x, this.position.y, this.position.z + y, blockms, FAILED_MINE);
			return;
		}

		Level.setTile(this.position.x + x, this.position.y, this.position.z + y, blockms, tiles[x][y].count);

		if(checkWinnable()){
			gameOver();
			this.isGameOvered = true;
			dropReward();
			return;
		}
		
		if(tiles[x][y].count == 0){
			for(var dx = -1; dx < 2; dx++)
				for(var dy = -1; dy < 2; dy++) this.openTile(x + dx, y + dy);
		}
	}
	
	this.checkMine = function(x, y){
		if(tiles[x][y].opened) return;
		if(tiles[x][y].mine){
			ModPE.showTipMessage(ChatColor.RED + "Mine has been found");
			return;
		}
		
		ModPE.showTipMessage(ChatColor.YELLOW + "Mine not found");
	}
	
	this.setFlag = function(x, y){
		if(tiles[x][y].opened) return;
		tiles[x][y].flagged = !tiles[x][y].flagged;
		if(tiles[x][y].flagged){
			Level.setTile(this.position.x + x, this.position.y, this.position.z + y, blockms, FLAG);
		}else{
			Level.setTile(this.position.x + x, this.position.y, this.position.z + y, blockms, FIELD);
		}
	}
}

function useItem(x, y, z, id){
	if(id == itemFieldGenerator){
		minefields.push(new MineSweeperMain(x, y + 1, z, 10, 15, 1/18, false));
		minefields[minefields.length - 1].generateField();
		minefields[minefields.length - 1].generateReward();
		if(Level.getGameMode() == 0) Entity.setCarriedItem(getPlayerEnt(), itemFieldGenerator, Player.getCarriedItemCount() - 1, 0);
	}
	
	if(minefields != null){
		for(var i = 0; i < minefields.length; i++){
			var mx = minefields[i].position.x;
			var mz = minefields[i].position.z;
			if(x >= mx && x < mx + minefields[i].config.width && y == minefields[i].position.y && z >= mz && z < mz + minefields[i].config.height){
				if(id == itemFlag){
					minefields[i].setFlag(x - mx, z - mz);
				}else if(id == itemMineDetector){
					minefields[i].checkMine(x - mx, z - mz);
				}else{
					minefields[i].openTile(x - mx, z - mz);
				}
			}
		}
	}
}
var load = false;
var newL = false;
var time = 0;
var t2 = 19;
function modTick(){
	time++;
	if(time == 20 * 10){
		time = 0;
		for(var i = 0; i < minefields.length; i++){
			if(minefields[i].isGameOvered){
				minefields[i].destroyField();
				minefields.splice(i, 1);
			}
		}
	}
	
	if(newL) t2++;
	if(newL && t2 >= 20){
		var s = getWorldSeed();
		if(s[0]){
			worldSeed = s[1];
			load = true;
			newL = false;
		}else{
			t2 = 0;
		}
	}
	
	if(load){
	
	var cx = Math.floor(getPlayerX() / 16);
	var cz = Math.floor(getPlayerZ() / 16);
	
	if(cx != lcx || cz != lcz) chunkChanged(cx, cz);
	
	lcx = cx;
	lcz = cz;
	
	}
}

function newLevel(){
	newL = true;
	clientMessage("MineSweeperPE mod created by MegaLoogin");
}

function chunkChanged(cx, cz){
	var count = 0;
	for(var dx = -d; dx <= d; dx++){
		for(var dz = -d; dz <= d; dz++){
			if(Math.sqrt(dx * dx + dz * dz) <= d){
				if(!((cx + dx) + "," + (cz + dz) in chunksLoaded)){
					chunksLoaded[(cx + dx) + "," + (cz + dz)] = null;
					chunkLoaded(cx + dx, cz + dz);
					count++;
				}
			}
		}
	}
}

function chunkLoaded(cx, cz){
	generate(cx, cz, 0.01, worldSeed);
}