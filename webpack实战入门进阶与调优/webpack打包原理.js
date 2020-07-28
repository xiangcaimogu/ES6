// 立即执行匿名函数
(function(modules) {
    //模块缓存
    var installedModules = {};
    // 实现require
    function __webpack_require__(moduleId) {
      console.log("asd")
    }
      // 执行入口模块的加载
      return __webpack_require__(__webpack_require__.s = 0);
    })({
      // modules：以key-value的形式储存所有被打包的模块
      0: function(module, exports, __webpack_require__) {
        // 打包入口
        module.exports = __webpack_require__("3qiv");
      },
      "3qiv": function(module, exports, __webpack_require__) {
        // index.js内容
      },
      jkzz: function(module, exports) {
        // calculator.js 内容
      }
    });