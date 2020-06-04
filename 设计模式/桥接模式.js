//一个事件的监听,点击元素获得id，根据获得的id我们发送请求查询对应id的猫
element.addEventListener('click', getCatById)
var getCatById = function (e) {
    var id = this.id
    asyncRequst('Get', `cat.url?id=${id}`, function (resp) {
        console.log('我已经获取了信息')
    })
}
// 改写getCatById 将抽象与现实完全隔离，抽象完全依赖传参，同时我们在别的地方也可以引用，不受制与业务
var getCatById = function (id, callback) {
    asyncRequst('Get', `cat.url?id=${id}`, function (resp) {
        console.log('我已经获取了信息')
    })
}

element.addEventListener('click', getCatByIdBridge)
var getCatByIdBridge=function(e){ // getCatByIdBridge 桥接元素
    getCatById(this.id, function (cat) {
        console.log('request cat')
    })
}
