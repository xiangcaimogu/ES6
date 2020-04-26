// 定义一个有依赖的模块
(function(window,dataServer){
    let msg='我是alert'
    
    const server = dataServer.foo()

    function bar(){
        console.log(msg,server)
    }
    window.alerter = { bar }
})(window,dataServer)