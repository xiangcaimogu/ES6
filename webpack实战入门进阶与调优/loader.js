// 4.3.2　链式loader
// 如，对于SCSS类型的资源来说，我们需要sass-loader来处理其语法，并将其编译为CSS；
// 接着再用css-loader处理CSS的各类加载语法；最后使用style-loader来将样式字符串包装成style标签插入页面
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
}
//   我们把style-loader加到了css-loader前面，这是因为在Webpack打包时是按照数组从后往前的顺序将资源交给loader处理的，因此要把最后生效的放在前面

// 4.3.3　loader options
// loader作为预处理器通常会给开发者提供一些配置项，在引入loader的时候可以通过options将它们传入
// 如：
rules: [
    {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    // css-loader 配置项
                },
            }
        ],
    },
]
// 4.3.4　更多配置
// 1.exclude与include
// exclude与include是用来排除或包含指定目录下的模块，可接收正则表达式或者字符串（文件绝对路径），以及由它们组成的数组。请看下面的例子：
rules: [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
    }
]
// 上面exclude的含义是，所有被正则匹配到的模块都排除在该规则之外，也就是说node_modules中的模块不会执行这条规则。该配置项通常是必加的，否则可能拖慢整体的打包速度。
// 举个例子，在项目中我们经常会使用babel-loader（后面章节会介绍）来处理ES6+语言特性，但是对于node_modules中的JS文件来说，很多都是已经编译为ES5的，因此没有必要再使用babel-loader来进行额外处理。

// 除exclude外，使用include配置也可以达到类似的效果。请看下面的例子：
rules: [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /src/,
    }
]
// 2.resource与issuer
// 在Webpack中，我们认为被加载模块是resource，而加载者是issuer。
// 如上面的例子中，resource为/path/of/app/style.css，issuer是/path/of/app/index.js
// 在Webpack中，我们认为被加载模块是resource，而加载者是issuer。
// 如上面的例子中，resource为/path/of/app/style.css，issuer是/path/of/app/index.js
rules: [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
        issuer: {
            test: /\.js$/,
            include: /src/pages /,
        },
    }
]

// 可以看到，我们添加了issuer配置对象，其形式与之前对resource条件的配置并无太大差异。但只有/src/pages/目录下面的JS文件引用CSS文件，这条规则才会生效；
// 如果不是JS文件引用的CSS（比如JSX文件），或者是别的目录的JS文件引用CSS，则规则不会生效。
rules: [
    {
        use: ['style-loader', 'css-loader'],
        resource: {
            test: /\.css$/,
            exclude: /node_modules/,
        },
        issuer: {
            test: /\.js$/,
            exclude: /node_modules/,
        },
    }
]

// 4.4　常用loader介绍

// 4.4.1　babel-loader
// babel-loader用来处理ES6+并将其编译为ES5，它使我们能够在工程中使用最新的语言特性（甚至还在提案中），同时不必特别关注这些特性在不同平台的兼容问题
// 在安装时推荐使用以下命令：
npm install babel - loader @babel/core @babel/preset - env
// 各个模块的作用如下。
// ·babel-loader：它是使Babel与Webpack协同工作的模块。
// ·@babel/core：顾名思义，它是Babel编译器的核心模块。
// ·@babel/preset-env：它是Babel官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译ES6+代码
rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: [[
                    'env', {
                        modules: false,
                    }
                ]],
            },
        },
    }
]

//   1）由于babel-loader通常属于对所有JS后缀文件设置的规则，所以需要在exclude中添加node_modules，
//   否则会令babel-loader编译其中所有的模块，这将严重拖慢打包的速度，并且有可能改变第三方模块的原有行为。
//   2）对于babel-loader本身我们添加了cacheDirectory配置项，它会启用缓存机制，在重复打包未改变过的模块时防止二次编译，
//   同样也会加快打包的速度。cacheDirectory可以接收一个字符串类型的路径来作为缓存路径，
//   这个值也可以为true，此时其缓存目录会指向node_modules/.cache/babel-loader。
//   3）由于@babel/preset-env会将ES6 Module转化为CommonJS的形式，
//   这会导致Webpack中的tree-shaking特性失效（关于tree-shaking会在第8章详细介绍）。
//   将@babel/preset-env的modules配置项设置为false会禁用模块语句的转化，
//   而将ES6 Module的语法交给Webpack本身处理。babel-loader支持从.babelrc文件读取Babel配置，
//   因此可以将presets和plugins从Webpack配置文件中提取出来，也能达到相同的效果

// 4.4.5　file-loader
const path = require('path');
module.exports = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader',
            }
        ],
    },
}
// 上面我们对png、jpg、gif这类图片资源使用file-loader，然后就可以在JS中加载图片了
import avatarImage from './avatar.jpg';
console.log(avatarImage); // c6f482ac9a1905e1d7d22caa909371fc.jpg

// 第3章介绍过，output.path是资源的打包输出路径，output.publicPath是资源引用路径（具体可以翻阅前文内容）。
// 使用Webpack打包完成后，dist目录下会生成名为c6f482ac9a1905e1d7d22caa909371fc.jpg的图片文件。
// 由于配置中并没有指定output.publicPath，因此这里打印出的图片路径只是文件名，默认为文件的hash值加上文件后缀

const path = require('path');
module.exports = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './assets/',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader',
            }
        ],
    },
}
import avatarImage from './avatar.jpg';
console.log(avatarImage); // ./assets/c6f482ac9a1905e1d7d22caa909371fc.jpg
// file-loader也支持配置文件名以及publicPath（这里的publicPath会覆盖原有的output.publicPath），通过loader的options传入
rules: [
    {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: './another-path/',
            },
        },
    }
] 
import avatarImage from './avatar.jpg';
console.log(avatarImage); // ./another-path/avatar.jpg

// 4.4.6　url-loader

// url-loader与file-loader作用类似，唯一的不同在于用户可以设置一个文件大小的阈值，
// 当大于该阈值时与file-loader一样返回publicPath，而小于该阈值时则返回文件base64形式编码

rules: [
    {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 10240,
                name: '[name].[ext]',
                publicPath: './assets-path/',
            },
        },
    }
]
import avatarImage from './avatar.jpg';
console.log(avatarImage); // data:image/jpeg;base64,/9j/2wCEAAgGBg……
// 由于图片小于limit，因此经过url-loader转化后得到的是base64形式的编码
