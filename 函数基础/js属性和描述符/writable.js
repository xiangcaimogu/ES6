//writable:决定是否可以修改属性的值

var myObject = {};
        Object.defineProperty(myObject,"a",{
            value:2,
            writable:false,
            configurable:true,
            emumerable:true
        });
        myObject.a = 3;
        console.log(myObject.a);//2