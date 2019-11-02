
---
id: 685689
space: egg-react
slug: init
url: /egg-react/init
title: 快速开始
summary: 基于 Egg + React + Webpack 服务端渲染开发指南1. 项目初始化1.1 通过 easywebpack-cli 脚手架初始化安装脚手架 npm install easywebpack-cli -g 命令行，然后就可以使用  easy 命令命令行运行 easy init选择 e...
coverImage: null
createTime: 2019-10-03T14:25:46.000Z 
upateTime: 2019-10-09T04:44:10.000Z
wordCount: 1977
layout: doc
keywords: egg,egg react ssr,egg react server side render, ant ssr
---

## 基于 Egg + React + Webpack 服务端渲染开发指南


## 1. 项目初始化


### 1.1 通过 [easywebpack-cli](https://github.com/easy-team/easywebpack-cli) 脚手架初始化

1. 安装脚手架 `npm install easywebpack-cli -g` 命令行，然后就可以使用  `easy` 命令

2. 命令行运行 `easy init`

3. 选择 egg + react server side render boilerplate 初始化骨架项目

4. 安装依赖 `npm install`



### 1.2 通过骨架项目初始化

```bash
git clone https://github.com/easy-team/egg-react-webpack-boilerplate.git
npm install
```

初始化的项目提供多页面和SPA(react-router/react-redux)服务端渲染实例，可以直接运行。


### 1.3 vscode 插件初始化项目

