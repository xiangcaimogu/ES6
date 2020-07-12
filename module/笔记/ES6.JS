// 1.定义package.json


// 2. 安装babel-cli babel-preset-es2015 和 browserify
// npm install babel-cli browserify -g
// cli的缩写全称:command line interface 命令行接口
// browserify:类似与webpack
// 借助browserify你可以使用nodejs中常用到的require, module.exports功能
// npm i babel-preset-es2015 --save-dev


// 3. 定义.babelrc文件  run control：运行时要运行的文件
// 如果 preset 名称的前缀为 babel-preset-，你还可以使用它的短名称
// {
//     "presets":["es2015"] //数组还可以添加其他的插件
// }
// 4. 编写
// * 使用Babel将es6编译为es5代码 
// 命令：babel js/src -d js/lib
// * 使用browserify编译js
// 命令：browserify js/lib/main.js -o js/lib/bundle.js

// 重点补充：查看全局安装的npm包所在的路径
// 命令：npm root -g
// 文件夹babel-cli/cli 就包含了所有babel的命令
