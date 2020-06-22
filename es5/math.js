
// 方法
var max=Math.max(3,56,2,4,8)
var max=Math.min(3,56,2,4,8)
arr=[45,32,6,46,456]
// apply 传参以数组的方式传 ==> 就等于Math.max(14,3,77)
Math.max.apply(null, [14, 3, 77])

// ES6的写法
Math.max(...[14, 3, 77])


Math.ceil(24.3) //25 //天花板函数
Math.floor(24.7) //24 //地板函数
Math.round(24.4) //24

Math.random() // 0到1之前的随机数

// 获取min 到max之间的整数
Math.random()*99 + 1 //1到100之间的随机数
Math.random()*(max-min)+min
Math.floor(Math.random()*(max-min)+min)


Math.abs() 
// 函数返回指定数字 “x“ 的绝对值
Math.abs('-1');     // 1
Math.abs(-2);       // 2
Math.abs(null);     // 0
Math.abs("string"); // NaN
Math.abs();  //NaN





// 随机验证码