[https://marketplace.visualstudio.com/items?itemName=hubcarl.vscode-easy-plugin#overview](https://marketplace.visualstudio.com/items?itemName=hubcarl.vscode-easy-plugin#overview)<br />



## 2. 项目运行


### 2.1 本地运行

```
npm run dev
```

npm run dev 做了如下三件事情

- 启动 egg 应用

- 启动 Webpack 构建, 文件不落地磁盘，Webpack 构建的文件都在内存里面

- 构建会同时启动两个 Webpack 构建服务, 客户端js构建端口9000, 服务端端口9001

- 构建完成，Egg 应用正式可用，自动打开浏览器



### 2.2 发布模式

- Webpack 构建文件落地磁盘


```javascript
npm run build 或 easy build
```

1. 启动 Webpack 构建，文件落地磁盘

2. 服务端构建的文件放到 `app/view` 目录

3. 客户端构建的文件放到 `public` 目录

4. 生成的 `manifest.json` 放到 `config` 目录

5. 构建的文件都是 `gitignore`的，部署时请注意把这些文件打包进去


- 运行


启动应用前， 请设置 `EGG_SERVER_ENV` 环境变量，测试环境设置 `test`， 正式环境设置 `prod`

```
npm start
```


## 3. 项目构建

- 通过项目根目录下的 `webpack.config.js` 配置文件构造出 Webpack 实际的配置文件

- 通过 [egg-webpack](https://github.com/easy-webpack/egg-webpack) 插件提供本地开发构建和热更新支持。SSR 模式时，egg-webpack 会启动两个 Webpack 构建服务, 客户端jsbundle构建，端口9000, 服务端jsbundle构建端口9001。


```javascript
// config/config.local.js 本地 npm start 使用
const easywebpack = require('easywebpack-react');
exports.webpack = {
  webpackConfigList:easywebpack.getWebpackConfig()
};
```

-  webpack.config.js  配置

```javascript
// ${root}/webpack.config.js
module.exports = {
  entry: {
    home: 'app/web/page/home/index.jsx'
  }
};

```



## 4. 项目规范

- [遵循 egg 开发规范](https://eggjs.org/zh-cn/basics/structure.html)

- React 项目代码放到 app/web 目录，页面入口目录为 page，该目录的 所有 .jsx 文件默认会作为 Webpack 的 entry 构建入口。建议每个页面目录的只保留一个.jsx 文件，jsx关联的组件可以放到widget 或者 component 目录。



## 5. 项目开发

支持多页面/单页面服务端渲染, 前端渲染, 静态页面三种方式.


### 5.1 多页面服务端渲染实现


#### 5.1.1 多页面前端页面实现

在app/web/page 目录下面创建 home 目录 和 home.jsx 文件, Webpack 自动根据 .jsx 文件创建 entry入口, 具体实现请见[webpack.config.js](https://easy-team.github.io/easywebpack/config)

- home.jsx 以组件的方式实现页面逻辑


```jsx
import React, { Component } from 'react';
import Header from 'component/layout/standard/header/header.jsx';
import List from 'component/home/list.jsx';
import './home.css';
export default class Home extends Component {
  componentDidMount() {
    console.log('----componentDidMount-----');
  }

  render() {
    return <div>
      <Header></Header>
      <div className="main">
        <div className="page-container page-component">
          <List list={this.props.list}></List>
        </div>
      </div>
    </div>;
  }
```


#### 5.1.2 通过 `egg-view-react-ssr` 插件 `render` 方法实现 Server Side Render

- 创建 controller 文件 home.js


```javascript
exports.index = function* (ctx) {
  yield ctx.render('home/home.js', Model.getPage(1, 10));
};
```

- 添加路由配置


```javascript
app.get('/home', app.controller.home.home.index);
```


#### 5.1.3  通过 `egg-view-react-ssr` 插件 `renderClient` 方法实现 Client Side Render

- 在 controller 文件home.js 添加 client 方法


```javascript
exports.client = function* (ctx) {
  yield ctx.renderClient('home/home.js', Model.getPage(1, 10));
};
```

- 添加路由配置


```javascript
app.get('/client', app.controller.home.home.client);
```



## 6. 项目部署

- 正式环境部署，请设置 `EGG_SERVER_ENV=prod` 环境变量, 更多请见[运行环境](https://eggjs.org/zh-cn/basics/env.html)

- 构建的 `app/view` 目录, `public` 目录以及 `buildConfig.json` 和 `manifest.json`等文件, 都是 `gitignore` 的，部署时请注意把这些文件打包进去。



### 一. Webpack构建目录

- Webpack构建服务端(Node) JSBundle运行文件, 构建的服务端渲染模板文件位置 `${app_root}/app/view`

- Webpack构建浏览器JSBundle运行文件, 构建的前端资源(js/css/image)文件位置 `${app_root}/public`

- Webpack构建的 `manifest.json` 和 `buildConfig.js` 文件位置 `${app_root}/config` 目录

- easywebpack-cli 构建配置文件 `webpack.config.js` 放到项目根目录`${app_root}/webpack.config.js`

- React代码文件`${app_root}/app/web` 下面, 主要包括 `asset`, `component`, `framework`, `page`, `store`, `view` 等目录


```html
├── asset                    // 资源文件
    │   ├── css 
    │   │   ├── global.css
    │   │   ├── normalize.css
    │   │   └── style.css
    │   ├── images
    │   │   ├── favicon.ico
    │   │   ├── loading.gif
    │   │   └── logo.png
    ├── component                // jsx组件
    │   ├── home
    │   │   └── list.jsx
    │   └── layout
    │       └── standard
    │           └── header
    │               ├── header.css
    │               └── header.jsx
    ├── framework
    │   └── entry
    │       ├── app.js
    │       └── loader.js
    ├── page               // 页面目录, jsx结尾的的文件默认作为entry入口
    │   ├── hello
    │   │   └── hello.jsx  // 页面入口文件, 根据framework/entry/loader.js模板自动构建
    │   └── home
    │       ├── home.css
    │       └── home.jsx
    └── view
        └── layout.jsx     // layout模板文件, 提供统一html, header, body结构, page下面的jsx文件无需关心
```


### 二. 项目结构和基本规范

```html
├── app
│   ├── controller
│   │   ├── test
│   │   │   └── test.js
│   ├── extend
│   ├── lib
│   ├── middleware
│   ├── mocks
│   ├── proxy
│   ├── router.js
│   ├── view
│   │   ├── home
│   │   │     └── home.js                 // 服务器编译的jsbundle文件
│   └── web                               // 前端工程目录
│       ├── asset                         // 存放公共js,css资源
│       ├── framework                     // 前端公共库和第三方库
│       │   └── entry                          
│       │       ├── loader.js              // 根据jsx文件自动生成entry入口文件loader
│       ├── page                           // 前端页面和webpack构建目录, 也就是webpack打包配置entryDir
│       │   ├── home                       // 每个页面遵循目录名, js文件名, scss文件名, jsx文件名相同
│       │   │   ├── home.scss
│       │   │   ├── index.jsx
│       └── component                         // 公共业务组件, 比如loading, toast等, 遵循目录名, js文件名, scss文件名, jsx文件名相同
│           ├── loading
│           │   ├── loading.scss
│           │   └── loading.jsx
│           ├── test
│           │   ├── test.jsx
│           │   └── test.scss
│           └── toast
│               ├── toast.scss
│               └── toast.jsx
├── config
│   ├── config.default.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── config.test.js
│   └── plugin.js
├── doc
├── index.js
├── webpack.config.js                      // easywebpack-cli 构建配置
├── public                                 // webpack编译目录结构, render文件查找目录
│   ├── static
│   │   ├── css
│   │   │   ├── home
│   │   │   │   ├── home.07012d33.css
│   │   │   └── test
│   │   │       ├── test.4bbb32ce.css
│   │   ├── img
│   │   │   ├── change_top.4735c57.png
│   │   │   └── intro.0e66266.png
│   ├── test
│   │   └── test.js
│   └── vendor.js                         // 生成的公共打包库
```


## 8. 项目和插件

- [egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate)基于easywebpack-react和egg-view-react(ssr)插件的工程骨架项目

- [easywebpack-react](https://github.com/easy-team/easywebpack-react) Webpack React 构建工程化方案.

- [easywebpack-cli](https://github.com/easy-team/easywebpack-cli)  Webpack 构建工程化脚手架.

- [egg-view-react-ssr](https://github.com/easy-team/egg-view-vue-ssr) react ssr 解决方案.

- [egg-webpack](https://github.com/easy-team/egg-webpack) 本地开发热更新使用.

- [egg-webpack-react](https://github.com/easy-team/egg-webpack-react) 本地开发渲染内存读取辅助插件



  