var BLOCK_TYPE_WORKBENCH = Block.createSpecialType({
	base: 5,
	explosionres: 7,
	destroytime: 2,
});
IDRegistry.genBlockID("deconstructionTable");
Block.createBlock("deconstructionTable", [
	{name: "Deconstruction Table", texture: [["obsidian", 0],["deconstract_top", 0],["deconstract_side", 0],["deconstract_side", 0],["deconstract_side", 1]], inCreative: true}
],BLOCK_TYPE_WORKBENCH);

Translation.addTranslation("Deconstruction Table", {ru: "Разборочный Стол"});

Recipes.addShaped({id: IDData.block.deconstructionTable, count: 1, data: 0}, ["idi", "owo", "ooo"], ["i", 388,0,"d", 264, 0, "w", 58, 0, "o", 49, 0]);


var decGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Разборочный Стол"
			},
			},
			minHeight: 700,
			inventory: {
				standart: true
		}, 
		background: { 
		standart: true 
		}
},
    
    drawing: [
	{type: "bitmap", x: 585, y: 225, bitmap: "furnace_bar_background", scale: 5}
	],
    
	elements: {
		"DecSlot0": {type: "slot", x: 445, y: 210, size: 100},
        "DecSlot1": {type: "slot", x: 735, y: 210-15, size: 130},
        "Progress": {type: "scale", x: 585, y: 225, direction: 0, scale: 5, bitmap: "furnace_bar_scale"}
			}
		
});


var decRecipe=[];

addDecRecipe(5, 0, 17, 0, 20,4,1); 
addDecRecipe(5, 1, 17, 1, 20,4,1); 
addDecRecipe(5, 2, 17, 2, 20,4,1); 
addDecRecipe(5, 3, 17, 3, 20,4,1);
addDecRecipe(5, 4, 162, 0, 20,4,1); 
addDecRecipe(5, 5, 162, 1, 20,4,1); 

addDecRecipe(23, 0, 331, 0, 40,1,1); 
addDecRecipe(24, -1, 12, 0, 40,1,4); 
addDecRecipe(25, 0, 331, 0, 40,1,1);
addDecRecipe(27, 0, 266, 0, 50,1,2);
addDecRecipe(28, 0, 331, 0, 50,1,1);
addDecRecipe(29, 0, 341, 0, 50,1,1);
addDecRecipe(33, 0, 265, 0, 50,1,1);
addDecRecipe(35, -1, 287, 0, 100,1,4);

addDecRecipe(44, 1, 24, 0, 50,6,3);
addDecRecipe(44, 2, 5, 0, 50,6,3);
addDecRecipe(44, 3, 4, 0, 50,6,3);
addDecRecipe(44, 4, 45, 0, 50,6,3);
addDecRecipe(44, 5, 98, 0, 50,6,3);
addDecRecipe(44, 6, 155, 0, 50,6,3);
addDecRecipe(44, 7, 112, 0, 50,6,3);

addDecRecipe(45, 0, 336, 0, 200,1,4);
addDecRecipe(46, 0, 289, 0, 40,1,5);
addDecRecipe(47, 0, 340, 0, 10,1,3);
addDecRecipe(48, 0, 106, 0, 50,1,4);
addDecRecipe(50, 0, 263, 0, 50,4,1);
addDecRecipe(53, 0, 5, 0, 50,4,6);
addDecRecipe(54, 0, 5, 0, 50,1,8);
addDecRecipe(58, 0, 5, 0, 50,1,4);
addDecRecipe(61, 0, 4, 0, 80,1,8);
addDecRecipe(65, 0, 280, 0, 20,1,6);
addDecRecipe(66, 0, 265, 0, 60,16,6);
addDecRecipe(67, 0, 4, 0, 80,4,6);
addDecRecipe(69, 0, 4, 0, 10,1,1);

addDecRecipe(70, 0, 1, 0, 20,1,2);
addDecRecipe(72, 0, 5, 0, 20,1,2);
addDecRecipe(76, 0, 331, 0, 20,1,1);
addDecRecipe(77, 0, 1, 0, 20,1,1);
addDecRecipe(84, 0, 264, 0, 20,1,1);
addDecRecipe(70, 0, 1, 0, 20,1,1);
addDecRecipe(85, -1, 280, 0, 20,1,6);
addDecRecipe(91, 0, 86, 0, 20,1,1);
addDecRecipe(96, 0, 5, 0, 20,1,6);
addDecRecipe(101, 0, 265, 0, 20,16,6);
addDecRecipe(102, 0, 20, 0, 20,16,6);
addDecRecipe(107, 0, 5, 0, 20,1,4); 
addDecRecipe(108, 0, 45, 0, 80,4,6);

