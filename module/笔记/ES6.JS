// 1.定义package.json


//2. 安装babel-cli babel-preset-es2015 和 browserify  // cli:command line interface
// npm install babel-cli browserify -g
// npm i babel-preset-es2015 --save-dev


// 3. 定义.babelrc文件  run control：运行时要运行的文件

//4. 编写

//多个export分别导出或者导出对象时， import 引入文件时，必须要赋值解构的方式import { xxx,xxxx} from 'xxxx' 
// 但是如果是export default {} 就直接引入 import xxx from 'xxxx'