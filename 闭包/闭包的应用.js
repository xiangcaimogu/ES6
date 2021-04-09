//闭包的应用：定义一个JS模块
//将所有的数据和功能都封装在函数内部
//只想外暴露一些方法

function myModule() {
    var msg = 'my database'
    function doSomething() {
        console.log('doSomething' + msg.toUpperCase())//产生闭包的条件
    }
    function doOherthing() {
        console.log('doSomething' + msg.toLowerCase())
    }
    return {
        doSomething: doSomething,
        doOherthing: doOherthing
    }
}

var module = myModule();//产生闭包
console.log(module)
debugger
module.doSomething()
debugger