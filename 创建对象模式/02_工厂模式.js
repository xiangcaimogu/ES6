//套路：通过工厂函数动态创建对象并返回
// 适用场景：需要创建多个对象
// 缺点：对象没有一个具体的类型，都是Object ==>自定义构造函数模型可以区分类型

function creatPerson(name,age){//返回一个对象的函数===》工厂函数
    let a=0
    var obj={
        name:name,
        age:age,
        setName:(name)=>{
            this.name=name
            return a++
        }
    }
    return obj //return 出去一个对象，对象里面又有函数，函数内部a变量引用父函数的变量a,产生闭包
}

var p1=creatPerson('Yom',78)
console.log(p1.setName('jack'))
console.log(p1.setName('jack'))
var p2=creatPerson('asm',78)
console.log(p1 instanceof Object)
console.log(p2 instanceof Object)


function creatPerson(name,age){
    let a=0
    let setName=(name)=>{
        this.name=name
        return a++
    }
    var obj={
        name:name,
        age:age,
        setName:setName
    }
    return obj //return 出去一个对象，对象里面又有函数，函数内部a变量引用父函数的变量a,产生闭包
}