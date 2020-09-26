---
title: Vue source code
date: 2020-2-28 5:36 PM
stick: true
tags:
- vue
categories:
- frontend
comments: true
thumbnail: '/blog-3.jpg'
---

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

#### 初始化VUE实例

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
#### ./instance/index.js

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue


```

#### MVVM

> Model-View-ViewModel <small>(4)</small>

![image](/mvvm.png)
![image](/vue.jpg)



- Observer：数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现；
- Compile ：指令解析器，它的作用是对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数；
- Watcher ：订阅者，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数；
- Dep ：消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。




#### 响应式原理


![image](/reactive.jpg)

> 异步更新队列

```js

var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})


```

#### 问题驱动
> 源码看不动了,怎么办? 

------
#### 参考
1. [https://github.com/answershuto/learnVue](https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E5%86%8D%E7%9C%8B%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.MarkDown)

2. [https://nlrx-wjc.github.io/Learn-Vue-Source-Code/](https://nlrx-wjc.github.io/Learn-Vue-Source-Code/)

3. [https://www.zhihu.com/question/46397274](https://www.zhihu.com/question/46397274)
4. [what is MVVM](https://medium.com/@gaogezhang/%E5%AD%A6%E7%82%B9%E5%84%BF%E6%8A%80%E6%9C%AF-mvvm%E6%9E%B6%E6%9E%84%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-ce5a4c731079)

5. [官方文档： 深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
6. [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
