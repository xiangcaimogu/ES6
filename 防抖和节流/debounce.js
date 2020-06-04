function debounce(func, wait) {
    let timeout
    return function (e) {
        let vm = this;
        console.log(e)
        let arg=arguments
        console.log(arg)
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(vm,arg)
        }, wait)
        //在wait=1000时，1000毫秒之后才会触发事件func,
        //所以在1000毫秒之内再点击时，首先会learTimeout上一次的定时，上一次的事件就不会被触发
    }
}



let container = document.querySelector('#container')
let count = 0
function doSomething(e) {
    console.log(this)
    // 1.怎么样让doSomething的this指向container，也就是指向调用debounce的对象
    console.log(e)
    // 2.怎么样获得事件对象e
    container.innerHTML = count++
}
const fun=debounce(doSomething, 1000) //生成闭包
container.onclick = fun