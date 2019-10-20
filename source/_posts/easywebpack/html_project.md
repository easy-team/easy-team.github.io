
---
id: 2773704
space: easywebpack
slug: html_project
url: /easywebpack/html_project
title: HTML 工程方案
summary: easywebpack-html  纯静态页面构建解决方案支持纯静态页面构建支持 nunjucks 模版方式构建如何利用 easywebpack-cli工具快速获得一个骨架项目使用easy-cli你将得到一个具备以下能力的骨架项目:基于Nunjucks模版引擎的模版项目。Why? 借助模版引擎...
coverImage: null
createTime: 2019-10-05T03:36:41.000Z 
upateTime: 2019-10-05T03:36:44.000Z
wordCount: 623
layout: doc
---

[easywebpack-html](https://github.com/easy-team/easywebpack-html)  纯静态页面构建解决方案

- 支持纯静态页面构建<br />
- 支持 nunjucks 模版方式构建<br />


## 如何利用 [easywebpack-cli](https://github.com/easy-team/easywebpack-cli)工具快速获得一个骨架项目

<br />使用[easy-cli](https://github.com/easy-team/easywebpack-cli)你将得到一个具备以下能力的骨架项目:

- 基于[Nunjucks](https://nunjucks.bootcss.com/)模版引擎的模版项目。<br />
  - Why? 借助模版引擎，通过把模版拆成更小的碎片，你可以做到静态页面模版的模块化。<br />
- Jquery依赖。<br />
- 基于`CMD`的脚本依赖注入方式。<br />
- 自选sass/less等css预处理器。<br />
- 多目录结构且资源分治的打包能力。<br />



### Step 1

```bash
npm i easywebpack-cli -g
```


### Step 2

```bash
easy init
```


### Step 3

按照指引选择/输入对应内容


### Step 4

进入骨架项目目录

```bash
npm start
```

**Enjoy It Easily~**

![](https://cdn.nlark.com/yuque/0/2018/png/113623/1542798819487-6178c782-6dda-4017-aad5-83a250a75922.png#align=left&display=inline&height=336&originHeight=1278&originWidth=2842&search=&status=done&width=747)

### Step 5

构建生产环境内容。<br />

```bash
npm build
```

![](https://cdn.nlark.com/yuque/0/2018/png/113623/1542802774860-0100f512-760a-4969-bc87-540032461be4.png#align=left&display=inline&height=260&originHeight=260&originWidth=334&search=&status=done&width=334)



### 配置编写

## 

#### 基于 Webpack 原始配置构建

> 你可以在[easy-cli](https://github.com/easy-team/easywebpack-cli)生成的骨架项目中看到这样的配置内容。


基础配置含义可以参考，通用的[基础配置介绍](https://easy-team.github.io/frontend/config)。

（注：有时我们需要获得webpack的原生能力。我们可以借助[额外配置](https://easy-team.github.io/frontend/oy1dub#2853zo)的方式直接和webpack沟通。）

```javascript
const path = require('path');
module.exports = {
  framework: 'html', // 指定用 easywebpack-html 解决方案, 请在项目中安装该依赖
  entry: 'src/**/*.js',
  externals: {
    jquery: 'window.$'
  },
  module: {
    rules: [
      { scss: true },
      {
        nunjucks: {
        options: {
          searchPaths: ['./widget'] // 配置查找模板路径
        }
      }
    ]
  }
};
```


### 配置说明


#### template：  html 公共模板文件路径, 默认 `src/view/layout.html` 

```json
template: 'src/view/layout.html'
```

- 表示构建HTML的公共模版文件。<br />
- 如果页面目录下面有 entry  的同名的 html 文件，将自动使用目录下的 html 作为 HTML 模板，不再使用统一的公共模版。


### 运行开发

```bash
easy dev
```


### 打包编译

```bash
easy build
```



## 基于 Webpack 原始配置构建


#### Webpack 原始配置编写

```javascript
// webpack.config.js
const easywebpack = require('easywebpack-html');
const webpack = easywebpack.webpack;
const merge = easywebpack.merge;
const env = process.env.BUILD_ENV;
const baseWebpackConfig = easywebpack.getWebpackConfig({
    env, // 根据环境变量生成对应配置，可以在 npm script 里面配置，支持dev, test, prod 模式
    entry: {
      home: 'src/page/home/home.js'
    },
    module: {
      rules: [
        { scss: true },
        {
          nunjucks: {
          options: {
            searchPaths: ['./widget'] // 配置查找模板路径
          }
        }
      ]
  	}
});

// 拿到基础配置, 可以进行二次加工
const webpackConfig = merge(baseWebpackConfig, { 
  // 自定义配置
})

module.exports = webpackConfig;
```


### 本地开发

- 使用 webpack-dev-server ： `webpack-dev-server --hot`
- 使用 easywepback-cli:   `easy dev --webpack` 


#### 

### 打包编译

- 使用 webpack-cli ： `webpack --mode production --config webpack.config.js`
- 使用 easywepback-cli:   `easy build --webpack` 


  