addDecRecipe(109, 0, 98, 0, 80,4,6);
addDecRecipe(98, -1, 1, 0, 100,4,4);
addDecRecipe(112, 0, 445, 0, 20,1,4);
addDecRecipe(114, 0, 112, 0, 20,4,6);
addDecRecipe(116, 0, 264, 0, 400,1,2);
addDecRecipe(123, 0, 89, 0, 20,1,1);
addDecRecipe(125, 0, 331, 0, 20,1,1);
addDecRecipe(126, 0, 265, 0, 20,16,6);

addDecRecipe(128, 0, 24, 0, 20,4,6);
addDecRecipe(130, 0, 49, 0, 400,1,8);
addDecRecipe(134, 0, 5, 1, 20,4,6);
addDecRecipe(135, 0, 5, 2, 20,4,6);
addDecRecipe(136, 0, 5, 3, 20,4,6);
addDecRecipe(138, 0, 57, 0, 200,1,1);
addDecRecipe(139, 0, 4, 0, 20,2,6);
addDecRecipe(143, 0, 5, 0, 20,1,1);
addDecRecipe(145, 0, 42, 0, 200,1,7);
addDecRecipe(146, 0, 54, 0, 20,1,1);
addDecRecipe(147, 0, 266, 0, 20,1,2);
addDecRecipe(148, 0, 265, 0, 20,1,2);

addDecRecipe(151, 0, 406, 0, 20,1,3);
addDecRecipe(155, -1, 406, 0, 20,4,4);
addDecRecipe(156, 0, 155, 0, 20,4,6);
addDecRecipe(159, 0, 82, 0, 200,1,2);
addDecRecipe(163, 0, 5, 4, 20,4,6);
addDecRecipe(164, 0, 5, 5, 20,4,6);

addDecRecipe(165, 0, 341, 0, 20,1,8);
addDecRecipe(167, 0, 266, 0, 50,1,6);
addDecRecipe(168, 0, 409, 0, 40,1,4);
addDecRecipe(147, 0, 266, 0, 20,1,2);
addDecRecipe(172, 0, 82, 0, 200,1,1);
addDecRecipe(171, -1, 35, 0, 20,9,3);
addDecRecipe(179, -1, 12, 1, 20,1,4);
addDecRecipe(180, 0, 179, 0, 20,4,6);

addDecRecipe(183, 0, 5, 1, 20,1,4);
addDecRecipe(184, 0, 5, 2, 20,1,4);
addDecRecipe(185, 0, 5, 3, 20,1,4);
addDecRecipe(186, 0, 5, 4, 20,1,4);
addDecRecipe(187, 0, 5, 5, 20,1,4);



addDecRecipe(256, 0, 265, 0, 40,1,1);
addDecRecipe(257, 0, 265, 0, 40,1,3);
addDecRecipe(258, 0, 265, 0, 40,1,3);
addDecRecipe(267, 0, 265, 0, 40,1,2);

addDecRecipe(259, 0, 265	, 0, 40,1,1);
addDecRecipe(261, 0, 287, 0, 10,1,3);
addDecRecipe(262, 0, 318, 0, 40,4,1);

addDecRecipe(269, 0, 5, 0, 40,1,1);
addDecRecipe(270, 0, 5, 0, 40,1,3);
addDecRecipe(271, 0, 5, 0, 40,1,3);
addDecRecipe(268, 0, 5, 0, 40,1,2);

addDecRecipe(273, 0, 4, 0, 40,1,1);
addDecRecipe(274, 0, 4, 0, 40,1,3);
addDecRecipe(275, 0, 4, 0, 40,1,3);
addDecRecipe(272, 0, 4, 0, 40,1,2);

addDecRecipe(278, 0, 264, 0, 40,1,1);
addDecRecipe(279, 0, 264, 0, 40,1,3);
addDecRecipe(280, 0, 264, 0, 40,1,3);
addDecRecipe(276, 0, 264, 0, 40,1,2);

addDecRecipe(280, 0, 5, 0, 40,4,2);
addDecRecipe(281, 0, 5, 0, 40,4,3);
addDecRecipe(282, 0, 281, 0, 40,1,1);

addDecRecipe(284, 0, 266, 0, 40,1,1);
addDecRecipe(285, 0, 266, 0, 40,1,3);
addDecRecipe(286, 0, 266, 0, 40,1,3);
addDecRecipe(283, 0, 266, 0, 40,1,2);

