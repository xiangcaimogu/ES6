//cookie本身依然是服务器内部的一个对象，只是这个对象最终会在响应中给客户端对象，
// 而客户端（浏览器)它会识别cookie信息，同时在后续的访问中浏览器会将这个cookie请求中携带一同发给服务器。
// 浏览器携带cookie的特性，是由W3C的http协议规定的，并且会在请求头中携带。
// 如果是响应的数据有cookie，cookie也是在响应的头中
//cookie分:临时cookie默认，和设置有效时间cookie