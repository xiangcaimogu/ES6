

//浏览器端专用，异步加载
// 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。
// 就是下面这样：

// 　　require(['math'], function (math) {
// 　　　　math.add(2, 3);
// 　　});


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