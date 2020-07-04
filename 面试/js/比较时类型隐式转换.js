// ==比较时
console.log(null == undefined) //true
console.log(NaN==NaN) // false
// == 两个等号符进行比较时都会先转为数字

console.log([10] == 10) //true
[10].toString() // '10'
Number("10") //10

console.log(1 == true)
console.log(0 == false)




var a = {
    i: 0,
    toString() {
        return ++this.i;
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log('条件成立');
}

/* var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
    console.log('条件成立');
} */


/* 数据劫持实现 */
/* var i = 0;
Object.defineProperty(window, 'a', {
    get() {
        return ++i;
    }
});
if (a == 1 && a == 2 && a == 3) {
    console.log('条件成立');
} */

/* var a = 0;
Object.defineProperty(window, 'a', {
    get() {
        // Uncaught TypeError: Cannot redefine property: a
        // defineProperty GETER拦截器中不能再次获取当前属性
        return ++a;
    }
});
console.log(a); */