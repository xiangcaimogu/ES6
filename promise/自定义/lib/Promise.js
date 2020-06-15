/**
 * 自定义Promsie 函数模块 ES5模块：IIFE
 */
(function (window) {

    /**
     * excutor
     * 执行器函数(同步方法)
     */
    function Promise(excutor) {
        this.status = 'pending'
        this.data = undefined
        this.callbacks = []
        var that = this
        function resolve(value) {
            that.status = 'resolve'
            // /状态只能改一次
            if (that.status !== 'pending') {
                // 如果执行外面实例执行resolve(),首先更改状态
                // 保存value数据
                that.data = value

                // 如果callback有等待执行的回调函数，立即执行回调函数
                console.log(that.callbacks.length)
                if (that.callbacks.length > 0) {
                    setTimeout(() => {
                        that.callbacks.forEach(item => {
                            item.onResolved(value)
                        })
                    },1000)
                }
            }
        }
        function reject(reason) {
            that.status = 'reject'

            if (that.status !== 'pending') {
                // 如果执行外面实例执行resolve(),首先更改状态
                // 保存value数据
                that.data = reason

                // 如果callback有等待执行的回调函数，立即执行回调函数
                if (that.callbacks.length > 0) {
                    setTimeout(() => {
                        that.callbacks.forEach(item => {
                            item.onRejexted(value)
                        })
                    },1000)
                }
            }
        }


        //1. 第一步执行同步函数excutor，传进来的参数
        try {
            excutor(resolve, reject)
        } catch (erroe) {
            reject(error)
        }
    }
    /**
     * Promise 原型对象的then()
     * 指定成功和失败的回调函数
     */
    Promise.prototype.then = function (onResolved, onRejexted) {
        this.callbacks.push({
            onResolved: onResolved,
            onRejexted: onRejexted
        })
    }

    /**
     * Promise 原型对象的catch()
     * 指定失败的回调函数
     */
    Promise.prototype.catch = function (onRejexted) { }
    /**
     * Promise 函数对象resolve()
     * 返回一个指定结果成功的Promise
     */
    Promise.resolve = function (value) { }
    /**
     * Promise 函数对象rejecr()
     */
    Promise.reject = function (reason) { }
    /**
     * Promise 函数对象all()
     */
    Promise.all = function (promises) { }
    /**
     * Promise 函数对象race()
     */
    Promise.race = function (promises) { }





    window.Promise = Promise
}
)(window)