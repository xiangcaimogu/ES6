function foo(){
    var arr=[]
    for (var i=0;i++;i<10){
        arr[i]=function(){
            return i
        }
    }
}
var bar=foo()
//arr里面循环保存的都是函数，循环结束之后执行函数，i就是10
console.log(bar[0]())//10
console.log(bar[0]())//10