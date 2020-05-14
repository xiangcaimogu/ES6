// 在ES5之前，如果属性名是个变量或者需要动态计算，则只能通过 对象.[变量名] 的方式去访问。而且这种动态计算属性名的方式 在字面量中 是无法使用的。 
var p = {
    name: '李四',
    age: 20
}
var attName = 'name';
console.log(p[attName]) //这里 attName表示的是一个变量名。
// 而下面的方式使用时没有办法访问到attName这个变量的。
var attName = 'name';
var p = {
    attName: '李四',  // 这里的attName是属性名，相当于p定义了属性名叫 attName的属性。
    age: 20
}
console.log(p[attName])  // undefined



// 在ES6中，把属性名用[ ]括起来，则括号中就可以引用提前定义的变量。

var attName = 'name';
var p = {
    [attName]: '李四',  // 引用了变量attName。相当于添加了一个属性名为name的属性
    age: 20
}
console.log(p[attName])  // 李四
