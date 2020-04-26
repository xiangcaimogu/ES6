// 定义一个有依赖的模块
define(['dataServer'],function(m1){
    let msg= 'alter.js';
    function showMsg(){
        console.log(msg,m1.getName())
    }
    return { showMsg }
})