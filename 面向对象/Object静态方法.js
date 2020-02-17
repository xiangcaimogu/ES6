var arr=[1,2,3,4]
var obj ={
    a:"f",
    b:"s",
    c:"a",
    d:"d",
}
Object.keys(arr)
//获取对象的Key
console.log(Object.keys(arr))
console.log(Object.keys(obj))


Object.getOwnPropertyNames(arr)
//获取原型对象的标准方法
function Fn(){};
var fn = new Fn()
console.log(Object.getPrototypeOf(fn))
console.log(Object.getPrototypeOf(fn)===Fn.prototype)
//空对象的原是Object.prototype
console.log(Object.getPrototypeOf({})===Object.prototype)
//Object.prototype的原型时null
console.log(Object.getPrototypeOf(Object.prototype)===null)
//函数的原型时Function.prototype
console.log(Object.getPrototypeOf(function a(){})===Fnnction.prototype)


//Object.setPrototypeOf()
//接收两个参数，第一个是现有对象，第二个是原型对象
var a ={}
var b ={x:1}
Object.setPrototypeOf(a,b)
console.log(a.x)
console.log(Object.getPrototypeOf(a))


//Object.create()
//一个实例对象生成另一个实例对象
//接收一个对象作为参数，然后以他为原型，返回一个实例对象
var A= {
    hello:function(){
        console.log('hello')
    }
}
var B= Object.create(A);
console.log(Object.getPrototypeOf(B))
B.hello()