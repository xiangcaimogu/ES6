//new 命令的原理
//1.创建一个空对象，作为将要返回的对象实例
//2.将这个空对象的原型对象指向了构造函数的
//3.将这个实例对象的值赋值给函数内部的this关键字
//4.执行构造函数
function Person(name) {
    this.name = name
}
var p1 = new Person()
console.log(p1.__proto__ === Person.prototype)
console.log(Person.prototype)