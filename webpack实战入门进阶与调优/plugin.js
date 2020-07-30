// 在module.rules中我们设置了处理CSS文件的规则，其中的use字段并没有直接传入loader，
// 而是使用了插件的extract方法包了一层。内部的fallback属性用于指定当插件无法提取样式时所采用的loader
// （目前还接触不到这种场景，后面会介绍），use（extract方法里面的）用于指定在提取样式之前采用哪些loader来预先进行处理。
// 除此之外，还要在Webpack的plugins配置中添加该插件，并传入提取后的资源文件名
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',  //内部的fallback属性用于指定当插件无法提取样式时所采用的loader , 提取成功的样式只需要css-loader，不需要style-loader插入style标签 
                    use: 'css-loader',
                }),
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ],
};

// 5.1.2　多样式文件的处理
// webpack.config.js
// ./src/scripts/foo.js
import '../styles/foo-style.css';
document.write('foo.js');

// ./src/scripts/bar.js
import '../styles/bar-style.css';
document.write('bar.js');

/* ./src/styles/foo-style.css */
body { background - color: #eee; }

/* ./src/styles/bar-style.css */
body { color: #09c; }

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        foo: './src/scripts/foo.js',
        bar: './src/scripts/bar.js',
    },
    output: {
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
};

// 5.1.3　mini-css-extract-plugin
// mini-css-extract-plugin可以理解成extract-text-webpack-plugin的升级版，它拥有更丰富的特性和更好的性能，
// 从Webpack 4开始官方推荐使用该插件进行样式提取（Webpack 4以前的版本是用不了的）
// app.js
import './style.css';
import('./next-page');
document.write('app.js<br/>');

// next-page.js
import './next-page.css';
import { isMainThread } from 'worker_threads';
import { Script } from 'vm';
document.write('Next page.<br/>');

/* style.css */
body { background - color: #eee; }

/* next-page.css */
body { background - color: #999; }

// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './app.js',
    output: {
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                    },
                },
                'css-loader'
            ],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
};
//  在配置上mini-css-extract-plugin与extract-text-webpack-plugin有以下几点不同：
// ·loader规则设置的形式不同，并且mini-css-extract-plugin支持配置publicPath，用来指定异步CSS的加载路径。
// ·不需要设置fallback。
// ·在plugins设置中，除了指定同步加载的CSS资源名（filename），还要指定异步加载的CSS资源名（chunkFilename）
// 上面打包形成的文件
// Name        Status      Type        Initiator
// indexhtml   200         document    Other
// main.css    200         StyleSheet  index.html
// main.js     200         Script      index.html
// 0.css       200         StyleSheet  main.js
// 0.js        200         Script      main.js

// 5.2　样式预处理
// 样式预处理指的是在开发中我们经常会使用一些样式预编译语言，如SCSS、Less等，在项目打包过程中再将这些预编译语言转换为CSS。
// 借助这些语言强大和便捷的特性，可以降低项目的开发和维护成本。下面我们介绍目前最主流的两种预编译语言是如何配置的。
// 5.2.1　Sass与SCSS
// sass-loader就是将SCSS语法编译为CSS，因此在使用时通常还要搭配css-loader和style-loader。
// 类似于我们装babel-loader时还要安装babel-core，loader本身只是编译核心库与Webpack的连接器
// ，因此这里我们除了sass-loader以外还要安装node-sass，node-sass是真正用来编译SCSS的，而sass-loader只是起到黏合的作用
// 安装node-sass时需要下载一个系统相关的二进制包，这个二进制包通常下载较慢，甚至有可能超时，
// 因此通常我们会为其设置一个cnpm的镜像地址。可使用如下命令：
npm config set sass_binary_site = https://npm.taobao.org/mirrors/node-sass/
module: {
    rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }
    ],
      }

//   5.2.2　Less
//   Less同样是对CSS的一种扩展。与SCSS类似，它也需要安装loader和其本身的编译模块。安装命令如下：
npm install less - loader less
module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }
            ],
        }
    ],
      },


