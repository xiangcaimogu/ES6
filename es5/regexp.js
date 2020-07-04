exec() //方法用于检索字符串中的正则表达式的匹配。
//如果字符串中有匹配的值返回该匹配值，否则返回 null。

test() //方法用于检测一个字符串是否匹配某个模式.

//如果字符串中有匹配的值返回 true ，否则返回 false

//正向预查和负向预查
// (?=pattern)正向预查
// 意思就是：要匹配的字符串，必须满足pattern这个条件，
var reg = /cainiao(?=8)/
var str = "cainiao9"
console.log(reg.exec(str)) //null

var str = "cainiao8"
console.log(reg.exec(str)) //cainiao
// 匹配cainiao,需要注意的是，括号里的内容只是条件，并不参与真正的捕获，只是检查一下后面的字符是否符合要求而已，
// 例如上面的正则，返回的是cainiao,而不是菜鸟8
//(?!条件)