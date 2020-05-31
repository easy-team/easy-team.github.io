
---
id: 1251324
space: easywebpack
slug: hot
url: /easywebpack/hot
title: 热更新
summary: easywebpack 是通过 koa-webpack-hot-middleware 和 koa-webpack-dev-middleware 插件实现热更新机制。具体实现封装成独立 webpack-tool 插件，该插件除了集成在 easywebpack 里面，同时也可以单独使用。下面详细说...
coverImage: null
createTime: 2019-06-28T15:10:30.000Z 
upateTime: 2019-06-28T15:10:30.000Z
wordCount: 512
layout: doc
---

easywebpack 是通过 [koa-webpack-hot-middleware](https://www.npmjs.com/package/koa-webpack-hot-middleware) 和 koa-webpack-dev-middleware 插件实现[热更新机制]()。具体实现封装成独立 [webpack-tool](https://github.com/easy-team/webpack-tool/blob/master/lib/tool.js) 插件，该插件除了集成在 easywebpack 里面，同时也可以单独使用。下面详细说明 easywebpack 实现流程。


## 实战项目热更新实现


### React 项目热更新实现

- ${root}/.babelrc 文件配置
> 项目需要安装 npm install react-hot-loader --save-dev 依赖


```json
{
 "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  }
}
```

- webpack entry 入口代码  `app.js` 

```javascript
'use strict';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import createStore from './store';
import Routes from './router'
import './app.css';

const App = () => {
  return EASY_ENV_IS_DEV ? <AppContainer><Routes /></AppContainer> : <Routes />;
};

const Entry = () => (<div>
  <Provider store={ createStore() }>
    <App />
  </Provider>
</div>
);

ReactDOM.render(<Entry />, document.getElementById('app'));

if (EASY_ENV_IS_DEV && module.hot) {
  module.hot.accept();
}
```

- 实例项目

[https://github.com/easy-team/easywebpack-awesome/tree/master/boilerplate/react](https://github.com/easy-team/easywebpack-awesome/tree/master/boilerplate/react)<br />[https://github.com/keenwon/Egg-Webpack-Starter](https://github.com/keenwon/Egg-Webpack-Starter)


### Vue 项目热更新实现
> vue 项目无需额外配置，直接使用 Webpack 热更新配置 和 启动 koa webpack 编译服务即可


[https://github.com/easy-team/easywebpack-awesome/tree/master/boilerplate/vue](https://github.com/easy-team/easywebpack-awesome/tree/master/boilerplate/vue)



## easywebpack 配置说明

- vue ssr 本地开发时, css 是 js 内敛的,  无需开启;  如果采用 css 分离模式，请显示开启该配置。
- react ssr 开发模式 css 时,  css 是分离出来的，默认开启。



## Webpack 热更新原理实现

> **在具体项目开发时，不需要自己实现热更新配置和启动服务，这些都已经集成到 easywebpack 体系里面。**



### Webpack 热更新配置
**<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1550202614764-4d0add71-9256-4a06-a7bc-0f386880f0c5.png#align=left&display=inline&height=277&name=image.png&originHeight=277&originWidth=904&size=66914&status=done&width=904)

## 
转化为 webpack 配置

```javascript
module.exports = {
  entry: {
    app: [
      "webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&noInfo=false&reload=true",
      "src/index.js"
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
```



### 启动 koa webpack 编译服务

```javascript
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
 
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("koa-webpack-hot-middleware")(compiler));
```



## 相关文档

- [easywebpack devServer实现](/easywebpack/ed847g)
- [Webpack 热更新实现原理分析](https://zhuanlan.zhihu.com/p/30623057)

  