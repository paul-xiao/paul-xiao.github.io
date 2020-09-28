---
title: how react serviceWorker works
date: 2019-08-08 10:38:25
tags:
 - react
categories:
 - framework
thumbnail: '/thumbnails/service_worker.jpg' 
---

<!-- more -->
#### serviceWorker 
> https://zhuanlan.zhihu.com/p/23966686

```js
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
