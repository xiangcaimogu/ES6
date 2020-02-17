//对象字面量
//new构造函数
var b = new Object;
b.name = "ss";
b.age = 55;
//对象字面量
var c = {
    name: 'kk',
    age: 2
}
var e = {
    name: 'kk',
    age: 2
}
var r = {
    name: 'kk',
    age: 2
}
var t = {
    name: 'kk',
    age: 2
}
//工厂模式
//能创建多个类似的对象
//问题：没有解决对象识别问题
function createPerson(name) {
    var a = new Object;
    a.name = name;
    a.age = age;
    a.sayname = function () {
        console.log(this.name)
    }
    return a;
}
var p1 = createPerson("jj")
var p2 = createPerson("jj")
p1.sayname()

//构造函数模式
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayname = function(){
        console.log(this.name)
    }
}
var man = new Person("sd", 56)
var woman = new Person("ee", 8)
console.log(man.sayname===woman.sayname)
//构造函数拓展模式
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayname =sayname
}
function sayname(){
    console.log(this.name)
}
var man = new Person("sd", 56)
var woman = new Person("ee", 8)
console.log(man.sayname===woman.sayname)

//寄生构造函数模式
function Person(name,age) {
    var a = new Object;
    a.name = name;
    a.age = age;
    a.sayname = function () {
        console.log(this.name)
    }
    return a;
}
var man = new Person("sd", 56)
var woman = new Person("ee", 8)

//组合模式(重要)
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype={
    constructor:Person,
    sayname:function(){
        console.log(this.name)
    }
}
var man = new Person("sd", 56)
var woman = new Person("ee", 8)
man.sayname()