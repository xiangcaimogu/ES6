//a instanceof A
//nstanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上

function Person(name){
    if(this instanceof Person){
        //this指向了当前实例，外部使用了关键字new
        this.name=name;
    }else{
        //this 指向window 外部没有使用关键字new
        return new Person()
    }
}
var p1= new Person("mkk");
var p1= Person("mkk");