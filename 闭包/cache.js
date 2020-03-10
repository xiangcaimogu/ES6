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
    }
}()
console.log(mult(1, 2, 3, 4, 8))
console.log(mult(1, 2, 3, 4, 8))
console.log(mult(1, 2, 3, 4, 8, 9))
console.log(mult(1, 2, 3, 4, 8, 9, 1))