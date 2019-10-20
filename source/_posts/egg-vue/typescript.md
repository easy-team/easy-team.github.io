
---
id: 685676
space: egg-vue
slug: typescript
url: /egg-vue/typescript
title: TypeScript
summary: TypeScript 构建支持Node 启用 typescript 编译 egg-bin dev -r egg-ts-helper/register 实现开发 tsc -p tsconfig.json 编译package.json 运行脚本{   &quot;scripts&quot;: { ...
coverImage: null
createTime: 2018-11-15T08:23:50.000Z 
upateTime: 2019-06-20T01:50:20.000Z
wordCount: 188
layout: doc
---

## TypeScript 构建支持


#### Node 启用 typescript 编译

-  egg-bin dev -r egg-ts-helper/register 实现开发

-  tsc -p tsconfig.json 编译

- package.json 运行脚本


```json
{
  "scripts": {
  "start": "egg-scripts start",
  "dev": "egg-bin dev -r egg-ts-helper/register",
  "debug": "egg-bin debug",
  "build": "easy build",
  "tsc": "tsc -p tsconfig.json",
}
```


#### 前端启用 typescript 编译

```javascript
// webpack.config.js
module.exports = {
  loaders:{
    typescript: true
  }
}
```


#### 开启 tslint 校验

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

- [Egg + Vue + TypeScript + Webpack](https://github.com/easy-team/egg-vue-typescript-boilerplate)


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1542269931353-b0876980-a722-469b-ae37-e19f2eda4127.png#width=631)

- [https://github.com/kaorun343/vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

- [https://github.com/ktsn/vuex-class](https://github.com/ktsn/vuex-class)




## 注意事项

- [https://www.yuque.com/easy-team/easywebpack/typescript](https://www.yuque.com/easy-team/easywebpack/typescript)

- [https://www.yuque.com/easy-team/easywebpack/problem](https://www.yuque.com/easy-team/easywebpack/problem)



## 


  