//common 在node环境里应用

// 汇集所有模块
let uniq=require('uniq')

let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')

module1.foo();
module2()
module3.bar()
module3.foo()

let res=uniq(module3.arr);
console.log(res)