addDecRecipe(290, 0, 5, 0, 40,1,2);
addDecRecipe(291, 0, 1, 0, 40,1,2);
addDecRecipe(292, 0, 265, 0, 40,1,2);
addDecRecipe(293, 0, 264, 0, 40,1,2);
addDecRecipe(294, 0, 266, 0, 40,1,2);

addDecRecipe(297, 0, 295, 0, 40,1,3);

addDecRecipe(298, 0, 334, 0, 40,1,5);
addDecRecipe(299, 0, 334, 0, 40,1,8);
addDecRecipe(300, 0, 334, 0, 40,1,7);
addDecRecipe(301, 0, 334, 0, 40,1,4);

addDecRecipe(306, 0, 265, 0, 40,1,5);
addDecRecipe(307, 0, 265, 0, 40,1,8);
addDecRecipe(308, 0, 265, 0, 40,1,7);
addDecRecipe(309, 0, 265, 0, 40,1,4);

addDecRecipe(310, 0, 264, 0, 40,1,5);
addDecRecipe(311, 0, 264, 0, 40,1,8);
addDecRecipe(312, 0, 264, 0, 40,1,7);
addDecRecipe(313, 0, 264, 0, 40,1,4);

addDecRecipe(314, 0, 266, 0, 40,1,5);
addDecRecipe(315, 0, 266, 0, 40,1,8);
addDecRecipe(316, 0, 266, 0, 40,1,7);
addDecRecipe(317, 0, 266, 0, 40,1,4);

addDecRecipe(321, 0, 35, 0, 40,1,1);
addDecRecipe(322, 0, 266, 0, 40,1,8);
addDecRecipe(323, 0, 5, 0, 40,1,6);
addDecRecipe(324, 0, 5, 0, 40,1,6);
addDecRecipe(325, 0, 265, 0, 40,1,3);
addDecRecipe(328, 0, 265, 0, 40,1,5);
addDecRecipe(330, 0, 265, 0, 40,1,6);
addDecRecipe(333, -1, 5, 0, 40,1,5);
addDecRecipe(336, 0, 337, 0, 40,1,1);
addDecRecipe(339, 0, 338, 0, 40,1,1);
addDecRecipe(340, 0, 339, 0, 40,1,3);
addDecRecipe(342, 0, 328, 0, 40,1,1);
addDecRecipe(345, 0, 265, 0, 40,1,4);
addDecRecipe(346, 0, 287, 0, 40,1,2);
addDecRecipe(347, 0, 266, 0, 40,1,4);
addDecRecipe(354, 0, 344, 0, 40,1,1);
addDecRecipe(355, -1, 35, 0, 40,1,3);
addDecRecipe(356, 0, 265, 0, 40,1,2);
addDecRecipe(357, 0, 295, 0, 40,8,4);
addDecRecipe(358, -1, 345, 0, 40,1,1);
addDecRecipe(374, 0, 20, 0, 40,1,3);
addDecRecipe(376, 0, 375, 0, 40,1,1);
addDecRecipe(378, 0, 377, 0, 40,1,1);
addDecRecipe(379, 0, 369, 0, 40,1,1);
addDecRecipe(377, 0, 369, 0, 40,2,1);
addDecRecipe(380, 0, 265, 0, 40,1,7);
addDecRecipe(381, 0, 368, 0, 40,1,1);
addDecRecipe(395, -1, 345, 0, 40,1,1);
addDecRecipe(396, 0, 371, 0, 40,1,8);
addDecRecipe(400, 0, 86, 0, 40,1,1);
addDecRecipe(413, 0, 281, 0, 40,1,1);
addDecRecipe(359, 0, 266, 0, 40,1,2);

addDecRecipe(416, 0, 334, 0, 40,1,6);
addDecRecipe(417, 0, 265, 0, 40,1,6);
addDecRecipe(418, 0, 266, 0, 40,1,6);
addDecRecipe(419, 0, 264, 0, 40,1,6);

addDecRecipe(420, 0, 341, 0, 40,1,1);

addDecRecipe(427, 0, 5, 1, 20,3,6);
addDecRecipe(428, 0, 5, 2, 20,3,6);
addDecRecipe(429, 0, 5, 3, 20,3,6);
addDecRecipe(430, 0, 5, 4, 20,3,6);
addDecRecipe(431, 0, 5, 5, 20,3,6);


