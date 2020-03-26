
    // arr.reduce(function(prev,cur,index,arr){
    // ...
    // }, init);

    // arr 表示原数组；
    // prev 表示上一次调用回调时的返回值，或者初始值 init;
    // cur 表示当前正在处理的数组元素；
    // index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
    // init 表示初始值

    //去重
    var arr = [3, 9, 4, 3, 6, 0, 9];
    var newArr = arr.reduce(function (prev, cur) {
      !prev.includes(cur) && prev.push(cur);
      return prev;
    }, []);

    let arr = [12, 69, 180, 8763];
    let result = arr.reduce(function (tmp, item, index) {
      console.log(tmp + ',' + item + ',' + index);
      return tmp + item;//每次相加的结果给tmp,zai 在往下加item
    }, 0);

    console.log(result);


    let arr = [12, 69, 180, 8763];
    let result = arr.reduce(function (tmp, item, index) {
      if (index != arr.length - 1) { //不是最后一次
        return tmp + item;
      } else {                    //最后一次
        return (tmp + item) / arr.length;
      }
    }, 0);

    console.log(result);
