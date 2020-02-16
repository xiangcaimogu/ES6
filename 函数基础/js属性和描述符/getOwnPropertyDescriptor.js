//getOwnPropertyDescriptor 可以获取属性描述符对象，她的第一个参数是目标对象，第二个参数是一个字符串（目标对象的属性名）
var arr = [1,2,3]
arr.length=5;
console.log(arr.length)
console.log(delete arr.length)
console.log(Object.getOwnPropertyDescriptor(arr,"0"))
console.log(Object.getOwnPropertyDescriptor(arr,"length"))
console.log(Object.getOwnPropertyDescriptor(arr,"toString"))
//undifined 不能用于继承的属性，只能用域对象自身的属性