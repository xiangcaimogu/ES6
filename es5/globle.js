//URI 
var uri='http://www.zhuchuanhuan.cn/web index.html?age=18'
console.log(encodeURI(uri))
console.log(encodeURIComponent(uri))
const enuir=encodeURIComponent(uri)
console.log(decodeURI(enuir))
console.log(decodeURIComponent(enuir))