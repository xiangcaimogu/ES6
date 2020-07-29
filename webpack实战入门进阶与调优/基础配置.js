// # chunk:在Webpack中可以理解成被抽象和包装过后的一些模块。它就像一个装着很多文件的文件袋，里面的文件就是各个模块，
// #       Webpack在外面加了一层包裹，从而形成了chunk。根据具体配置不同，一个工程打包时可能会产生一个或多个chunk。


//  配置资源入口
// Webpack通过context和entry这两个配置项来共同决定入口文件的路径。在配置入口时，实际上做了两件事：
//  确定入口模块位置，告诉Webpack从哪里开始进行打包。
//  定义chunk name。如果工程只有一个入口，那么默认其chunk name为“main”；如果工程有多个入口，我们需要为每个入口定义chunk name，来作为该chunk的唯一标识
// # 3.2.1　context
//  context可以理解为资源入口的路径前缀，在配置时要求必须使用绝对路径的形式
// 以下两种配置达到的效果相同, 入口都为 <工程根路径>/src/scripts/index.js
// 以下两种配置达到的效果相同, 入口都为 <工程根路径>/src/scripts/index.js
// context可以省略，默认值为当前工程的根目录
module.exports = {
    context: path.join(__dirname, './src'),
    entry: './scripts/index.js',
};
module.exports = {
    context: path.join(__dirname, './src/scripts'),
    entry: './index.js',
};
module.exports = {
    context: path.join(__dirname, './src'),
    entry: './scripts/index.js',
};
module.exports = {
    context: path.join(__dirname, './src/scripts'),
    entry: './index.js',
};

// 3.2.2　entry
// 与context只能为字符串不同，entry的配置可以有多种形式：字符串、数组、对象、函数。可以根据不同的需求场景来选择
// 1.字符串类型入口
module.exports = {
    // 默认其chunk name为“main”
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
};
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
};
module.exports = {
    entry: {
        // chunk name为index, 入口路径为./src/index.js
        index: './src/index.js',
        // chunk name为lib, 入口路径为./src/lib.js
        lib: './src/lib.js',
    },
};
// 总结：在使用字符串或数组定义单入口时，并没有办法更改chunk name，只能为默认的“main”。在使用对象来定义多入口时，则必须为每一个入口定义chunk name。


// 2.提取vendor
// 试想一下，假如工程只产生一个JS文件并且它的体积很大，一旦产生代码更新，即便只有一点点改动，用户都要重新下载整个资源文件，这对于页面的性能是非常不友好
module.exports = {
    context: path.join(__dirname, './src'),
    entry: {
        app: './src/app.js',
        vendor: ['react', 'react-dom', 'react-router'],
    },
};
//   可以采用optimization.splitChunks，具体参考第6章内容），将app与vendor这两个chunk中的公共模块提取出来。
// 通过这样的配置，app.js产生的bundle将只包含业务模块，其依赖的第三方模块将会被抽取出来生成一个新的bundle，
// 这也就达到了我们提取vendor的目标。由于vendor仅仅包含第三方模块，
// 这部分不会经常变动，因此可以有效地利用客户端缓存，在用户后续请求页面时会加快整体的渲染速度


//3.3　配置资源出口
const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'assets'),
        publicPath: '/dist/',
    },
};
// filename可以不仅仅是bundle的名字，还可以是一个相对路径，即便路径中的目录不存在也没关系，Webpack会在输出资源时创建该目录
module.exports = {
    entry: './src/app.js',
    output: {
        filename: './js/bundle.js',
    },
};
//   在资源输出时，上面配置的filename中的[name]会被替换为chunk name，因此最后项目中实际生成的资源是vendor.js与app.js 如：
module.exports = {
    entry: {
        app: './src/app.js',
        vendor: './src/vendor.js',
    },
    output: {
        filename: '[name].js',
    },
};
//   在资源输出时，上面配置的filename中的[name]会被替换为chunk name，
// 除了[name]可以指代chunk name以外，还有其他几种模板变量可以用于filename的配置中

