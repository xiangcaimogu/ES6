class Cat{
    constructor() {
        this.name = '猫'
    }
 }
 class Garfield {
    constructor() {
        this.name = '加菲猫'
    }
 }
 class Persian {
    constructor() {
        this.name = '波斯猫'
    }
 }
 class Dog{
    constructor() {
        this.name = '狗'
    }
 }
 // 定义成为抽象类，工厂的父类，不接受任何修改
 class Factory {
     constructor(role){
       return this.createModule(role)
     }
     createModule(role){
         return new Error('我是抽象类不要改我，也不要是实例化我')
     }
 }
 // 猫的专卖工厂,需要重写父类那里继承来的返回实例的方法。购买猫的逻辑可以放在找个类中实现。
 class CatFactory extends Factory{
     constructor(role){
       super(role)
     }
     // 重写createFactory的方法
     createModule(role){
         switch(role){
             case '加菲猫':
                 return new Garfield()
             case '波斯猫':
                 return new Persian()
             default:
                 return {}
           }
     }
 }
//  .... 狗、宠物猪、乌龟的都可以重新继承父类Factory。
 var catFac = new CatFactory('波斯猫')
 console.log(catFac)
 