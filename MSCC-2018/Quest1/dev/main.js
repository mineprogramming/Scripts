var i = 0;

var funcs = [
    function(){
        print(1 + 2, "Просто сумма");
        print(5 * 20, "А так можно умножать");
        print(3 + - 2, "Унарному минусу плевать на скобочки");
        print(5 / 3, "Тут даже деление без остатка");
        print(5 % 3, "А вот и остаток)");
        print(5 / 0, "И на ноль делить можно, а нам в школе по-другому говорили");
    },
    function(){
        print(1 == '1', "Ну да");
        print(1 === '1', "И это верно");
        print(typeof 1, "Логично");
        print(typeof '1', "Ага");
        print('1' + 2, "Ну, типа, приклеили");
        print('1' - 2, "А отклеивать кто будет?");
        print('1' + 5 - '3', "И тут растворитель для клея не завезли...");
        var i = 1;
        print(i++, "Сначала вывели, потом прибавили");
        i = 2;
        print(++i, "А тут наоборот");
        i = 3;
        print(i++ + "; " + -- i, "Все и сразу, еще и кучей знаков запутать решили");
    },
    function(){
        print(typeof null, "Чет падазрительна");
        print(null instanceof Object, "Так и знал!");
        print(typeof NaN, "Таков он весь, JavaScript...");
        print(NaN === NaN, "Что??");
        print(new Array() == false, "Ну, допустим");
        print(0 == false, "Ладно");
        print([] == true, "Да");
        var arr = []; 
        if(arr) print(true, "Что????????"); 
        else print(false);
    },
    function(){
        (function() { print('Hello', "Мы и сами с усами"); })();
        
        var someVar; 
        print(someVar == undefined, "Все ок");
        
        var undefined = 123; 
        var someVar; 
        print(someVar == undefined, "Не все ок(((");
        
        print('lol' + + 'kek', "Чет нет");
        print([] + {}, "А что, так можно?");
        print({} === {}, "Ну... Да, разные объекты, разные типы");
        print({} + [] === [] + {}, "А это еще что?");
    },
    function(){
        print(9..toString(), "Странно, но работает");
    },
    function(){
        //print(9.toString());
        print("", "ERROR");
    }
]

Callback.addCallback("ItemUse", function (coords, item, block) {
    if(item.id == 280){
        funcs[i]();
        i++;
        if(i > 5) i = 0;
    }
});

function print(message, comment){
    if(comment == undefined) comment = "";
    Game.message(message + " §a//" + comment);
}
