
---
id: 685697
space: egg-react
slug: about
url: /egg-react/about
title: 常见问题
summary: 常见问题汇总AntD 按需加载与主题定制 以及 issue如果实现 Egg + React + Webpack  热更新？服务端渲染如何使用 react-loadabel 实现异步加载React 文件热更新入口配置模板import React from 'react'; import Reac...
coverImage: null
createTime: 2019-07-27T06:14:30.000Z 
upateTime: 2019-07-27T06:14:30.000Z
wordCount: 216
layout: doc
---

## 常见问题汇总

- [AntD 按需加载与主题定制 ](https://easy-team.github.io/egg-react/antd)以及 [issue](https://github.com/easy-team/egg-react-webpack-boilerplate/issues/11)
- [如果实现 Egg + React + Webpack  热更新？](https://easy-team.github.io/blog/wumyiw)
- [服务端渲染如何使用 react-loadabel 实现异步加载](https://github.com/easy-team/egg-react-webpack-boilerplate/issues/23)



## React 文件热更新入口配置模板

```javascript
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Entry from '${this.resourcePath.replace(/\\/g, '\\\\')}';
const state = window.__INITIAL_STATE__;
const render = (App)=>{
 // 如果是 SSR 渲染时，请用 hydrate， 否则用 render，主要解决警告问题，不影响实际功能
 ReactDom.hydrate(EASY_ENV_IS_DEV ? <AppContainer><App {...state} /></AppContainer> 
    : <App {...state} />, document.getElementById('app'));
};

if (module.hot) {
  module.hot.accept('${this.resourcePath.replace(/\\/g, '\\\\')}', () => { render(Entry); });
}
render(Entry);
```


## 热更新 HMR 生效，但页面没有更新

```javascript
if (module.hot) {
  module.hot.accept('${this.resourcePath.replace(/\\/g, '\\\\')}', () => { render(Entry); });
}

改成

if (module.hot) {
  module.hot.accept();
}
```


## 更多常见问题

[https://github.com/easy-team/egg-react-webpack-boilerplate/issues](https://github.com/easy-team/egg-react-webpack-boilerplate/issues)

  