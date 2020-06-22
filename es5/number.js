//字符串转数值
var str = '132.156165'
console.log(parseInt(str))
console.log(parseFloat(str))
console.log(typeof parseFloat(str))
var a = Number(str)
console.log(isNaN(a))//false

var num = 1546.26
//强制转换
num.toString()
String(num)

//隐式转换
console.log('' + num)
console.log(''.concat(num))
console.log(Number(num.toFixed(1)))



// 那么应该怎样来判断 0.1 + 0.2 和 0.3 是否相等呢？
// 最常见的方法是设置一个误差范围值，通常称为“机器精度”（machine epsilon）， 对 JavaScript 的数字来说，这个值通常是 2^-52 (2.220446049250313e-16)。
// 从 ES6 开始，该值定义在 Number.EPSILON 中，我们可以直接拿来用
Number.EPSILON

function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2
var b = 0.3

numbersCloseEnoughToEqual(a, b);  // true numbersCloseEnoughToEqual( 0.0000001, 0.0000002 );  // false



// 检查是否是整数
Number.isInteger()