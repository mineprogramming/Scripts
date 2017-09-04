var Generation = {
    max: 100,
    generateCube: function(x, y, z, dx, dy, dz){
        print("Cube generated successfully!");
        print("Max is now " + --this.max);
    }
};

Generation.generateCube();
Generation.generateCube();

