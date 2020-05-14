// 单例模式 不管new 几个对象，同步上一个实例，也就是不管怎么new,第二次new都是拿到的上一次的结果
// function Resource() {
//     this.balance = 100
// }

// var r = new Resource()
// r.balance = 50
// console.log('r', r)
// var r2 = new Resource()
// console.log('r', r2)
// 这边重新new r2 之后 balance 又重新变为100了


function Resource() {
    if (Resource.instance)
        return Resource.instance
    else {
        Resource.instance = this
    }
}

var r = new Resource()
r.balance = 50
console.log('r', r)
var r2 = new Resource()
console.log('r', r2)

/**
 * @params {string} name
 * @return 
 */