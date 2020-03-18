//监听器/发布者
class Observer{
    constructor(name){
        this.name=namedep
        this.dep = []
        this.state = '心情很好'
    }
    //监听器提供一个接受观察者的方法
    attach(observer){
        this.dep.push(observer) //存放所有的观察者
    }
    setState(newstate){
        this.state=newstate
        this.dep.forEach(o=>o.updata(newstate))
    }
}
//观察者/订阅者
class Watcher {
    constructor(name){
        this.name = name
    }
    updata(newstate){
        console.log(this.name+'说：宝宝'+newstate)
    }
}
let sub = new Observer('宝宝')
let fa = new Watcher('爸爸')
let ma = new Watcher('妈妈')
sub.attach(fa)
sub.attach(ma)
sub.setState('心情不好了')