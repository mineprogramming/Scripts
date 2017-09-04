var Generation = {};

Generation.max = 100;

Generation.generateCube = function(x, y, z, dx, dy, dz){
    print("Cube generated successfully!");
    print("Max is now " + --this.max);
}

Generation.generateCube();
Generation.generateCube();
Generation.generateCube();

