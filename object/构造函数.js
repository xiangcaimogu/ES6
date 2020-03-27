//类 (class)就是对象的模板
//js不是基于类的，而是基于构造函数(constructor)和原型链(prototype)

//特点
//1.函数体内使用this关键字，代表了所要生成的对象实例
//2.生成对象，必须要使用new 关键字实例化

function Dog(name,age){
    this.name= name;
    this.age=age;
}
var dog1= new Dog('小黄',2)