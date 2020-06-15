error
// 2.错误处理
// 捕获错误：try...catch
// 抛出错误：throw error


// 常见的内置错误
// =========================================


// 1.引用的变量不存在
ReferenceError
console.log(a) //ReferenceErroe :a is not defined
console.log('----')//没有捕获error，下面的代码不会执行


// ==============================================


// 2.数据类型不正确
TypeError
let b
b.xx() //TypeError: Cannot read property 'xx' of undefined


//3.数据值不在其所允许的范围
RangeError

function fn() {
    fn()
}
fn() //递归死循环 Maximum call stack size exceeded

// 4.语法错误
SyntaxError
const str = '''' //Uncaught SyntaxError: Unexpected string


// 2.错误处理
// 捕获错误：try...catch
let d
try {
    console.log(d.xx())
} catch (error) {
    console.log(error.message)
    console.log(error.stack)
} //错误catch之后，就可以继续执行后面的代码
console.log('asaa')

// 抛出错误：throw error
function something(a) {
    if (typeof (a) == 'number') {
        console.log('ok')
    } else {
        throw new Error('当前不是数字')
    }
}
// 捕获异常
try {
    something('a')
} catch (error) {
    console.log(error)
}