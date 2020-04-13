var mult = function () {
    var cache = {};
    var calculate = function () {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            sum = sum + arguments[i]
        }
        return sum
    }
    return function () {
        var args = Array.prototype.join.call(arguments, ',')
        if (args in cache) {
            return cache[args]
        }
        console.log(cache)
        return cache[args] = calculate.apply(null, arguments)
        //return cache[args] = calculate.apply(null, [1,2,3,4,8])
        //apply第二个参数是一个数组，目的是为了让函数calculate接收的参数是(1,2,3,4,8)
        //和下面的解构赋值的目的是一样的
        return cache[args] = calculate(...arguments)
    }
}()
console.log(mult(1, 2, 3, 4, 8))
// console.log(mult(1, 2, 3, 4, 8))
// console.log(mult(1, 2, 3, 4, 8, 9))
// console.log(mult(1, 2, 3, 4, 8, 9, 1))