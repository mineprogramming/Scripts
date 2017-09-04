function Entity(skin, render, age){
    this.skin = skin;
    this.render = render;
    this.age = age;
}

var ent = new Entity("skin", "render", "age");

print(ent instanceof Entity);
print(ent instanceof Object);
print(ent instanceof Array);

