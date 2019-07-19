---
title: css tricks
date: 2019-07-17 17:55:17
tags:
  - css
categories:
  - fontend
---

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
[box-shadow partially broken](https://stackoverflow.com/questions/47310583/break-inside-avoid-not-working-with-padding-in-edge)

// fix
backface-visibility:hidden;

```
