
---
id: 685572
space: easywebpack
slug: common
url: /easywebpack/common
title: 公共提取
summary: Webpack CommonsChunk 公共代码提取easywebpack 4.10.0 开始，底层通过 optimization 实现公共提取，支持公共 js 和 css  提取, 提取的公共 chunk 文件名默认为 common .   默认是提取的是 node_modules 下依赖...
coverImage: null
createTime: 2019-12-11T14:28:22.000Z 
upateTime: 2019-12-11T14:28:22.000Z
wordCount: 439
layout: doc
---

## Webpack CommonsChunk 公共代码提取

- easywebpack 4.10.0 开始，底层通过 [optimization](https://webpack.js.org/configuration/optimization/) 实现公共提取，支持公共 `js` 和 `css`  提取, 提取的公共 chunk 文件名默认为 `common` .  ** 默认是提取的是 node_modules 下依赖的公共文件，你可以通过配置 lib 支持指定的公共模块提取。另外，可以通过配置 **[optimization](https://webpack.js.org/configuration/optimization/) 选项来覆盖默认配置(注意：css 和 js 的公共名字必须一样)


- easywebpack 3.5.0 版本支持直接 `webpack.config.js` 文件添加 lib 节点配置即可完成 `commonsChunk` 公共库的配置。


```javascript
module.exports = {
  lib:['vue','vuex','axios']
}
```

这样默认生成的功能代码文件名称为 `common.js`, 你可以通过如下方式进行自定义

```javascript
module.exports = {
  lib:{
    name: 'commonlib',
    lib: ['vue','vuex','axios']
  }
}
```



## Script 方式引入 React/Vue 第三方包

#### 

#### 编写自定义公共第三方包代码

> ${root}/src/react-lib.js


```javascript
import React from 'react';
import ReactDOM from 'react-dom';


export {
  React,
  ReactDOM
}
```


#### 构建 React 独立 Script 包


#### 通过 [easywebpack-js](https://github.com/easy-team/easywebpack-js) 配置构建第三方包

```javascript
// ${root}/webpack.config.js
module.exports = {
  framework: 'js',  // 使用 easywebpack-js 解决方案
  entry: {
    'react-lib': 'scr/react-lib.js'
  },
  output: {
    library: "ReactLib" 
  }
}
```


#### 项目 Webpack 配置 externals 排除第三方包

> ${root}/webpack.config.js


```javascript
module.exports = {
  ....
  externals: {
    'react': 'ReactLib.React',
    'react-dom': 'ReactLib.ReactDOM'
  },
}
```


#### 页面 Script 引入构建的第三方包

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>React Common Lib Test</title>
    <script src="/react-lib.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```


#### 实际案例

- [react-common-lib](https://github.com/easy-team/easywebpack-js/tree/master/example/react-common-lib) React common lib and example
- [vue-common-lib](https://github.com/easy-team/easywebpack-js/tree/master/example/vue-common-lib) Vue common lib and example 

## 

  