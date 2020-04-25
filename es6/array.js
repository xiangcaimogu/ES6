//ES5
let arr = [1, -2, 3, 4, -5]
// forEach()，用于遍历数组,//*****无返回值,通过第三个属性改变原数组
arr.forEach(function (item, index, array) {
    array[index] = item * 2;
});
console.log(arr);   // [2,-4,6,8,-10]


// 二、map()，用于遍历数组，//*****返回处理之后的新数组
var newArr = arr.map(function (item, index, array) {
    return item * 2;
});
console.log(newArr);   // [2,-4,6,8,-10]

// 可以看到，该方法与forEach()的功能类似，只不过map()具有返回值，会返回一个新的数组，
// 这样处理数组后也不会影响到原有数组。


// 三、every()，用于判断数组中的每一项元素是否都满足条件，返回一个布尔值
var isEvery = arr.every(function (item, index, array) {
    return item > 0;
});
console.log(isEvery);   // false
// 可以看到，示例中是要判断数组arr中的元素是否都为正数，很显然不是，所以该方法最终返回false。


// 四、some()，用于判断数组中的是否存在满足条件的元素，返回一个布尔值
var isSome = arr.some(function (item, index, array) {
    return item < 0;
});
console.log(isSome);   // true
// 可以看到，该方法与every()类似，示例中是要判断数组arr中是否存在负数元素，很显然存在，所以该方法最终返回true。


// 五、filter()，用于筛选数组中满足条件的元素，返回一个筛选后的新数组
var minus = arr.filter(function (item, index, array) {
    return item < 0;
});
console.log(minus);   // [-2, -5]
// 可以看到，示例中是要筛选出数组arr中的所有负数，所以该方法最终返回一个筛选后的新数组[-2, -5]。
// filter的callback函数需要返回布尔值true或false. 如果为true则表示通过啦！如果为false则失败。
// filter为“过滤”、“筛选”之意。指数组filter后，返回过滤后的新数组。用法跟map极为相似
var data = [0, 1, 2, 3];
var arrayFilter = data.filter(function(item) {
    return item;
});
console.log(arrayFilter); // [1, 2, 3]

let arr = [12, 5, 8, 99, 27, 36, 75, 11];
let result = arr.filter(item => {
    if (item % 3 == 0) {
        return true;
    } else {
        return false;
    }
});
console.log(result);


// 补充： 以上五大方法除了传递一个匿名函数作为参数之外，还可以传第二个参数，该参数用于指定匿名函数内的this指向，例如：
// 只传一个匿名函数
arr.forEach(function (item, index, array) {
    console.log(this);  // window
});
// 传两个参数
arr.forEach(function (item, index, array) {
    console.log(this);  // [1, -2, 3, 4, -5]
}, arr);

// ① forEach()无返回值，map()和filter()返回新数组，every()和some()返回布尔值
// ② 匿名函数中this指向默认为window，可通过传第二参数来更改之
// ③ 五种遍历方法均为ES5方法



//ES6
Array.from()
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

// 下面是一个类似数组的对象，Array.from将它转为真正的数组。

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
// 实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。


// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
    console.log(p);
});

// arguments对象
function foo() {
    var args = Array.from(arguments);
    // ...
}
// 上面代码中，querySelectorAll方法返回的是一个类似数组的对象，可以将这个对象转为真正的数组，再使用forEach方法。
// 只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组。

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
// 上面代码中，字符串和Set结构都具有Iterator接口，因此可以被Array.from转为真正的数组。


// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。

// arguments对象
function foo() {
    var args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]





// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]



// 例子：下面的例子是取出一组DOM节点的文本内容。

let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);//spans.map(s => s.textContent)返回一个新数组给names1

// Array.from()
let names2 = Array.from(spans, s => s.textContent)


// 例子：下面的例子将数组中布尔值为false的成员转为0。

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]




// 数组实例的find()和findIndex()
// 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，
// 直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined

[1, 4, -5, 10].find((n) => n < 0)
// -5
// 上面代码找出数组中第一个小于0的成员。

[1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
}) // 10
// 上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。




// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，
//如果所有成员都不符合条件，则返回-1。

[1, 5, 10, 15].findIndex(function (value, index, arr) {
    return value > 9;
}) // 2
// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

// 另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))






// 数组实例的fill()
// fill方法使用给定值，填充一个数组。

['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
// 上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
// 上面代码表示，fill方法从1号位开始，向原数组填充7，到2号位之前结束






// 数组实例的entries()，keys()和values()
// ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。
// 它们都返回一个//*****遍历器对象（详见《Iterator》一章），//*****可以用for...of循环进行遍历，
// 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"
// 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']





// 数组实例的includes()
// Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。

[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
// 该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
// 没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。

if (arr.indexOf(el) !== -1) {
    // ...
}
// indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。

[NaN].indexOf(NaN)
// -1
// includes使用的是不一样的判断算法，就没有这个问题。

[NaN].includes(NaN)







// ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。

forEach(), filter(), every() 和some()//都会跳过空位。
map()//会跳过空位，但会保留这个值
join(), toString()//会将空位视为undefined，而undefined和null会被处理成空字符串。
// forEach方法
[, 'a'].forEach((x, i) => console.log(i)); // 1



// map方法
[, 'a'].map(x => 1) // [,1]
// 这里的map不是“地图”的意思，而是指“映射”。[].map(); 基本用法跟forEach方法类似

// filter方法
['a', , 'b'].filter(x => true) // ['a','b']

// every方法
[, 'a'].every(x => x === 'a') // true

// some方法
[, 'a'].some(x => x !== 'a') // false


// join方法
[, 'a', undefined, null].join('#') // "#a##"

// toString方法
[, 'a', undefined, null].toString() // ",a,,"




// ES6则是明确将空位转为undefined。

// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

Array.from(['a', , 'b'])
// [ "a", undefined, "b" ]
// 扩展运算符（...）也会将空位转为undefined。

[...['a', , 'b']]
// [ "a", undefined, "b" ]

// copyWithin()会连空位一起拷贝。
[, 'a', 'b', ,].copyWithin(2, 0) // [,"a",,"a"]

fill()//会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]
for...of//循环也会遍历空位。

let arr = [, ,];
for (let i of arr) {
    console.log(i);
}
// undefined
// undefined


entries() 、keys() 、values() 、find()和findIndex()//会将空位处理成undefined。

// entries()
[...[, 'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[, 'a'].keys()] // [0,1]

// values()
[...[, 'a'].values()] // [undefined,"a"]

// find()
[, 'a'].find(x => true) // undefined

// findIndex()
[, 'a'].findIndex(x => true) // 0