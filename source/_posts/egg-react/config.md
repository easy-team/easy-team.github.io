
---
id: 880825
space: egg-react
slug: config
url: /egg-react/config
title: 配置说明
summary: Webpack 标准配置
coverImage: null
createTime: 2019-10-03T15:05:12.000Z 
upateTime: 2019-10-03T15:05:12.000Z
wordCount: 346
layout: doc
keywords: egg,egg react ssr,egg react server side render, ant ssr
description: Egg React Server Side Render(Egg React SSR) Webpack Babel 构建配置
---

## Webpack 标准配置

```javascript
// ${root}/webpack.config.js
module.exports = {
  entry: {
    app: 'app/web/page/app/index.js',  // js 文件需要自己实现 react.render 逻辑
    hello: 'app/web/page/hello/index.jsx'  // 自动使用 react-entry-template-loader 模板 
  }
};
```


**Webpack entry 配置说明**<br />

- **.jsx   **文件后缀这种模式可以直接渲染 React Component组件，而无需编写 React.render 初始化代码，统一[react-entry-template-loader](https://github.com/easy-team/react-entry-template-loader/blob/master/lib/web.js) 插件提供的模板进行 React 页面初始化。也就是如下标准的 React  Component

可以直接渲染出完整的 HTM 网页。

```javascript
//${root}/app/web/page/hello/index.jsx
export default class Hello extends Component {
  render() {
    return <h1>Egg React Server Render</h1>
  }
}
```

- **.js **文件后缀这种模式需要自己编写 React.render 代码且需要自己判断 SSR 还是前端渲染

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Layout from '../../component/layout.jsx';
import List from './componets/list';
import './index.css';

class ListPage extends Component {
  render() {
    return <div className="main">
        <div className="page-container page-component">
          <List list={this.props.list}></List>
        </div>
      </div>
  }
}

class ServerEntry extends Component {
  render() {
    return <Layout><ListPage {...this.props} /></Layout>;
  }
}

const clientEntry = () => {
  const root = document.getElementById('app');
  const state = window.__INITIAL_STATE__ || {};
  const render = () =>{
    ReactDOM.hydrate(EASY_ENV_IS_DEV ? <AppContainer><ListPage {...state}/></AppContainer> : <ListPage />, root);
  };
  if (EASY_ENV_IS_DEV && module.hot) {
    module.hot.accept();
  }
  render();
};

export default EASY_ENV_IS_NODE ? ServerEntry : clientEntry();

```


  