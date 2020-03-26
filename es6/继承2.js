class User {
  constructor(name, pass) {
    this.name = name;
    this.pass = pass;
    this._age = 100
  }
  get a() {// 原型上的属性 都是实例属性 可以通过实例来调用
    return this._age
  }
  set a(newAge) {
    this._age = newAge
  }
  static get flag() {// es6中的静态属性  添加static关键字的属性只能通过类调用
    return 'animal'
  }
  showName() {//这些都是原型上的方法
    console.log(this.name);
  }
  showPass() {
    console.log(this.pass);
  }
}
let p1 = new User('zhu', '123')
p1.a = 90
console.log(User.flag)
console.log(p1.a)

//es6继承
// extends做了已下3件事
//VipUser.__proto__=User
//User.call(this)
//User.prototype=Object.create(Animal.prototype)
class VipUser extends User {//扩展自user
  constructor(name, pass, level) {
    super(name, pass);//在使用this之前，必须调用super//super()获得父级的原型
    //User.call(this)
    console.log(this)
    this.level = level;
  }
  static getflag() {
    return super.flag//静态方法中的super指向的父类
  }
  showPass() {
    super.showPass()
  }
  showLevel() {
    console.log(this.level);
  }
}

var v1 = new VipUser('blue', '123456', 3);

v1.showName();
v1.showPass();
v1.showLevel();
