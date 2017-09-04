
function Entity(skin, render, age){
    this.skin = skin;
    this.render = render;
    this.age = age;
}

var ent = new Entity("skin", "render", "age");

print(ent.age);

function Entity(name, skin, render, age){
    this.name = name;
    this.skin = skin;
    this.render = render;
    this.age = age;
    this.walk = function(){
        print(this.name + " is walking");
    }
}

var ent = new Entity("MONSTER", "skin", "render", "age");

ent.walk();

function Entity(name, skin, render, age){
    this.name = name;
    this.skin = skin;
    this.render = render;
    this.age = age;
}

Entity.prototype.walk = function(){
    print(this.name + " is walking");
}

function Zombie(name, age, harm){
    Entity.call(this, name, "zombie.png", "zombieRender", age);
    this.harm = harm;
}

Zombie.prototype = Object.create(Entity.prototype);
Zombie.prototype.walk = function(){
    print(this.name + " has found his victim and damages it (-" + this.harm + " halfhearts)");
}


var ent = new Zombie("zombie", 12, 12);
ent.walk();

