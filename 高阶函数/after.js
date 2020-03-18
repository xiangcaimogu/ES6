function after(times, callback) {
    return function () {
        if (--times === 0) {
            callback
        }
    }
}

//在多少次之后执行
let fn = after(3, function () {
    console.log('after')
})
fn()
fn()
fn()
//执行3次之后才执行里面的函数