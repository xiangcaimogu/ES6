//理解这句话，就理解了闭包
// 当函数可以记住并访问所在的词法作用域时，就产生了闭包，
// 即:使函数是在当前词法作用 域之外执行。

function foo() {
    var a = 2;

    function bar() {
        console.log(a); // 2     
    }
    bar();
}

// 这段代码看起来和嵌套作用域中的示例代码很相似。基于词法作用域的查找规则，函数 bar() 可以访问外部作用域中的变量 a（这个例子中的是一个 RHS 引用查询）。
// 这是闭包吗？
// 技术上来讲，也许是。但根据前面的定义，确切地说并不是。我认为最准确地用来解释 bar() 对 a 的引用的方法是词法作用域的查找规则，而这些规则只是闭包的一部分。（但却 是非常重要的一部分！）
function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz();
// 函数bar是在当前词法作用 域之外执行
// 也就是说foo函数执行创建的上下文中的函数bar一直被当前词法作用域以外的变量引用着，变量baz不销毁，foo的函数上下文就不会被回收
// 内部函数bar执行完，它的上下文会被垃圾回收机制销毁

// 函数 bar() 的词法作用域能够访问 foo() 的内部作用域。然后我们将 bar() 函数本身当作 一个值类型进行传递。在这个例子中，我们将 bar 所引用的函数对象本身当作返回值。
// 在 foo() 执行后，其返回值（也就是内部的 bar() 函数）赋值给变量 baz 并调用 baz()，实 际上只是通过不同的标识符引用调用了内部的函数 bar()。

//*****/ bar() 显然可以被正常执行。但是在这个例子中，它在自己定义的词法作用域以外的地方 执行。

// 在 foo() 执行后，通常会期待 foo() 的整个内部作用域都被销毁，因为我们知道引擎有垃 圾回收器用来释放不再使用的内存空间。由于看上去 foo() 的内容不会再被使用，所以很 自然地会考虑对其进行回收。
// 而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此 没有被回收。谁在使用这个内部作用域？原来是 bar() 本身在使用，也就是baz引用着bar()。
// 拜 bar() 所声明的位置所赐，它拥有涵盖 foo() 内部作用域的闭包，使得该作用域能够一 直存活，以供 bar() 在之后任何时间进行引用。
// bar() 依然持有对该作用域的引用，而这个引用就叫作闭包

// 当然，无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到 闭包。
function foo() {
    var a = 2;
    function baz() {
        console.log(a); // 2     
    }
    bar(baz);
}
function bar(fn) {
    fn(); // 妈妈快看呀，这就是闭包！
    //**** */ 这边相当于形参fn=baz //形成闭包
    //**** */ fn () :这句话相当于执行闭包
    // 但是这个闭包只局限于bar函数内，bar函数执行完被销毁 ，也就相当于内部形参fn销毁，闭包也就消失
}
// 把内部函数 baz 传递给 bar，当调用这个内部函数时（现在叫作 fn），fn涵盖的 foo() 内部 作用域的闭包就可以观察到了，因为它能够访问 a。
// 传递函数当然也可以是间接的。


var fn;
function foo() {
    var a = 2;
    function baz() {
        console.log(a++);
    }
    fn = baz; // 2.将 baz 分配给全局变量,形成闭包
}
function bar() {
    fn(); // 妈妈快看呀，这就是闭包！
}

foo(); //*****1.执行foo()就形成了闭包

bar(); //**** */ 这里只是执行闭包函数
// *****无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用 域的引用，无论在何处执行这个函数都会使用闭包。

// ========================================================================

/**
 * 循环与闭包
 */
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}
// 仔细想一下，这好像又是显而易见的，延迟函数的回调会在循环结束时才执行。事实上， 
// 当定时器运行时即使每个迭代中执行的是 setTimeout(.., 0)，所有的回调函数依然是在循 环结束后才会被执行，因此会每次输出一个 6 出来
// 缺陷是我们试图假设循环中的每个迭代在运行时都会给自己“捕获”一个 i 的副本。但是 根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各个迭代中分别定义的， 但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个 i。
// 这样说的话，当然所有函数共享一个 i 的引用。循环结构让我们误以为背后还有更复杂的 机制在起作用，但实际上没有。如果将延迟函数的回调重复定义五次，完全不使用循环， 那它同这段代码是完全等价的。
for (var i = 1; i <= 5; i++) {
    (function () {
        setTimeout(function timer() {
            console.log(i);
        }, i * 1000);
    })();
}
// 这样能行吗？试试吧，我等着你
// 我不卖关子了。这样不行。但是为什么呢？我们现在显然拥有更多的词法作用域了。的确 每个延迟函数都会将 IIFE 在每次迭代中创建的作用域封闭起来。
// 如果作用域是空的，那么仅仅将它们进行封闭是不够的。仔细看一下，我们的 IIFE 只是一 个什么都没有的空作用域。它需要包含一点实质内容才能为我们所用。
// 它需要有自己的变量，用来在每个迭代中储存 i 的值：
for (var i = 1; i <= 5; i++) {
    (function () {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })();
}
// 行了！它能正常工作了！。
// 可以对这段代码进行一些改进：
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })(i);
}



//  =======================================================================
/**
 * module 模块
 */

function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }

    function doAnother() {
        console.log(another.join(" ! "));
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule();//形成闭包

foo.doSomething(); // cool foo.doAnother(); // 1 ! 2 ! 3


// 上一个示例代码中有一个叫作 CoolModule() 的独立的模块创建器，可以被调用任意多次， 每次调用都会创建一个新的模块实例。
// 当只需要一个实例时，可以对这个模式进行简单的 改进来实现单例模式：
var foo = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join(" ! "));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    }
})();

foo.doSomething(); // cool  foo.doAnother(); // 1 ! 2 ! 3



// 大多数模块依赖加载器 / 管理器本质上都是将这种模块定义封装进一个友好的 API。这里 并不会研究某个具体的库，为了宏观了解我会简单地介绍一些核心概念：


var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }

    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    };
})();

MyModules.define("bar", [], function () {
    function hello(who) {
        return "Let me introduce: " + who;
    }

    return { hello: hello };
});

MyModules.define("foo", ["bar"], function (bar) {
    var hungry = "hippo";
    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }

    return { awesome: awesome };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("hippo")); // Let me introduce: hippo 

foo.awesome(); // LET ME INTRODUCE: HIPPO
