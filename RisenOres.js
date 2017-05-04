var api = new net.zhuoweizhang.mcpelauncher.api.modpe.
  RendererManager;

var KEY_RENDER = "mineprogramming.RisenOres.render";
var NATIVE_MOB = 32;

var ores = [14, 15, 16, 21, 56, 73, 129, 153];
var items = [266, 265, 263, 351, 264, 331, 388, 406];
var renders = [];

var init = false;

for(var i = 0; i < ores.length; i++){
  renders[i] =
    api.nativeCreateItemSpriteRenderer(ores[i]);
}

function destroyBlock(x, y, z, side){
  var enches = Player.getEnchantments(
    Player.getSelectedSlotId());
  if(enches == null) return;
  for(var i = 0; i < enches.length; i++)
    if(enches[i].type == Enchantment.SILK_TOUCH)
      return;

  var i = ores.indexOf(getTile(x, y, z));
  if(i != -1 && randomBool(48)){
    var ore = Entity.spawnMob(x, y, z, NATIVE_MOB);
    Entity.setRenderType(ore, renders[i]);
    Entity.setExtraData(ore, KEY_RENDER, i);
  }
}

function newLevel(){
  init = true;
}

function modTick(){
  var entities = Entity.getAll();
  if(!init || entities.length == 1)
    return;
  for(var i = 0; i < entities.length; i++){
    var data = Entity.getExtraData(entities[i], 
      KEY_RENDER);
    if(data != null)
      Entity.setRenderType(entities[i], renders[data]);
  }
  init = false;
}

function deathHook(a, v){
  var data = Entity.getExtraData(v, KEY_RENDER);
  if(data != null){
    preventDefault();
    var meta = items[data] == 351 ? 4 : 0;
    Level.dropItem(Entity.getX(v), Entity.getY(v),
      Entity.getZ(v), 0, items[data], 1, meta);
    Entity.remove(v);
  }
}

function randomBool(percent){
  var res = Math.random()*100;
  if(res <= percent)
    return true;
  else return false;
}
