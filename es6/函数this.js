// 'use strict'

var name="the window";
var obj={
     name:"My object",
     getNameFun:function(){
            // name="asd"
          return function(){
               return this.name;
          }
     }
}
alert(obj.getNameFun()());//the window
//obj调用getNameFun(),getNameFun()在调用return 出来的函数
//所以return 出来的函数this指向的是getNameFun ,但是getNameFun 没有name属性，所以默认指向了window,/****在严格模式下，name属性为undefined*****/
// /*****在严格版中的默认的this不再是window，而是undefined******/。
//这个例子属于下面的情况3说明

//     情况1：如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找。

// 　　情况2：如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。

// 　　情况3：如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象，例子3可以证明，如果不相信，那么接下来我们继续看几个例子。


var o = {
    a:10,
    b:{
        // a:12,
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
// 尽管对象b中没有属性a，这个this指向的也是对象b，因为this只会指向它的上一级对象，不管这个对象中有没有this要的东西。






// 更新一个小问题当this碰到return时

function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
// 再看一个

function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
// 再来

function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子

function fn()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //追梦子
// 什么意思呢？
// 如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例




// new操作符会改变函数this的指向问题，虽然我们上面讲解过了，但是并没有深入的讨论这个问题，网上也很少说，所以在这里有必要说一下。

function fn(){
    this.num = 1;
}
var a = new fn();
//new的作用 
// 创建一个a的实例 
// 改变函数fn()this的指向,指向实例
//fn.apply(a)
console.log(a.num); //1




var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaoming.age; // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了

//在一个方法内部，this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。所以，this.birth可以拿到xiaoming的birth属性。

function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN
// 单独调用函数getAge()怎么返回了NaN？请注意，我们已经进入到了JavaScript的一个大坑里。
// JavaScript的函数内部如果调用了this，那么这个this到底指向谁？
// 答案是，视情况而定！
// 如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象，也就是xiaoming，这是符合我们预期的。
// 如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。
// 更坑爹的是，如果这么写：

var fn = xiaoming.age; // 先拿到xiaoming的age函数
fn(); // NaN
//////////也是不行的！要保证this指向正确，必须用obj.xxx()的形式调用！
// 由于这是一个巨大的设计错误，要想纠正可没那么简单。ECMA决定，在strict模式下让函数的this指向undefined，因此，在strict模式下，你会得到一个错误：

'use strict';

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

var fn = xiaoming.age;
fn(); // Uncaught TypeError: Cannot read property 'birth' of undefined
// fn()相当于window.fn()；this自然就指向了全局
// 这个决定只是让错误及时暴露出来，并没有解决this应该指向的正确位置。
// 有些时候，喜欢重构的你把方法重构了一下：

'use strict';

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
//结果又报错了！原因是this指针只在age方法的函数内指向xiaoming，在函数内部定义的函数，this又指向undefined了！（在非strict模式下，它重新指向全局对象window！）
// 修复的办法也不是没有，我们用一个that变量首先捕获this：

'use strict';

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // 25
//     用var that = this;，你就可以放心地在方法内部定义其他函数，而不是把所有语句都堆到一个方法中。
//



// apply
// 虽然在一个独立的函数调用中，根据是否是strict模式，this指向undefined或window，不过，我们还是可以控制this的指向的！
// 要指定函数的this指向哪个对象，可以用函数本身的apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。
// 用apply修复getAge()调用：
function getAge() {
var y = new Date().getFullYear();
return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
// 另一个与apply()类似的方法是call()，唯一区别是：
// apply()把参数打包成Array再传入；
// call()把参数按顺序传入。
// 比如调用Math.max(3, 5, 4)，分别用apply()和call()实现如下：
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5



   //this
    // 箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。
    // 回顾前面的例子，由于JavaScript函数对this绑定的错误处理，下面的例子无法得到预期结果：

    var obj = {
        birth: 1990,
        getAge: function () {
            var b = this.birth; // 1990
            var fn = function () {
                return new Date().getFullYear() - this.birth; // this指向window或undefined
            };
            return fn();
        }
    };


    // 现在，箭头函数完全修复了this的指向，箭头函数本身没有this，this总是借用上级function的this
    // 箭头本身没有this，借用this，不能用作构造函数
    var obj = {
        birth: 1990,
        name: '小妖精',
        getAge: function () {
            var b = this.birth; // 1990
            console.log(this)
            var fn = () => new Date().getFullYear() - this.birth;
            return fn();
        },
        getName: () => {
            console.log(this)
            var fn = () => this.name;
            return fn();
        }
    };
    console.log(obj.getAge())
    console.log(obj.getName())

    
    // 如果使用箭头函数，以前的那种hack写法：
    var that = this;
    // 就不再需要了。
    // 由于this在箭头函数中已经按照词法作用域绑定了，所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：
    var obj = {
        birth: 1990,
        getAge: function (year) {
            var b = this.birth; // 1990
            var fn = (y) => y - this.birth; // this.birth仍是1990
            return fn.call({ birth: 2000 }, year);
        }
    };
    console.log(obj.getAge(2015))