//   6.3　optimization.SplitChunks
//   // webpack.config.js
module.exports = {
    entry: './foo.js',
    output: {
        filename: 'foo.js',
        publicPath: '/dist/',
    },
    mode: 'development',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

// foo.js
import React from 'react';
import('./bar.js');
document.write('foo.js', React.version);

// bar.js
import React from 'react';
console.log('bar.js', React.version);
// ·使用optimization.splitChunks替代了CommonsChunkPlugin，并指定了chunks的值为all，
// 这个配置项的含义是，SplitChunks将会对所有的chunks生效（默认情况下，SplitChunks只对异步chunks生效，并且不需要配置）。
// ·mode是Webpack 4中新增的配置项，可以针对当前是开发环境还是生产环境自动添加对应的一些Webpack配置


// ·使用optimization.splitChunks替代了CommonsChunkPlugin，并指定了chunks的值为all
// ，这个配置项的含义是，SplitChunks将会对所有的chunks生效（默认情况下，SplitChunks只对异步chunks生效，并且不需要配置）。
// ·mode是Webpack 4中新增的配置项，可以针对当前是开发环境还是生产环境自动添加对应的一些Webpack配置

// ·react属于node_modules目录下的模块。
// ·react的体积大于30kB。
// ·按需加载时的并行请求数量为1，为0.foo.js。
// ·首次加载时的并行请求数量为2，为foo.js和vendors-main.foo.js。之所以vendors-main.foo.js不算在第3条是因为它需要被添加在HTML的script标签中，在页面初始化的时候就会进行加载。

// 6.3.2　默认的异步提取
// 前面我们对SplitChunks添加了一个chunks：all的配置，这是为了提取foo.js和bar.js的公共模块。
// 实际上SplitChunks不需要配置也能生效，但仅仅针对异步资源。请看下面的例子：

// webpack.config.js
module.exports = {
    entry: './foo.js',
    output: {
        filename: 'foo.js',
        publicPath: '/dist/',
    },
    mode: 'development',
};

// foo.js
import('./bar.js'); // 重点：import()函数是webpack函数  与正常ES6中的import语法不同，通过import函数加载的模块及其依赖会被异步地进行加载，并返回一个Promise对象
console.log('foo.js');

// bar.js
import lodash from 'lodash'; // 重点：bar.js是被异步加载，所以loadash不需要首次加载，它是按需加载
console.log(lodash.flatten([1, [2, 3]]));
//   从结果来看，foo.js不仅产生了一个0.foo.js（原本的bar.js），还有一个1.foo.js，这里面包含的就是lodash的内容。让我们再与上一节的4个条件进行比对：
// ·lodash属于node_modules目录下的模块，因此即便只有一个bar.js引用它也符合条件。
// ·lodash的体积大于30kB。
// ·按需加载时的并行请求数量为2，为0.foo.js以及1.foo.js。
// ·首次加载时的并行请求数量为1，为foo.js。这里没有计算1.foo.js的原因是它只是被异步资源所需要，并不影响入口资源的加载，也不需要添加额外的script标签。

// 重点： 6.4　资源异步加载
// 源异步加载主要解决的问题是，当模块数量过多、资源体积过大时，可以把一些暂时使用不到的模块延迟加载。
// 这样使页面初次渲染的时候用户下载的资源尽可能小，后续的模块等到恰当的时机再去触发加载。因此一般也把这种方法叫作按需加载。

// 6.4.1　import()
// 在Webpack中有两种异步加载的方式——import函数及require.ensure。require.ensure是Webpack 1支持的异步加载方式，
// 从Webpack 2开始引入了import函数，并且官方也更推荐使用它，因此我们这里只介绍import函数。
// 与正常ES6中的import语法不同，通过import函数加载的模块及其依赖会被异步地进行加载，并返回一个Promise对象。
// 首先让我们看一个正常模块加载的例子。
// foo.js
import { add } from './bar.js';
console.log(add(2, 3));

// bar.js
export function add(a, b) {
    return a + b;
}
// 假设bar.js的资源体积很大，并且我们在页面初次渲染的时候并不需要使用它，就可以对它进行异步加载。
// foo.js
import('./bar.js').then(({ add }) => {
    console.log(add(2, 3));
});

// bar.js
export function add(a, b) {
    return a + b;
}
// 这里还需要我们更改一下Webpack的配置
module.exports = {
    entry: {
        foo: './foo.js'
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
    },
    mode: 'development',
    devServer: {
        publicPath: '/dist/',
        port: 3000,
    },
};
//  打包出 foo.js 和0.js
//   在第3章中资源输出配置的部分我们讲过，首屏加载的JS资源地址是通过页面中的script标签来指定的，
//   而间接资源（通过首屏JS再进一步加载的JS）的位置则要通过output.publicPath来指定。
//   上面我们的import函数相当于使bar.js成为了一个间接资源，我们需要配置publicPath来告诉Webpack去哪里获取它。
//  
//   该技术实现的原理很简单，就是通过JavaScript在页面的head标签里插入一个script标签/dist/0.js，打开Chrome的Elements面板就可以看到。由于该标签在原本的HTML页面中并没有，因此我们称它是动态插入的，如图6-10所示。

// 6.4.2　异步chunk的配置
// 现在我们已经生成了异步资源，但我们会发现产生的资源名称都是数字id（如0.js），没有可读性。
// 还需要通过一些Webpack的配置来为其添加有意义的名字，以便于管理。
// 还是上面的例子，我们修改一下foo.js及Webpack的配置。

// webpack.config.js
module.exports = {
    entry: {
        foo: './foo.js',
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    mode: 'development',
};

// foo.js
import(/* webpackChunkName: "bar" */ './bar.js').then(({ add }) => {
    console.log(add(2, 3));
});
//  打包出 foo.js 和 bar.js
//   可以看到，我们在Webpack的配置中添加了output.chunkFilename，用来指定异步chunk的文件名。
// 其命名规则与output.filename基本一致，不过由于异步chunk默认没有名字，其默认值是[id].js，这也是为什么我们在例子中看到的是0.js。
// 如果有更多的异步chunk，则会依次产生1.js、2.js等。
// 在foo.js中，我们通过特有的注释来让Webpack获取到异步chunk的名字，并配置output.chunkFilename为[name].js，最终打包结果如图6-11所示

// 8.4　tree shaking
// 在第2章我们介绍过，重点：ES6 Module依赖关系的构建是在代码编译时而非运行时。
// 基于这项特性Webpack提供了tree shaking功能，它可以在打包过程中帮助我们检测工程中没有被引用过的模块，
// 这部分代码将永远无法被执行到，因此也被称为“死代码”。Webpack会对这部分代码进行标记，并在资源压缩时将它们从最终的bundle中去掉。
// 下面的例子简单展示了tree shaking是如何工作的。
// index.js
import { foo } from './util';
foo();

// util.js
export function foo() {
    console.log('foo');
}
export function bar() { // 没有被任何其他模块引用, 属于“死代码”
    console.log('bar');
}
// 8.4.1　ES6 Module
// tree shaking只能对ES6 Module生效。有时我们会发现虽然只引用了某个库中的一个接口，却把整个库加载进来了，
// 而bundle的体积并没有因为tree shaking而减小。这可能是由于该库是使用CommonJS的形式导出的，为了获得更好的兼容性，
// 目前大部分的npm包还在使用CommonJS的形式。也有一些npm包同时提供了ES6 Module和CommonJS两种形式导出，
// 我们应该尽可能使用ES6 Module形式的模块，这样tree shaking的效率更高

// 8.4.2　使用Webpack进行依赖关系构建

// 如果我们在工程中使用了babel-loader，那么一定要通过配置来禁用它的模块依赖解析。
// 因为如果由babel-loader来做依赖解析，Webpack接收到的就都是转化过的CommonJS形式的模块，无法进行tree-shaking。
// 禁用babel-loader模块依赖解析的配置示例如下：
module.exports = {
    // ...
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        // 这里一定要加上 modules: false
                        [@babel/preset-env, { modules: false }]
            ],
          },
        }],
      }],
    },
  };
