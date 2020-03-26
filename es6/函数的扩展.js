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
//*****与rest相反，变量是数组，用...就会展开，rest大部分用域实参是分散的，形参采用...使得合并成数组
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