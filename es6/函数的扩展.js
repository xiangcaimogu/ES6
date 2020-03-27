//作用域


//一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
// 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
//上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。
// 在这个作用域里面，默认值变量x指向第一个参数2，而不是全局变量x，所以输出是2



// 再看下面的例子。

let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
// 上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，
// 所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

// 如果此时，全局变量x不存在，就会报错。

function f(y = x) {//形参y等于变量 x ，但是变量x不存在//走不到下面这一步就报错了
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined
// 下面这样写，也会报错。

var x = 1;
function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined
// 上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。






// rest参数
// ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
// 上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

// 下面是一个 rest 参数代替arguments变量的例子。

// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
// 上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。

// rest ******参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。
// 下面是一个利用 rest 参数改写数组push方法的例子。

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)


// 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 报错
function f(a, ...b, c) {
  // ...
}






// 扩展运算符
// 含义
// 扩展运算符（spread）是三个点（...）。
//*****它好比 rest 参数的逆运算，
//*****将一个数组转为用逗号分隔的参数序列。

console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]


// 该运算符主要用于函数调用。
//*****与rest相反，变量是数组，用...就会展开，rest大部分用情况是实参是分散的参数列表，形参采用...使得合并成数组
function mypush(array, items) {
  array.push(...items);
}
mypush([1,2],[4,5,6])


function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42

// 扩展运算符与正常的函数参数可以结合使用，非常灵活。

function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);



//*****下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。

// ES5的写法
// Function.apply(obj,args),方法能接受两个参数：
// obj：这个对象将代替Fcuntion类里this对象
// args：这个是数组，它将作为参数传给Function （args —> arguments）
//*****把数组变成了参数列表，等于是展开了数组
Math.max.apply(null, [14, 3, 77])

// ES6的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);




// 与解构赋值结合
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []:

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []




//*****箭头函数
// 箭头函数有几个使用注意点。

// （1）*****函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

// （2）*****不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// （3）*****不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

// 上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
// this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
// 导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数
// 所以，箭头函数转成ES5的代码如下。

// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
// 上面代码中，转换后的ES5版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。




// 请问下面的代码之中有几个this？
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
// 上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。
// 因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。






// 什么是尾调用？
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

function f(x){
  return g(x);
}
// 上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

// 以下三种情况，都不属于尾调用。

// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
// 上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。
// 情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。

function f(x){
  g(x);
  return undefined;
}
// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。

function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
// 上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。



//*****尾递归
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）
// 。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
// 还有一个比较著名的例子，就是计算fibonacci 数列，也能充分说明尾递归优化的重要性

// 如果是非尾递归的fibonacci 递归方法

function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10); // 89
// Fibonacci(100)
// Fibonacci(500)
// 堆栈溢出了
// 如果我们使用尾递归优化过的fibonacci 递归算法

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
// 由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。
// ES6也是如此，第一次明确规定，所有ECMAScript的实现，都必须部署“尾调用优化”。
// *****这就是说，在ES6中，只要使用尾递归，就不会发生栈溢出，相对节省内存

// 递归函数的改写
// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，
// 就是把所有用到的内部变量改写成函数的参数。
// 比如上面的例子，阶乘函数 factorial 需要用到一个中间变量 total ，
// 那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，
// 第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

// 两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
// 上面代码通过一个正常形式的阶乘函数 factorial ，调用尾递归函数 tailFactorial ，看起来就正常多了。

// 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
// 上面代码通过柯里化，将尾递归函数 tailFactorial 变为只接受1个参数的 factorial 。

// *****第二种方法就简单多了，就是采用ES6的函数默认值。

function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
// 上面代码中，参数 total 有默认值1，所以调用时不用提供这个值。
