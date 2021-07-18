obj={
    name: '小马哥',
    age:48,
    hobby:['song','freely'],
    friend:{
        name:"艾斯",
        age:56,
        hobby:'fire',
        friend:{
            name: '红发',
            age:10,
            hobby:'play'
        }
    }
}
function deepCopy(to ,from){
    for( let key in from ){
        if(from.hasOwnProperty(key)){
            if(from[key] && typeof from[key] === 'object'){
                to[key] = from[key].constructor === 'Array'? [] : {}
                to[key] = deepCopy(to[key],from[key])

            }else{
                to[key] = from[key];
            }
        }
    }
    return to;
}
var newObj = deepCopy({},obj)
obj.age = 90;
//改变原值拷贝之后的值是没有任何改变的
console.log(obj)
//深拷贝之后完全与之前的老死不相往来，没有关系
console.log(newObj)

// 判断数组和对象类型的方法
//1. objectName instanceof Array
// var a = [];
// var b = {};
// var c= function(){};
// console.log(a instanceof Array); // true
// console.log(a instanceof Object); // true  数组也是对象
// console.log(a instanceof Function); // false  
// console.log(b instanceof Array); // false
// console.log(b instanceof Object); // true
// console.log(b instanceof Function); // false
// console.log(c instanceof Array); // false
// console.log(c instanceof Object); // true 函数也是对象
// console.log(c instanceof Function); // true

// 2.objectName.constructor == Array   类型转换
// console.log(a.constructor); // ƒ Array() { [native code] }
// console.log(b.constructor); // ƒ Object() { [native code] }

// 3.Array.isArray(objectName);
// console.log(Array.isArray([])); // true
// console.log(Array.isArray({})); // false
// console.log(Array.isArray(null)); // false
// 4.Object.prototype.toString.call(objectName)