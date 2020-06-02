// 这个上来就首先执行一次
function throttle(func, wait) {
    let context, args;
    //之前的时间戳
    args = arguments
    let old = 0;
    return function () {
        context = this;
        //获取当前的时间戳
        let now = new Date().valueOf()
        if (now - old > wait) {
            func.apply(context, args)
            old = now
        }
    }
}


//这个上来就需要等待时间才去执行
// function throttle(func, wait) {
//     let context, args, timeout;
//     //之前的时间戳
//     args = arguments
//     let old = 0;
//     return function () {
//         context = this;
//         //获取当前的时间戳
//         if (!timeout) {
//             timeout = setTimeout(() => {
//                 timeout = null //只要执行了计时器，timeout=null;==>如果timeout一直存在但没有执行，那就if为false,直到定时器执行了，才为null，生成新的定时器
//                 func.apply(this, args)
//             }, wait)
//         }

//     }
// }

let container = document.querySelector('#container')
let count = 0
function doSomething(e) {
    console.log(this)
    // 1.怎么样让doSomething的this指向container，也就是指向调用debounce的对象
    console.log(e)
    // 2.怎么样获得事件对象e
    container.innerHTML = count++
}
container.onclick = throttle(doSomething, 2000)