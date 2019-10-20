
---
id: 895433
space: easywebpack
slug: wb66pe
url: /easywebpack/wb66pe
title: 静态资源
summary: import 方式引入在组件中直接 import js 和 css 公共文件, 这种引入会进行 Webpack 编译，比如压缩import  &#x27;asset/css/global.css&#x27; import  &#x27;asset/js/common.js&#x27; 文件拷贝模式借助 copy-webpack-plugin  进行文件拷贝，copy 插件已在 easywebpack@4.8.5 内置支持，然后页面通过 link  标签引入。注意拷贝的文件不会压缩和hash...
coverImage: null
createTime: 2018-10-16T10:32:42.000Z 
upateTime: 2019-06-12T09:53:29.000Z
wordCount: 290
layout: doc
---

## import 方式引入

在组件中直接 import js 和 css 公共文件, 这种引入会进行 Webpack 编译，比如压缩

```javascript
import  'asset/css/global.css'
import  'asset/js/common.js'
```



## 文件拷贝模式

借助 `copy-webpack-plugin`  进行文件拷贝，copy 插件已在 easywebpack@4.8.5 内置支持，然后页面通过 `link`  标签引入。注意拷贝的文件不会压缩和hash，所以拷贝的文件建议是压缩的，同时修改引入时，记得修改版本号版本号控制。

- webpack.config.js 配置


```javascript
module.exports = {
  plugins: {
    copy: [{
      from: 'app/web/asset/css/bootstrap.min.css',
      to: 'asset/css/bootstrap.min.css'
    }]
  }
};
```

- 页面引入


```bash
<link href="/public/asset/css/bootstrap.min.css?v=1" rel="stylesheet" type="text/css" />
```



## CDN 链接引入

```javascript
<link href="//bootcdn.com/public/asset/css/bootstrap.min.css?v=1" rel="stylesheet" type="text/css" />
```



## 静态资源内敛

[raw-loader](https://github.com/webpack-contrib/raw-loader) 内敛脚本 或 Vue template 标签动态绑定引入

```javascript
const vConsoleScript = `<script async src="//cdn.com/script/vConsole.min.js"></script>';  
<template v-html="vConsoleScript"></template>
<template v-html="require('raw-loader!./script/vConsole.min.js')"></template>
```


  