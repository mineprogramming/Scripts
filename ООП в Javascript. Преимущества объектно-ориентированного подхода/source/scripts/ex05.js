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

var e = new Entity("ent", "ent.png", "entRender", 11)
print("Entity: ");
print(e instanceof Object);
print(e instanceof Entity);
print(e instanceof Zombie);

var z = new Zombie("zombie", 12, 12);
print("Zombie: ");
print(e instanceof Object);
print(z instanceof Entity);
print(z instanceof Zombie);

