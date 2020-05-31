
---
id: 685522
space: easywebpack
slug: index
url: /easywebpack/index
title: 总体介绍
summary: easywebpack 是什么easywebpack 是基于 webpack 的前端工程化解决方案。旨在解决 webpack 项目构建复杂,使用成本高,复用低,维护成本高等工程效率问题。基于 easywebpack 工程化方案, 你能非常简单容易的对各种前端项目进行工程化建设，及时享受最新的特...
coverImage: null
createTime: 2019-10-05T07:50:54.000Z 
upateTime: 2019-10-05T07:50:54.000Z
wordCount: 1408
layout: doc
---

## easywebpack 是什么

easywebpack 是基于 webpack 的前端工程化解决方案。旨在解决 webpack 项目构建复杂,使用成本高,复用低,维护成本高等工程效率问题。基于 easywebpack 工程化方案, 你能非常简单容易的对各种前端项目进行工程化建设，及时享受最新的特性, 同时你能享受诸如热更新, 多进程极速编译, 性能优化, 惰性加载, TypeScript构建, 单页面构建, 多页面构建, 前端渲染构建, 服务端渲染构建等一体化解决方案.


## easywebpack 介绍

首先, 使用 easywebpack 之前,  你需要了解一下 easywebpack 提供的能力:

- **easywebpack 简化配置：easywebpack 是 Webpack 的上层框架。在支持 Webpack 原生节点配置基础之上， 对 Webpack 常用配置进行封装简化, 同时增强部分配置能力和扩展部分配置，简化配置复杂性**。 通过简单的 Webpack 配置让开发者从复杂的各种具体 loader, plugin 中解脱出来.  按照一定规范可以做到零配置。

- **easywebpack 提供强大的扩展配置能力：** easywebpack 本身不提供任何前端框架的构建能力, 需要你基于 easywebpack 扩展出对应前端框架的构建解决方案, 目前已扩展出 Vue/React/Weex/HTML/JS 解决方案, 你可以直接使用这些解决方案。如果不满足，你可以基于已有方案扩展出自己的解决方案。

- **easywebpack 极速编译和特性支持： **easywebpack 通过工程化方式解决编译速度和打包大小问题(提供缓存编译，多进程编译，DLL,  Service Worker等)。

- **easywebpack 提供强大的工具链：**easywebpack 提供强大的工具链支持开发打包，构建大小优化，多种骨架项目(Vue/React/SSR/Weex/JS/HTML)初始化功能。


> **下面是 webpack 和 easywebpack 配置对比，是不是简单多了。实际项目时，webpack 原生配置更复杂，因为左边的代码还没有考虑 Hot-Reload，devServer，开发与线上配置分离，构建缓存，DLL配置等问题。easywbpack 除了解决这些问题，同时  easywebpack-cli  还提供了强大的开发辅助功能.**


![](/medias/easy-team/easywebpack-config.png)                                                                            


## easywebpack 基本配置


#### 最简单的配置

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  // framework 支持 `js`,`html`, `vue`, `react`, `weex`
  framework: 'html' // 增强配置，告诉 easywebpack 使用 easywebpack-html 方案
  entry:{
    home: 'src/home/home.js'
  }
}
```


#### 常用模板的配置

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  // framework 支持 `js`,`html`, `vue`, `react`, `weex`
  framework: 'html' // 扩展配置
  entry:{
     home: 'src/home/home.js'
  },
  module:{
    rules:[] // 默认可以不用配置, 添加或扩展请见配置loaders章节  
  },
  pugins:[] // 默认可以不用配置, 添加或扩展请见配置plugins章节  
  done(){
    // Webpack 编译完成回调, 默认可以不用配置,当你需要编译完成做某某事情(比如上传cdn)才需要配置
  }
}
```


