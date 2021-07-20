// 1
function sayHi() {
    console.log(name);
    console.log(age);
    var name = "Lydia";
    let age = 21;
}
sayHi()

// 2
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()

//3 
class Chameleon {
    static colorChange(newColor) {
      this.newColor = newColor;
    }
  
    constructor({ newColor = "green" } = {}) {
      this.newColor = newColor;
    }
  }
  
  const freddie = new Chameleon({ newColor: "purple" });
  freddie.colorChange("orange");

  //colorChange方法是静态的。静态方法仅在创建它们的构造函数中存在，
  //并且不能传递给任何子级。由于freddie是一个子级对象，函数不会传递，所以在freddie实例上不存在freddie方法：抛出TypeError

  // 4
var a = {
  i:1,
  toString(){
    return a.i++
  }
};
if(a == 1 && a == 2 && a == 3){ //相等比较时要类型转换，转数字之前都要先转为有效字符串
     console.log(1);
}

// 5
const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);

//6
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
var a={}, b='123', c=123;
a[b]='b';
// c 的键名会被转换成字符串'123'，这里会把 b 覆盖掉。
a[c]='c';  
// 输出 c
console.log(a[b]);
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
// b 是 Symbol 类型，不需要转换。
a[b]='b';
// c 是 Symbol 类型，不需要转换。任何一个 Symbol 类型的值都是不相等的，所以不会覆盖掉 b。
a[c]='c';
// 输出 b
console.log(a[b]);
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
// b 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。
a[b]='b';
// c 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
a[c]='c';  
// 输出 c
console.log(a[b]);


// 7
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
// catch块接收参数x。当我们传递参数时，这与变量的x不同。这个变量x是属于catch作用域的。
// 之后，我们将这个块级作用域的变量设置为1，并设置变量y的值。现在，我们打印块级作用域的变量x，它等于1。
// 在catch块之外，x仍然是undefined，而y是2。当我们想在catch块之外的console.log(x)时，它返回undefined，而y返回2


// 8
function Foo() {
  Foo.a = function() {
      console.log(1)
  }
  this.a = function() {
      console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}
Foo.a(); // 4
let obj = new Foo(); //执行了构造函数改了Foo.a
obj.a(); // 2
Foo.a(); // 1