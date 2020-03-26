// commonjs规范 AMD   requirejs   CMD  seajs    UMD

//CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
// 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），
// 然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时
// 才能得到这个对象，导致完全没办法在编译时做“静态优化”


// ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入
// ES6模块
import { stat, exists, readFile } from 'fs'
// 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，
// 即 ES6 可以在编译时就完成模块加载
// 效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象



// 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };

// export命令除了输出变量，还可以输出函数或类（class）。

export function multiply(x, y) {
  return x * y;
}

// 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

// 报错
export 1;

// 报错
var m = 1;
export m;
// 上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，
// 第二种写法通过变量m，还是直接输出 1。1只是一个值，不是接口。正确的写法是下面这样
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m}//as关键字，重命名了变量n
// 上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。
// 它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。
// 同样的，function和class的输出，也必须遵守这样的写法。
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};




// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。

foo();

import { foo } from 'my_module';



// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
// 上面三种写法都会报错，因为它们用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。





// 下面是一个circle.js文件，它输出两个方法area和circumference。

// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
// 现在，加载这个模块。

// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
// 上面写法是逐一指定要加载的方法，整体加载的写法如下。

import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
// 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};




// export-default.js
export default function () {
    console.log('foo');
  }
//   上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
  
//   其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
  
  // import-default.js
  import customName from './export-default';
  customName(); // 'foo'




  //import()
//   前面介绍过，import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。

// 报错
if (x === 2) {
  import MyModual from './myModual';
}
// 上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。

// 这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。

const path = './' + fileName;
const myModual = require(path);
// 上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点




引入import()//函数，支持动态加载模块。

import(specifier)
//上面代码中，import函数的参数specifier，指定所要加载的模块的位置。import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。

import()//返回一个 Promise 对象。下面是一个例子。

const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
import()//函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。

// 适用场合
// 下面是import()的一些适用场合。

// （1）按需加载。

import()//可以在需要的时候，再加载某个模块。

button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
// 上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

// （2）条件加载

import()//可以放在if代码块，根据不同的情况，加载不同的模块。

if (condition) {
  import('moduleA').then();
} else {
  import('moduleB').then();
}
// 上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。

// （3）动态的模块路径

// import()允许模块路径动态生成。

import(f())
.then(...);
// 上面代码中，根据函数f的返回结果，加载不同的模块。

// 注意点
import()//加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
// 上面代码中，export1和export2都是myModule.js的输出接口，可以解构获得。

// 如果模块有default输出接口，可以用参数直接获得。

import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
// 上面的代码也可以使用具名输入的形式。

import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
// 如果想同时加载多个模块，可以采用下面的写法。

Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   
});
import()//也可以用在 async 函数之中。

async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();