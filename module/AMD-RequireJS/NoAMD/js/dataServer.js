// 定义一个没有依赖的模块
(function(window){
    let msg='我是dataServer'
    function foo(){
        return msg
    }
    window.dataServer = { foo }
})(window)