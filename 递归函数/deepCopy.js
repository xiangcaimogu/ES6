obj={
    name: '小马哥',
    age:48,
    hobby:['song','freely'],
    friend:{
        name:"艾斯",
        age:56,
        hobby:'fire',
        friend:{
            name: '红发',
            age:10,
            hobby:'play'
        }
    }
}
function deepCopy(to ,from){
    for( let key in from ){
        if(from.hasOwnProperty(key)){
            if(from[key] && typeof from[key] === 'object'){
                to[key] = from[key].constructor === 'Array'? [] : {}
                to[key] = deepCopy(to[key],from[key])

            }else{
                to[key] = from[key];
            }
        }
    }
    return to;
}
var newObj = deepCopy({},obj)
obj.age = 90;
//改变原值拷贝之后的值是没有任何改变的
console.log(obj)
//深拷贝之后完全与之前的老死不相往来，没有关系
console.log(newObj)