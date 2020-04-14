//自定义构造函数，属性在函数中初始化，方法添加到原型上

function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.setName=function(name){
    this.name=name
}
var p1 = new Person('asd', 58)
var p2 = new Person('wqw', 343)