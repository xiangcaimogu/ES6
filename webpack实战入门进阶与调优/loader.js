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