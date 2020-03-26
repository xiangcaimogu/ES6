
    // 变量的解构赋值
    // =====数组的解构赋值
    // 基本用法
    // ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

    // 以前，为变量赋值，只能直接指定值。

    let a = 1;
    let b = 2;
    let c = 3;
    // ES6允许写成下面这样。

    let [a, b, c] = [1, 2, 3];
    // 上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3

    let [, , third] = ["foo", "bar", "baz"];
    third // "baz"

    let [x, , y] = [1, 2, 3];
    x // 1
    y // 3

    let [head, ...tail] = [1, 2, 3, 4];
    head // 1
    tail // [2, 3, 4]

    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined
    z // []




    // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

    // 报错
    let [foo] = 1;
    let [foo] = false;
    let [foo] = NaN;
    let [foo] = undefined;
    let [foo] = null;
    let [foo] = {};
    // 上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

    // 对于 Set 结构，也可以使用数组的解构赋值。

    let [x, y, z] = new Set(['a', 'b', 'c']);
    x // "a"
    // 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。





    //=====对象的解构赋值
    // 解构不仅可以用于数组，还可以用于对象。

    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
    // *****对象的解构与数组有一个重要的不同。
    // *****数组的元素是按次序排列的，变量的取值由它的位置决定；
    // *****而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。



    let { bar, foo } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
    let { baz } = { foo: "aaa", bar: "bbb" };
    baz // undefined
    // *****上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。
    // 第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined。

    // 如果变量名与属性名不一致，必须写成下面这样。

    var { foo: baz } = { foo: 'aaa', bar: 'bbb' };




    let foo;
    ({ foo } = { foo: 1 }); // 成功
    let baz;
    ({ bar: baz } = { bar: 1 }); // 成功
    // 上面代码中，let命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。



    let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
    // *****也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

    let { foo: baz } = { foo: "aaa", bar: "bbb" };
    baz // "aaa"
    foo // error: foo is not defined
    // 上面代码中，foo是属性，先找到同名属性，baz才是变量。真正被赋值的是变量baz，而不是属性foo。




    // 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
    // 报错
    let { foo: { bar } } = { baz: 'baz' };
    // 上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。
    // 原因很简单，因为foo这时等于undefined，再取子属性就会报错，请看下面的代码。

    let _tmp = { baz: 'baz' };
    _tmp.foo.bar // 报错



    // =====数值和布尔值的解构赋值
    // ******解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
    let { toString: s } = 123;
    //这边相当于把123转为Number对象
    //let {toString:s} = new Number()
    // New Number()对象的原型上面有toSring()这个属性所以变量 s = toString()方法
    s === Number.prototype.toString // true
    let { toString: s } = true;
    s === Boolean.prototype.toString // true
    //类似与
    // 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
    const { SourceMapConsumer, SourceNode } = require("source-map");






    // 用途
    // 变量的解构赋值用途很多。

    // （1）交换变量的值

    let x = 1;
    let y = 2;

    [x, y] = [y, x];
    // 上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。

    // （2）从函数返回多个值

    // 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

    // 返回一个数组

    function example() {
      return [1, 2, 3];
    }
    let [a, b, c] = example();

    // 返回一个对象

    function example() {
      return {
        foo: 1,
        bar: 2
      };
    }
    let { foo, bar } = example();
    // （3）函数参数的定义

    // 解构赋值可以方便地将一组参数与变量名对应起来。

    // 参数是一组有次序的值
    function f([x, y, z]) { ... }
    f([1, 2, 3]);

    // 参数是一组无次序的值
    function f({ x, y, z }) { ... }
    f({ z: 3, y: 2, x: 1 });
    // （4）提取JSON数据

    // 解构赋值对提取JSON对象中的数据，尤其有用。

    let jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;

    console.log(id, status, number);
    // 42, "OK", [867, 5309]
    // 上面代码可以快速提取 JSON 数据的值。

    // （5）函数参数的默认值

    jQuery.ajax = function (url, {
      async = true,
      beforeSend = function () { },
      cache = true,
      complete = function () { },
      crossDomain = false,
      global = true,
      // ... more config
    }) {
      // ... do stuff
    };
    // 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

    // （6）遍历Map结构

    // 任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }
    // first is hello
    // second is world
    // 如果只想获取键名，或者只想获取键值，可以写成下面这样。

    // 获取键名
    for (let [key] of map) {
      // ...
    }

    // 获取键值
    for (let [, value] of map) {
      // ...
    }
