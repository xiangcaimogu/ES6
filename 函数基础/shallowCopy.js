//基础数据类型 ：按值传递
var a = 2;
var b = a;
b = 100;
console.log(a)//2
console.log(b)//100
//引用类型：按引用地址传递，只拷贝了地址
var arr = [1, 2, 3]
var newArr= arr
newArr.push(5)
console.log(newArr)
console.log(arr)

// var a= {name:"张三"}
// var b = a;
// b.name="里斯";
// console.log(a)//里斯
// console.log(b)//里斯

var a= {name:"张三"}
var b={};
b.name = a.name;
b.name="里斯";
console.log(a)//张三
console.log(b)//里斯

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

function shadowCopy(to, from){
    for (let key in from){
        to[key] = from[key]
    }
    return to
}
var newObj =shadowCopy({},obj);
newObj.name= '白胡子';
newObj.friend.name = "鹰眼";
console.log(obj)
console.log(newObj)
//浅拷贝时，遇到基础数据类型会直接拷贝，当遇到引用类型时没有递归一一拷贝，只是引用了地址
//总结：引用类型需要深拷贝就需要拷贝里面的每一个属性(属是基础数据类型)