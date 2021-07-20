function Person(name) {
    this.name = name
}
var p1 = new Person("jj")
console.log(p1)
console.log(Person.prototype)//这个原型对象里面包含了:constructor 和__proto__
// {constructor: ƒ}
//      constructor: ƒ Person(name)
//      __proto__: Object


//实例对象没有原型prototype属性
//实例对象都有__proto__属性：指向构造函数的原型对象(prototype);
// 原型对象里面包含了构造函数的方法(constructor)和__proto__,只要是对象就有__proto__属性
// 原型对象也有__proto__指向上一级的原型对象，形成原型链。



console.log(p1.__proto__)
//p1.__proto__指向了原型对象prototype;
// prototype对象里面也包含了constructor和__proto__，__proto__再次指向Object的prototype

// __proto__:
//     constructor: ƒ Person(name)
//     __proto__: Object



// 实例.__proto__ === 原型

// 原型.constructor === 构造函数

// 构造函数.prototype === 原型
// 这条线其实是是基于原型进行获取的，可以理解成一条基于原型的映射线
// 例如: 
// const o = new Object()
// o.constructor === Object   --> true
// o.__proto__ = null;
// o.constructor === Object   --> false   说明实例的constructor也是继承原型来的
// 实例.constructor === 构造函数