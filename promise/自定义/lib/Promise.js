/**
 * 自定义Promsie 函数模块 ES5模块：IIFE
 */
(function (window) {
    const PENDING = 'pending'
    const RESOLVE = 'resolve'
    const REJECT = 'reject'
    /**
     * excutor
     * 执行器函数(同步方法)
     */
    function Promise(excutor) {
        this.status = PENDING
        this.data = undefined
        this.callbacks = []
        var that = this
        function resolve(value) {
            that.status = RESOLVE
            // /状态只能改一次
            if (that.status !== PENDING) {
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
            that.status = REJECT

            if (that.status !== PENDING) {
                // 如果执行外面实例执行resolve(),首先更改状态
                // 保存value数据
                that.data = reason

                // 如果callback有等待执行的回调函数，立即执行回调函数
                if (that.callbacks.length > 0) {
                    setTimeout(() => {
                        that.callbacks.forEach(item => {
                            item.onRejexted(value)
                        })
                    }, 1000)
                }
            }
        }


        //1. 第一步执行传进来的同步函数excutor
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
        const that = this
        return new Promise((resolve, reject) => {
            if (that.status === PENDING) {
                that.callbacks.push({
                    onResolved: onResolved,
                    onRejexted: onRejexted
                })
            } else if (that.status === RESOLVE) {
                setTimeout(() => {
                    /**
                     * 1.如果抛出异常，return的promise就会失败，
                     * 2.如果回调函数onResolved返回的是promise(也就是说外部调用的then(这里有异步操作)里面返回了 new Promise),return的promise就结果就是这个回调函数的结果
                     * 3.如果回调函数onResolved返回不是promise，return的promise就会成功，value就是返回值
                     */
                    try {
                        const result = onResolved(that.data)
                        if( result instanceof Promise){
                            result.then(value=>{
                                resolve(value)
                            },
                            error=>{
                                reject(error)
                            })
                        }else {
                            resolve(reslut)
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                setTimeout(() => {
                    onRejexted(that.data)
                })
            }
           
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