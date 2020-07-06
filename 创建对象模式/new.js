//new 命令的原理
function Person(name) {
    this.name = name
}
var p1 = new Person()
console.log(p1.__proto__ === Person.prototype)
console.log(Person.prototype)

// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
// 1、创建一个空的简单JavaScript对象（即{}）；
// 2、链接该对象（即设置该对象的构造函数）到另一个对象 ；
// 3、将步骤1新创建的对象作为this的上下文 ；
// 4、如果该函数没有返回对象，则返回this。

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

Car.prototype = {
    getMake: function () {
        return this.make
    }
}

var car = new Car('Eagle', 'Talon TSi', 1993)
conosole.log(car)

//new关键字在构造函数内部所作以下四步
//第一步 创建空对象
var obj = {}
// 第二部：链接该对象到另一个对象(原型链)
// 设置原型链
obj.__proto__ = Car.prototype
//第三步：将步骤一新创建的对象作为this的上下文
// this指向obj对象
Car.apply(obj, ['Eagle', 'Talon TSi', 1993])
console.log(obj)
//第四步：如果该函数(Car构造函数)没有返回值，则返回this
// 重点：这里的this有三个属性值this.make;this.model;this.year,第三步通过apply，让this指向obj，所以this对象就是obj对象
// 因为 Car() 没有返回值，所以返回obj
return obj
// 以上四步是new关键字在构造函数内部所作的四步
car = obj
car.getMake() // 'Eagle'





//重点：需要注意的是如果 Car() 有 return 则返回 return的值
var rtnObj = {}
function Car(make, model, year) {
    // todo
    // ...
    //返回一个对象
    return rtnObj
}

var car = new Car('Eagle', 'Talon TSi', 1993)
console.log(car === rtnObj) // true
console.log(car) //{}空对象
