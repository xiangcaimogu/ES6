
concat()	//连接两个或更多的数组，并返回结果。



every()	//用于判断数组中的每一项元素是否都满足条件，返回一个布尔值
var isEvery = arr.every(function(item,index,array){
    return item > 0;
});
console.log(isEvery); 


some()	//用于判断数组中的是否存在满足条件的元素，返回一个布尔值
var isSome = arr.some(function(item,index,array){
    return item < 0;
});
console.log(isSome)




filter()	//用于筛选数组中满足条件的元素，返回一个筛选后的新数组
var minus = arr.filter(function(item,index,array){
    return item < 0;
});
console.log(minus);




indexOf()	//搜索数组中的元素，并返回它所在的位置。


join()	//把数组的所有元素放入一个字符串。
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join(" and ")//Banana and Orange and Apple and Mango




pop()	//删除数组的最后一个元素并返回删除的元素。


push()	//向数组的末尾添加一个或更多元素，并返回新的长度。


reverse()	//反转数组的元素顺序。



shift()	//删除数组的第一个元素。
unshift()	//向数组的开头添加一个或更多元素，并返回新的长度。



slice()	//选取数组的的一部分，并返回一个新数组
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1,3);//[Orange,Lemon]
slice()//方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。



sort()	//对数组的元素进行排序。



splice()	//从数组中添加或删除元素。
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]




toString()	//把数组转换为字符串，并返回结果。


valueOf()	//返回数组对象的原始值。