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


//数组去重
//  第一种方法new Set()
let arr = [1,1,5,8,6,6,7,8,7,7,8]
let array = Array.from(new Set(arr))
 // 第二种方法
let ids=[]
arr.forEach((item)=>{
    if (!ids.includes(item)){
        ids.push(item)
    }
})
console.log(ids)


//冒泡排序
let nums=[45,8,456,2,5,96,63,73,59,84,34,9,6]
for(let a=nums.length;a>0;a--){
    for(let i=0;i<a;i++){
        if(nums[i]>nums[i+1]){
            let q =nums[i]
            nums[i]=nums[i+1]
            nums[i+1]=q    
        }
    }
}
// for(let a=0;a<nums.length;a++){
//     for(let i=0;i<nums.length-a;i++){
//         if(nums[i]>nums[i+1]){
//             let q =nums[i]
//             nums[i]=nums[i+1]
//             nums[i+1]=q    
//         }
//     }
// }

//快速排序
nums.sort((a,b)=>{return a-b})
console.log(nums)

//数组降维 数组的扁平化
let arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
// 第一种方法，es6
arr=arr.flat(Infinity);
// 第二种
let array=arr.toString().split(',').map(i=>Number(i))
// 第三种
// 递归
function flat(arr){
    let n=[]
    function fn(arr){
        for (let i=0;i<arr.length;i++){
            if (Array.isArray(arr[i])){
                fn(arr[i])
            }else {
                n.push(arr[i])
            }
        }
    }
    fn(arr)
    return n
}

let b=flat(arr)
console.log(b)



// 字符串大小写转换
str.replace('/[a-zA-Z]/',value=>{
    return value.toUpperCase()==value ? value.toLowerCase() : value.toUpperCase()
})


//
