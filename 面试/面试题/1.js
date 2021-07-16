// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
function custIntervalTime(fn,a,b){
    this.time=0
    this.handle=null
    this.start=()=>{
        this.handle=setTimeout(()=>{
            fn()
            this.time++
            this.start()
            console.log(a+this.time*b)
        },a+this.time*b)
    }
    this.clear=()=>{
        clearTimeout(this.handle)
        this.time=0
    }
}
let a =new custIntervalTime(() => {console.log('123')},1000, 2000 )
a.start()
// a.clear()