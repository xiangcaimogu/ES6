var date = new Date()
// getDay()	从 Date 对象返回一周中的某一天 (0 ~ 6)
// 周日是0
console.log(date.getDay())
// getHours()	返回 Date 对象的小时 (0 ~ 23)
// getDate()	从 Date 对象返回一个月中的某一天 (1 ~ 31)。
console.log(date.getDate())

// getHours()	返回 Date 对象的小时 (0 ~ 23)。
// getMilliseconds()	返回 Date 对象的毫秒(0 ~ 999)。
// getMinutes()	返回 Date 对象的分钟 (0 ~ 59)。
// getMonth()	从 Date 对象返回月份 (0 ~ 11)。
console.log(date.getMonth()) //需要加+1

// 获取上个月的最后一天是几号？
// 获取6月份的最后一天
console.log(new Date(2020,6,0)) //这里里面的6代表的是7月份，相当于7月份的0号 // node环境和游览器不一样


// 获取这个月的第一天是星期几？
// 获得5月的第一天是星期几
console.log(new Date(2020,4).getDay())

// getTime()	返回 1970 年 1 月 1 日至今的毫秒数



//日期格式化方法
// toLocaleDateString()	根据本地时间格式，把 Date 对象的日期部分转换为字符串。
// toLocaleTimeString()	根据本地时间格式，把 Date 对象的时间部分转换为字符串。
// toLocaleString()	据本地时间格式，把 Date 对象转换为字符串。
var d=new Date();
var n=d.toLocaleDateString();
console.log(n)