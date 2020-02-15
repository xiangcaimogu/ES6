let a = new set([1, 2, 3]);
let b = new set([2, 3, 4]);


//并集 [1,2,3,4]
let unique = new set([...a,...b]);
console.log(unique);

//交集 has
let inter = new set([...a].filter(x=>b.has(x)))
console.log(inter)