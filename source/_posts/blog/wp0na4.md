
---
id: 1247134
space: blog
slug: wp0na4
url: /blog/wp0na4
title: 轻轻松松搞定 Webpack 项目构建
summary: 基于 easywebpack 工程体系，你能非常简单，快速的编写出 webpack 复杂的配置，你无需过多关心热更新，是否压缩，是否Hash，公共JS/CSS，DLL，构建速度等问题，这些 easywebpack 都已经帮你解决和优化了。easywebpack 提供 Vue/React/JS/...
coverImage: 
createTime: 2019-02-14T05:53:58.000Z 
upateTime: 2019-05-25T08:48:40.000Z
wordCount: 559
layout: doc
---
基于 easywebpack 工程体系，你能非常简单，快速的编写出 webpack 复杂的配置，你无需过多关心热更新，是否压缩，是否Hash，公共JS/CSS，DLL，构建速度等问题，这些 easywebpack 都已经帮你解决和优化了。<br />easywebpack 提供 Vue/React/JS/HTML 等多种前端框架的 Webpack 构建解决方案，同时结合 easywebpack-cli 工具能够快速的进行项目开发。


### Webpack 集成配置编写

> 根据 easywebpack 拿到基础配置后，你可以根据自己的需要进行修改和增强。



#### 基于 easywebpack 编写配置

```js
const easy = require('easywebpack');
module.exports = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  target: 'web',
  entry: {
    app: 'src/lib.js'
  }
});
```


#### 打印出来效果


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1542882698221-53aa4248-df4c-416c-bf30-a4299364827f.png#align=left&display=inline&height=1124&originHeight=2862&originWidth=1902&width=747)



#### env 环境说明

> 默认支持 dev, test, prod 模式，你可以根据自己场景定制


**开发环境(easy build dev)**

- 开启 devtool 和 source-map<br />
- 开启 HMR 热更新, 内存编译，构建文件不落地磁盘<br />
- js, css, image 不压缩<br />
- js, css, image 不 Hash<br />

**测试环境(easy build test)**

- 禁用 devtool 和 source-map<br />
- 禁用 HMR 热更新, 构建文件落地磁盘<br />
- js, css, image 禁用压缩<br />
- js, css, image 开启 Hash<br />
- css 分离出独立的 css 文件<br />

**正式环境(easy build prod)**

- 禁用 devtool 和 source-map<br />
- 禁用 HMR 热更新, 构建文件落地磁盘<br />
- js, css, image 开启压缩<br />
- js, css, image 开启 Hash<br />
- css 分离出独立的 css 文件<br />


## 解决方案


#### 获取 Vue 项目配置

> 默认 Node 和 Web 构建的 Webpack 配置，总共两个配置,  通过 `target: web`  获取前端配置


```js
const easy = require('easywebpack-vue');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  target: 'web',
  entry: {
    app: 'src/lib.js'
  }
});
```


#### 获取 React 项目配置

> 默认 Node 和 Web 构建的 Webpack 配置，总共两个配置,  通过 `target: web`  获取前端配置


```js
const easy = require('easywebpack-react');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  target: 'web',
  entry: {
    app: 'src/lib.js'
  }
});
```


#### 获取 HTML 项目配置

```js
const easy = require('easywebpack-html');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  template: 'src/template.html'
  entry: {
    app: 'src/lib.js'
  }
});
```


#### 获取 JS 打包配置

```js
const easy = require('easywebpack-js');
const webpackConfig = easy.getWebpackConfig({
  env: process.env.BUILD_ENV,  // 支持dev, test, prod 模式
  entry: {
    app: 'src/lib.js'
  }
});
```



  