var GUI_BAR_STANDART_SCALE = 3.7;
var harvesterGui = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Crop Harvester"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 353, y: 350, bitmap: "energy_bar_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
    "energyScale": {type: "scale", x: 353 + GUI_BAR_STANDART_SCALE * 4, y: 350, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_BAR_STANDART_SCALE}, 
    "textInfo1": {type: "text", x: 353, y: 420, width: 300, height: 30, text: "0/"},
    "textInfo2": {type: "text", x: 353, y: 440, width: 300, height: 30, text: "10000"},
        
    "slotBone":{type:"slot",x:453,y:103,size:71 ,bitmap: "slot_bone"}, 
    "slotWater":{type:"slot",x:353,y:103,size:71,bitmap: "slot_bucked"},
    "slotSeed":{type:"slot",x:453,y:247,size:71,bitmap: "slot_seed"},
    "slotHoe":{type:"slot",x:353,y:247,size:71,bitmap: "slot_hoe"},

    "upgrage0":{type:"slot",x:553,y:350,size:71,bitmap: "slot_upgrade"},
    "upgrage1":{type:"slot",x:633,y:350,size:71,bitmap: "slot_upgrade"},
    "upgrage2":{type:"slot",x:713,y:350,size:71,bitmap: "slot_upgrade"},
        
    "slot0":{type:"slot",x:553,y:103,size:71},
    "slot1":{type:"slot",x:625,y:103,size:71},
    "slot2":{type:"slot",x:697,y:103,size:71},
    "slot3":{type:"slot",x:769,y:103,size:71},
    "slot4":{type:"slot",x:841,y:103,size:71},
    "slot5":{type:"slot",x:913,y:103,size:71},
         
    "slot6":{type:"slot",x:553,y:175,size:71},
    "slot7":{type:"slot",x:625,y:175,size:71},
    "slot8":{type:"slot",x:697,y:175,size:71},
    "slot9":{type:"slot",x:769,y:175,size:71},
    "slot10":{type:"slot",x:841,y:175,size:71},
    "slot11":{type:"slot",x:913,y:175,size:71},
         
    "slot12":{type:"slot",x:553,y:247,size:71},
    "slot13":{type:"slot",x:625,y:247,size:71},
    "slot14":{type:"slot",x:697,y:247,size:71},
    "slot15":{type:"slot",x:769,y:247,size:71},
    "slot16":{type:"slot",x:841,y:247,size:71},
    "slot17":{type:"slot",x:913,y:247,size:71}
    }
});






