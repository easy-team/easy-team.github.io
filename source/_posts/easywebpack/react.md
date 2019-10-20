
---
id: 685630
space: easywebpack
slug: react
url: /easywebpack/react
title: React 项目构建
summary: Webpack  原始配置编写// webpack.config.js const easywebpack = require(&#x27;easywebpack-react&#x27;); const webpack = easywebpack.webpack; const merge = easywebpack.merge; const env = process.env.BUILD_ENV; const baseWebpackConfig = easywebpack.getWebpackConfig...
coverImage: null
createTime: 2018-06-09T03:53:32.000Z 
upateTime: 2019-10-12T06:39:55.000Z
wordCount: 482
layout: doc
---

## Webpack  原始配置编写

```javascript
// webpack.config.js
const easywebpack = require('easywebpack-react');
const webpack = easywebpack.webpack;
const merge = easywebpack.merge;
const env = process.env.BUILD_ENV;
const baseWebpackConfig = easywebpack.getWebpackConfig({
    env, // 根据环境变量生成对应配置，可以在 npm script 里面配置，支持dev, test, prod 模式
    target : 'web', // target: web 表示只获取前端构建 Webpack 配置
    entry:{
      app: 'src/index.js'
    },
    template: 'src/view/layout.html', // html 模板
    lib: ['vue/dist/vue.common.js', 'axios'], // commonsChunk 
});

// 拿到基础配置, 可以进行二次加工
const webpackConfig = merge(baseWebpackConfig, { 
  // 自定义配置
})

module.exports = webpackConfig;
```

使用 webpack-cli 构建： `webpack --config webpack.config.js` 


## easywebpack-cli 模式配置编写


### 一. 全局安装 `easywebpack-cli` 插件

```bash
npm i easywebpack-cli  -g
```

安装成功以后, 就可以在命令行中使用 `easy` 或 `easywebpack` 命令, 比如 `easy build`, `easy server`, `easy print` 等


### 二. 添加 `webpack.config.js` 配置

在项目根目录添加 `webpack.config.js` 文件, 添加如下配置

```javascript
const path = require('path');
module.exports = {
  type:'client',  // 只构建前端渲染模式, 如果要同时构建Node运行文件, 这里不用配置
  framework: 'vue', // 指定用 easywebpack-vue 解决方案, 请在项目中安装该依赖
  entry: {
    include: 'src/page', // 自动遍历 src/page 下面的所有 js 文件
    exclude: ['src/page/test']
  },
  template: 'src/view/layout.html', // html 模板
  lib: ['vue/dist/vue.common.js', 'axios'], // commonsChunk 
  done(){ // 编译完成回调

  }
};
```

更多配置请见 [配置参数](http://hubcarl.github.io/easywebpack/webpack/config/)


### 三. 单独获取配置

```javascript
const VueEasyWebpack = require('easywebpack-react');
const webpackConfig = VueEasyWebpack.getWebpackConfig();
```


### 四. 编译文件

```bash
easy build dev

easy build test

easy build prod
```


### 五. 直接运行

```bash
easy server dev

easy server test

easy server prod
```

运行完成自动打开编译结果页面 :  [http://127.0.0.1:8888/debug](http://127.0.0.1:8888/debug)

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528516410246-d825f730-b21f-434a-b6be-35f138b280dc.png#width=827)


### 六. 前端项目初始化

- 全局安装 `easywebpack-cli` 插件


```bash
npm i easywebpack-cli  -g
```

- 请通过 `easy init` 命令初始化骨架项目, 根据提示选择对应的项目类型即可.



  