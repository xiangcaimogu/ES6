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
// 改变函数fn()this的指向
//fn.apply(a)
console.log(a.num); //1
