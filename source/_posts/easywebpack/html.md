
---
id: 685637
space: easywebpack
slug: html
url: /easywebpack/html
title: 静态页面构建
summary: nunjucks 模板构建为纯静态页面项目基于 easywebpack-cli 方式构建在用 HTML 模板构建时, 有一个不好的地方就是不能以组件的方式复用, 如是考虑通过渲染模版编译成HTML静态模版. 目前常见的模板引擎有 nunjucks 等渲染模板, 而且社区也有对应的 Webpack loader 支持. 同时 easywebpack-html 也内置支持了, 我们执行只需要打开开关即可.在项目根目录添加 webpack.config.js 文件中启动 nunjucks loader...
coverImage: null
createTime: 2018-09-05T08:06:01.000Z 
upateTime: 2019-07-22T08:46:10.000Z
wordCount: 510
layout: doc
---

## nunjucks 模板构建为纯静态页面项目


### 基于 easywebpack-cli 方式构建

<br />在用 HTML 模板构建时, 有一个不好的地方就是不能以组件的方式复用, 如是考虑通过渲染模版编译成HTML静态模版.<br />目前常见的模板引擎有 nunjucks 等渲染模板, 而且社区也有对应的 Webpack loader 支持.<br />同时 easywebpack-html 也内置支持了, 我们执行只需要打开开关即可.

在项目根目录添加 `webpack.config.js` 文件中启动 nunjucks loader.

```javascript
const path = require('path');
module.exports = {
  framework: 'html', // 指定用easywebpack-html 解决方案, 请在项目中安装该依赖
  entry: 'src/page',
  template: 'src/view/layout.html', // html 模板
  loaders: {
      nunjucks: {
        options: {
          searchPaths: ['./widget'] // 配置查找模板路径
        }
      }
    }
  }
};
```

Github 骨架项目 [easywebpack-multiple-html-boilerplate](https://github.com/hubcarl/easywebpack-multiple-html-boilerplate) 已提供 nunjucks 实现例子.


### 配置说明

```json
template: 'src/view/layout.html'
```


表示构建 HTML 的模板文件，这个 html-webpack-plugin 的插件全局配置； 如果没有配置，将会寻找 webpack entry  {name}.js 文件的同目录同名 {name}.html 文件作为 HTML 模板配置。



### 运行与编译

以  [easywebpack-multiple-html-boilerplate](https://github.com/hubcarl/easywebpack-multiple-html-boilerplate)  为例：


##### 本地开发

```bash
npm start
```

自动打开浏览器：[http://localhost:8888/debug](http://localhost:8888/debug)

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1531135868661-574b2e95-91f4-4ece-9c07-b7894c23db93.png#width=827)


#### 编译构建

```bash
npm run build
```



### 基于 Webpack 原始配置构建


#### Webpack 原始配置编写

```javascript
// webpack.config.js
const easywebpack = require('easywebpack-html');
const webpack = easywebpack.webpack;
const merge = easywebpack.merge;
const env = process.env.BUILD_ENV;
const baseWebpackConfig = easywebpack.getWebpackConfig({
    env, // 根据环境变量生成对应配置，可以在 npm script 里面配置，支持dev, test, prod 模式
    entry: 'src/page',
    template: 'src/view/layout.html', // html 模板
    loaders: {
      nunjucks: {
        options: {
          searchPaths: ['./widget'] // 配置查找模板路径
        }
      }
    }
});

// 拿到基础配置, 可以进行二次加工
const webpackConfig = merge(baseWebpackConfig, { 
  // 自定义配置
})

module.exports = webpackConfig;
```


#### `package.json`

```javascript
{
   "script" :{
      "build:dev": "cross-env BUILD_ENV=dev NODE_ENV=development webpack --config webpack.config.js",
      "build:test": "cross-env BUILD_ENV=test NODE_ENV=development webpack --config webpack.config.js",
      "build": "cross-env BUILD_ENV=prod NODE_ENV=production webpack --config webpack.config.js"
   }
 }
```


  