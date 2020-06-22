// es5 
getAjax(url, (res) => { })
//promise
getAjax(url).then(() => { })
    //async await
    (async () => {
        let res = await getAjax(url)
    })()
//总结，es5与promise主要区别在写法上不同，可以让回调函数，划分在then()的函数里去执行
// asyncy与promise的主要区别，这种形式的写法在底层编译之后会自动转为promise

//async
//函数加上async 就会返回一个Promise对象，不管你函数内部返回的是不是Promsie，都可以用then,传回调函数
let res = (async () => {
    return 1;
    // return Promise.resolve(2)
})()
res.then(
    value => {
        console.log('resolve', value)
    },
    reason => {
        console.log('reject', reason)
    }
)
//await
//后面跟着一个表达式

function fn2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            // resolve(3)
            reject('error') //fn2返回的错误的时候，fn就必须要catch捕获错误
        },2000)
    })
}
// function fn2(){
//     return 4
// }
async function fn() {
    try {
        const value = await fn2() //fn2函数可以是异步，可以是同步函数，但是不管同步异步，都会变成Promise对象
        console.log(value)
    } catch (err) {
        console.log(err)
    }
}
fn()