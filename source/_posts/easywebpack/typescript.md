
---
id: 685582
space: easywebpack
slug: typescript
url: /easywebpack/typescript
title: TypeScript
summary: TypeScript 构建支持在用 TypeScript 编写 Vue 应用时， Vue 里面的 TypeScript 代码建议不要写在 Vue 文件里面，请以单独 ts 文件存放 TypeScript 代码。目前测试发现与 thread-loader 一起使用是有问题的。easywebpac...
coverImage: null
createTime: 2018-11-15T07:45:29.000Z 
upateTime: 2019-06-06T10:48:26.000Z
wordCount: 202
layout: doc
---

## TypeScript 构建支持

> 
> 在用 TypeScript 编写 Vue 应用时， Vue 里面的 TypeScript 代码建议不要写在 Vue 文件里面，请以单独 ts 文件存放 TypeScript 代码。目前测试发现与 thread-loader 一起使用是有问题的。easywebpack  4.10.0 开始，默认开启了 thread-loader, 你可以通过如下方式禁用 thread-loader：
> 
> ```javascript
// ${root}/webpack.config.js
module.exports = {
 compile: { 
  thread: false 
 } 
}
```
> 



### 版本要求 ^3.6.0

- easywebpack: ^3.6.0



### 新增 typescript 构建支持

支持通过 Webpack 构建 typescript 项目, 默认开启 tslint 检查


#### 启用 typescript 编译

```javascript
// webpack.config.js
module.exports = {
  loaders:{
    typescript: true
  }
}
```


#### 启用 tslint

自动修复功能，tslint 默认启用, 自动修复默认禁用，可以通过如下方式开启

```javascript
// webpack.config.js
module.exports = {
  loaders:{
    tslint:{
      options: {
        fix: true
      }
    }
  }
}
```


#### 项目骨架

[Egg + Vue + TypeScript + Webpack](https://github.com/easy-team/egg-vue-typescript-boilerplate)

  