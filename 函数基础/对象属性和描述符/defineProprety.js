//Object.defineProperty(属性所在的对象,属性名,属性描述对象)
Object.defineProperty({},"name",{
    value:'mkk',
    writable:true, //可写性
    enumrable:true, //可遍历
    configurable:false //是否能被删除
})
console.log(obj.name)
obj.name="jk"
console.log(obj.name)
console.log(delete obj.name)


//存储器

// var obj= Object.defineProperty({},'p',{
//     get:function(){
//         return 'getter'
//     },
//     get:function(value){
//         return;
//     }
// })
// console.log(obj.p);
// obj.p=321;


var obj = {
    n: 5,
    get a() {
        return this.n++;
    },
    set a(value) {
        if (value > this.n) {
            this.n = value
        } else {
            throw new Error('新值必须大于当前的值')
        }
    }
}
console.log(obj.a)
console.log(obj.a)

obj.a = 10
console.log(obj.a)
obj.a = 4
console.log(obj.a)