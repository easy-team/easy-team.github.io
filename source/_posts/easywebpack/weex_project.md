
---
id: 2773718
space: easywebpack
slug: weex_project
url: /easywebpack/weex_project
title: Weex 工程方案
summary: easywebpack-weex 基于 easywebpack 的 Weex Native 和 Weex Web 打包构建解决方案.安装$ npm i easywebpack-weex --save-dev使用const weex = require('easywebpack-weex'); ...
coverImage: null
createTime: 2019-10-05T03:37:43.000Z 
upateTime: 2019-10-05T03:37:45.000Z
wordCount: 174
layout: doc
---
[easywebpack-weex](https://github.com/easy-team/easywebpack-weex) 基于 easywebpack 的 Weex Native 和 Weex Web 打包构建解决方案.


## 安装

```bash
$ npm i easywebpack-weex --save-dev
```


## 使用

```javascript
const weex = require('easywebpack-weex');
// 获取 webpack weex 配置
const webpackConfig = weex.getWeexWebpackConfig({
  env: process.env.BUILD_ENV, // 支持 dev，test，local 模式
  entry: {
    index: 'src/app.js'
  }
});

// 获取 webpack web 配置
const webpackConfig = weex.getWebWebpackConfig({
  entry: {
    index: 'src/app.js'
  }
});

//  获取 webpack weex 和 web 配置
const webpackConfig = weex.getWebpackConfig({
  entry: {
    index: 'src/app.js'
  }
});
```


## 开发构建

- 使用 webpack-cli 开发构建服务<br />

```bash
webpack --config webpack.config.js
```

- 使用 easywebpack 内置开发构建服务<br />

```javascript
const weex = require('easywebpack-weex');
if (process.env.NODE_ENV === 'development') {
  // development mode: webpack building and start webpack hot server
  weex.server(webpackConfig);
} else {
  // build file to disk
  weex.build(webpackConfig);
}
```


## 工程骨架

[easywebpack-weex-boilerplate](https://github.com/easy-team/easywebpack-weex-boilerplate) 项目骨架

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1544507323476-3af27d63-a981-4ba5-bbec-eb5711a7a51e.png#align=left&display=inline&height=490&originHeight=567&originWidth=957&search=&status=done&width=827)

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1544507330217-766950e6-7b84-4d6e-ac46-7282f29886cb.png#align=left&display=inline&height=629&originHeight=713&originWidth=937&search=&status=done&width=827)


## License

[MIT](https://www.yuque.com/easy-team/frontend/weex/LICENSE)

  