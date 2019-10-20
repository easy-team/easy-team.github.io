
---
id: 2212427
space: blog
slug: wumyiw
url: /blog/wumyiw
title: Egg 项目集成 Webpack 热更新
summary: 在 Egg + React 工程化解决方案 和 Egg + Vue 工程化解决方案 方案使用了 egg-webpack 实现了 Egg + easywebpack 热更新统一处理。其实 egg-webpack 是可以单独使用的，不耦合 easywebpack 构建配置。下面以 Egg + Re...
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1564144010609-97147017-436c-4573-a66f-572ecfbb2abe.png
createTime: 2019-07-29T10:31:49.000Z 
upateTime: 2019-07-29T10:31:49.000Z
wordCount: 1016
layout: doc
---

<br />在 [Egg + React 工程化解决方案](https://www.yuque.com/easy-team/egg-react) 和 [Egg + Vue 工程化解决方案](https://www.yuque.com/easy-team/egg-vue) 方案使用了 [egg-webpack](https://github.com/easy-team/egg-webpack) 实现了 Egg + easywebpack 热更新统一处理。其实 egg-webpack 是可以单独使用的，不耦合 easywebpack 构建配置。下面以 Egg + React + Webpack 为例。


## egg-wepback 介绍


#### 集成服务

- koa-webpack-hot-middleware<br />
- koa-webpack-dev-middleware<br />
- koa-history-api-fallback: [https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback](https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback)<br />
- http-proxy: [https://webpack.js.org/configuration/dev-server/#devserver-proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy)<br />
- webpack<br />


#### 特性支持

- 在 Agent 里面单独启动 Webpack 服务解决 Node 重启 Webpack 实例丢失导致重新编译问题
- 提供 `app.webpack`  钩子从内存读取文件内容，解决本地开发 Server Side Render 文件渲染内容读取问题
- 支持多个 Webpack 实例独立同时编译服务(支持多进程编译)，自动获取可用端口号，自动注入热更新配置
- Egg 主应用静态资源访问自动代理到独立的 Webpack 编译 HTTP 服务

<br />

## egg-wepback 插件使用

- 安装插件

```javascript
npm install egg-webpack --save
```

- 开启插件

```javascript
// config/plugin.local.js

exports.webpack = {
  enable: true,
  package: 'egg-webpack'
};

```

- 插件配置

```javascript
// config/config.local.js

exports.webpack = {
  // 这里的 webpack.config.js 为原生 Webpack 配置即可
  webpackConfigList: [require('../webpack.config.js')]
};

```



## 编写 Webpack 配置

- 安装 react-hot-loader 插件

```bash
npm install react-hot-loader --save-dev
npm install webpack progress-bar-webpack-plugin webpack-manifest-plugin --save-dev
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader --save-dev
```

- 编写 webpack.config.js  配置

```javascript
// ${root}/webpack.config.js
const path = require('path');
const webpack = require('webpack');
const ProgressBar = require('progress-bar-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const isDev = process.env.NODE_ENV !== 'production';
module.exports = {
  mode: process.env.NODE_ENV,
  entry: isDev ? { app: './app/web/index.js' } : {
    app:[
      'react-hot-loader/babel', // egg-webpack 默认端口为 9000
      'webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&noInfo=false&reload=false&quiet=false',
      './app/web/index.js'
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js' ],
  },
  output: {
    path: path.join(__dirname, 'app/public'),
    filename: isDev ? '[name].[hash].js' : '[name].js',
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBar(),
    
  ]
};
```



## 前端页面开启热更新

```javascript
'use strict';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import './app.css';

class App extends Component {
  render() {
    return <div className="title"><h1>React App</h1></div>
  }
}

ReactDOM.render(module.hot ? <AppContainer><App /></AppContainer> : <App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
```



## 页面渲染

通过 egg-view-nunjucks 模板引擎进行  layout 模板渲染，同时根据 webpack 生成 manifest.json 获取静态资源的实际路径。<br />

- 配置 nunjucks 引擎

```javascript
// ${root}/config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// {app_root}/config/config.default.js
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
```

- 定义 {app_root}/app/view/layout.tpl 文件

```html

<!DOCTYPE html>
<html lang='en'>
<head>
  <title>{{title}}</title>
  <meta name='keywords'>
  <meta name='description'>
  <meta http-equiv='content-type' content='text/html;charset=utf-8'>
  <meta name='viewport' content='initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'>
  <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
  {% for item in asset.css %}
    <link rel="stylesheet" href='{{item}}' />
  {% endfor %}
</head>
<body>
  <div id='app'></div>
  <script type="text/javascript">
    window.__INITIAL_STATE__ = {{ asset.state | safe }};
  </script>
  {% for item in asset.js %}
    <script type="text/javascript" src="{{item}}"></script>
  {% endfor %}
</body>
</html>
```


- 页面渲染逻辑实现



```javascript
const egg = require('egg');
const manifest = require('../public/manifest.json');
module.exports = class AppController extends egg.Controller {
  async home(ctx) {
    const js = [manifest['app.js']];
    const css = [manifest['app.css']];
    await ctx.render('layout.tpl', { 
      title: 'Egg Webpack Hot Reload',
      state: {},
      asset: { js, css }
    });
  }
}
```


最后就可以 npm run dev （egg-bin dev) 一键启动开发，不用分别单独启动前端应用和 Node 应用，同时解决 Node 重启 Webpack 实例丢失导致重新编译问题。



## Server Side Render 文件内容读取

```javascript
'usestrict';
const path = require('path');
const egg = require('egg');
const vueServerRenderer = require('vue-server-renderer');
module.exports = class IndexController extends egg.Controller {
  async index(ctx) {
    const { app } = ctx;
    const filepath = path.join(app.config.view.root[0], 'app.js');
    // server render mode, the webpack config target:node
    const strJSBundle = await app.webpack.fileSystem.readWebpackMemoryFile(filepath);
    ctx.body = await vueServerRenderer.createBundleRenderer(strJSBundle).renderToString({});
  }
};
```



## 更多实践

- [Egg + Webpack 构建流程](https://www.yuque.com/easy-team/egg-react/build)
- [Egg + Webpack 自定义前端渲染方案](https://www.yuque.com/easy-team/egg-react/html)

  