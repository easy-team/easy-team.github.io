
---
id: 685636
space: easywebpack
slug: in6n2r
url: /easywebpack/in6n2r
title: JS 文件打包
summary: 我们经常会遇到单独对 JS 打包的场景，比如 es6 写的 npm 包需要构建成 es5 模式.  easywebpack 也提供了对应的解决方案： easywebpack-js基于 easywebpack-js 构建配置编写// build/index.js const easywebpack = require(&#x27;easywebpack-js&#x27;); const config = {   env: process.env.BUILD_ENV,   entry: {     &#x2...
coverImage: null
createTime: 2018-06-09T07:20:07.000Z 
upateTime: 2019-07-08T11:11:44.000Z
wordCount: 293
layout: doc
---
我们经常会遇到单独对 JS 打包的场景，比如 es6 写的 npm 包需要构建成 es5 模式.  easywebpack 也提供了对应的解决方案：[ easywebpack-js](https://github.com/hubcarl/easywebpack-js)


### 基于 easywebpack-js 构建

- 配置编写


```javascript
// build/index.js
const easywebpack = require('easywebpack-js');
const config = {
  env: process.env.BUILD_ENV,
  entry: {
    'index': 'lib/index.js'
  }
};
easywebpack.build(config);
```

- 命令行配置构建


```javascript
// ${app_root}/package.json
{
 "scripts": {
   "build:test": "cross-env BUILD_ENV=test NODE_ENV=development node build/index.js",
   "build:prod": "cross-env BUILD_ENV=prod NODE_ENV=production node build/index.js",
 }
}
```


### 基于 easywebpack-cli 构建

```javascript
// ${app_root}/webpack.config.js
const easywebpack = require('easywebpack-js');
module.exports = {
  framework: 'js',
  entry: {
    'index': 'lib/index.js'
  }
};
```

- 命令行配置构建


```javascript
// ${app_root}/package.json
{
 "scripts": {
   "build:test": "easy build test",
   "build:prod": "easy build prod",
 }
}
```



### 基于 Webpack 构建


```javascript
// ${app_root}/webpack.config.js
const easywebpack = require('easywebpack-js');
const config = {
  env: process.env.BUILD_ENV,
  framework: 'js',
  entry: {
    'index': 'lib/index.js'
  }
};
module.exports = easywebpack.getWebpackConfig(config);
```

- 命令行配置构建


```javascript
// ${app_root}/package.json
{
 "scripts": {
   "build:test": "cross-env BUILD_ENV=test webapck --config webpack.config.js",
   "build:prod": "cross-env BUILD_ENV=prod webapck --config webpack.config.js",
 }
}
```


  