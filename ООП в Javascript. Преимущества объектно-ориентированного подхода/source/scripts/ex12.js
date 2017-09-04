var machines = [];

var Machine = function(x, y, z, type){
    this.x = x; this.y = y; this.z = z; this.type = type;
}

for(var i = 0; i < 5; i++){
    machines.push(new Machine(i, i, i, "macerator"));
}

machines.push(new Machine(i, i, i, "compressor"));

var json = JSON.stringify(machines);
print(json);

machines = JSON.parse(json);

print(machines);
