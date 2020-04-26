// 模块的由来，模块开发：低耦合、独立作用域
// IIFE 模式
// 匿名函数自调用(闭包) 
// 立即执行
(function(window){
    let msg = 'zhuchuanhuan';
    function foo(){
        console.log('foo()',msg)
    }
    window.module3 = { //给全局对象window添加属性modules //相当于导出模块
        // foo:foo 属性名和值一样，可以简写
        foo
    }
})(window)


//在其他js引用的时候，可以通过全局对象window来引用
module3.foo()



// IIFE模式增强:引入依赖
// 这就是现代模块实现的基石
(function(window,$){
    let msg = 'zhuchuanhuan';
    function foo(){
        console.log('foo()',msg)
    }
    window.module4 = foo;
    $('body').css('background','red')
})(window,jQuery)


module4()