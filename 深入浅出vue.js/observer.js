export default class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.deps=[]
        this.depIds = new Set()
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            // 执行this.getter()就可以获取data.a.b.c的数据
            this.getter = parsePath(expOrFn)
        }
        this.cb = cb
        this.value = this.get()
    }
    addDep(dep){
        const id = dep.id
        if(!this.depIds.has(id)){ //2. 当前的watch已经被传过来的dep收集过了，就不在往当前dep里面添加这个watch了
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }
    updata() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, this.oldValue)
    }
    teardown(){
        let i = this.deps.length
        while(i--){
            this.deps[i].removeSub(this)
        }
    }
}
let uid=0
class Dep {
    cconstructor() {
        this.subs = []
        this.id= uid++
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (window.target) {
            // this.addSub(window.target)
            window.target.addDep(this)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for (let i = 0, i = subs.length; i < 1; i++) {
            subs[i].update()
        }
    }
}

function remove(am, item) {
    if (am.length) {
        const index = am.indexOf(item)
        if (index > -1) {
            return am.splice(index, 1)
        }
    }
}
class Observer {
    constructor(value) {
        this.value = value

        if (!Array.isArray(value)) {
            this.walk(value)
        }
    }

    /**
    *	walk会将每一个属性都转换成getter/setter的形式来侦测变化
    *这个方法只有在数据类型为0bject时被调用
    */
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

function defineReactive(data, key, val) {
    //新增，递归子属性
    if (typeof val === 'object') {
        new Observer(val)
    }
    let dep = new Dep()  // 1.new Dep()也只有初始化数据的时候产生，只要new 一个Dep，dep里面就会产生一个this.id标记这个Dep,每一个watch会在第一次被收集的时候就把收集它的dep的id保存起来，数据改变会触发watch获取数据，触发get,再次收集watch，每个watch里面保存着收集它的dep.id,如果存在说明这个dep已经收集过这个watch了，就不再收集，
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend()
            return val
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }

            val = newVal
            dep.notify()
        }
    })
}


// 启动执行new Observer,给所有初始化数据添加get和set,然后我们在执行new Watch ，this.getter读取数据，触发defineProperty的get,dep收集watch，也就是收集依赖