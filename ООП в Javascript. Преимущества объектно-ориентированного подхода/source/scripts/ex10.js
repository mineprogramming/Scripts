var machines = [];

var Machine = function(x, y, z, type){
    this.x = x; this.y = y; this.z = z; this.type = type;
}

for(var i = 0; i < 5; i++){
    machines.push(new Machine(i, i, i, "macerator"));
}

machines.push(new Machine(12, 13, 14, "compressor"));

for(var i = 0; i < machines.length; i++){
    if(machines[i].type == "compressor")
        print("{" + machines[i].x + "; " + machines[i].y + "; " + machines[i].z + "}");
}