####  结合 Webpack 原生节点配置

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  // framework 支持 `js`,`html`, `vue`, `react`, `weex`
  framework: 'html',
  entry:{
     home: 'src/home/home.js'
  },
  externals: {  
    jquery: 'window.$'
  },
  resolve:{
    alias:{},
    extensions:[]
  },
  module:{
    rules:[] // 默认可以不用配置, 添加或扩展请见配置loaders章节  
  },
  plugins:[] // 默认可以不用配置, 添加或扩展请见配置plugins章节 
  done(){
    // Webpack 编译完成回调, 默认可以不用配置,当你需要编译完成做某某事情(比如上传cdn)才需要配置
  }
}
```



## easywebpack 基础能力

easywebpack 在 Webpack 的基础上, 主要做了以下三件事情:

- 支持 Webpack 原生节点配置，同时增强部分配置能力和扩展部分配置，简化配置复杂性

- 内置与构建框架无关的基础配置, 包括通用基础配置, 通用 loader, 通用 plugin. 详情请见 [内置loader](http://127.0.0.1:4000/easywebpack/webpack/loader/) 和 [内置plugin](http://127.0.0.1:4000/easywebpack/webpack/plugin/)

- 内置热更新, image/javascript/css压缩, sass, less, stylus, postcss, eslint, babel等基础能力, 通过开关即可开启和禁用

- 内置开发, 测试, 正式三种环境, 简化开发者配置


![](/medias/easy-team/easywebpack-feature.png)  

## easywebpack 构建解决方案

![](/medias/easy-team/easywebpack-feature-solution.png)  

![](/medias/easy-team/easywebpack-design.png)  


- [easywebpack-vue](https://github.com/hubcarl/easywebpack-vue.git) Vue 前端和服务端构建解决方案

- [easywebpack-react](https://github.com/hubcarl/easywebpack-react.git) React 前端和服务端构建解决方案

- [easywebpack-weex](https://github.com/hubcarl/easywebpack-weex.git) Weex Native 端和Web端构建解决方案

- [easywebpack-html](https://github.com/hubcarl/easywebpack-html.git) 纯静态 HTML/Nunjucks 页面构建解决方案

- [easywebpack-js](https://github.com/hubcarl/easywebpack-js.git) javascript 构建解决方案



## Egg MVVM 构建解决方案

![](/medias/easy-team/easywebpack-solution.png)  


### Egg + Vue Server Side Render 插件

- [egg-webpack](https://github.com/hubcarl/egg-webpack)

- [egg-webpack-vue](https://github.com/hubcarl/egg-webpack-vue)

- [egg-view-vue-ssr](https://github.com/hubcarl/egg-view-vue-ssr)

- [easywebpack-vue](https://github.com/hubcarl/easywebpack-vue)



### Egg + React Server Side Render 插件

- [egg-webpack](https://github.com/hubcarl/egg-webpack)

- [egg-webpack-react](https://github.com/hubcarl/egg-webpack-react)

- [egg-view-react-ssr](https://github.com/hubcarl/egg-view-react-ssr)

- [easywebpack-react](https://github.com/hubcarl/easywebpack-react)



## 基于 easywebpack 构建的项目骨架


![](/medias/easy-team/easywebpack-plugin-example.png)  

> **项目骨架, 你可以通过 **[easywebpack-cli](https://github.com/hubcarl/easywebpack-cli)** 命令行工具或 **[clone github](https://github.com/hubcarl)** 仓库代码进行初始化和构建**

- [egg-vue-webpack-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate) 基于 Egg + Vue + Webpack 服务端和客户端渲染项目骨架

- [egg-react-webpack-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate) Egg + React + Webpack 服务端和客户端渲染项目骨架

- [egg-vue-typescript-boilerplate](https://github.com/hubcarl/egg-vue-typescript-boilerplate) 基于 Egg + Vue + Webpack + TypeScript 服务端和客户端渲染项目骨架

- [egg-react-typescript-boilerplate](https://github.com/hubcarl/egg-react-typescript-boilerplate) Egg + React + Webpack + TypeScript 服务端和客户端渲染项目骨架

- [easywebpack-weex-boilerplate](https://github.com/hubcarl/easywebpack-weex-boilerplate) 基于 Weex Native 端和 Web 端构建解决方案渲染项目骨架

- [easywebpack-multiple-html-boilerplate](https://github.com/hubcarl/easywebpack-multiple-html-boilerplate) 纯静态 Webpack + HTML + 页面构建项目骨架

- [easywebpack-vue-client-render-boilerplate](https://github.com/hubcarl/easywebpack-cli-template/tree/master/boilerplate/vue) 基于 Vue + Webpack 前端渲染的项目骨架

- [easywebpack-react-client-render-boilerplate](https://github.com/hubcarl/easywebpack-cli-template/tree/master/boilerplate/react) 基于 React + Webpack 前端渲染的项目骨架



  