var machinesX = [];
var machinesY = [];
var machinesZ = [];
var machinesType = [];

function addMachine(x, y, z, type){
    machinesX.push(x);
    machinesY.push(y);
    machinesZ.push(z);
    machinesType.push(type);
}

for(var i = 0; i < 5; i++){
    addMachine(i, i, i, "macerator")
}

addMachine(1, 2, 3, "compressor");

for(var i = 0; i < machinesType.length; i++){
    if(machinesType[i] == "macerator")
        print("{" + machinesX[i] + "; " + machinesY[i] + "; " + machinesZ[i] + "}");
}

