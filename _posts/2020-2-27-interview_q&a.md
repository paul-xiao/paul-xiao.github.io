---
title: 前端面试问题及答案汇总
date: 2020-2-27 11:04
stick: true
tags:
  - interview
categories:
  - other
comments: true
---

![image](./assets/images/qna.jpeg)

> checked ali p6 front-end interview questions today, seems lots of questions not able to answer it, still much to learn, so make a Q&A collection here, hope we can get something when all these questions are answered.

<!-- more -->

### SPA

单页 Web 应用（single page web application，SPA），就是只有一张 Web 页面的应用，是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序。

SPA 的特点：
速度：更好的用户体验，让用户在 web app 感受 native app 的速度和流畅，

- MVVM：经典 MVVM 开发模式，前后端各负其责。
- ajax：重前端，业务逻辑全部在本地操作，数据都需要通过 AJAX 同步、提交。
- 路由：在 URL 中采用#号来作为当前视图的地址,改变#号后的参数，页面并不会重载

SPA 的两个缺点：
首屏渲染等待时长： 必须得加载完毕，才能渲染出首屏
seo 不友好：爬虫只能拿到一个 div，认为页面是空的，不利于 seo

开发流程
用循环的视角审视 Web 应用开发
框定一个一致的 SPA 图形用户界面（GUI）和模型
将 SPA 的原则带回服务器端
聚集于对合适的应用进行早期 SPA 开发 [3]

SPA 的优缺点
单页 Web 程序的出现是客户端发展的必然结果，但是该技术也是有些局限性，所以采用之前需要了解清楚它的优缺点。

1、优点：
1). 良好的交互体验
用户不需要重新刷新页面，获取数据也是通过 Ajax 异步获取，页面显示流畅。

2). 良好的前后端工作分离模式
单页 Web 应用可以和 RESTful 规约一起使用，通过 REST API 提供接口数据，并使用 Ajax 异步获取，这样有助于分离客户端和服务器端工作。更进一步，可以在客户端也可以分解为静态页面和页面交互两个部分。

3). 减轻服务器压力
服务器只用出数据就可以，不用管展示逻辑和页面合成，吞吐能力会提高几倍；

4). 共用一套后端程序代码
不用修改后端程序代码就可以同时用于 Web 界面、手机、平板等多种客户端；

2、缺点：
1). SEO 难度较高
由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势，所以如果你的站点对 SEO 很看重，且要用单页应用，那么就做些静态页面给搜索引擎用吧。

2). 前进、后退管理
由于单页 Web 应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理，当然此问题也有解决方案，比如利用 URI 中的散列+iframe 实现。

3). 初次加载耗时多
为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面可以在需要的时候加载。所以必须对 JavaScript 及 CSS 代码进行合并压缩处理，如果使用第三方库，建议使用一些大公司的 CDN，因此带宽的消耗是必然的。

#### Vue 相关

<details>
<summary>1. Vue 如何实现数据双向绑定的</summary>

data ---> observe ---> Observer ---> walk ---> defineReactive

get ---> dep.depend() ---> Dep.target.addDep(Watcher)

get: Dep 派发器收集到了 Watcher 当作依赖

set ---> dep.notify() ---> Watcher.update ---> updateComponent

set: Dep 派发器事件分发，使所有收集到的依赖执行 this.get，这时候 view 会更新

Vue 初始化时 data 会被包装为 observer, 然后将 data 里的所有值通过 defineReactive 转换为响应式数据，执行 get 时将收集 Watcher 当作依赖，执行 set 时会执行通知对应的 watcher,最后执行 updateComponent，更新 view

</details>

#### HTTP

<details>
<summary>1. 什么式跨域，常见的处理方式有哪些</summary>

> 跨域： 浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 JavaScript 实施的安全限制。

同源策略（所谓同源是指：域名、协议、端口相同）限制了以下行为：

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 和 JS 对象无法获取
- Ajax 请求发送不出去

处理方式：

- cors

CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。

1. 简单请求
   （1) 请求方法是以下三种方法之一：
   HEAD
   GET
   POST
   （2）HTTP 的头信息不超出以下几种字段：
   Accept
   Accept-Language
   Content-Language
   Last-Event-ID
   Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain
2. 非简单请求
   非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求（preflight）.服务器收到"预检"请求以后，检查了 Origin、Access-Control-Request-Method 和 Access-Control-Request-Headers 字段以后，确认允许跨源请求，就可以做出回应。 一旦服务器通过了"预检"请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 Origin 头信息字段。服务器的回应，也都会有一个 Access-Control-Allow-Origin 头信息字段。

- jsonp(JSON with Padding)

  通过 _ script _ 标签调用 callback 函数处理回传结果
  JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

- http-proxy(dev)

  通过搭建一个中转服务器来转发请求规避跨域的问题。生产环境中使用 nginx 进行反向代理

</details>

<details>
<summary>2. Get/Post请求的区别</summary>

1、GET 请求一般用去请求获取数据，POST 一般作为发送数据到后台时使用

2、GET 请求也可传参到后台，但是其参数在浏览器的地址栏的 url 中可见，所以隐私性安全性较差，且参数长度也是有限制的，POST 请求传递参数放在 Request body 中，不会在 url 中显示，比 GET 要安全，且参数长度无限制

3、GET 请求刷新浏览器或回退时没有影响，POST 回退时会重新提交数据请求

4、GET 请求可被缓存，POST 请求不会被缓存

5、GET 请求保留在浏览器历史记录中，POST 请求不会保留在浏览器历史记录中

6、GET 请求可被收藏为书签，POST 不能被收藏为书签

7、GET 请求只能进行 url 编码（application/x-www-form-urlencoded），POST 支持多种编码方式（application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。）

8、GET 请求比较常见的方式是通过 url 地址栏请求，POST 最常见是通过 form 表单发送数据请求

9、post 请求和 get 请求都是 HTTP 的请求方式，本质上来说并无区别，底层实现都是基于 TCP/IP 协议

</details>

#### refs

1. [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
2. [HTTP 方法：GET 对比 POST](https://www.w3school.com.cn/tags/html_ref_httpmethods.asp)
3. [面试问题整理](https://www.cnblogs.com/zhouwenfan-home/p/10469573.html)
