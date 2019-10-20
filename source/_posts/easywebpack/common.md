
---
id: 685572
space: easywebpack
slug: common
url: /easywebpack/common
title: 公共提取
summary: Webpack CommonsChunk 公共代码提取easywebpack 4.10.0 开始，底层通过 optimization 实现公共提取，支持公共 js 和 css  提取, 提取的公共 chunk 文件名默认为 common .   默认是提取的是 node_modules 下依赖...
coverImage: null
createTime: 2018-11-15T07:46:25.000Z 
upateTime: 2019-05-23T07:04:53.000Z
wordCount: 211
layout: doc
---

## Webpack CommonsChunk 公共代码提取

- easywebpack 4.10.0 开始，底层通过 [optimization](https://webpack.js.org/configuration/optimization/) 实现公共提取，支持公共 `js` 和 `css`  提取, 提取的公共 chunk 文件名默认为 `common` .  ** 默认是提取的是 node_modules 下依赖的公共文件，你可以通过配置 lib 支持指定的公共模块提取。另外，可以通过配置 **[optimization](https://webpack.js.org/configuration/optimization/) 选项来覆盖默认配置(注意：css 和 js 的公共名字必须一样)


- easywebpack 3.5.0 版本支持直接 `webpack.config.js` 文件添加 lib 节点配置即可完成 `commonsChunk` 公共库的配置。


```javascript
module.exports = {
  lib:['vue','vuex','axios']
}
```

这样默认生成的功能代码文件名称为 `common.js`, 你可以通过如下方式进行自定义

```javascript
module.exports = {
  lib:{
    name: 'commonlib',
    lib: ['vue','vuex','axios']
  }
}
```


  