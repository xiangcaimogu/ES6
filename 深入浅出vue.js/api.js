VM.$nextTick()

//1.改变数据
vm.message = 'changed'

//2.想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//3.这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    console.log(vm.$el.textContent) //可以得到'changed'
})

// 1.首先修改数据，这是同步任务。同一事件循环的所有的同步任务都在主线程上执行，形成一个执行栈，此时还未涉及 DOM 。
//  Vue开启一个异步队列(存放watcher)，并缓冲在此事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。

// 上图中第二块：
// 同步任务执行完毕，开始执行异步 watcher 队列的任务，更新 DOM 。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel 方法，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。

// 上图中第三块：
// 下次 DOM 更新循环结束之后，此时通过 Vue.nextTick 获取到改变后的 DOM 。通过 setTimeout(fn, 0) 也可以同样获取到。


// 原文
//在 Vue.js 中，当状态发生变化时，watcher 会得到通知，然后触发虚拟 DOM 的渲染流程。而 watcher 触发渲染这个操作并不是同步的，
//而是异步的。Vue.js 中有一个队列，每当需要渲染 时，会将 watcher 推送到这个队列中，在下一次事件循环中再让 watcher 触发渲染的流程
// 重点：vue状态发生改变，Vue开启一个异步队列来存放watcher，当前的主线程执行栈执行完，会执行异步队列

// 1.为什么 Vue.js 使用异步更新队列
// 我们知道 Vue.js 2.0 开始使用虚拟 DOM 进行渲染，变化侦测的通知只发送到组件，组件内
// 用到的所有状态的变化都会通知到同一个 watcher,然后虚拟 DOM 会对整个组件进行比对 (diff )并更 改 D0M也就是说，
// 如果在同一轮事件循环中有两个数据发生了变化，那么组件的 watcher 会收到两份通知，从而进行两次渲染。
// 事实上，并不需要渲染两次，虚拟 DOM 会对整 个组件进行渲染，所以只需 要等所有状态都修改完毕后，一次性将整个组件的 DOM 渲染到最新 即可。 
// 要解决这个问题，Vue.js 的实现方式是将收到通知的 watcher 实例添加到队列中缓存起来， 并且在 添加到队列之前检查其中是否已经存在相同的 watcher,只有不存在时（重点：组件内用到的所有状态的变化都会通知到同一个 watcher），才将 watcher 实例添加到队列中。
// 然后在下一次事件循环(eventloop)中，Vue.js 会让队列中的 watcher 触发 渲染流程并清空队列。这样就 可以保证即便在同一事件循环中有两个状态发生改变，watcher 最 后也只执行一次渲染流程