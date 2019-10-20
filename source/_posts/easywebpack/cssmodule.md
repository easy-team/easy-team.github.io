
---
id: 814227
space: easywebpack
slug: cssmodule
url: /easywebpack/cssmodule
title: Css Module
summary: easywepack4easywebpack4 默认提供 /\.module\.(css|less|scss|stylus)/  的文件规范的 CSS Module 特性，把 css module 的样式文件改成 /\.module\.(css|less|scss|stylus)/  规范，这...
coverImage: null
createTime: 2019-06-28T15:47:31.000Z 
upateTime: 2019-06-28T15:47:31.000Z
wordCount: 155
layout: doc
---

## easywepack4

easywebpack4 默认提供 `/\.module\.(css|less|scss|stylus)/`  的文件规范的 CSS Module 特性，把 css module 的样式文件改成 `/\.module\.(css|less|scss|stylus)/`  规范，这样就无需额外配置，从而同时支持 CSS Module 和 普通样式文件。


## easywebpack3

**config.cssModule** : 非必需，{boolean,object} 开启 css module 特效,  easywebpack3 和 easywebpack 4 都支持

- css module 特性与普通 css 的loader 配置是冲突, 所以如果部分开启css module, 必须指定配置需要 css module 的样式文件.


```javascript
module.exports = {
  cssModule: {
    include: 'app/web/page/css/module'
  }
}
```

- 如果全站都使用 css module 特性, 可以这样配置


```javascript
module.exports = {
  cssModule: true
}
```


  