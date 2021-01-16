// 1.使用函数内部的变量在函数执行完后，仍然可以存活在内存中，因为闭包函数的closure对象引用着，只要闭包函数没被释放
//2.让函数外部可操作(读写)函数内部的数据(变量/函数)

// 问题：1.函数fn1()执行完后，函数内部声明的局部变量是否存在？
//      2.在函数外能直接访问函数内部的局部变量么？

function fn1(){
    var a =2;
    function addA(){ //返回出去的闭包函数 可以操作函数内部的数据，外部只能a++
        a++
    }
    return addA//返回的是地址
}
// 正常情况fn1执行完 a会被释放，但是由于闭包对象closure也引用着
var f= fn1() //**********f是全局变量会一直在内存中，一直引用着addA(),闭包函数addA一直得不到释放,closure对象里的a就一直被引用*** */ 




function fun1(){
    let a=0;
    function  fun2(){
        a++
    }
    function fun3(){
        a--
    }
    return {fun2,fun3}
}
var y =fun1()