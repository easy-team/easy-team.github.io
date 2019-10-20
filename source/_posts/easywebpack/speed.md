
---
id: 685574
space: easywebpack
slug: speed
url: /easywebpack/speed
title: 极速编译
summary: DLL 公共提取Webpack 通过 DLLPlugin 和 DLLReferencePlugin 可以实现公共类库的单独提取，能极大大提升了构建的速度.只需要在 webpack.config.js 文件添加 dll 节点配置即可完成 dll 整个流程。module.exports = {   dll:[&#x27;vue&#x27;,&#x27;vuex&#x27;,&#x27;axios&#x27;] } 详细方案：Webpack DLL 工程化实现开启 cache-loader...
coverImage: null
createTime: 2018-09-05T08:40:13.000Z 
upateTime: 2019-05-22T02:24:42.000Z
wordCount: 353
layout: doc
---


### DLL 公共提取

**Webpack 通过 **[DLLPlugin 和 DLLReferencePlugin](https://doc.webpack-china.org/plugins/dll-plugin/)** 可以实现公共类库的单独提取，能极大大提升了构建的速度.**

只需要在 `webpack.config.js` 文件添加 dll 节点配置即可完成 `dll` 整个流程。

```javascript
module.exports = {
  dll:['vue','vuex','axios']
}
```

详细方案：[Webpack DLL 工程化实现](http://hubcarl.github.io/easywebpack/webpack/dll/)


### 开启 cache-loader 缓存编译

默认 `babel-loader` 和 `ts-loader` 没有启用 `thread-loader` 和 `cache-loader` 加速构建。当构建的 `entry` 太少时, 开启后，反而构建速度会慢一些，只有当项目足够大以后或者构建速度太慢，才建议开启，然后对比决定是否要开启该配置。

```javascript
// webpack.config.js
module.exports = {
  compile:{
    thread: true, // 多进程编译
    cache: true   // 启动编译缓存
  }
}
```
 <br />要求：easywebpack4 


### Egg SSR 构建多进程编译

在 Egg SSR 项目中, 我们通过 `egg-webpack` 实现本地开发模式编译，早期版本需要在 Egg 项目的 `config/config.local.js` 配置 `webpackConfigList` 配置

```javascript
const EasyWebpack = require('easywebpack-vue');
module.exports = {
  webpackConfigList: EasyWebpack.getWebpackConfig();
};
```

这种方式只会采用单进程编译模式，速度会慢一些， 我们可以通过去掉 `webpackConfigList` 配置即可开启 `egg-webpack` 开启多进程编译模式。 结合 `DLL 公共提取` 和 `cache-loader` 缓存编译模式, 构建速度可以从 40s 减少到 10 s 以内。



# Egg SSR Babel 构建优化

[https://www.yuque.com/hubcarl/ves/babel](https://www.yuque.com/hubcarl/ves/babel)


  