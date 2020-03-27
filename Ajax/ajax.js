XMLHttpRequest //对象用于和服务器交换数据。

// 向服务器发送请求
// 如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：

xmlhttp.open("GET","test1.txt",true);
xmlhttp.send();
// 方法	描述
open(method,url,async)	
// 规定请求的类型、URL 以及是否异步处理请求。
method//请求的类型；GET 或 POST
url//：文件在服务器上的位置
// async：true（异步）或 false（同步）
send(string)	
// 将请求发送到服务器。
// string：仅用于 POST 请求


// GET 还是 POST？
// 与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。
// 然而，在以下情况中，请使用 POST 请求：
// 无法使用缓存文件（更新服务器上的文件或数据库）
// 向服务器发送大量数据（POST 没有数据量限制）
// 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠


// GET 请求
// 一个简单的 GET 请求：
xmlhttp.open("GET","demo_get.asp",true);
xmlhttp.send();
// 在上面的例子中，您可能得到的是缓存的结果。
// 为了避免这种情况，请向 URL 添加一个唯一的 ID：
xmlhttp.open("GET","demo_get.asp?t=" + Math.random(),true);
xmlhttp.send();
// 如果您希望通过 GET 方法发送信息，请向 URL 添加信息：
xmlhttp.open("GET","demo_get2.asp?fname=Bill&lname=Gates",true);
xmlhttp.send();


POST
// 一个简单 POST 请求：

xmlhttp.open("POST","demo_post.asp",true);
xmlhttp.send();
// 如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。
// 然后在 send() 方法中规定您希望发送的数据：
xmlhttp.open("POST","ajax_test.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Bill&lname=Gates");

// 方法	描述
setRequestHeader(header,value)	
// 向请求添加 HTTP 头。
header: 规定头的名称
value: 规定头的值



onreadystatechange //事件
// 当请求被发送到服务器时，我们需要执行一些基于响应的任务。

// 每当 readyState 改变时，就会触发 onreadystatechange 事件。

// readyState 属性存有 XMLHttpRequest 的状态信息。

// 下面是 XMLHttpRequest 对象的三个重要的属性：

onreadystatechange	//存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
readyState	//存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪
// status	200: "OK"
// 404: 未找到页面

// 在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

// 当 readyState 等于 4 且状态为 200 时，表示响应已就绪：

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
// 注释：onreadystatechange 事件被触发 5 次（0 - 4），对应着 readyState 的每个变化。


// callback 函数是一种以参数形式传递给另一个函数的函数。
// 如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。
// 该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：

function myFunction()
{
loadXMLDoc("ajax_info.txt",function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  });
}