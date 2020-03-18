//AOP 面向切片编程，把原来代码切成片，在中间加上我自己的代码，
//装饰器  扩展原有的方法 重写原有的方法

function say(){
    console.log('say')
}
Function.prototype.before = function (fn){
    let that = this
    return function (){
        fn()
        that(...arguments)
    }
}
let newFn = say.before(function(){
    console.log('遗言')
})
newFn('我')