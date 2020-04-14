//套路：通过工厂函数动态创建对象并返回
// 适用场景：需要创建多个对象
// 缺点：对象没有一个具体的类型，都是Object ==>自定义构造函数模型可以区分类型

function creatPerson(name,age){//返回一个对象的函数===》工厂函数
    var obj={
        name:name,
        age:age,
        setName:(name)=>{
            this.name=name
        }
    }
    return obj
}

var p1=creatPerson('Yom',78)
var p2=creatPerson('asm',78)
console.log(p1 instanceof Object)
console.log(p2 instanceof Object)