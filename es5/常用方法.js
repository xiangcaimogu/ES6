// 查找字符串e在字符串中的所有位置

var str = 'He unfolded the mao and set it on the floor';
var arr = []
var index = str.indexOf('e')
while (index > -1) {
    arr.push(index)
    index = str.indexOf('e', index + 1)
}
console.log(arr)


// 返回数字时钟格式的时间
// 6:25:03 AM
// 6:25:43 PM
function getTime() {
    var now = new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()

    var temp = '' + (hour > 12 ? hour - 12 : hour)
    if (hour === 0) { //相当于24点
        temp = '12'
    }
    temp = temp + (minute < 10 ? ':0' : ':') + minute;
    temp = temp + (second < 10 ? ':0' : ':') + second;
    temp = temp + (hour > 12 ? 'PM' : 'AM')
    console.log(temp)
    return temp
}


// 获取min 到max之间的整数
function geRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
// 获取随机颜色rgb(0~255,0~255,0~255)
function colorRandom() {
    let a = geRandom(0, 255)
    let b = geRandom(0, 255)
    let c = geRandom(0, 255)
    return `rgb(${a},${b},${c})`
}
var rc = colorRandom()
document.body.style.background = rc


//url的查询字符串变成json

function getArgs(){
    http://192.168.106.4:8080/?user=asd&pwd=asd
    var args = {
        // user:'asd',
        // pwd:'asd'
    }
    var qs = location.search.length > 0 ? location.search.slice(1) : ''
    var item = qs.length > 0 ? qs.split('&') : ''
    let name=null
    for (let i of item) {
        let arr = i.split('=')
        name = arr[0]
        args[name] = arr[1]
    }
    return args
}