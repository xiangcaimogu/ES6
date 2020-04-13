var a = 123;
function fun1(){
    var b= 3;
    function fun2(){
        console.log(b)
    }
    return fun2
}
var res = fun1();
//拿到函数fun1内部的变量；也就是函数外部的作用域能拿到函数内部的变量




function a(){
    var start = 0;
    function b(){
        return start++
    }
    return b
}
//inc引用a()；inc不销毁，a就不会销毁，a不会销毁，b也就不会销毁，start就不会销毁一直不会被释放；
var inc = a()
console.log(inc())
console.log(inc())
console.log(inc())
//释放当前的变量
inc = null





function a(){
    var start = 0;
    function b(){
        return start++
    }
    return b
}
// var inc = a()
// console.log(inc())//0
// console.log(inc())//1
// console.log(inc())//2
//执行完a()()就会释放掉内存
console.log(a()())//0
console.log(a()())//0



function Person(name){
    var age;
    function setage(n){
        age = n
    }
    function getage(){
        return age
    }
    return {
        name:name,
        setage:setage,
        getage:getage
    }
}
//闭包的应用，对函数内部的数据进行操作
 var p1 = Person('lili');
 p1.setage(20);
 console.log(p1.getage())