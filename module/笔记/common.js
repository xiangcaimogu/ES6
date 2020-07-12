
//在node环境执行这个文件//或者查看录屏视屏module
console.log(arguments)
// 重点，能够打印出arguments，说明这个文件在node环境里执行，会被包裹在一个函数里，函数接收五个参数
function global(exports,require,module,__filename,__dirname){

}
//打印出5个参数
//第一个是exports是一个对象{}
//第二个是require是一个函数function
//第三个是module对象
//第四个是__filename ，文件的绝对路径
//第五个是__dirname , 文件所在文件夹的绝对路径

//重点 exports是module里面的一个属性
console.log(exports==module.exports)
// 重点 导出模块的方式
// 第一种：module.exports={}//直接修改exports的对象
// 第二种：exports.xxx=function或者对象等等..  , 等价与修改module.exports.xxx=... ,思考对象的引用类型
// 重点：导出文件直接用exports=... ,就会报错,这样就表示直接修改exports的变量，并不是修改module.exports里面的值
let mod={
    exp1:{
        a:'asd'
    }
}
let exp=mod.exp1 //这就相当于exports==module.exports
exp.a='qwe' //可以修改module.exports里面的a
//exp一直引用这mod里面的exp1
//但是下面的不行，直接修改了exp指向了新的对象，这就是为什么不能直接exports=...出去一个模块,必须module.exports或者exports.xxx=...
exp = {}
