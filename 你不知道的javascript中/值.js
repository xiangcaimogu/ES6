NaN
// 不是数字的数字 
// 如果数学运算的操作数不是数字类型（或者无法解析为常规的十进制或十六进制数字）， 就无法返回一个有效的数字，这种情况下返回值为 NaN

// isNaN() 与 Number.isNaN() 的区别
var a = 2 / "foo"
var b = "foo";
 
a; // NaN 
b; //"foo" 
window.isNaN( a ); // true 
window.isNaN( b ); // true——晕！
// 很明显 "foo" 不是一个数字，但是它也不是 NaN。这个 bug 自 JavaScript 问世以来就一直存 在，至今已超过 19 年。
// 从 ES6 开始我们可以使用工具函数 Number.isNaN(..)。
Number.isNaN( a ); // true 
Number.isNaN( b ); // false——好
// 首先isNaN检查的值首先要是一个number类型，其次才判断是不是有效的数字类型
console.log(typeof a === "number") //true
console.log(typeof b ==="string") //


Object.is()
// 判断两个值是否绝对相等
var a = 2 / "foo"
console.log(a===NaN) //false
Object.is(a,NaN) //true



// slice()和concat()这两个方法，仅适用于对不包含引用对象的一维数组的深拷贝
// 因此使用slice和concat对对象数组的拷贝，整个拷贝还是浅拷贝
let arr = [0,1,2,4]
function foo (value){
    let b = value
    b.push(8)
    value.push(7)
    console.log(b) //[0, 1, 2, 4, 8, 7]

}
foo(arr)
console.log(arr) //[0, 1, 2, 4, 8, 7]

let arr = [0,1,2,4]
function foo (value){
    let b = value.slice()
    b.push(8)
    value.push(7)
    console.log(b) //[0, 1, 2, 4, 8]

}
foo(arr)
console.log(arr) //[0, 1, 2, 4, 7]