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


        //1. 第一步执行传进来的同步函数excutor,传入resolve，reject函数出去，等待外面执行resolve()
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
    /** then是同步函数，传进来的两个函数onResolved,和onRejexted会保存到that.callback里面，然后当外面调用resolve函数时，
     * resolve函数里面会调用这两个函数onResolved,和onRejexted,并且把resolve(res)拿到的异步结果传个他们
     * 并且nResolved,和onRejexted这两函数是异步执行
    */
    Promise.prototype.then = function (onResolved, onRejexted) {
        const that = this
        return new Promise((resolve, reject) => {
            if (that.status === PENDING) {
                that.callbacks.push({  //保存
                    onResolved, //这两个函数缺少resolve(),把结果传给下一个then
                    onRejexted
                })
            } else if (that.status === RESOLVE) {
                setTimeout(() => {
                    try {
                        const result = onResolved(that.data) 
                        /** 执行onResolved(that.data)就是第一个then传进来的回调函数,res => { console.log(res) return 2 }
                         * return 2 意味着result就是等于2，因为返回的不是promise，所以直接resolve(2)交给下一个then*/
                        if( result instanceof Promise){
                            result.then(value=>{ //(如果回调函数onResolved返回的是promise)拿到这个promise的结果，在resolve给下一个then 
                                resolve(value)
                            },
                            error=>{
                                reject(error)
                            })
                        }else {
                            resolve(reslut) //如果回调函数onResolved返回不是promise，直接resolve给下一个then
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