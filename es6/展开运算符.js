
let a;
let arr=[1,2,4];
a=[...arr];
console.log(a);


let arr=[1,2,3];
//拆包
function show(a, b, c){
  console.log(a);
  console.log(b);
  console.log(c);
}
show(...arr)


let arr1=[1,2,3];
let arr2=[5,6,7];
let arr=[...arr1, ...arr2];

console.log(arr);