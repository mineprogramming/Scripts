var json = "{\"lol\":\"js\", \"kek\":\"ModPE\"}";
print(json);

var obj = JSON.parse(json);
print(obj.kek + " is based on " + obj.lol);

function Entity(skin, render, age){
    this.skin = skin;
    this.render = render;
    this.age = age;
}

var ent = new Entity("skin.png", "render", 12);

print(JSON.stringify(ent));

