/* By Niku Jagajaga */
let cut=false;
const axe=[258,271,275,279,286];

function useItem(x,y,z,item,block){
  (block==17||block==162)&&axe.indexOf(item)!=-1?
    (cut=!cut)&
    clientMessage('CutAbove: '+cut)&
    Level.playSound(x,y,z,'random.click'):
  0;
}

function destroyBlock(x,y,z){
  const item=getCarriedItem();
  const damage=Player.getCarriedItemData();
  const block=getTile(x,y,z);
  const data=Level.getData(x,y,z);
  const num=axe.indexOf(item);
  const player=getPlayerEnt();
  const slot=Player.getSelectedSlotId();
  const enc=Player.getEnchantments(slot);
  const name=Player.getItemCustomName(slot);
  let level=0;
  if(cut&&(block==17||block==162)&&num!=-1){
    if(enc!=null)
      for(let i=enc.length;i--;)
        enc[i].type==17?
          level=enc[i].level:
        0;
    if(Math.random()<1/(level+1)){
      if(damage==Item.getMaxDamage(axe[num])){
        Entity.setCarriedItem(player,0);
        Level.playSound(x,y,z,'random.break');
      }
      else{
        Entity.setCarriedItem(player,item,1,damage+1);
        if(enc!=null)
          for(let i=enc.length;i--;)
            Player.enchant(slot,enc[i].type,enc[i].level);
        name!=null?
          Player.setItemCustomName(slot,name):
        0;
      }
    }
    above(x,y,z,block,data);
    preventDefault();
  }
}

function above(x,y,z,block,data){
  getTile(x,y+1,z)==block&&Level.getData(x,y+1,z)==data?
    above(x,y+1,z,block,data):
    Level.destroyBlock(x,y,z,true);
}