// es5 
getAjax(url,(res)=>{})
//promise
getAjax(url).then(()=>{})
//async await
(async()=>{
    let res = await getAjax(url)
})()
//总结，es5与promise主要区别在写法上不同，可以让回调函数，划分在then()的函数里去执行
// asyncy与promise的主要区别，这种形式的写法在底层编译之后会自动转为promise