// 属性的简洁表示法
// ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}

// 等同于
var baz = {foo: foo};
// 上面代码表明，ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。下面是另一个例子。

function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
// 除了属性简写，方法也可以简写。

var o = {
  method() {
    return "Hello!";
  }
};

// 等同于

var o = {
  method: function() {
    return "Hello!";
  }
};
// 下面是一个实际的例子。

var birth = '2000/01/01';

var Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
// 这种写法用于函数的返回值，将会非常方便。

function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}
// CommonJS模块输出变量，就非常合适使用简洁写法。

var ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {};
}

module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};



// 对象的静态方法
Object.is()
// ES5比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
// 它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

// ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。
// Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
// ES5可以通过下面的代码，部署Object.is。

Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});





Object.assign()
//基本用法
Object.assign
//*****方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
Object.assign//方法的第一个参数是目标对象，后面的参数都是源对象。

//注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
//如果只有一个参数，Object.assign会直接返回该参数。

var obj = {a: 1};
Object.assign(obj) === obj // true
//如果该参数不是对象，则会先转成对象，然后返回。

typeof Object.assign(2) // "object"
//由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。

Object.assign(undefined) // 报错
Object.assign(null) // 报错
//如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。

let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
//其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

var v1 = 'abc';
var v2 = true;
var v3 = 10;

var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
//上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
//上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

Object.assign//拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），
// 也不拷贝不可枚举的属性（enumerable: false）。

Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
//上面代码中，Object.assign要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。

//属性名为Symbol值的属性，也会被Object.assign拷贝。

Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
// 注意点
Object.assign
//*****方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，
// 那么目标对象拷贝得到的是这个对象的引用。

var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
//*****上面代码中，源对象obj1的a属性的值是一个对象，Object.assign拷贝得到的是这个对象的引用。
// 这个对象的任何变化，都会反映到目标对象上面。

// 对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
// 上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。

// 注意，Object.assign可以用来处理数组，但是会把数组视为对象。

Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
//Object.assign({0:1, 1:2, 2:3}, {0:4, 1:5})
// 上面代码中，Object.assign把数组视为属性名为0、1、2的对象，因此源数组的0号属性4覆盖了目标数组的0号属性1。




//*****属性的可枚举性
//对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
// Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
// 描述对象的enumerable属性，称为”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性。

// ES5有三个操作会忽略enumerable为false的属性。
for...in//循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()//：返回对象自身的所有可枚举的属性的键名
JSON.stringify()//：只串行化对象自身的可枚举的属性
// ES6
Object.assign()//，会忽略掉enumerable为false的属性，只拷贝对象自身的可枚举的属性。

// 这四个操作之中，只有for...in会返回继承的属性。
// 实际上，引入enumerable的最初目的，就是让某些属性可以规避掉for...in操作。
// 比如，对象原型的toString方法，以及数组的length属性，就通过这种手段，不会被for...in遍历到。

Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
// 上面代码中，toString和length属性的enumerable都是false，因此for...in不会遍历到这两个继承自原型的属性。

// 另外，ES6规定，所有Class的原型的方法都是不可枚举的。

Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
// 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。
// 所以，尽量不要用for...in循环，而用Object.keys()代替。






Object.setPrototypeOf()
// 下面是一个例子。
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
// 上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。






Object.getPrototypeOf()
// 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

Object.getPrototypeOf(obj);
// 下面是一个例子。

function Rectangle() {
  // ...
}

var rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
// 如果参数不是对象，会被自动转为对象。





Object.keys()
Object.values()
Object.entries()


Object.keys()
// ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
// ES2017 引入了跟Object.keys配套的Object.values和Object.entries，
// 作为遍历一个对象的补充手段，供for...of循环使用。
//*****
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
Object.values()
// *****Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

var obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
// 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

var obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]
// 上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。

// Object.values只返回对象自身的可遍历属性。




// 1）解构赋值

// 对象的解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
// 上面代码中，变量z是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。

// 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。

let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误
// 解构赋值必须是最后一个参数，否则会报错。

let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误
// 上面代码中，解构赋值不是最后一个参数，所以会报错。

// 注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
// 上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。

// 另外，解构赋值不会拷贝继承自原型对象的属性。

let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let o3 = { ...o2 };
o3 // { b: 2 }
// 上面代码中，对象o3是o2的拷贝，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

// 下面是另一个例子。

var o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...{ y, z } } = o;
x // 1
y // undefined
z // 3
// 上面代码中，变量x是单纯的解构赋值，所以可以读取继承的属性；解构赋值产生的变量y和z，
// 只能读取对象自身的属性，y是继承的属性所以只有变量z可以赋值成功。



// Null 传导运算符
// 编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取message.body.user.firstName，安全的写法是写成下面这样。

const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
// 这样的层层判断非常麻烦，因此现在有一个提案，引入了“Null 传导运算符”（null propagation operator）?.，简化上面的写法。

const firstName = message?.body?.user?.firstName || 'default';
// 上面代码有三个?.运算符，只要其中一个返回null或undefined，就不再往下运算，而是返回undefined。

// “Null 传导运算符”有四种用法。

obj?.prop // 读取对象属性
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法的调用
new C?.(...args) // 构造函数的调用
// 传导运算符之所以写成obj?.prop，而不是obj?prop，是为了方便编译器能够区分三元运算符?:（比如obj?prop:123）。