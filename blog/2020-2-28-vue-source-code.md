---
title: Vue source code
date: 2020-2-28 5:36 PM
stick: true
tags:
- vue
categories:
- frontend
comments: true
---
![image](/logo.png)

Vue-2.x and Vue-next source code compare
<!-- more -->

### Vue 2.x

**目录结构**
```
├─benchmarks             # 存放用于评估性能的代码,用于其他框架对比
├─dist                   # 项目构建后的文件
├─scripts                # 与项目构建相关的脚本和配置文件
├─flow                   # flow的类型声明文件
├─src                    # 项目源代码
│    ├─complier          # 与模板编译相关的代码
│    ├─core              # 通用的、与运行平台无关的运行时代码
│    │  ├─observe        # 实现变化侦测的代码
│    │  ├─vdom           # 实现virtual dom的代码
│    │  ├─instance       # Vue.js实例的构造函数和原型方法
│    │  ├─global-api     # 全局api的代码
│    │  └─components     # 内置组件的代码
│    ├─server            # 与服务端渲染相关的代码
│    ├─platforms         # 特定运行平台的代码，如weex
│    ├─sfc               # 单文件组件的解析代码
│    └─shared            # 项目公用的工具代码
└─test                   # 项目测试代码
```
> [flow](https://flow.org/): Facebook 团队开发的静态类型检查工具, 用于Vue2.x, Vue3 开始用TS <small>(3)</small>

#### code/index.js

```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

/*
* Object.defineProperty(obj, prop, descriptor)
* obj 要在其上定义属性的对象。
* prop 要定义或修改的属性的名称。
* descriptor 将被定义或修改的属性描述符。
*/
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```



------
#### 参考
1. [https://github.com/answershuto/learnVue](https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E5%86%8D%E7%9C%8B%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.MarkDown)

2. [https://nlrx-wjc.github.io/Learn-Vue-Source-Code/](https://nlrx-wjc.github.io/Learn-Vue-Source-Code/)

3. [https://www.zhihu.com/question/46397274](https://www.zhihu.com/question/46397274)