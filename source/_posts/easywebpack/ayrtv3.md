
---
id: 880179
space: easywebpack
slug: ayrtv3
url: /easywebpack/ayrtv3
title: 构建模式
summary: easywebpack-cli 支持两种开发构建模式： easywebpack 增强模式 和 原生 webpack 模式， 同时在最新相关解决方案中，该文件非必须，也就是可以零配置。easywebpack 增强模式（默认）easywebpack 增强模式时，  webpack.config.j...
coverImage: null
createTime: 2018-11-27T08:33:37.000Z 
upateTime: 2019-06-12T09:32:52.000Z
wordCount: 308
layout: doc
---
**easywebpack-cli 支持两种开发构建模式： easywebpack 增强模式 和 原生 webpack 模式， 同时在最新相关解决方案中，该文件非必须，也就是可以零配置。**


### **easywebpack 增强模式（默认）**

easywebpack 增强模式时，  `webpack.config.js` 这份配置不是 Webpack 原生的配置文件, 这是专门给 easywebpack-cli`` 使用的配置文件.  这份配置简化了 Webpack 原生配置, 隐藏众多基础，loader, plugin 等细节, 只提供5个左右的基本配置项, 其中 loader, plugin 通过开关开启就可以使用其功能.  在构建时, `easywebpack-cli` 最终会这份简化的配置转换为 Webpack 原生配置.  当然 easywebpack 增强模式是兼容原生 Webpack 配置项，比如 entry, target, node, resolve, externals, module.noParse, module.alias, module.rules, devtool, performance等配置项。相关文档所讲都是基于 **easywebpack 增强模式。**


#### **开发模式**

```bash
easy dev
```


#### 编译模式

```bash
easy build
```



### **原生 webpack 模式 （easywebpack-cli@4.0.0 开始支持）**

你可以使用 `easywebpack-cli`  对**原生 Webpack 配置**进行构建,  这时候，你需要在 `easy`  命令后加上 `--webpack` 配置


#### **原生 webpack 开发**

```bash
easy dev --webpack
```


#### 本地原生 webpack 编译

```bash
easy build --webpack
```

更多命令使用，请见 [easywebpack-cli](https://github.com/hubcarl/easywebpack-cli) 


  