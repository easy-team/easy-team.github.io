
---
id: 3618042
space: egg-vue
slug: inline
url: /egg-vue/inline
title: 静态资源
summary: 静态资源构建此处为语雀文档，点击链接查看：https://www.yuque.com/easy-team/easywebpack/wb66pe外部静态资源链接const vConsoleScript = `<script async src="//cdn.com/script/vConsole...
coverImage: null
createTime: 2019-12-15T12:46:38.000Z 
upateTime: 2019-12-15T12:58:58.000Z
wordCount: 60
layout: doc
---

## 静态资源构建




## 外部静态资源链接


```javascript
const vConsoleScript = `<script async src="//cdn.com/script/vConsole.min.js"></script>';  
<template v-html="vConsoleScript"></template>
```


## 静态资源内敛



  