let fs = require('fs')
//发布  中间代理  订阅
function Events() {
    this.callbacks = []
    this.results = []
}
Events.prototype.on = function (callback) {// 订阅
    this.callbacks.push(callback)
}
Events.prototype.emit = function (data) { //发布
    this.results.push(data)
    this.callbacks.forEach(c => c(this.results))
}

let e = new Events()
e.on(function (arr) {
    if (arr.length === 1) {
        console.log(arr)
    }
})
fs.readFile('./name.txt','utf8',function(err,data){
    e.emit(data)
})