//预编译

//函数声明：整体提升
//变量：声明提升


// console.log(a)
// var a = 123;

// a.函数声明：
function fun(a){console.log(a)}
// b.函数表达式：
var fun = function(a){console.log(a)};
// c.构造函数：
var fun = new Function("a",console.log(a));