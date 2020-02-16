// 在JavaScript中，对象的属性分为可枚举和不可枚举之分，它们是由属性的enumerable值决定的。
//可枚举性决定了这个属性能否被for…in查找遍历到。

//怎么判断属性是否可枚举
// js中基本包装类型的原型属性是不可枚举的，如Object, Array, Number等，如果你写出这样的代码遍历其中的属性：

var num = new Number();
for(var pro in num) {
    console.log("num." + pro + " = " + num[pro]);
}
//输出是空，这是因为Number中内置的属性是不可枚举的，所以不能被for…in访问到。


//Object对象的propertyIsEnumerable()方法可以判断此对象是否包含某个属性，并且这个属性是否可枚举。
var obj={};
obj.a=123;
console.log(obj.propertyIsEnumerable('a'))
console.log(obj.propertyIsEnumerable('toString'))
for(var key in obj){
    console.log(obj[key])
}
var arr=[1,2,3]
console.log(arr.propertyIsEnumerable('length'))
//二、枚举性的作用

//属性的枚举性会影响以下三个函数的结果：

//for…in

//Object.keys()

//JSON.stringify

//先看一个例子，按如下方法创建kxy对象
function Person() {
    this.name = "KXY";
}
Person.prototype = {
    constructor: Person,
    job: "student",
};
 
var kxy = new Person();
Object.defineProperty(kxy, "sex", {
    value: "female",
    enumerable: false
});

for(var pro in kxy) {
    console.log("kxy." + pro + " = " + kxy[pro]);
  }
  //可以看到除了”sex“之外的属性都遍历到了

  console.log(JSON.stringify(kxy))
  //读取对象本身的可枚举属性，并序列化为JSON对象