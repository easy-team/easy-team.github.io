
---
id: 2773678
space: easywebpack
slug: vue_project
url: /easywebpack/vue_project
title: Vue 工程方案
summary: 安装 easywebpack-cli 工具npm install easywebpack-cli -g添加 ${app_root}/.babelrc 文件具体根据实际情况添加相关 babel 插件配置，以下仅仅是举例. 详细配置见：...
coverImage: null
createTime: 2019-10-05T03:26:29.000Z 
upateTime: 2019-10-05T03:26:30.000Z
wordCount: 812
layout: doc
---


### 安装 easywebpack-cli 工具

```bash
npm install easywebpack-cli -g
```



### 添加 `${app_root}/.babelrc` 文件

> 具体根据实际情况添加相关 babel 插件配置，以下仅仅是举例. 详细配置见：[/easywebpack/babel](/easywebpack/babel)


- babel 7 配置

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread", 
  ]
}

```

- babel 6 配置


```javascript
{
  "presets": [["env",{ "modules": false }]],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import"
  ],
  "comments": false
}
```


### 添加 `${app_root}/postcss.config.js` 文件

> 具体根据实际情况添加 postcss 配置，以下仅仅是举例：


```javascript
'use strict';
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```


### HTML 页面 HTMLWebpackPlugin 模板配置

默认 template 路径文件为 `src/view/layout.html` 如果需要构建 HTML 文件，直接存在该文件即可，无需 Webpack 配置。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title></title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</head>
<body>
  <div id="app"></div>
</body>
</html>
```


### 配置编写

[easywebpack-vue ](https://github.com/easy-team/easywebpack-vue)项目构建解决方案，支持前端和SSR模式构建。默认 HtmlWebpackPlugin 的 template 路径为 `src/view/layout.html` 。<br /> 

#### Webpack 原生配置

- 前端渲染模式构建<br />

> 快速获取 Vue Webpack 构建配置


```javascript
const easywebpack = require('easywebpack-vue');
const webpackConfig = easywebpack.getWebpackConfig({
    target: 'web',
    entry:{
      app: 'src/index.js'
    }
});
```

- SSR 渲染模式构建<br />

> 快速获取 Vue SSR 模式 Webpack 构建配置


```javascript
const easywebpack = require('easywebpack-vue');
// 返回的是两个 webpack 配置
const webpackConfigList = easywebpack.getWebpackConfig({
    entry:{
      index: 'src/index.js'
    }
});
```


#### 基于 easywebpack-vue 编写 Webpack  配置


##### 配置编写

```javascript
// webpack.config.js
const easywebpack = require('easywebpack-vue');
const { webpack, merge } = easywebpack.webpack;
const env = process.env.BUILD_ENV;
const baseWebpackConfig = easywebpack.getWebpackConfig({
    env, // 根据环境变量生成对应配置，可以在 npm script 里面配置，支持 dev, test, prod 模式
    target : 'web', // target: web 表示只获取前端构建 Webpack 配置
    entry:{
      index: 'src/index.js'
    }
});

// 拿到基础配置, 可以进行二次加工
const webpackConfig = merge(baseWebpackConfig, { 
  // 自定义配置
})

module.exports = webpackConfig;
```


##### 本地开发

- 使用 webpack-dev-server ： `webpack-dev-server --hot`
- 使用 easywepback-cli:   `easy dev --webpack` 

#### 

##### 打包编译

- 使用 webpack-cli ： `webpack --mode production --config webpack.config.js`
- 使用 easywepback-cli:   `easy build --webpack` 



#### 基于 easywebpack-cli 构建模式


##### 全局安装 `easywebpack-cli` 插件

```bash
npm i easywebpack-cli  -g
```

安装成功以后, 就可以在命令行中使用 `easy` 或 `easywebpack` 命令, 比如 `easy build`, `easy server`, `easy print` 等


##### 添加 `webpack.config.js` 配置

在项目根目录添加 `webpack.config.js` 文件, 添加如下配置

```javascript
const path = require('path');
module.exports = {
  target:'web', 
  framework: 'vue', // 指定用 easywebpack-vue 解决方案, 请在项目中安装该依赖
  entry: {
    index: 'src/index.js'
  }
};
```


##### 编译文件

```bash
easy build dev

easy build test

easy build prod
```


##### 直接运行

```bash
easy dev

# 构建文件并启动本地静态 HTTP Server
easy build --server
```

运行完成自动打开编译结果页面 :  [http://127.0.0.1:8888/debug](http://127.0.0.1:8888/debug)



### 前端项目初始化

- 全局安装 `easywebpack-cli` 插件<br />

```bash
npm i easywebpack-cli  -g
```

- 请通过 `easy init` 命令初始化骨架项目, 根据提示选择对应的项目类型即可.<br />



### Sass/Less/Stylus 配置

[/easywebpack/css](/easywebpack/css)

### 

### 热更新实现

[/easywebpack/hot](/easywebpack/hot)


  