//字符串转数值
var str='132.156165'
console.log(parseInt(str))
console.log(parseFloat(str))
console.log(typeof parseFloat(str))
var a = Number(str)
console.log(isNaN(a))//false

var num=1546.26
//强制转换
num.toString()
String(num)

//隐式转换
console.log(''+num)
console.log(''.concat(num))
console.log(Number(num.toFixed(1)))