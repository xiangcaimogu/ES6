//套路：自定义构造函数，通过new
//适用场景：需要创建多个类型确定的对象
//缺点：每个对象都有相同的数据，浪费资源

function Person(name, age) {
    this.name = name
    this.age = age
    this.setName = (name) => {
        this.name = name
    }
}


function Student(name, pice) {
    this.name = name
    this.pice = pice
    this.setName = (name) => {
        this.name = name
    }
}

var p1 = new Person('asd', 58)
var s1 = new Student('weqe',456)

console.log(p1 instanceof Person)
console.log(s1 instanceof Student)
