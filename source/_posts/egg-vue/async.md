
---
id: 685674
space: egg-vue
slug: async
url: /egg-vue/async
title: 异步加载
summary: Component Async Load Render / 组件异步加载渲染1. JavaScript File Code Spliting 代码分离Webpack打包是把所有js代码打成一个js文件，我们可以通过 CommonsChunkPlugin 分离出公共组件，但这远远不够。 实际业务...
coverImage: null
createTime: 2019-02-15T06:05:32.000Z 
upateTime: 2019-05-23T01:14:39.000Z
wordCount: 685
layout: doc
---


## Component Async Load Render / 组件异步加载渲染


### 1. JavaScript File Code Spliting 代码分离

Webpack打包是把所有js代码打成一个js文件，我们可以通过 `CommonsChunkPlugin` 分离出公共组件，但这远远不够。 实际业务开发时，一些主要页面内容往往比较多， 而且会引入第三方组件或者监控脚本。其中有些内容的展示不再首屏或者监控脚本等对用户不是那么重要的脚本我们可以通过 `require.ensure` 代码分离延迟加载。在webpack在构建时，解析到`require.ensure` 时，会单独针对引入的js资源单独构建出chunk文件，这样就能从主js文件里面分离出来。 然后页面加载完后， 通过script标签的方式动态插入到文档中。

require.ensure 使用方式， 第三个参数是指定生产的 chunk 文件名，不设置时是用数字编号代理。相同 require.ensure 只会生产一个chunk文件。

```javascript
require.ensure(['swiper'], ()=> {
   const Swiper = require('swiper');
   ......
 }, 'swiper');
```


### 2. Vue Component Code Spliting 代码分离

异步加载 Vue 组件(.vue) 已在 Vue 2.5+ 版本支持，包括路由异步加载和非路由异步加载。在具体实现时，我们可以通过 `import(filepath)` 加载组件。

`import()` 方案已经列入 [ECMAScript提案](https://github.com/tc39/proposal-dynamic-import)，虽然在提案阶段，但 Webpack 已经支持了该特性。import() 返回的 Promise，通过注释 webpackChunkName 指定生成的 chunk 名称。 Webpack 构建时会独立的 chunkjs 文件，然后在客户端动态插入组件，chunk 机制与 require.ensure 一样。有了动态加载的方案，可以减少服务端渲染 jsbundle 文件的大小，页面 Vue 组件模块也可以按需加载。

```javascript
Vue.component('async-swiper', (resolve) => {
  // 通过注释webpackChunkName 指定生成的chunk名称
  import(/* webpackChunkName: "asyncSwiper" */ './AsyncSwiper.js')
    .then((AsyncSwiper) => {
      resolve(AsyncSwiper.default);
    });
});

<div id="app">
  <p>Vue dynamic component load</p>
  <async-swiper></async-swiper>
</div>
```


### 3. Egg + Vue SSR Vue Component Code Spliting


#### 3.1 easywebpack-vue 版本要求

- easywebpack-vue: ^3.5.1


构建适配 `vue-server-renderer` 异步渲染查找 `chunk` 文件逻辑。这里直接把 `chunk` 文件构建到 `app/view/node_modules` 下面, 这样异步渲染才能找到该文件。


#### 3.2 项目添加 egg-view-vue-ssr 插件参数配置

```javascript
const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.vuessr = {
    renderOptions: {
      // 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件
      basedir: path.join(app.baseDir, 'app/view')
    }
  };

  return exports;
};
```

[config/config.default.js](https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/config/config.default.js)


#### 3.3 动态加载举例

[app/web/page/dynamic/dynamic.vue](https://github.com/easy-team/egg-vue-webpack-boilerplate/blob/webpack3/app/web/page/dynamic/dynamic.vue)


#### 3.4 ReferenceError: document is not defined

[ReferenceError: document/window is not defined](https://zhuanlan.zhihu.com/p/36233639)


  