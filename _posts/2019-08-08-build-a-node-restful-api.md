---
title: build a node restful api
date: 2019-08-08 10:48:37
tags:
 - restful api
categories:
 - nodejs
---

#### build dev env

- nodemon
> https://github.com/remy/nodemon

<!-- more -->
```js

// nodeamon
npm install --save-dev nodemon

touch nodemon.json

{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony" // support es6
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
   // By default nodemon monitors the current working directory. If you want to take control of that option, use the --watch option to add specific paths:
  "watch": [
    "test/fixtures/",
    "test/samples/"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json"
}



```
- cross-env
> Run scripts that set and use environment variables across platforms
```js
//package.json
"start": "cross-env NODE_ENV=production node server.js",
"dev": "cross-env NODE_ENV=development nodemon --inspect server.js"
```
#### User auth

- bcrypt
> A library to help you hash passwords.

- cors
> [Using CORS in Express](https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b)
```js
const cors = require('cors');

app.use(cors()) //enabled
```


#### images compress





#### refs

1. [nodejs复制文件](https://blog.csdn.net/weixin_37994110/article/details/89057704)