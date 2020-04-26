//浏览器端专用，异步加载

// 基础语法
// 定义暴露模块
        // 定义没有依赖的模块
        define(function(){
            return 模块
        })
        // 定义有依赖的模块
        define(['module1','module2'],function(m1,m2){
            return 模块
        })
//引入使用模块
require(['module1','module2'],function(m1,m2){
    // 使用 m1/m2
})


//实现(浏览器端)
// Require.js
// http://www.requirejs.cn/