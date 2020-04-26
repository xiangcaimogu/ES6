//导出的第一种方式，exports等于一个对象
module.exports={
    msg:'module1',
    foo(){
        console.log('module1',this.msg)
    }
}