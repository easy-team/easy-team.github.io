
---
id: 2773715
space: easywebpack
slug: js_project
url: /easywebpack/js_project
title: JS 打包工程方案
summary: 我们经常会遇到单独对 JS 打包的场景，比如 es6 写的 npm 包需要构建成 es5 模式.  easywebpack 也提供了对应的解决方案： easywebpack-js基于 easywebpack-js 构建配置编写// build/index.js const easywebpac...
coverImage: null
createTime: 2019-10-05T03:37:08.000Z 
upateTime: 2019-10-05T03:37:09.000Z
wordCount: 242
layout: doc
---
我们经常会遇到单独对 JS 打包的场景，比如 es6 写的 npm 包需要构建成 es5 模式.  easywebpack 也提供了对应的解决方案：[ easywebpack-js](https://github.com/easy-team/easywebpack-js)


### 基于 easywebpack-js 构建

- 配置编写<br />

```javascript
// build/index.js
const easywebpack = require('easywebpack-js');
const config = {
  env: process.env.BUILD_ENV,
  entry: {
    index: 'lib/index.js'
  }
};
easywebpack.build(config);
```

- 命令行配置构建<br />

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

- 命令行配置构建<br />

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

- 命令行配置构建<br />

```javascript
// ${app_root}/package.json
{
 "scripts": {
   "build:test": "cross-env BUILD_ENV=test webapck --config webpack.config.js",
   "build:prod": "cross-env BUILD_ENV=prod webapck --config webpack.config.js",
 }
}
```


  