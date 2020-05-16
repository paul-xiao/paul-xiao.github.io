---
title: IOS safari weird bugs
date: 2019-11-27 19:06:52
tags:
 - ios
 - safari
categories:
 - hacks 
---
#### 100vh not fully display


#### position fixed div still can scroll behand the div

#### position fixed div overflow can not been seen
<!-- more -->

#### video play button cannot hide


#### video cannot autoplay



#### font-size less than 16px will zoom 
[disable-auto-zoom-in-input-text-tag-safari-on-iphone](https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone)



#### safari freeze issue

```js

 created() {
     document.addEventListener('touchmove', this.handleTouchMove)
   },
   methods: {
     handleTouchMove() {
       document.body.scrollTop = 0
     }
   },
   beforeDestory() {
     document.removeEventListener('touchmove', this.handleTouchMove)
   }
 }


```


#### input can be edit even it's overlaped, autofill related ?




#### ios datetime format NaN




#### show blank when scroll on ios safari

```less
transform: tranlated3D(0,0,0)
```