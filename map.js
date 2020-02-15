//map 新型数据结构

let map = new Map()
let a = {p:'hello'}
let b = {p:'helloa'}

map.set(a,'com')
map.set(b,'com1')
let res = map.get(a)
let res1 = map.get(b)

console.log(res)