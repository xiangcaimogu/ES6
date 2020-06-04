// 对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说：
function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42



// 隐式丢失 一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默
// 认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。
// 思考下面的代码：
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 函数别名！   var a = "oops, global"; // a 是全局对象的属性 
bar(); // "oops, global"
// 虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。



// 一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：
function foo() {
    console.log(this.a);
}

function doFoo(fn) {     // fn 其实引用的是 foo 
    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a 是全局对象的属性 

doFoo(obj.foo); // "oops, global"
// ****重点***/参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。

function bar(...arg){
    console.log(this.a+'aa'+arg)
}
let obj={
    a:1,
    b:2
}
// let foo = bar.bind(obj)
// foo()

Function.prototype.selfbind=function (){
    let self = this //this就是原函数bar
    let arr=Array.from(arguments)
    let context = arr.shift()
    // let context=[].shift.call(argumnets) //和上一行同等，去除参数第一个值，也就是this需要绑定的上下文
    return function(){
        let arg=Array.from(arguments).concat(arr)
        self.apply(context,arg)
    }
}
let foo = bar.selfbind(obj,5)
foo(9)