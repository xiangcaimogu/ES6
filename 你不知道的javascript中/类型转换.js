// 4.2.1　ToString 
// 对普通对象来说，除非自行定义，否则 toString()（Object.prototype.toString()）返回 内部属性 [[Class]] 的值（参见第 3 章），如 "[object Object]"。
// 重点：然而前面我们介绍过，如果对象有自己的 toString() 方法，字符串化时就会调用该方法并 使用其返回值。
// 重点：意思就是不管强制转换还是隐式转换为字符串类型都会自动调用自己的toSting()方法
// 重点：数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起 来：
var a = ['as', ['df', 'ui'], 1, 2, 3];

a.toString(); // "as,df,ui,1,2,3"
// 重点：toString() 可以被显式调用，或者在需要字符串化时自动调用





//JSON 字符串化 
// 工具函数 JSON.stringify(..) 在将 JSON 对象序列化为字符串时也用到了 ToString。
// 请注意，JSON 字符串化并非严格意义上的强制类型转换，因为其中也涉及 ToString 的相 关规则，所以这里顺带介绍一下
// 所有安全的JSON 值（JSON-safe）都可以使用JSON.stringify(..) 字符串化。安全的 JSON 值是指能够呈现为有效 JSON 格式的值。
// 为了简单起见，我们来看看什么是不安全的JSON 值。undefined、function、symbol （ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合 JSON 结构标准，支持 JSON 的语言无法处理它们。
// JSON.stringify(..) 在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在 数组中则会返回 null（以保证单元位置不变）。
// 例如：
JSON.stringify(undefined);      // undefined J
SON.stringify(function () { });   // undefined 

JSON.stringify([1, undefined, function () { }, 4]);                                // "[1,null,null,4]" 
JSON.stringify({ a: 2, b: function () { } });                                // "{"a":2}"
// 对包含循环引用的对象执行 JSON.stringify(..) 会出错。
// 重点：如果对象中定义了 toJSON() 方法，JSON 字符串化时会首先调用该方法，然后用它的返回 值来进行序列化。
// 如果要对含有非法 JSON 值的对象做字符串化，或者对象中的某些值无法被序列化时，就 需要定义 toJSON() 方法来返回一个安全的 JSON 值。
var o = {};
var a = {
    b: 42,
    c: o,
    d: function () { }
}; 
o.e = a; // 在a中创建一个循环引用
JSON.stringify( a ); // 循环引用在这里会产生错误

// 自定义的JSON序列化 
a.toJSON = function () {     // 序列化仅包含b     
    return { b: this.b };
};
JSON.stringify(a); // "{"b":42}"
// 很多人误以为 toJSON() 返回的是 JSON 字符串化后的值，其实不然，除非我们确实想要对 字符串进行字符串化（通常不会！）。toJSON() 返回的应该是一个适当的值，可以是任何 类型，然后再由 JSON.stringify(..) 对其进行字符串化。
// 重点：也就是说，toJSON() 应该“返回一个能够被字符串化的安全的 JSON 值”，而不是“返回 一个 JSON 字符串




//toNumber
// 其中 true 转换为 1，false 转换为 0。undefined 转换为 NaN，null 转换为 0
Number(true) //1
Number(undefined) //NaN
Number(null) //0
// 重点：对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型 值，则再遵循以上规则将其强制转换为数字。
// 重点：如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。






//显示解析数字字符串
var a = "42";
var b = "42px";
Number(a);    // 42 
parseInt(a);  // 42 

Number(b);    // NaN 
parseInt(b);  // 42
// 解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止
// 而转换不允许出现非数字字符，否则会失败并返回 NaN
// 
// 从 ES5 开始 parseInt(..) 默认转换为十进制数，除非另外指定。如果你的代码需要在 ES5 之前的环境运行，请记得将第二个参数设置为 10



parseInt(new String("42")); //42
// 因为它的参数也是一个非字符串。如果你认为此时应该将 String 封装对象拆封（unbox） 为 "42"，那么将 42 先转换为 "42" 再解析回 42 不也合情合理吗？

// 这种半显式、半隐式的强制类型转换很多时候非常有用。例如：
var a = {
    num: 21,
    toString: function () {
        return String(this.num * 2);
    }
};
// 重点：将a转换为字符串，先执行valueOf(),在执行toString()
parseInt(a); // 42
// parseInt(..) 先将参数强制类型转换为字符串再进行解析，这样做没有任何问题。因为传 递错误的参数而得到错误的结果，并不能归咎于函数本身。





//显示转换为布尔值
// 和前面讲过的 + 类似，一元运算符 ! 显式地将值强制类型转换为布尔值。

var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;
// 重点：!a先将a字符串转换为布尔值false,但是a转换为布尔值是true，所以在加一个！
!!a;    // true 
!!b;    // true 
!!c;    // true 

!!d;    // false 
!!e;    // false 
!!f;    // false 
!!g;    // false
if (a) {
    console.log('隐式转换字符串a')
} //在 if(..).. 这样的布尔值上下文中，如果没有使用 Boolean(..) 和 !!，就会自动隐式地进 行 ToBoolean 转换。




//隐式强制转化为布尔值
// (1) if (..) 语句中的条件判断表达式。 
// (2) for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。 
// (3) while (..) 和 do..while(..) 循环中的条件判断表达式。 
// (4) ? : 中的条件判断表达式。 
// (5) 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

// ~x 大致等同于 -(x+1)。
let a = 'hello'
if (~a.indexOf("lo")) {    //隐式转换 ：0 转为 false
    console.log("对的")
}



// 4.4.2　字符串和数字之间的隐式强制类型转换
// + 加法
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42
// 这里为什么会得到 "420" 和 42 两个不同的结果呢？通常的理解是，因为某一个或者两个操 作数都是字符串，所以 + 执行的是字符串拼接操作。这样解释只对了一半，实际情况要复 杂得多
var a = [1, 2];
var b = [3, 4];

a + b; // "1,23,4"
// a 和 b 都不是字符串，但是它们都被强制转换为字符串然后进行拼接
// 你或许注意到这与 ToNumber 抽象操作处理对象的方式一样（参见 4.2.2 节）。因为数组的 valueOf() 操作无法得到简单基本类型值，于是它转而调用 toString()。因此上例中的两 个数组变成了 "1,2" 和 "3,4"。+ 将它们拼接后返回 "1,23,4"。
// 简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤可以得到字符串）， 则执行字符串拼接；否则执行数字加法

// 再来看看从字符串强制类型转换为数字的情况。
// - 减法
var a = "3.14";
var b = a - 0;

b; // 3.14
// - 是数字减法运算符，因此 a - 0 会将 a 强制类型转换为数字。也可以使用 a * 1 和 a / 1，因为这两个运算符也只适用于数字，只不过这样的用法不太常见。
// 对象的 - 操作与 + 类似：
var a = [3];
var b = [1];

a - b; // 2
// 为了执行减法运算，a 和 b 都需要被转换为数字，它们首先被转换为字符串（通过强制类型转换toString()），然后再转换为数字