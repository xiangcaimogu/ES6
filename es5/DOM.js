//元素节点
//文本节点
//属性节点


//获取元素节点
let node = document.getElementById('app')
document.getElementsByTagName('li') //获取出来的是一个节点对象的集合  类数组
document.getElementsByClassName('item') //获取出来的是一个节点对象的结合 
//获取属性
let node = document.getElementsByTagName('p')[0]
// setAttribute(name,value)
node.setAttribute('id', 'box')

//节点对象的三个重要属性
nodeName
//元素节点的nodeName 与标签名相同
//属性节点的nodeName 与属性名称相同
//文本节点的nodeName 永远是#text
//文档节点的。。。是#document
nodeValue
//元素节点的nodeValue undefined 或者 null
//属性节点的nodeValue 属性的值
//文本节点的nodeValue 是文本本身
nodeType //节点类型，，只读
// 元素    1
// 属性    2
// 文本    3
// 注释    8
// 文档    9

//节点其他常用属性
let node = document.getElementById('app')
node.childNodes //子节点集合
node.childNodes[0]
node.firstChild
node.lastChild
node.parentNode
node.nextSibling //下面一个兄弟
node.previousSibling //上面一个兄弟

//节点的方法
//创建节点 
createElement()
appendChild()
removeChild()
replaceChild()
createTextNode()
let node = document.getElementById('app')
let newNode= document.createElement('p')
newNode.setAttribute('class','active')
node.appendChild(newNode)


//事件
let node = document.getElementById('app')
node.onclick=function(){}
node.onmouseover=function(){}

//表单事件
var username=document.getElementById('username')
username.onfocus=function(){}
username.onblur=function(){}
username.onselect=function(){} //内容被选中
username.oninput=function(){} //内容被实时改变
username.onchange=function(){}


// 窗口加载事件
// 先让html标签里面的body html元素先执行
// 或者用onload事件 window.onload=function(){}