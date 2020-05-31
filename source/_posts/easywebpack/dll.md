
---
id: 685576
space: easywebpack
slug: dll
url: /easywebpack/dll
title: DLL 构建
summary: Webpack Dll 构建在 3.5.0 版本之前，webpack 构建随着项目越来越来大，打包也就越来越慢; 同时 dll 工程化构建也没有内置支持。虽然可以通过在 easywebpack 中添加 new webpack.DllPlugin() 和 webpack.DllReference...
coverImage: null
createTime: 2019-08-02T05:38:28.000Z 
upateTime: 2019-08-02T05:38:28.000Z
wordCount: 955
layout: doc
---

## Webpack Dll 构建

在 3.5.0 版本之前，webpack 构建随着项目越来越来大，打包也就越来越慢; 同时 dll 工程化构建也没有内置支持。虽然可以通过在 easywebpack 中添加 new webpack.DllPlugin() 和 webpack.DllReferencePlugin() 方式实现 dll 方案，但使用起来还是很繁琐: 因为需要先单独为 dll 添加 webpack.config.js 配置， 然后先手动先构建dll，然后在页面里面配置dll的引用，最后再构建页面。easywebpack 3.5.0 从工程化的角度内置支持了。


### 1. 当前网上流行的 Webpack Dll 方案

- 1.需要单独写一份 dll 的 webpack 配置文件

- 2.需要手动先编译 webpack dll manifest 文件

- 3.需要在另一份页面 webpack 配置文件中引用 dll manifest 文件

- 4.编译好dll manifest 文件后，再编译页面构建

- 5.构建的 dll.js 文件 和 页面构建生产的 js 文件 手动引入

- 6.dll 配置变更时，需要手动再次重新执行 1 和 4 步骤



### 2. 理想中 Webpack Dll 构建：

- 1.只需要配置 dll 第三方库信息，无需配置完整的 webpack.config.js

- 2.构建时无需手动编译dll，有构建工具底层解决 dll编译和页面编译衔接问题。

- 3.构建底层支持 dll.js 文件 和 页面 js 合并注入到页面。

- 4.从底层支持配置变更，自动重新编译dll



### 3. 工程化 easywebpack Dll 方案

`easywebpack` 3.5.6 版本目前已经解决理想中 dll 构建方案的 1,2,3,4 问题, 赶快使用起来吧！


#### easywebpack dll 配置

只需要在 `webpack.config.js` 文件添加 dll 节点配置即可完成 `dll` 整个流程。

```javascript
module.exports = {
  dll:['vue','vuex','axios']
}
```

这样默认生成的 dll 文件名称为 `vendor.js`, 你可以通过如下方式进行自定义

```javascript
module.exports = {
  dll:{
    name: 'dll',
    lib: ['vue','vuex','axios']
  }
}
```


#### 工程化 easywebpack 多 Dll 方案

目前 easywebpack 从设计上面支持多 Dll 配置和根据页面使用对应的Dll。但目前官方的 `DllReferencePlugin` 由两个比较严重的问题：

- 当多个 DLL 中存在相同的包依赖时, 页面相同包依赖解析会以配置的最后一个 Dll 作为依赖解析，这样导致 Dll 引用出错。

- 即使配置的依赖包不存在依赖，也不能保证包依赖的包不存在依赖。


> 使用多 DLL 方案时, 请确认是否存在上面两个问题, 如果不存在, 可以尝试使用


```javascript
module.exports = {
  dll:[
    {
      name: 'lib',
      lib: ['vue', 'axios'],
      include:[],
      exclue: []
    },
    {
      name: 'router',
      lib: ['vuex','vue-router'],
      include:[],
      exclue: []
    }
  ]
}
```


#### easywebpack dll 构建流程

本地开发时，我们通过 `npm start` 一步完成 webpack dll 构建和页面构建，简化了先手动编译 webpack dll，然后构建页面。easywebpack 是如何解决上面 dll 的问题呢？

1. npm start 首次启动时，检查 `webpack.config.js` 是否配置了 `dll` 节点信息， 如果配置了，同时 manifest-{name}-dll.json 文件不存在，则构建 dll.js 文件，同时生成 manifest-${name}-dll.json 文件 和 dll 的 资源依赖 manifest.json 文件。

2. dll 构建完成后，自动启动 webpack 页面构建，同时把 dll 资源依赖 manifest.json 文件与页面资源依赖 manifest.json 文件进行合并，同时构造好资源依赖。

3. webpack 页面构建完成后，自动打开浏览器。

4. 下次 npm start 时，因为 manifest-${name}-dll.json 文件存在，所以 1 的步骤跳过，直接进行2 和 3，这时候构建速度会显著提升。

5. 当修改 `webpack.config.js` 或者 dll 依赖的包版本变更时，再次构建时会重新生成 dll.js 和 manifest 文件以及依赖关系。

6. easywebpack-cli 提供 easy clean 清理缓存和 easy open 打开缓存目录命令



  