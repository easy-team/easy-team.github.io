
---
id: 685668
space: egg-vue
slug: start
url: /egg-vue/start
title: 从零开始
summary: 从零开始搭建 Egg + Vue + Webpack 服务端渲染项目1. 初始化环境安装 Node LST (8.x.x) 环境： https://nodejs.org/zh-cn2. 初始化 egg 项目https://github.com/eggjs/egg-init/blob/maste...
coverImage: null
createTime: 2019-07-12T15:44:47.000Z 
upateTime: 2019-08-06T07:56:28.000Z
wordCount: 1752
layout: doc
---

### 从零开始搭建 Egg + Vue + Webpack 服务端渲染项目


## 1. 初始化环境

安装 Node LST (8.x.x) 环境： [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)


## 2. 初始化 egg 项目

[https://github.com/eggjs/egg-init/blob/master/README.zh-CN.md](https://github.com/eggjs/egg-init/blob/master/README.zh-CN.md)

```bash
npm i egg-init -g
egg-init
```

- 选择 `Simple egg app boilerplate` project 初始化 egg 项目

- 新建 `${app_root}/app/view` 目录(egg view规范目录)，并添加 `.gitkeep` 文件，保证该空目录被 git 提交到仓库

- 新建 `${app_root}/app/view/layout.html` 文件，用于服务端渲染失败后，采用客户端渲染


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Egg + Vue + Webpack</title>
  <meta name="keywords">
  <meta name="description">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</head>
<body>
  <div id="app"></div>
</body>
</html>
```


## 3. 安装依赖

- 服务端渲染依赖


`vue` 没有内置在 egg-view-vue-ssr 里面， 项目需要显示安装依赖。

```bash
npm i vue vuex axios egg-view-vue-ssr egg-scripts --save
```

- 构建开发依赖


```bash
npm i egg-bin cross-env easywebpack-cli easywebpack-vue egg-webpack egg-webpack-vue --save-dev
```

```bash
npm i vue-template-compiler --save-dev
```

- 安装全部依赖


```bash
npm install
```


## 4. 添加配置

- 添加 `${app_root}/config/plugin.local.js` 配置


```javascript
exports.webpack = {
  enable: true,
  package: 'egg-webpack'
};

exports.webpackvue = {
  enable: true,
  package: 'egg-webpack-vue'
};
```

- 添加 `${app_root}/config/plugin.js` 配置


```javascript
exports.vuessr = {
  enable: true,
  package: 'egg-view-vue-ssr'
};
```

- 添加 `${app_root}/config/config.default.js` 配置


```javascript
'use strict';
const path = require('path');
module.exports = app => {
  const config = exports = {};

  // 保证构建的静态资源文件能够被访问到
  config.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  config.vuessr = {
    renderOptions: {
      basedir: path.join(app.baseDir, 'app/view')
    }
  };
  return config;
}
```

- 添加 `${app_root}/config/config.local.js` 配置


```javascript
'use strict';
module.exports = () => {
  const config = exports = {};
  config.vuessr = {
    // 本地开发 css 采用 inline 方式, 无需注入 css 链接。
    injectCss: false,
  };
  return config;
};
```

- 添加 `easywebpack-cli` 配置文件 `${app_root}/webpack.config.js`


```javascript
module.exports = {
  egg: true,
  framework: 'vue', // 使用 easywebpack-vue 构建解决方案
  entry: {
    include: ['app/web/page'], // 自动遍历 app/web/page 目录下的 js 文件入口
    exclude: ['app/web/page/[a-z]+/component'],
  },
  alias: {
    ~: __dirname,
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store'
  },
  dll: ['vue', 'axios'], // webpack dll 构建
  loaders: {},
  plugins: {},
  done() { // 编译完成回调

  }
};
```

- 添加 `${app_root}/.babelrc` 文件


```javascript
{
  "presets": [["env",{ "modules": false }]],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-object-assign"
  ],
  "comments": false
}
```

安装 babel 相关依赖

```bash
npm i babel-core@6  babel-loader@7  --save-dev
```

```bash
npm i babel-preset-env 
babel-plugin-syntax-dynamic-import 
babel-plugin-transform-object-assign 
babel-plugin-transform-object-rest-spread 
--save-dev
```

- 添加 `${app_root}/postcss.config.js` 文件


```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```

安装 autoprefixer 依赖

```bash
npm i autoprefixer  --save-dev
```

- 添加 `${app_root}/.gitignore` 配置


```
.DS_Store
.happypack/
node_modules/
npm-debug.log
.idea/
dist
static
public
private
run
*.iml
*tmp
_site
logs
.vscode
config/manifest.json
app/view/*
!app/view/layout.html
!app/view/.gitkeep
package-lock.json
```


## 5. 写代码


#### 编写前端 vue 代码

- 编写 vue 服务端公共入口 `${app_root}/app/web/framework/vue/entry/server.js`


```javascript
import Vue from 'vue';
export default function render(options) {
  if (options.store && options.router) {
    return context => {
      options.router.push(context.state.url);
      const matchedComponents = options.router.getMatchedComponents();
      if (!matchedComponents) {
        return Promise.reject({ code: '404' });
      }
      return Promise.all(
        matchedComponents.map(component => {
          if (component.preFetch) {
            return component.preFetch(options.store);
          }
          return null;
        })
      ).then(() => {
        context.state = options.store.state;
        return new Vue(options);
      });
    };
  }
  return context => {
    const VueApp = Vue.extend(options);
    const app = new VueApp({ data: context.state });
    return new Promise(resolve => {
      resolve(app);
    });
  };
}
```

- 编写 vue 客户端公共入口 `${app_root}/app/web/framework/vue/entry/client.js`


```javascript
import Vue from 'vue';
export default function(options) {
  Vue.prototype.$http = require('axios');
  if (options.store) {
    options.store.replaceState(window.__INITIAL_STATE__ || {});
  } else if (window.__INITIAL_STATE__) {
    options.data = Object.assign(window.__INITIAL_STATE__, options.data && options.data());
  }
  const app = new Vue(options);
  app.$mount('#app');
}
```

- 新建 `${app_root}/app/web/page/home/home.js` 页面文件


```javascript
import Home from './home.vue';
import serverRender from '~/app/web/framework/vue/entry/server.js';
import clientRender from '~/app/web/framework/vue/entry/client.js';
export default EASY_ENV_IS_NODE ? serverRender({ ...Home }) : clientRender({ ...Home });
```

- 新建 `${app_root}/app/web/page/home/home.vue` 文件


下面 `layout` 根元素为自定义组件, 全局注册, 统一的html, meta, header, body, layout component 实现见 [egg-vue-webpack-boilerplate项目layout实现](https://github.com/easy-team/egg-vue-webpack-boilerplate/blob/4.4.6/app/web/component/layout/layout.js) 主要通过 slot 解决服务端和前端渲染模板和title, meta问题

```html
<template>
  <layout>
    <div v-html="message"> {{message}}</div>
  </layout>
</template>
<style>
</style>
<script type="text/babel">
  export default {
    components: {},
    computed: {},
    methods: {},
    mounted() {
      
    }
  }
</script>
```


#### 编写 Node 端代码

通过 `egg-view-vue-ssr` 插件 `render` 方法实现

- 创建 controller 文件 `${app_root}/app/controller/home.js`


```javascript
module.exports = app => {
  return class HomeController extends app.Controller {
    async server() {
      const { ctx } = this;
      // render 实现是服务端渲染 vue 组件
      await ctx.render('home/home.js', { message: 'egg vue server side render' });
    }

    async client() {
      const { ctx } = this;
      /*
      - renderClient 前端渲染，Node层只做 layout.html和资源依赖组装，渲染交给前端渲染。
      - 与服务端渲染的差别你可以通过查看运行后页面源代码即可明白两者之间的差异
      */
      await ctx.renderClient('home/home.js', { message: 'egg vue client render render' });
    }
  };
};
```

- 添加路由配置


```javascript
app.get('/', app.controller.home.server);
app.get('/client', app.controller.home.client);
```


## 6. 本地运行

```bash
npm run dev
```

npm run dev 做了如下三件事情

- 首先启动 egg 应用

- 启动 webpack(egg-webpack) 构建, 文件不落地磁盘，构建的文件都在内存里面(只在本地启动, 发布模式是提前构建好文件到磁盘)

- 构建会同时启动两个 Webpack 构建服务, 客户端js构建端口9000, 服务端端口9001

- 构建完成，Egg应用正式可用，自动打开浏览器



## 7. 发布模式

- `${app_root}/package.json` 添加命令


```
{
  "scripts": {
    "dev": "egg-bin dev",
    "start": "egg-scripts start",
    "debug": "egg-bin debug",
    "clean": "easy clean all",
    "build": "easy build prod",
  },
}
```

- 命令行运行 webpack 编译


```bash
npm run build 或 easy build prod
```

1. 启动 Webpack 构建，文件落地磁盘

2. 服务端构建的文件放到 `app/view` 目录

3. 客户端构建的文件放到 `public` 目录

4. 生成的 `manifest.json` 放到 `config` 目录

5. 构建的文件都是gitignore的，部署时请注意把这些文件打包进去


- 部署


启动应用前， 如果是非 `egg-scripts`  方式启动， 请设置 `EGG_SERVER_ENV` 环境变量，本地local, 测试环境设置 `test`， 正式环境设置 `prod`

```bash
npm start
```


## 8. 项目和插件

- [egg-vue-webpack-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate)基于easywebpack-vue和egg-view-vue(ssr)插件的工程骨架项目

- [easywebpack](https://github.com/hubcarl/easywebpack) Webpack 构建工程化.

- [easywebpack-cli](https://github.com/hubcarl/easywebpack-cli)  Webpack 构建工程化脚手架.

- [egg-view-vue-ssr](https://github.com/hubcarl/egg-view-vue-ssr) vue ssr 解决方案.

- [egg-webpack](https://github.com/hubcarl/egg-webpack) 本地开发热更新使用.

- [egg-webpack-vue](https://github.com/hubcarl/egg-webpack-vue) 本地开发渲染内存读取辅助插件



## 9. 建议

以上详细步骤只是告诉大家 Egg + Vue + easywebpack 搭建项目整个流程，帮助搭建理清流程和细节。实际使用使用时建议使用 easywebpack-cli 初始化项目或者 clone [egg-vue-webpack-boilerplate](https://github.com/easy-team/egg-vue-webpack-boilerplate) 代码初始化项目。


  