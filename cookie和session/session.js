//cookie与session的区别
//cookie把用户的重要信息发送给浏览器，浏览器进行保存，cookie把数据保存在客户端
//session技术，它是针对用户的请求，在服务端创建一个对象，然后吧用户请求重要数据保存在服务器端创建的这个对象中


//客户端第一次请求服务器，
//服务器的内部调用getSession的方法获取当前基于这个客户端的浏览器的那个session对象，第一次请求肯定没有session对象，服务器内部会创建这个session对象
//在服务器的内部创建session的时候，会给每一个session绑定一个id数据（jsessionid），所有的客户端浏览器在服务器的session的id都不会相同
//服务器会将jsessionid作为cookie的信息写给客户端
//客户端再次请求，就会自动携带jsessionid的cookie信息到服务器
//根据cookie中的jsessionid获取当前这个浏览器的唯一对应的那个session对象

//有多少个客户端请求服务器，服务器就要创建多少个session对象，每一个浏览器客户端都有一个session对象，导致服务端会有很多的session对象（一个浏览器独占一个session对象，默认情况下），所以session在服务器有存活时间

//服务器端可以识别每一个用户的session对象，是因为服务器针对每一个用户都发送key为jsessionid的cookie信息。
//用户在操作的时候，都会携带这个cookie到服务器端，服务器才能识别针对当前这个jsessionid的那个session对象。

//关于浏览器关闭之后session还能用么？
//服务器在给客服端响应数据的时候，把session对象的jsessionid作为cookie的key值发送给浏览器
//这个cookie是一个会话级别（临时）cookie，他只能在浏览器运行的阶段存活。
//如果游览器关闭了，cookie信息就没有了，再次打开浏览器访问的时候，服务器就获取不到针对当前用户的jsessionid信息，无法找到针对当前用户的那个session对象了
//答：可以在服务端servlet，手动的将保存jsessionid的cookie给持久化，这样可以保证关闭浏览器之后，再次打开，依然有jsessionid的存在，那么服务器的session还是继续可以使用。


// 1、存储位置不同
    // cookie的数据信息存放在客户端浏览器上。

    // session的数据信息存放在服务器上。

// 2、存储容量不同
    // 单个cookie保存的数据<=4KB，一个站点最多保存20个Cookie。

    // 对于session来说并没有上限，但出于对服务器端的性能考虑，session内不要存放过多的东西，并且设置session删除机制。

// 3、存储方式不同
    // cookie中只能保管ASCII字符串，并需要通过编码方式存储为Unicode字符或者二进制数据。

    // session中能够存储任何类型的数据，包括且不限于string，integer，list，map等。

// 4、隐私策略不同
    // cookie对客户端是可见的，别有用心的人可以分析存放在本地的cookie并进行cookie欺骗，所以它是不安全的。

    // session存储在服务器上，对客户端是透明对，不存在敏感信息泄漏的风险。

// 5、有效期上不同
    // 开发可以通过设置cookie的属性，达到使cookie长期有效的效果。

    // session依赖于名为JSESSIONID的cookie，而cookie JSESSIONID的过期时间默认为-1，只需关闭窗口该session就会失效，因而session不能达到长期有效的效果。

// 6、服务器压力不同
    // cookie保管在客户端，不占用服务器资源。对于并发用户十分多的网站，cookie是很好的选择。

    // session是保管在服务器端的，每个用户都会产生一个session。假如并发访问的用户十分多，会产生十分多的session，耗费大量的内存。

// 7、浏览器支持不同
    // 假如客户端浏览器不支持cookie：

        // cookie是需要客户端浏览器支持的，假如客户端禁用了cookie，或者不支持cookie，则会话跟踪会失效。关于WAP上的应用，常规的cookie就派不上用场了。

        // 运用session需要使用URL地址重写的方式。一切用到session程序的URL都要进行URL地址重写，否则session会话跟踪还会失效。

    // 假如客户端支持cookie：

        // cookie既能够设为本浏览器窗口以及子窗口内有效，也能够设为一切窗口内有效。

        // session只能在本窗口以及子窗口内有效。

// 8、跨域支持上不同
    // cookie支持跨域名访问。

    // session不支持跨域名访问。



//     一、容量

// cookie容量在4K左右，且有条数限制。localStorage的容量有5M。

// 二、是否向服务器发送数据

// cookie会向服务器发送数据，localStorage不会往服务器发送数据。

// 三、过期时间

// cookie的有过期时间，在没有设置过期时间，关闭浏览器就消失，默认过期时间是一次会话。localStorage没有过期时间。

// 四、路径限制

// cookie有路径的限制。localStorage没有路径的限制。

// 五、存储类型

// cookie存储的是字符串，字符串，字符串。localStorage存储的是字符串




// 不同浏览器无法共享localStorage或sessionStorage中的信息。
// 相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），它可以在客户端本地存储数据
// 但是不同页面或标签页间无法共享sessionStorage的信息。
// sessionStorage关闭预览器就会自动失效

// /**********他们存储的数据类型都必须是字符串
// JSON对象提供的parse和stringify将其他数据类型转化成字符串，再存储到storage中就可以了
// 操作的方式：

// 存：

//     var obj = {"name":"xiaoming","age":"16"}

//     localStorage.setItem("userInfo",JSON.stringify(obj));

// 取：

//     var user = JSON.parse(localStorage.getItem("userInfo"))

// 删除：

//     localStorage.remove("userInfo);

// 清空：

//     localStorage.clear();