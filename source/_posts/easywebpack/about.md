
---
id: 685538
space: easywebpack
slug: about
url: /easywebpack/about
title: 项目实战
summary: 快速开始我们可以使用基于 easywebpack 前端工程化解决方案构建的脚手架 easywebpack-cli 初始化各种项目, 目前支持如下骨架项目:multiple-html-boilerplate 纯静态 Webpack + HTML + 页面构建项目骨架vue-client-rend...
coverImage: null
createTime: 2019-03-08T06:39:57.000Z 
upateTime: 2019-05-22T01:47:56.000Z
wordCount: 506
layout: doc
---

## 快速开始

我们可以使用基于 [easywebpack](https://github.com/easy-team/easywebpack) 前端工程化解决方案构建的脚手架 [easywebpack-cli](https://github.com/easy-team/easywebpack-cli) 初始化各种项目, 目前支持如下骨架项目:

- [multiple-html-boilerplate](https://github.com/hubcarl/easywebpack-multiple-html-boilerplate) 纯静态 Webpack + HTML + 页面构建项目骨架

- [vue-client-render-boilerplate](https://github.com/hubcarl/easywebpack-cli-template/tree/master/boilerplate/vue) 基于 Vue + Webpack 前端渲染的项目骨架

- [react-client-render-boilerplate](https://github.com/hubcarl/easywebpack-cli-template/tree/master/boilerplate/react) 基于 React + Webpack 前端渲染的项目骨架

- [egg-vue-webpack-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate) 基于 Egg + Vue + Webpack 服务端和客户端渲染项目骨架

- [egg-react-webpack-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate) Egg + React + Webpack 服务端和客户端渲染项目骨架

- [egg-vue-typescript-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate) 基于 Egg + Vue + TypesScript + Webpack 服务端和客户端渲染项目骨架

- [egg-react-typescript-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate) Egg + React + TypesScript + Webpack 服务端和客户端渲染项目骨架

- [easywebpack-weex-boilerplate](https://github.com/hubcarl/easywebpack-weex-boilerplate) 基于 Weex Native 端和 Web 端构建解决方案渲染项目骨架



### 安装

```
npm i easywebpack-cli  -g
```

安装成功以后, 就可以在命令行中使用 `easywebpack` or `easy` 命令, 比如 `easy init`, `easy build`, `easy dev`, `easy print` 等。** 记得认真仔细看一下   **[easywebpack-cli](https://github.com/easy-team/easywebpack-cli)**  README 文档，功能非常强大。**


### 命令介绍


#### 项目初始化

- easy init

> step one:

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528514931367-edbc020f-db8b-4249-a7a2-3ff83c85a0fc.png#width=575)
> step two:


![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528514940699-8bc6f8c0-5a78-43da-9d71-8dc94c7d9796.png#width=663)<br />初始化模板项目源代码：[easywebpack-cli-template](https://github.com/hubcarl/easywebpack-cli-template.git)


#### 编译构建举例

构建文件到磁盘, 默认根据项目根目录下面的 `webpack.config.js` 支持 dev/test/prod 模式构建

```bash
// 发布模式, 压缩, hash, 去除调试代码
easy build
```


#### 编译和启动服务举例

文件不落地磁盘(内存), 默认根据项目根目录下面的 `webpack.config.js`

```basic
// 开发模式, 启动本地开发服务, 适合前端渲染项目, 后端框架项目用框架自己的启动模式.
easy server
```

运行完成自动打开编译结果页面 : http://127.0.0.1:8888/debug<br />![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528514948690-4f1bd30f-0a4e-41f0-8062-ec28cef6c033.png#width=827)

#### 构建发布

```bash
easy build prod
```


#### 打印生成的 Webpack 配置

用于开发期, 检查通过 easywebpack 生成的 Webpack 配置是否正确

```bash
// 打印 entry
easy print dev -n entry 

easy print prod -n module.rules[0]

easy print -n plugins[0]
```



  