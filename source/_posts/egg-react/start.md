
---
id: 985145
space: egg-react
slug: start
url: /egg-react/start
title: 从零开始
summary: 从零开始搭建 Egg + React + Webpack 服务端渲染项目1. 初始化环境安装 Node LST (8.x.x) 环境： https://nodejs.org/zh-cn2. 初始化 egg 项目https://github.com/eggjs/egg-init/blob/mas...
coverImage: null
createTime: 2019-10-03T13:44:01.000Z 
upateTime: 2019-10-08T11:44:49.000Z
wordCount: 1356
layout: doc
keywords: egg,egg react ssr,egg react server side render, egg react ssr seo
---

## 从零开始搭建 Egg + React + Webpack 服务端渲染项目


### 1. 初始化环境

安装 Node LST (8.x.x) 环境： [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)


### 2. 初始化 egg 项目

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
  <title>Egg + React + Webpack</title>
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


### 3. 安装依赖

- 服务端渲染依赖


react 没有内置在 egg-view-react-ssr 里面， 项目需要显示安装依赖。

```bash
npm i react react-dom axios egg-view-react-ssr egg-scripts --save
```

- 构建开发依赖


```bash
npm i egg-bin cross-env easywebpack-cli easywebpack-react egg-webpack egg-webpack-react --save-dev
```


- 安装全部依赖


```bash
npm install
```


### 4. 添加配置

- 添加 `${app_root}/config/plugin.local.js` 配置


```javascript
exports.webpack = {
  enable: true,
  package: 'egg-webpack'
};

exports.webpackreact = {
  enable: true,
  package: 'egg-webpack-react'
};
```

- 添加 `${app_root}/config/plugin.js` 配置


```javascript
exports.reactssr = {
  enable: true,
  package: 'egg-view-react-ssr'
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

  config.reactssr = {
    renderOptions: {
      basedir: path.join(app.baseDir, 'app/view')
    }
  };
  return config;
}
```


- 添加 `easywebpack-cli` 配置文件 `${app_root}/webpack.config.js`


> 关于 entry 配置，请务必先看这篇文档：[/egg-react/config](/egg-react/config)


```javascript
module.exports = {
  entry: {
    app: 'app/web/page/home/index.jsx'
  }
};
```

- 添加 `${app_root}/.babelrc` 文件


```javascript
{
  "presets": [
    "react", ["env", {
      "modules": false
    }]
  ],
  "plugins": [
    "transform-object-assign",
    "syntax-dynamic-import",
    "transform-object-rest-spread", ["import", {
      "libraryName": "antd",
      "style": "css"
    }]
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  },
  "comments": false
}
```

安装 babel 相关依赖

```bash
npm i babel-core babel-loader  --save-dev
```

```bash
npm i babel-preset-env 
babel-plugin-syntax-dynamic-import 
babel-plugin-transform-object-assign 
babel-plugin-transform-object-rest-spread 
--save-dev
```

- 添加 `${app_root}/postcss.config.js` 文件**(非必须)**


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


### 5. 写代码


#### 编写前端 react 代码

- 新建 `${app_root}/app/web/page/home/index.jsx`  页面文件


```javascript
import React, { Component } from 'react';
import Layout from 'component/layout.jsx';
import List from './componets/list';
import './index.css';

export default class HomeIndex extends Component {
  componentDidMount() {
    console.log('----componentDidMount-----');
  }

  render() {
    return <Layout>
      <div className="main">
        <div className="page-container page-component">
          <List list={this.props.message}></List>
        </div>
      </div>
    </Layout>;
  }
}
```


#### 编写 Node 端代码

通过 `egg-view-react-ssr` 插件 `render` 方法实现， 请看[服务端渲染](/egg-react/ssr)和[前端渲染模式](/egg-react/client)

- 创建 controller 文件 `${app_root}/app/controller/home.js`


```javascript
module.exports = app => {
  return class HomeController extends app.Controller {
    async server() {
      const { ctx } = this;
      await ctx.render('home/index.js', { message: 'egg react server side render' });
    }

    async client() {
      const { ctx } = this;
      /*
      - renderClient 前端渲染，Node层只做 layout.html和资源依赖组装，渲染交给前端渲染。
      - 与服务端渲染的差别你可以通过查看运行后页面源代码即可明白两者之间的差异
      *／
      await ctx.renderClient('home/index.js', { message: 'egg react client render' });
    }
  };
};
```

- 添加路由配置


```javascript
app.get('/', app.controller.home.server);
app.get('/client', app.controller.home.client);
```


### 6. 本地运行

```bash
npm run dev
```

npm run dev 做了如下三件事情

- 首先启动 egg 应用

- 启动 webpack(egg-webpack) 构建, 文件不落地磁盘，构建的文件都在内存里面(只在本地启动, 发布模式是提前构建好文件到磁盘)

- 构建会同时启动两个 Webpack 构建服务, 客户端js构建端口9000, 服务端端口9001

- 构建完成，Egg 应用正式可用，自动打开浏览器



### 7. 发布模式

- `${app_root}/package.json` 添加命令


```json
{
  "scripts": {
    "dev": "egg-bin dev",
    "start": "egg-scripts start",
    "debug": "egg-bin debug",
    "clean": "easy clean all",
    "build": "easy build",
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

- [egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate) 基于easywebpack-react和 egg-view-react-ssr插件的工程骨架项目

- [easywebpack-react](https://github.com/easy-team/easywebpack-react) Webpack React 构建工程化基础

- [easywebpack-cli](https://github.com/easy-team/easywebpack-cli)  Webpack 构建工程化脚手架.

- [egg-view-react-ssr](https://github.com/easy-team/egg-view-react-ssr) egg react ssr 插件.

- [egg-webpack](https://github.com/easy-team/egg-webpack) 本地开发热更新使用.

- [egg-webpack-react](https://github.com/easy-team/egg-webpack-react) 本地开发渲染内存读取辅助 egg-webpack-react插件



## 9. 建议

以上详细步骤只是告诉大家 Egg + React + easywebpack 搭建项目整个流程，帮助搭建理清流程和细节。实际使用使用时建议使用 easywebpack-cli 初始化项目或者 clone [egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate) 代码初始化项目。


  