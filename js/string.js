charAt()	//返回在指定位置的字符。

charCodeAt()	//返回在指定的位置的字符的 Unicode 编码。
str="asdf"
str.charCodeAt(0)

concat()	//连接两个或更多字符串，并返回新的字符串。

String.fromCharCode()	//将 Unicode 编码转为字符。


indexOf()	//返回某个指定的字符串值在字符串中首次出现的位置。
lastIndexOf()	//从后向前搜索字符串。




slice()	//提取字符串的片断，并在新的字符串中返回被提取的部分。
// 字符串中第一个字符位置为 0, 第二个字符位置为 1, 以此类推
var str="Hello world!";
var n=str.slice(0)//"Hello world!"
var m=str.slice(1,5)//"ello"
console.log(n)



substr() //方法可在字符串中抽取从 开始 下标开始的指定数目的字符。
var str="Hello world!";
var n=str.substr(0)//"Hello world"
var m=str.substr(2)//"llo world"



substring()	//提取字符串中两个指定的索引号之间的字符。




toLowerCase()	//把字符串转换为小写。
toUpperCase()	//把字符串转换为大写。
trim()	//去除字符串两边的空白
valueOf()


//*****以下4种string方法支持正则表达式

match()	//查找找到一个或多个正则表达式的匹配,它将返回一个数组。
var str="The rain in SPAIN stays mainly in the plain";
var n=str.match(/ain/gi)
console.log(n)//["ain", "AIN", "ain", "ain"]




split()	//把字符串分割为字符串数组。
// split() 方法不改变原始字符串
var str="How are you doing today?";
var n=str.split();["How are you doing today?"]
var m=str.split(" ");["How","are0","you","doing","today?"]
console.log(n)




replace()	//在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。
var ary=["一","二","三","四","五","六"]
"123456".replace(/(\d)/g,function(i){
    return ary[i - 1];
})
var reg=new RegExp("(http://www.qidian.com/BookReader/)(\\d+),(\\d+).aspx","gmi");
var url="http://www.qidian.com/BookReader/1017141,20361055.aspx";
var rep=url.replace(reg,"$1ShowBook.aspx?bookId=$2&chapterId=$3");
// 你可能注意到了，在reg正则表达式里的几对"()",
// 比如`("(http://www.qidian.com/BookReader/)` ，`(\\d+)`，$n就指的是匹配到的第n个括号里的内容，**$n主要是用在后面的程序需要引用前面的正则匹配到的内容时。**在这个例子里：
// $1 : http://www.qidian.com/BookReader/
// $2 : 1017141
// $3 : 20361055
//下面的例子用来获取url的两个参数，并返回urlRewrite之前的真实Url
var reg=new RegExp("(http://www.qidian.com/BookReader/)(\\d+),(\\d+).aspx","gmi");
var url="http://www.qidian.com/BookReader/1017141,20361055.aspx";

//方式一,最简单常用的方式
var rep=url.replace(reg,"$1ShowBook.aspx?bookId=$2&chapterId=$3");
alert(rep);

//方式二 ,采用固定参数的回调函数
var rep2=url.replace(reg,function(m,p1,p2,p3){return p1+"ShowBook.aspx?bookId="+p3+"&chapterId="+p3});
alert(rep2);

//方式三，采用非固定参数的回调函数
var rep3=url.replace(reg,function(){var args=arguments; return args[1]+"ShowBook.aspx?bookId="+args[2]+"&chapterId="+args[3];});
alert(rep3);




search() //方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
//如果没有找到任何匹配的子串，则返回 -1。