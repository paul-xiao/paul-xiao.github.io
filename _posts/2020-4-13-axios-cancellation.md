---
title: Axios request cancellation
date: 2020-3-18 11:06 AM
tags:
  - axios
categories:
  - frontend
comments: true
---

> few tips for axios reqest cancellation

1. for post request cancelToken need put after parmas

```js

axios.get(url, {}, {cancelToken: token}).then(...) 


```
2. cancel reset

works when after cancel need to request agian

```js
const CancelToken = axios.CancelToken
let source = CancelToken.source()
foo() {
  source.cancel(msg)
  source = CancelToken.source() // reset
}

```