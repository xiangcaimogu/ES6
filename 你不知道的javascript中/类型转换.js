// ~x 大致等同于 -(x+1)。

let a = 'hello'
if (~a.indexOf( "lo" )) {    //隐式转换 ：0 转为 false
    console.log("对的")
}