//   8.4.3　使用压缩工具去除死代码
// tree shaking本身只是为死代码添加上标记，真正去除死代码是通过压缩工具来进行的。
// 使用我们前面介绍过的terser-webpack-plugin即可。
// 在Webpack 4之后的版本中，将mode设置为production也可以达到相同的效果。

// 7.5　资源压缩
// 在将资源发布到线上环境前，我们通常都会进行代码压缩，或者叫uglify，意思是移除多余的空格、换行及执行不到的代码，
// 缩短变量名，在执行结果不变的前提下将代码替换为更短的形式。一般正常的代码在uglify之后整体体积都将会显著缩小。
// 同时，uglify之后的代码将基本上不可读，在一定程度上提升了代码的安全性
// 7.5.1　压缩JavaScript
// 压缩JavaScript大多数时候使用的工具有两个，一个是UglifyJS（Webpack 3已集成），
// 另一个是terser（Webpack 4已集成）。后者由于支持ES6+代码的压缩，更加面向于未来，
// 因此官方在Webpack 4中默认使用了terser的插件terser-webpack-plugin。

// 从Webpack 4之后，这项配置被移到了config.optimization.minimize。下面是Webpack 4的示例（如果开启了mode：production，则不需要人为设置）：
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
    },
    optimization: {
        minimize: true,
    },
};

//   面的例子展示了如何自定义terser-webpack-plugin插件配置。
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    //...
    optimization: {
        // 覆盖默认的 minimizer
        minimizer: [
            new TerserPlugin({
                /* your config */
                test: /\.js(\?.*)?$/i,
                exclude: /\/excludes/,
            })
        ],
    },
};