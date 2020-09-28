---
title: customize hexo theme
author: paul xiao
date: 2019-7-17
type: "tags"
photos:
- /images/baby.jpg
categories:
- frontend
tags:
- hexo
thumbnail: '/thumbnails/hexo.jpg'
---
*customeize hexo theme arrange (a group of people or things) in classes or categories according to shared qualities or characteristics.*
<!-- more -->
#### scaffolds
```
|--- pulse
|    |--- languages
|         |--- en.yml
|         |--- zh-CN.yml
|    |--- layout
|         |--- _partial
|              |--- article.ejs
|              |--- header.ejs
|              |--- footer.ejs
|              |--- side.ejs
|         |--- index.ejs
|         |--- post.ejs
|         |--- page.ejs
|         |--- archive.ejs
|         |--- layout.ejs
|    |--- scripts
|    |--- source
|    |--- _config.yml
```

#### ejs

#### Partial [局部模版](https://hexo.io/zh-cn/docs/templates.html#%E5%B1%80%E9%83%A8%E6%A8%A1%E7%89%88%EF%BC%88Partial%EF%BC%89)
```bash
# with params
<%- partial('_partial/footer', null, {cache: !config.relative_link}) %>   # Fragment Caching

<%- partial('header', {}, {cache: true});

```

#### layout

```html

<!DOCTYPE html>
<html>
  <body><%- body %></body>
</html>

```
#### [variables](https://hexo.io/zh-cn/docs/variables)

```bash
# use config variables
<%- config.var %>

# use theme variables
<%- theme.var %>

```

#### helpers

```bash
# load css

<%- css(path) %>
<%- css([path1, path2]) %>


# url_for

<%- url_for(path) %>


```


#### sass support

```bash
 npm install --save hexo-renderer-sass

```


#### search

