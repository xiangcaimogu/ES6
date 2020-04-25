//()是表达式
//打车
var car = (function () {
    var total = 0;
    var start = 13//起步价
    
    pice = (n) => {
        if (n <= 3) {
            total = start
        } else {
            total = start + (n - 3) * 5
        }
        return total
    }
    duche = (flag) => {
        return flag ? total + 10 : total;
    }


    return {
        pice: pice,
        duche: duche
    }
})()
console.log(car.pice(5))
console.log(car.duche(1))