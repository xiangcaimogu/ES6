for (var i = 0; i < 6; i++) {
    console.log(i)
}
console.log(i) //6

if (true) {
    var a = 0
}
console.log(a) //0

//块级作用域
// let 解决上述问题





//变量提升

foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
    // ...
};
// 编译过后
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function () {
    var bar = ...self...
    // ...
}


//闭包创建模块
function CoolModule() {
    var a = 0
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        a++
        console.log(a);
    }
    function doAnother() {
        console.log(another.join(" ! "));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = CoolModule(); // 创建函数上下文
foo.doSomething(); // 1
foo.doSomething(); // 2
foo.doAnother(); // 1 ! 2 ! 3
var baz = CoolModule() // 创建新的函数上下文
//上一个示例代码中有一个叫作 CoolModule() 的独立的模块创建器，可以被调用任意多次，
// 重点：每次调用都会创建一个新的模块实例。当只需要一个实例时，可以对这个模式进行简单的
// 改进来实现单例模式

var foo = (function CoolModule() { 
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() { 
    console.log( something );
    }
    function doAnother() {
    console.log( another.join( " ! " ) );
    }
    return {
    doSomething: doSomething, 
    doAnother: doAnother
    };
   })();
   foo.doSomething(); // cool 
   foo.doAnother(); // 1 ! 2 ! 3


//    this
// 小测试
var a = 9
function asd (){
console.log(this.a)
}
asd.a=8
asd()//9
asd.apply(asd)//8