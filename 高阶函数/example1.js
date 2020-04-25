//判断类型 Object.prototype.toString.call()
function isType(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj).includes(type)
    }
}

//包装成一个高阶函数， 批量生成函数

let type = ['String', 'Object', 'Array', 'Null', 'undefined', 'Boolean'];
let fns = {};
type.forEach(type => {
    fns['is' + type] = isType(type)//isType执行返回一个函数
})
//fns的value值都是isType返回的函数
let obj = true
console.log(fns.isBoolean(obj))//再次执行isType返回的函数

//什么叫高阶函数：返回一个函数或者参数是一个函数
//lodash  after