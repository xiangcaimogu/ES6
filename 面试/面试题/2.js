//合并二维有序数组成一维有序数组，归并排序的思路

// 方法1：使用concat
const flatten1 = (arr) => {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
};
// 方法2：使用reduce
const flatten2 = (arr) =>
    arr.reduce(
        (acc, cur) =>
            Array.isArray(cur) ? [...acc, ...flatten2(cur)] : [...acc, cur],
        []
    );
// test
var arr = [1, 2, [3, 4, [5, 6], 7, 8]];
console.log(flatten1(arr));
console.log(flatten2(arr));

// 方法三
function sortFlatArray(arr) {
    function flatArray(arr) {
        const newArr = arr.flat()
        return newArr.some(item => Array.isArray(item)) ? flatArray(newArr) : newArr
    }
    if (!arr || !arr.length) {
        return []
    }
    let flattenedArr = flatArray(arr)
    return flattenedArr.sort((a, b) => {
        return a - b
    })
}
