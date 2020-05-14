# TCP/IP 的分成管理

## 分为以下 4 层：应用层、传输层、网络层和数据链路层
### 应用层：
* 应用层决定了向用户提供应用服务时通信的活动。
* TCP/IP 协议族内预存了各类通用的应用服务。比如，FTP（File Transfer Protocol，文件传输协议）和 DNS（Domain Name System，域 名系统）服务就是其中两类
### 传输层：
* 对上层应用层，提供处于网络连接中的两台计算机之间的数据 传输。
* 在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报 协议
### 网络层：
* 网络层用来处理在网络上流动的数据包。数据包是网络传输的最小数 据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计 算机，并把数据包传送给对方
* 与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所 起的作用就是在众多的选项内选择一条传输路线。
### 链路层
* 用来处理连接网络的硬件部分。包括控制操作系统、硬件的设备驱 动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等 物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在 链路层的作用范围之内

### 我们用 HTTP 举例来说明
* 首先作为发送端的客户端在应用层 （HTTP 协议）发出一个想看某个 Web 页面的 HTTP 请求。 
* 接着，为了传输方便，在传输层（TCP 协议）把从应用层处收到的数 据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端 口号后转发给网络层。
* 在网络层（IP 协议），增加作为通信目的地的 MAC 地址后转发给链 路层。这样一来，发往网络的通信请求就准备齐全了。
* 接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用 层。当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP 请求。



#### 确保可靠性的 TCP 协议 
* 为了准确无误地将数据送达目标处，TCP 协议采用了三次握手 （three-way handshaking）策略。用 TCP 协议把数据包送出去后，TCP 不会对传送后的情况置之不理，它一定会向对方确认是否成功送达。
* 握手过程中使用了 TCP 的标志（flag） —— SYN（synchronize） 和 ACK（acknowledgement）。 
* 发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后， 回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发 送端再回传一个带 ACK 标志的数据包，代表“握手”结束。 

#### 　负责域名解析的 DNS 服务
* DNS（Domain Name System）服务是和 HTTP 协议一样位于应用层的 协议。它提供域名到 IP 地址之间的解析服务。 计算机既可以被赋予 IP 地址，也可以被赋予主机名和域名。比如 www.hackr.jp

=================================

## 请求报文及响应报文的结构
## 报文首部  空行(ctrl+lf) 报文主体
## 报文首部  空行(ctrl+lf) 报文主体

### 报文首部
* 请求行
* 请求首部字段
* 通用首部字段
* 实体首部字段

### 报文首部
* 状态行
* 响应首部字段
* 通用首部字段
* 实体首部字段


### 3.5 发送多种数据的多部分对象集合
##### MIME
* 发送邮件时，我们可以在邮件里写入文字并添加多份附件。这是因为 采用了 MIME（Multipurpose Internet Mail Extensions，多用途因特网邮 件扩展）机制，它允许邮件处理文本、图片、视频等多个不同类型的数据。例如，图片等二进制数据以 ASCII 码字符串编码的方式指明， 就是利用 MIME 来描述标记数据类型。而在 MIME 扩展中会使用一 种称为多部分对象集合（Multipart）的方法，来容纳多份不同类型的 数据。
* 相应地，HTTP 协议中也采纳了多部分对象集合，发送的一份报文主 体内可含有多类型实体。通常是在图片或文本文件等上传时使用
##### Content-Type: multipart/form-data
* 在 Web 表单*文件*上传时使用。 

##### enctype
发送 POST 请求时候，表单 属性 enctype 共有二个值可选，这个属性管理的是表单的 MIME 编码：
1. application/x-www-form-urlencoded (默认值)
2. multipart/form-data
*注*：form 表单中 enctype 的默认值是 enctype="application/x- www-form-urlencoded".


### 3.6　内容协商返回最合适的内容
+ Accept 
+ Accept-Charset
+ Accept-Encoding 
+ Accept-Language 
+ Content-Language 

# 第 4 章　返回结果的 HTTP 状态 码


## 5.2　通信数据转发程序 ：代理、网关、隧 道

### 使用代理服务器的理由有：利用缓存技术（稍后讲解）减少网络带宽 的流量，组织内部针对特定网站的访问控制，以获取访问日志为主要 目的，等等。
代理有多种使用方法，按两种基准分类。一种是是否使用缓存，另一 种是是否会修改报文。
## 缓存代理
代理转发响应时，缓存代理（Caching Proxy）会预先将资源的副本 （缓存）保存在代理服务器上。
当代理再次接收到对相同资源的请求时，就可以不从源服务器那里获 取资源，而是将之前缓存的资源作为响应返回。
## 透明代理
转发请求或响应时，不对报文做任何加工的代理类型被称为透明代理 （Transparent Proxy）。反之，对报文内容进行加工的代理被称为非 透明代理。



# 第 6 章　HTTP 首部

## 通用首部字段（General Header Fields）
请求报文和响应报文两方都会使用的首部。

## 请求首部字段（Request Header Fields）
从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加 内容、客户端信息、响应内容相关优先级等信息。

## 响应首部字段（Response Header Fields）
从服务器端向客户端返回响应报文时使用的首部。补充了响应的附加 内容，也会要求客户端附加额外的内容信息。

