---
title: Handle broswer back event
date: 2020-3-18 11:06 AM
tags:
  - broswer
categories:
  - frontend
comments: true
thumbnail: '/thumbnails/chrome.jpg'
---

> popstate event in Vue only triggers when *history.pushState(null, null, document.URL); is called*  ==> need more prove

```js
 if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
    }
```