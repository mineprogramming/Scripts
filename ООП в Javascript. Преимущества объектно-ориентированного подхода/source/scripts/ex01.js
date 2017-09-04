function Entity(skin, render, age){
    this.skin = skin;
    this.render = render;
    this.age = age;
}

var ent = new Entity("skin", "render", 13);

print(ent.age);