## 实体首部字段（Entity Header Fields）
针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更 新时间等与实体有关的信息。

## 通用首部字段
Cache-Control       控制缓存的行为
Connection          逐跳首部、连接的管理
Date                创建报文的日期时间 
Pragma              报文指令
Trailer             报文末端的首部一览 
Transfer-Encoding   指定报文主体的传输编码方式 
Upgrade             升级为其他协议
Via                 代理服务器的相关信息
Warning             错误通知


## 请求首部字段
Accept              用户代理可处理的媒体类型 
Accept-Charset      优先的字符集 
Accept-Encoding     优先的内容编码 
Accept-Language     优先的语言（自然语言） 
Authorization       Web认证信息 
Expect              期待服务器的特定行为 
From                用户的电子邮箱地址 
Host                请求资源所在服务器 
If-Match            比较实体标记（ETag） 
If-Modified-Since   比较资源的更新时间 
If-None-Match       比较实体标记（与 If-Match 相反） 
If-Range            资源未更新时发送实体Byte 的范围请求 
If-Unmodified-Since 比较资源的更新时间（与If-Modified-Since相反） 
Max-Forwards        最大传输逐跳数 
Proxy-Authorization 代理服务器要求客户端的认证信息 Range 实体的字节范围请求 
Referer             对请求中 URI 的原始获取方 
TE                  传输编码的优先级 
User-Agent HTTP     客户端程序的信息


## 响应首部字段
Accept-Ranges       是否接受字节范围请求
Age                 推算资源创建经过时间 
ETag                资源的匹配信息 
Location            令客户端重定向至指定URI 
Proxy-Authenticate  代理服务器对客户端的认证信息 
Retry-After         对再次发起请求的时机要求 
Server              HTTP服务器的安装信息 
Vary                代理服务器缓存的管理信息 
WWW-Authenticate    服务器对客户端的认证信息


## 实体首部字段
Allow               资源可支持的HTTP方法 
Content-Encoding    实体主体适用的编码方式 
Content-Language    实体主体的自然语言 
Content-Length      实体主体的大小（单位：字节） 
Content-Location    替代对应资源的URI 
Content-MD5         实体主体的报文摘要 
Content-Range       实体主体的位置范围 
Content-Type        实体主体的媒体类型 
Expires             实体主体过期的日期时间 
Last-Modified       资源的最后修改日期时间

## 6.2.6　End-to-end 首部和 Hop-by-hop 首部 
### 端到端首部（End-to-end Header）
* 分在此类别中的首部会转发给请求 / 响应对应的最终接收目标，中间有缓存服务器或代理服务器，且必须保存在由缓存生成的响应中，另外规定它必须被转发，直到最终接受目标。

### 逐跳首部（Hop-by-hop Header）
* 分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再转发。HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部，需提 供 Connection 首部字段 

* 下面列举了 HTTP/1.1 中的逐跳首部字段。除这 8 个首部字段之外， 其他所有字段都属于端到端首部。
Connection
Keep-Alive
Proxy-Authenticate
Proxy-Authorization
Trailer
TE
Transfer-Encoding
Upgrade

=============================================================================
### 区分
* Transfer-Encoding,
* TE,
* Content-Encoding,
* Accept-Encoding四个首部字段
+ 首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式，
    * Transfer-Encoding：用于指定传输报文主体时使用的编码方式，属于逐跳首部，即只在两个节点间有效
    * TE：用于告知服务器客户端能够处理的编码方式和相对优先级，属于逐跳首部，即只在两个节点间有效
    * Content-Encoding：用于指定报文主体已经采用的编码方式，属于端到端首部，即在整个传输过程中有效。
    * Accept-Encoding：用于告知服务器客户端能够处理的编码方式和相对优先级，属于端到端首部，即在整个传输过程中有效。
<!-- 很显然，Transfer-Encoding和TE是一组，Content-Encoding和Accept-Encoding是一组。
根本区别在于，Content-Encoding和Accept-Encoding限制的是报文主体在整个传输过程中使用的编码方式，全局有效；Transfer-Encoding和TE限制的是报文主体在两个节点间（源服务器和代理服务器之间、代理服务器和客户端之间等）传输时使用的编码方式，只在两节点间有效。举例说明：
假设A为服务器，D为客户端，从A到D的路径为A-B-C-D，所需传输的资源为X。步骤如下：
（1）D向A请求X，并在请求报文中指明自己支持的编码方式为gzip；
    Accept-Encoding:gzip

（2）请求按路径传递到A处，A将X用gzip编码进行压缩并发到B处，由B进行下一步转交，并在报文中指明使用的编码方式为gzip；
    Content-Encoding:gzip

（3）B认为传给C时使用分块传输比较合理，就对A传过来的报文实体进行分块，并在报文中说明：
    Content-Encoding:gzip
    Transfer-Encoding:chunked

（4）C收到B的报文，并根据Transfer-Encoding:chunked判断出B进行了分块传输，于是C对收到的各个分块进行重组，还原出完整的X（注意此时的X还是被gzip压缩过的状态）。之后C不进行分块，直接将整个发送给D：
    Content-Encoding:gzip

（5）D接收到响应报文，并根据Content-Encoding:gzip判断出报文实体已经被gzip压缩过了，于是对其进行解码，最终获得资源X -->
=================================================================================