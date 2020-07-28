// AMD是英文Asynchronous Module Definition（异步模块定义）的缩写，
// 它是由JavaScript社区提出的专注于支持浏览器端模块化的标准。
// 从名字就可以看出它与CommonJS和ES6 Module最大的区别在于它加载模块的方式是异步的。


// 下面的例子展示了如何定义一个AMD模块
define('getSum', ['calculator'], function (math) {
    return function (a, b) {
        console.log('sum: ' + calculator.add(a, b));
    }
});
//   在AMD中使用define函数来定义模块，它可以接受3个参数。
//   第1个参数是当前模块的id，相当于模块名；第2个参数是当前模块的依赖，
//   比如上面我们定义的getSum模块需要引入calculator模块作为依赖；
//   第3个参数用来描述模块的导出值，可以是函数或对象。如果是函数则导出的是函数的返回值；如果是对象则直接导出对象本身



// 在AMD中使用define函数来定义模块，它可以接受3个参数。第1个参数是当前模块的id，
// 相当于模块名；第2个参数是当前模块的依赖，比如上面我们定义的getSum模块需要引入calculator模块作为依赖
// ；第3个参数用来描述模块的导出值，可以是函数或对象。如果是函数则导出的是函数的返回值；如果是对象则直接导出对象本身
require(['getSum'], function (getSum) {
    getSum(2, 3);
});
//   重点： require的第1个参数指定了加载的模块，第2个参数是当加载完成后执行的回调函数(回调函数异步执行)。
//          通过AMD这种形式定义模块的好处在于其模块加载是非阻塞性的，
//          当执行到require函数时并不会停下来去执行被加载的模块，而是继续执行require后面的代码，这使得模块加载操作并不会阻塞浏览器
