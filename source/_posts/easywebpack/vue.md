
---
id: 685616
space: easywebpack
slug: vue
url: /easywebpack/vue
title: Vue 项目构建
summary: Webpack  原始配置编写// webpack.config.js const easywebpack = require(&#x27;easywebpack-vue&#x27;); const webpack = easywebpack.webpack; const merge = easywebpack.merge; const env = process.env.BUILD_ENV; const baseWebpackConfig = easywebpack.getWebpackConfig...
coverImage: null
createTime: 2018-06-09T03:40:38.000Z 
upateTime: 2019-05-22T09:39:34.000Z
wordCount: 201
layout: doc
---

## Webpack  原始配置编写

```javascript
// webpack.config.js
const easywebpack = require('easywebpack-vue');
const webpack = easywebpack.webpack;
const merge = easywebpack.merge;
const env = process.env.BUILD_ENV;
const baseWebpackConfig = easywebpack.getWebpackConfig({
    env, // 根据环境变量生成对应配置，可以在 npm script 里面配置，支持dev, test, prod 模式
    target : 'web', // target: web 表示只获取前端构建 Webpack 配置
    entry:{
        app: 'src/index.js'
    }
});

// 拿到基础配置, 可以进行二次加工
const webpackConfig = merge(baseWebpackConfig, { 
  // 自定义配置
})

module.exports = webpackConfig;
```

使用 webpack-cli 构建： `webpack --config webpack.config.js` 


## easywebpack-cli 模式配置编写

```javascript
// webpack.config.js
module.exports = {
  framework: 'vue', //  表示使用 easywebpack-vue 方案构建
  target : 'web', // target: web 表示只获取前端构建 Webpack 配置
  entry:{
    app: 'src/index.js'
  }
}
```

使用 easywebpack-cli 构建：`easy build dev`   `easy build test`  `easy build prod` 

  