//async 必须修饰函数
//await 必须放在被async修饰的函数里
//await 后面跟着Promise
requestWay(){
    fetch("data/json.txt")
    .then(()=>{
        return response.json()
    }).then(()=>{
        console.log("Promise的传统方法")
    })
}
async requestWa(){
    let  res = await fetch('data/json.txt')
    let json= await res.json()
    console.log("使用await方法")
}