var machines = [];

for(var i = 0; i < 5; i++){
    machines.push({x: i, y: i, z: i, type: "macerator"});
}

machines.push(
{
    x: 5, 
    y: 6, 
    z: 7, 
    type: "compressor"
});

for(var i = 0; i < machines.length; i++){
    if(machines[i].type == "compressor")
        print("{" + machines[i].x + "; " + machines[i].y + "; " + machines[i].z + "}");
}


