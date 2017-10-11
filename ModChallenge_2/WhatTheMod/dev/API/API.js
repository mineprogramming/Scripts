var AlloyRecipeRegistry = {
	registerFirstLevelAlloy:function(dataProgress,slots,source,ffinal){
		if((slots.sourceSlotFirst.id==source.sourceNeedFirst.id)&&(slots.sourceSlotSecond.id==source.sourceNeedSecond.id)&&(slots.sourceSlotThird.id==source.sourceNeedThird.id)){
			if(dataProgress==1000){
				if(slots.ffinal.id==0){
					slots.ffinal.id=ffinal.id;
					if(slots.ffinal.count==0){
						slots.ffinal.count=1;
					}
					else{slots.ffinal.count++;}
				}				
			}
			else{
				dataProgress++;
			}
		}
	}
};
var ICoreGenerator = {
	genOreNormal: function(x, y, z){
		for(var xx = -1; xx < 2; xx++){
			for(var yy = -1; yy < 2; yy++){
				for(var zz = -1; zz < 2; zz++){
					var d = Math.sqrt(xx*xx + yy*yy + zz*zz);
					var r = 1.5 - Math.random()/2;
					if(d < r){GenerationUtils.setLockedBlock(x+xx, y+yy, z+zz);}
				}
			}
		}
	}
};
/*AlloyRecipeRegistry(this.data.progress,
{sourceSlotFirst:this.container.solt1,
sourceSlotSecond:this.container.solt2,
sourceSlotThird:this.container.solt3},
		{sourceSlotFirst:
		{id:ItemID.ff,count:1,data:0},
		sourceSlotSecond:
		{id:ItemID.ff,count:1,data:0},
		sourceSlotThird:
		{id:ItemID.ff,count:1,data:0}},
{id:ItemID.ada,count:1,data:0});
*/