---
title: css tricks
date: 2019-07-17 17:55:17
stick: false
tags:
  - css
categories:
  - frontend
thumbnail: '/thumbnails/css3.jpg'
---

css3 tricks
<!-- more -->
## column layout

```less
.wrap {
  column-count: 3;
  column-gap: 10px;
}
.item {
  box-sizing: border-box;
  break-inside: avoid;
}

// break-inside: avoid; box-shadow is not fully display
// [box-shadow partially broken](https://stackoverflow.com/questions/47310583/break-inside-avoid-not-working-with-padding-in-edge)
// backface-visibility:hidden; ---- not working

// fix  https://stackoverflow.com/questions/17881923/box-shadow-trimmed-in-css-columns-in-chrome
 transform: translateZ(0);

```

## remove browser autocomplete

autocomplete 属性规定输入字段是否应该启用自动完成功能。

自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。



```html
<!-- 注释：autocomplete 属性适用于 <form>，以及下面的 <input> 类型：text, search, url, telephone, email, password, datepickers, range 以及 color。 -->
<input autocomplete="off">
```