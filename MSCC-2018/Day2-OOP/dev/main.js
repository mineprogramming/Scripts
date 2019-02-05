
var current_id = 1;

//constructor - returns an object
function CustomEntity(name){
    this.id = current_id++;
    this.name = name;
    
    var id = this.id;
    
    this.summon = function(){
        alert(id);
    }
}


var entity = new CustomEntity("wolf");

alert(typeof entity);

for(var key in entity){
    var value = entity[key];
    if((typeof value) == "function"){
        value();
    } else{
        alert(key + ": " + value);
    }
}



