

// 1.将函数作为另一个函数的返回值

function fn1(){
    var a =2;
    //执行一次fn1时，此时闭包已经产生（函数提升，内部函数对象已经创建了）
    function fn2(){
        a++
    }
    return fn2
}

// 只要执行一次fn1,就会创建一个函数上下文，创一个内部对象，内部函数引用了父函数的变量，产生一个闭包
var f=fn1() //产生闭包
f()// 这边只是执行内部函数，不会产生闭包
f()// 再次执行f(),直接执行函数fn2,fn1不会执行，所以变量a就不会初始化为2
// fn1()//再次执fn1,就会再次创建一个函数上下文，又产生一个闭包

//*****重点：外部函数调用几次就产生几个闭包 */





// 2.将函数作为实参传递给另一个函数调用

function showDelay(msg,time){

    setTimeout(function(){
        console.log(msg)
    },time)

}
showDelay('asd',3000)