// *****作为属性名的Symbol
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!




let s1=Symbol("jin")//symbal里面的标识一般是number,string
let s2=Symbol("jin")

let obj = {// s1是Symbal类型的变量作为对象的属性
    [s1]:123 //   []es6语法,直接写s1就只是一个字符串了
}






// 内置的Symbol值
// 除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，
// 指向语言内部使用的方法。

Symbol.hasInstance
// 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，
// 判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，
// 实际调用的是Foo[Symbol.hasInstance](foo)。

class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
//*****我们在判断数组[1,2,3] 是不是 MyClass 的实例
//*****如果MyClass里面不写[Symbol.hasInstance]这个方法，我们直接写 [1,2,3] instanof New MyClass() 判断肯定是错误的
//*****但是MyClass里面写了[Symbol.hasInstance]这个方法，我们外部调用instanceof 的时候实际调用的是[Symbol.hasInstance]方法，所以返回肯定是true
//*****相当于重写了instanceof方法
[1, 2, 3] instanceof new MyClass() // true
// 上面代码中，MyClass是一个类，new MyClass()会返回一个实例。该实例的Symbol.hasInstance方法，
// 会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。


// 下面是另一个例子。

class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false