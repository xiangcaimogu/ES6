//JS引擎首先必须先执行所有的初始化同步代码(stack)
//每次准备取出第一个宏任务执行前，都要将微任务一个一个的取出执行

// event queue 异步事件队列
// 分 宏任务和微任务
// 先是微任务再是宏任务

// setTimeout和事件绑定 xhr是宏任务
//async promise是微任务

setTimeout(()=>{
    console.log('setTimeout')
},0)

function fn(){
    return new Promise(resolve=>{
        resolve('Promise')
    })
}
fn().then(value=>{
    console.log(value)
})