
---
id: 685564
space: easywebpack
slug: native
url: /easywebpack/native
title: 快速开始
summary: easywebpack 获取原生 Webpack 配置easywebpack.getWebpackConfig(config)  这种获取方式是指通过解决方案获取配置, 参数 config 支持如下三种配置: config 为 null 或 undefined 时, 目前读取项目根目录下的 w...
coverImage: null
createTime: 2019-10-05T07:49:14.000Z 
upateTime: 2019-10-05T07:49:14.000Z
wordCount: 405
layout: doc
---

## easywebpack 获取原生 Webpack 配置

```javascript
easywebpack.getWebpackConfig(config)

这种获取方式是指通过解决方案获取配置, 参数 config 支持如下三种配置:
config 为 null 或 undefined 时, 目前读取项目根目录下的 webpack.config.js
config 为 object 时, 也就是直接传入 webpack.config.js 的配置
config 为 string 时, 表示指定 webpack.config.js 自定义配置文件路径
```


### 获取 Webpack 配置

```javascript
const easy = require('easywebpack');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  target: 'web',
  entry: {
    app: 'src/lib.js'
  }
});
```


### 获取 Vue 项目配置

> 默认 Node 和 Web 构建的 Webpack 配置，总共两个配置,  通过 `target: web`  获取前端配置


```javascript
const easy = require('easywebpack-vue');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  target: 'web',
  entry: {
    app: 'src/lib.js'
  }
});
```


### 获取 React 项目配置

> 默认 Node 和 Web 构建的 Webpack 配置，总共两个配置,  通过 `target: web`  获取前端配置


```javascript
const easy = require('easywebpack-react');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  target: 'web',
  entry: {
    app: 'src/lib.js'
  }
});
```


### 获取 HTML 项目配置

```javascript
const easy = require('easywebpack-html');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  template: 'src/template.html'
  entry: {
    app: 'src/lib.js'
  }
});
```


### 获取 JS 打包配置

```javascript
const easy = require('easywebpack-js');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  entry: {
    app: 'src/lib.js'
  }
});
```



### Weex 解决方案

- 内置方法


```javascript
const EasyWebpack = require('easywebpack-weex');
const webpackConfig = EasyWebpack.getWebpackConfig();
```

- builder方式


```javascript
const EasyWebpack = require('easywebpack-weex');
// Weex Native App Webpack编译配置
const webpackConfig = new EasyWebpack.WebpackWeexBuilder(config).create();
// Weex Web Webpack编译配置
const webpackConfig = new EasyWebpack.WebpackWebBuilder(config).create();
```


  