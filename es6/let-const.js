// ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
// 上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

// for循环的计数器，就很合适使用let命令。

for (let i = 0; i < arr.length; i++) {}

console.log(i);
//ReferenceError: i is not defined
// 上面代码的计数器i，只在for循环体内有效。

// 下面的代码如果使用var，最后输出的是10。

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
// 上面代码中，变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。

// 如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
// 上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。




// 另外，for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。

for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc





// 不存在变量提升
// let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;
// 上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。
// 变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。





// 暂时性死区
// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
// 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

// ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

// 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”




// 不允许重复声明
// let不允许在相同作用域内，重复声明同一个变量。

// 报错
function a() {
  let a = 10;
  var a = 1;
}

// 报错
function a() {
  let a = 10;
  let a = 1;
}
// 因此，不能在函数内部重新声明参数。

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}





// ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

// 第一种场景，内层变量可能会覆盖外层变量。

var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
// 上面代码中，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

// 第二种场景，用来计数的循环变量泄露为全局变量。

var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
// 上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量





// let实际上为JavaScript新增了块级作用域。

function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
// 上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果使用var定义变量n，最后输出的值就是10。






// 块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。

// IIFE写法:为了使tmp成为匿名函数内部函数的局部变量，不污染全局
(function () {
  var tmp = 'asd';
  // ...
}());

// 块级作用域写法
{
  let tmp = 'asd';
  // ...
}




//*****const
// 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。
// const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

const foo = {};
foo.prop = 123;

foo.prop
// 123

foo = {}; // TypeError: "foo" is read-only
// 上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址
// ，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性






// ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，
// 依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，
// 不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。

var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined