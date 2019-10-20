
---
id: 685679
space: egg-vue
slug: version
url: /egg-vue/version
title: 插件使用
summary: 插件流程https://www.yuque.com/easy-team/egg-vue/build插件介绍egg-webpack 用于在 egg 项目中启动 Webpack 编译服务，具体流程请见 构建流程 。 该插件只在本地启用。 该插件除了深度结合 easywebpack 体系使用， 也可...
coverImage: null
createTime: 2019-02-15T03:30:02.000Z 
upateTime: 2019-06-15T15:47:15.000Z
wordCount: 766
layout: doc
---

## 插件流程
> [https://www.yuque.com/easy-team/egg-vue/build](https://www.yuque.com/easy-team/egg-vue/build)

![](https://cdn.nlark.com/yuque/0/2019/png/116733/1550044986546-7774425c-9f73-4c23-8a0d-ff79fd56e7d1.png#width=827)


## 插件介绍


### [egg-webpack](https://github.com/easy-team/egg-webpack) 

> 用于在 egg 项目中启动 Webpack 编译服务，具体流程请见 [构建流程 。 ](https://www.yuque.com/easy-team/egg-vue/build)该插件只在本地启用。 该插件除了深度结合 easywebpack 体系使用， 也可以单独使用，这个时候需要你自己编写 webpack 配置。



### 单独使用 egg-webpack 实现 egg vue 一体化方案(不依赖easywebpack)

- egg-webpack  配置


> 下面 require 的 webpack.config 为原生 webpack 配置。实现 SSR 时， 需要 target: node 和 target: web 两份 webpack 配置。注意 egg 模板默认路径是 app/view， 所以 target: node 的 编译路径要设置为 app/view 目录，target: web 可以编译到 egg 的默认 app/public 目录下。


```javascript
// config/config.local.js
 exports.webpack = {
   webpackConfigList: require('./webpack.config')
 };
```

- 渲染逻辑实现


```javascript
'use strict';
const path = require('path');
const egg = require('egg');
const serialize = require('serialize-javascript');
const vueServerRenderer = require('vue-server-renderer');
module.exports = class IndexController extends egg.Controller {
  async index(ctx) {
    const { app } = ctx;
    const entry = 'app.js';
    // egg 模板默认路径是 app/view
    const filepath = path.join(app.config.view.root, entry);
    const manifest = require('../../config/manifest.json');
    const res = manifest.deps[entry];
    const cssLink = res.css.map(src => {
      return `<link href="${src}">`;
    });
    const jsScript = res.js.map(src => {
      return `<script src="${src}"></script>`;
    });
    jsScript.unshift(`<script> window.__INITIAL_STATE__= ${serialize({ cssLink: '', jsScript: '' }, { isJSON: true })};</script>`);
    const state = { cssLink: cssLink.join('\r\n'), jsScript: jsScript.join('\r\n') };
    if (app.config.env === 'local') {
      const strJSBundle = await app.webpack.fileSystem.readWebpackMemoryFile(filepath);
      ctx.body = await vueServerRenderer.createBundleRenderer(strJSBundle).renderToString({ state });
    } else {
      ctx.body = await vueServerRenderer.createBundleRenderer(filepath).renderToString({ state });
    }
  }
};
```

- 详细请看：[https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/egg-webpack](https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/egg-webpack)

- 热更新实现： [https://github.com/keenwon/Egg-Webpack-Starter](https://github.com/keenwon/Egg-Webpack-Starter)



### [egg-webpack-vue](https://github.com/easy-team/egg-webpack-vue) 

> 本地开发时，需要从 Webpack 内存里面读取 JSBundle 内容， 该插件会覆盖 [egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr) 的 render 本地文件读取逻辑，从而实现本地开发与线上代码逻辑耦合问题。


![](https://cdn.nlark.com/yuque/0/2019/png/116733/1550045193178-52be257a-fbab-429c-ad99-c04138bf9a5b.png#width=784)


### [egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr)

> egg  vue 渲染解决方案插件，统一封装 vue 渲染，缓存，资源注入等功能。 支持服务端渲染，前端渲染， Asset 渲染模式，同时提供 `app.vue` 扩展接口



#### 内置方案

- [服务端渲染模式 ](https://www.yuque.com/easy-team/egg-vue/node)

- [前端渲染模式](https://www.yuque.com/easy-team/egg-vue/web)

- [Asset 渲染模式](https://www.yuque.com/easy-team/egg-vue/asset)



#### 扩展方案

> see:  [https://github.com/easy-team/egg-view-vue-ssr/blob/master/lib/engine.js](https://github.com/easy-team/egg-view-vue-ssr/blob/master/lib/engine.js)


```javascript
'use strict';
const path = require('path');
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  async index(ctx) {
    const { app } = ctx;
    const filepath = path.join(app.config.view.root, 'app.js');
    const html = app.vue.render(filepath, { msg: 'render vue js bundle file to html'});
    ctx.body = html;
  }
};
```



## 插件版本



### Egg + Vue + Webpack4 SSR 解决方案

- easywebpack-cli": ^4.x.x                   （devDependencies）

- easywebpack-vue: ^4.x.x                   （devDependencies）

- egg-webpack: ^4.x.x                          （devDependencies）

- egg-webpack-vue:^2.x.x                    （devDependencies）

- egg-view-vue-ssr: ^3.x.x                   （dependencies）



### Egg + Vue + Webpack3 SSR 解决方案

- easywebpack-cli": ^3.11.0                    （devDependencies）

- easywebpack-vue: ^3.x.x                      （devDependencies）

- egg-webpack: ^3.x.x                             （devDependencies）

- egg-webpack-vue: ^2.x.x                     （devDependencies）

- webpack-manifest-resource-plugin: ^2.x.x  （devDependencies）

- egg-view-vue-ssr: ^3.x.x                      （dependencies）



  