function addDecRecipe(inputId, inputData, outputId, ouputData, time, inputCount, outputCount){
	decRecipe.push({inputId:inputId, inputData:inputData, outputId:outputId, outputData:ouputData, time:time, inputCount:inputCount, outputCount:outputCount})
}
var addDeconstructionRecipe = function(inputId, inputData, outputId, ouputData, time, inputCount, outputCount){
	decRecipe.push({inputId:inputId, inputData:inputData, outputId:outputId, outputData:ouputData, time:time, inputCount:inputCount, outputCount:outputCount})
}
TileEntity.registerPrototype(BlockID.deconstructionTable, {
	defaultValues: {
		time:0,
		recipe:null,
		id:0,
		data:0,
		rotation:0
	},
	animation:null,
	tick: function(){
		var content = this.container.getGuiContent(); 
		if(this.data.id!=this.container.getSlot("DecSlot0").id||this.data.data!=this.container.getSlot("DecSlot0").data){
			if(this.container.getSlot("DecSlot0").id==0){
				this.animation.destroy();
			}else{
				this.data.id=this.container.getSlot("DecSlot0").id;
			this.data.data=this.container.getSlot("DecSlot0").data;
			this.animation.describeItem({
			id: this.container.getSlot("DecSlot0").id,
			count: 1,
			data: this.container.getSlot("DecSlot0").data,
			size: .25
		});
				this.animation.load();
			}
		}	
			if(this.data.time==0){
				if(this.data.recipe){
					this.container.getSlot("DecSlot1").id=this.data.recipe.outputId;
					this.container.getSlot("DecSlot1").data=this.data.recipe.outputData;
						this.container.getSlot("DecSlot0").count-=this.data.recipe.inputCount;
							this.container.getSlot("DecSlot1").count+=this.data.recipe.outputCount;
					this.data.recipe=null;
						this.container.validateAll();
					
				}
				if(this.data.recipe==null){
				for(var i in decRecipe){
					if(this.container.getSlot("DecSlot0").id==decRecipe[i].inputId&&this.container.getSlot("DecSlot0").count>=decRecipe[i].inputCount){
						if(this.container.getSlot("DecSlot1").id==decRecipe[i].outputId&&this.container.getSlot("DecSlot1").count<65- decRecipe[i].outputCount||this.container.getSlot("DecSlot1").id==0){
							if(this.container.getSlot("DecSlot0").data==decRecipe[i].inputData||decRecipe[i].inputData==-1){
								this.data.recipe=decRecipe[i];
							this.data.time=decRecipe[i].time;
							}
								
						}
					}	
				}
			}
			}
		if(content){
			if(this.data.time){
					this.container.setScale("Progress",Math.floor(22*(1-this.data.time/this.data.recipe.time))/22);
				}else{
					this.container.setScale("Progress",0);
				}
		}
		if(this.data.time>0){

			if(this.container.getSlot("DecSlot1").count>63-this.data.recipe.outputCount||this.container.getSlot("DecSlot0").id!=this.data.recipe.inputId||this.container.getSlot("DecSlot0").count<this.data.recipe.inputCount){
				this.data.time=0;
				this.data.recipe=null;
			}else{
						if(this.container.getSlot("DecSlot0").data==this.data.recipe.inputData||this.data.recipe.inputData==-1){
								this.data.time--;
							Particles.addFarParticle(9, this.x+.25+Math.random()/2, this.y+1+Math.random()/4,this.z+.25+Math.random()/2)
			Particles.addFarParticle(9, this.x+.25+Math.random()/2, this.y+1+Math.random()/4,this.z+.25+Math.random()/2)
			Particles.addFarParticle(8, this.x+.25+Math.random()/2, this.y+1+Math.random()/4,this.z+.25+Math.random()/2)
						}
					}
				}
	},
	destroy:function(){
		this.animation.destroy();
	},
	getGuiScreen: function(){
		return decGui;
	},
	init:function(){
		this.animation = new Animation.Item(this.x+.5, this.y+1.1, this.z+.5);
		if(this.container.getSlot("DecSlot0").id==0){
				this.animation.destroy();
			}else{
				this.data.id=this.container.getSlot("DecSlot0").id;
			this.data.data=this.container.getSlot("DecSlot0").data;
			this.animation.describeItem({
			id: this.container.getSlot("DecSlot0").id,
			count: 1,
			data: this.container.getSlot("DecSlot0").data,
			size: .25,
			rotation: [125,125,125]
				
		});
				this.animation.load();
			}
	}
});

ModAPI.registerAPI("Deconstruction", {
	addDeconstructionRecipe:addDeconstructionRecipe,
	requireGlobal: function(command){
		return eval(command);
	}
});

Logger.Log("Deconstruction API shared with name Deconstruction.", "API");