// [hash]:指代webpack此次打包所有资源生成的hash
// [chunkhash]:指代当前chunk内容的hash
// [id]:指代当前chunk的id
// [query]:指代filename配置项中的query
// 在实际工程中，我们使用比较多的是[name]，它与chunk是一一对应的关系，并且可读性较高。
// 如果要控制客户端缓存，最好还要加上[chunkhash]，因为每个chunk所产生的[chunkhash]只与自身内容有关，
// 单个chunk内容的改变不会影响其他资源，可以最精确地让客户端缓存得到更新
module.exports = {
    entry: {
        app: './src/app.js',
        vendor: './src/vendor.js',
    },
    output: {
        filename: '[name]@[chunkhash].js',
    },
};

//  path
//  path可以指定资源输出的位置，要求值必须为绝对路径
const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
};
// 3.3.3　publicPath
// publicPath是一个非常重要的配置项，并且容易与path相混淆。从功能上来说，path用来指定资源的输出位置，而publicPath则用来指定资源的请求位置
// ·输出位置：打包完成后资源产生的目录，一般将其指定为工程中的dist目录。
// ·请求位置：由JS或CSS所请求的间接资源路径。页面中的资源分为两种，一种是由HTML页面直接请求的，比如通过script标签加载的JS；另一种是由JS或CSS请求的，如异步加载的JS、从CSS请求的图片字体等。publicPath的作用就是指定这部分间接资源的请求位置
// 假设当前HTML地址为 https://example.com/app/index.html
// 异步加载的资源名为 0.chunk.js
publicPath: "" // 实际路径https://example.com/app/0.chunk.js
publicPath: "./js" // 实际路径https://example.com/app/js/0.chunk.js
publicPath: "../assets/" // 实际路径https://example.com/aseets/0.chunk.js

// 若publicPath的值以“/”开始，则代表此时publicPath是以当前页面的host name为基础路径的
// 假设当前HTML地址为 https://example.com/app/index.html
// 异步加载的资源名为 0.chunk.js
publicPath: "/" // 实际路径https://example.com/0.chunk.js
publicPath: "/js/" // 实际路径https://example.com/js/0.chunk.js
publicPath: "/dist/" // 实际路径https://example.com/dist/0.chunk.js

// 3.CDN相关
// 假设当前页面路径为 https://example.com/app/index.html
// 异步加载的资源名为 0.chunk.js
publicPath: "http://cdn.com/" // 实际路径http://cdn.com/0.chunk.js
publicPath: "https://cdn.com/" // 实际路径https://cdn.com/0.chunk.js
publicPath: "//cdn.com/assets/" // 实际路径 //cdn.com/assets/0.chunk.js

// webpack-dev-server的配置中也有一个publicPath，值得注意的是，这个publicPath与Webpack中的配置项含义不同，它的作用是指定webpack-dev-server的静态资源服务路径。请看下面的例子
const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        publicPath: '/assets/',
        port: 3000,
    },
};
// Webpack配置中output.path为dist目录，因此bundle.js应该生成在dist目录。但是当我们启动webpack-dev-server的服务后，访问localhost：3000/dist/bundle.js时却会得到404。这是因为devServer.publicPath配置项将资源位置指向了localhost：3000/assets/，
// 因此只有访问localhost：3000/assets/bundle.js才能得到我们想要的结果。
const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        publicPath: '/dist/',
        port: 3000,
    },
};
// 2.resource与issuer
// resource与issuer可用于更加精确地确定模块规则的作用范围
// 在Webpack中，我们认为被加载模块是resource，而加载者是issuer。如上面的例子中，resource为/path/of/app/style.css，issuer是/path/of/app/index.js
// 前面介绍的test、exclude、include本质上属于对resource也就是被加载者的配置，如果想要对issuer加载者也增加条件限制，
// 则要额外写一些配置。比如，如果我们只想让/src/pages目录下的JS可以引用CSS，应该如何设置呢？请看下面的例子
rules: [
    {
      test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
        issuer: {
          test: /\.js$/,
            include: /src/pages/,
      },
    }
    ]