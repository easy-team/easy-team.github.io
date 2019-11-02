
---
id: 685693
space: egg-react
slug: online
url: /egg-react/online
title: 部署流程
summary: 开发部署新项目开发在 egg-react-webpack-boilerplate 骨架项目中, 提供了一些demo, 如果要进行新项目开发，可以删除部分文件：app/web/page 是页面目录。下面的每个目录都是一个单独的页面，其中 spa 目录是一个单页面服务端渲染例子，其他是简单的 Re...
coverImage: null
createTime: 2018-11-26T09:46:50.000Z 
upateTime: 2019-05-23T07:04:10.000Z
wordCount: 1179
layout: doc
keywords: egg,egg react ssr,egg react server side render, ant ssr
---

## 开发部署


### 新项目开发

在 [egg-react-webpack-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate) 骨架项目中, 提供了一些demo, 如果要进行新项目开发，可以删除部分文件：

- app/web/page 是页面目录。下面的每个目录都是一个单独的页面，其中 spa 目录是一个单页面服务端渲染例子，其他是简单的 React 服务端渲染例子， 这些文件都可以删除，删除后，你需要自己按照类似方式添加页面进行开发。

- app/controller 是服务端页面处理逻辑入口，下面都是例子，可以删除， 然后自己根据业务添加对应的controller

- asset 是几个公共的静态资源文件，如果 app/web/component下面没有引用到，可以根据需要删除

- controller 和 page 删除了部分文件后，需要清理 app/router.js 和 webpack.config.js 下面文件不存在的一下配置

- app/web/component 下面的 app 是单页面的 router 配置，如果 app/web/page/app  删除了，这个也可以删除

- app/web/component/layout 提供了单页面 layout 和 多页面 layout, 自己根据需要选用。



### 纯净版本分支

[egg-react-webpack-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate) 项目单独提供了两个纯净版本分支用于实际项目开发

- Egg2 + React 多页面服务端渲染分支 [feature/green/multi](https://github.com/hubcarl/egg-react-webpack-boilerplate/tree/feature/green/multi)

- Egg2 + React + React Router + Redux + React-Redux 单页面服务端渲染分支 [feature/green/spa](https://github.com/hubcarl/egg-react-webpack-boilerplate/tree/feature/green/spa)



### 本地开发

一般我们推荐把 `easy build dev`, `easy build test`, `easy build prod` 配置到 项目的 `package.json` 的 script 中去, 然后通过 npm run [command] 的方式使用。

- 通过 `npm run [command]` 方式使用 easy 命令时，不需要全局安装 `easywepback-cli` 命令行工具, 只需要把 `easywepback-cli` 安装到项目 `devDependencies` 即可。

- 在命令行直接使用 `easy` 命令时，需要全局安装 `easywepback-cli` 命令行工具。如果不安装, 可以通过 npm5 支持的 `npx easy` 方式运行。


```javascript
{
   "scripts": {
    "clean": "easy clean",
    "debug": "egg-bin debug",
    "build": "cross-env easy clean && easy build prod",
    "dev": "egg-bin dev",
    "start": "egg-scripts start",
   }
}
```

- 本项目本地开发过程中, `npm run dev`  自动启动 Webpack 内存构建，无需手动构建;

- 测试环境和正式环境部署一定要先进行 `npm run build` 模式构建，然后再打包, 只用用 `npm start`  启动

- 如果不是用 `egg-scripts start` 启动应用， 请配置[EGG_SERVER_ENV](https://eggjs.org/zh-cn/basics/env.html) 环境变量。`EGG_SERVER_ENV`表示 Egg 用那种方式启动, `test` 表示读取 `config.test.js` 配置， `prod` 表示读取 `config.prod.js` 配置， 线上运行一定要用 `prod` 模式。例如自己写 `index.js`  启动脚本, 然后通过 `node index.js`   启动时，请配置 [EGG_SERVER_ENV](https://eggjs.org/zh-cn/basics/env.html) 环境变量。

```javascript
// ${root}/index.js
require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.PORT
});
```


#### 本地开发模式

```bash
npm run dev
```

使用 `egg-webpack` 插件进行前端资源构建, 这个插件只会在本地开发启用。


#### 本地模拟测试环境

```bash
easy build test
npm start
```


#### 本地模拟正式环境

```bash
npm run build
npm start
```


### 打包部署

项目开发完成以后，我们要部署上线, 一般如下步骤:


#### 清除缓存

```bash
npm run clean
```


#### 开始构建

```bash
npm run build
```


#### 打包上传

> 这里需要你自己实现把构建好的文件和项目问题一起打成 zip 或 tar 包，然后上传到部署平台进行部署。参数配置请见：[https://easy-team.github.io/easywebpack/build](https://easy-team.github.io/easywebpack/build)


- 需要把构建后的文件(public目录，app/view 目录， config/manifest.json)与项目源代码一起打包部署，当然部分文件([README.md](http://README.md), eslint, gitignore等)可以不打进去。

- 如果 `node_modules` 在打包时也打进去，packjson.json 里面的 devDependencies 依赖是不需要打进去的，这些只在开发期间和 Webpack 构建期间用到，不需要打进去。如果打进去也没有问题，只是包非常大，部署上传是个问题。

- 如果 `node_modules` 在打包时不打进去，在**启动**之前，你需要先按照依赖 `npm install --production`




##### cli zip打包(内置依赖和node)：

**这里会把代码，构建文件，node_modules 以及 node 一起压缩程 zip， 这样线上在启动时就不需要按照依赖。**

```bash
easy clean all
easy build prod
easy zip --deps --nodejs
```


##### cli zip打包(线上安装依赖)：

**这里仅仅把代码，构建文件一起压缩程 zip， 这样线上在启动时需要运行 npm install --production 按照依赖。**

```bash
easy clean all
easy build prod
easy zip
```


#### 线上项目启动

```bash
npm start
```

如果不是用 `egg-scripts start` 启动应用， 请配置 [EGG_SERVER_ENV](https://eggjs.org/zh-cn/basics/env.html) 环境变量 `EGG_SERVER_ENV=prod NODE_ENV=production`  配置环境变量

  