
let title = '标题';
let content = '内容';
let str = '<div><h1>' + title + '</h1><p>' + content + '</p></div>';

let str2 = `<div><h1>${title}</h1><p>${content}</p></div>`;




includes(), startsWith(), endsWith()
// 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

// includes()：//返回布尔值，表示是否找到了参数字符串。
// startsWith()：//返回布尔值，表示参数字符串是否在源字符串的头部。
// endsWith()：//返回布尔值，表示参数字符串是否在源字符串的尾部。
var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
// 这三个方法都支持第二个参数，表示开始搜索的位置。

var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false


repeat()
// repeat方法返回一个新字符串，表示将原字符串重复n次。

'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
// 参数如果是小数，会被取整。

'na'.repeat(2.9) // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。

'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
// 但是，如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0。

'na'.repeat(-0.9) // ""
// 参数NaN等同于0。

'na'.repeat(NaN) // ""
// 如果repeat的参数是字符串，则会先转换成数字。

'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
padStart()，padEnd()
// ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
// 上面代码中，padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

// 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

'abc'.padStart(10, '0123456789')
// '0123456abc'
// 如果省略第二个参数，默认使用空格补全长度。

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
// padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
 
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
// 另一个用途是提示字符串格式。

'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"