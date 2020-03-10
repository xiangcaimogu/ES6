//()是表达式
//计数器
var add = (function(){
    var count = 0
    return function(){
        return ++ count
    }
})()
console.log(add())
console.log(add())
console.log(add())