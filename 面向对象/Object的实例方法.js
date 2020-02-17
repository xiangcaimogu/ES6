//返回当前对象的值，默认情况返回对象本身
Object.prototype.valueOf()
var obj= new Object();
console.log(obj.valueOf() === obj)


//返回一个对象的字符串形式
Object.prototype.toString()
var obj2 ={
    a:1
}
console.log(obj2.toString())



//用来判断该对象是否是另一个对象的原型
var o1={}
var o2=Object.create(o1)
var o3=Object.create(o2)
console.log(o2.isPrototypeOf(o3))
console.log(o1.isPrototypeOf(o3))
console.log(Object.prototype.isPrototypeOf({}))
console.log(Object.prototype.isPrototypeOf([]))


//Object.prototype.hasOwnProperty()
//接收一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性，继承来的属性返回false
var obj ={
    a:5
}
console.log(obj.hasOwnProperty("a"))
console.log(obj.hasOwnProperty("b"))
console.log(obj.hasOwnProperty("toString"))