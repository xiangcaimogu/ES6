// 基于浏览器browser应用
// Browserify 可以让你使用类似于 node 的 require() 的方式来
// 组织浏览器端的 Javascript 代码，通过预编译让前端 Javascript 可以直接使用
let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')

module1.foo();
module2()
module3.bar()
module3.foo()