
---
id: 1343171
space: easywebpack
slug: optimizaiton
url: /easywebpack/optimizaiton
title: optimizaiton
summary: 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化，你可以通过 optimizaiton  节点进行覆盖配置。在 easywebpack  体系中，会进行进步配置简化。easywebpack 默认配置请根据需要，覆盖默认配置runtimeChunk 默认文件名为 runt...
coverImage: null
createTime: 2019-03-13T01:51:39.000Z 
upateTime: 2019-10-10T10:57:52.000Z
wordCount: 289
layout: doc
---
从 webpack 4 开始，会根据你选择的 [`mode`](https://webpack.docschina.org/concepts/mode/) 来执行不同的优化，你可以通过 `optimizaiton`  节点进行覆盖配置。在 easywebpack  体系中，会进行进步配置简化。


## easywebpack 默认配置

> 请根据需要，覆盖默认配置


- runtimeChunk 默认文件名为 `runtime` 
- 通过 splitChunks 抽离的公共 js 文件名为 `common` 
- 通过 splitChunks 抽离的公共 css 文件名为 `common` 


```javascript
'use strict'
module.exports = {
  optimization: {
    namedModules: true,
    namedChunks: true,
    runtimeChunk: { 
      name: 'runtime' 
    },
    splitChunks:
    {
      name: false,
      chunks: 'all',
      minSize: 1,
      minChunks: 1,
      cacheGroups:
      {
        default: false,
        vendors:
        {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          test: /node_modules/
        },
        styles:
        {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          test: /\.(css|less|scss|stylus)$/,
          enforce: true,
          priority: 50
        }
      }
    }
  }
}
```



### 自定义压缩配置

从 webpack 4 开始，当设置  `mode : 'production'`  时,  会默认进行代码压缩。 easywebpack 除了支持 webpack 官方的 minimizer 方式进行定义压缩，可以通过 `plugins.uglifyJs`  配置进行自定义压缩，这个配置 在 easywebpack 底层自动出处理 为 minimizer 方式进行压缩。 如果配置了 uglifyJs 方式，该配置会与 如下默认压缩参数配置进行合并。

```javascript
{
  cache: true,
  parallel: 2,
  sourceMap: !!this.ctx.devtool,
  terserOptions: {
    ie8: false,
    safari10: false,
    warnings: false,
    compress: {
      dead_code: true,
      drop_console: true,
      drop_debugger: true
    },
    output: {
      comments: false
    }
 }
```


  