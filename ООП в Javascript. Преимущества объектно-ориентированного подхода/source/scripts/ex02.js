function Entity(name, skin, render, age){
    this.name = name;
    this.skin = skin;
    this.render = render;
    this.age = age;
    this.walk = function(length){
        print(this.name + " is walking " + length + " meters");
    }
}

var ent = new Entity("MONSTER", "skin", "render", "age");

ent.walk(12);
