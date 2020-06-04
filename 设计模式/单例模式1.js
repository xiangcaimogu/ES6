var single = (function () {
    var instance
    return function createSingle(name) {
        if (instance) {
            return instance
        }
        this.name = name
        instance = this
        return instance
    }
    // return createSingle
})()

let a=new single('mimi')
let b=new single('dada')
console.log(a===b)