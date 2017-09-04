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

var e = new Entity("ent", "ent.png", "entRender", 11)
e.walk();

var z = new Zombie("zombie", 12, 45);
z.walk();

