
---
id: 685695
space: egg-react
slug: seo
url: /egg-react/seo
title: SEO 实现
summary: Egg + React SSR SEO 实现MVVM 服务端渲染相比前端渲染，支持 SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。在 Egg + React 的方案里面, HTML head 里面 meta 信息也作为 React 服务端渲染的一部分, 和普通的数据...
coverImage: null
createTime: 2019-10-03T15:02:58.000Z 
upateTime: 2019-10-09T11:50:23.000Z
wordCount: 579
layout: doc
keywords: egg,egg react ssr,egg react server side render, egg react ssr seo
---

## Egg + React SSR SEO 实现

MVVM 服务端渲染相比前端渲染，支持 SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。在 Egg + React 的方案里面, HTML head 里面 meta 信息也作为 React 服务端渲染的一部分, 和普通的数据绑定没有什么差别。


### layout.jsx 组件实现

```javascript
// framework/layout/layout.jsx 组件
import React, { Component } from 'react';

export default class Layout extends Component {
  render() {
    return <html>
      <head>
        <title>{this.props.title}</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
        <meta name="keywords" content={this.props.keywords}></meta>
        <meta name="description" content={this.props.description}></meta>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body><div id="app">{this.props.children}</div></body>
    </html>;
  }
}
```


### 服务端统一入口 Webpack loader 实现

下面是一个简单的 Webpack SSR 渲染 Entry Loader 模板实现,  结合 layout.jsx, 通过统一入口实现 React 初始化。 具体页面无需关心 HTML, header, body 以及热更新之列的配置， 只需要编写组件自己的功能实现。 服务端渲染出来的是完整的 HTML 结构，所以这里需要 layout.jsx

```javascript
// app/web/framework/entry/server-loader.js
module.exports = function() {
  this.cacheable();
  return `
    import React, { Component } from 'react';
    import Layout from 'framework/layout/layout.jsx';
    import Header from 'component/header/header.jsx';
    import App from '${this.resourcePath.replace(/\\/g, '\\\\')}';
    export default class Page extends Component {
      render() {
        return <Layout {...this.props}><App {...this.props} /></Layout>;
      }
    }
  `;
};
```


### 客户端统一入口 Webpack loader 实现

下面是一个简单的 Webpack 前端渲染 Entry Loader 模板实现, 通过统一入口实现 React 初始化。 这里无需 layout.jsx, 因为SSR渲染时已经把 HTML 渲染好了。前端只需要渲染 `<div id="app"></div>`的内容。

```javascript
// app/web/framework/entry/client-loader.js
module.exports = function() {
  this.cacheable();
  return `
    import React from 'react';
    import ReactDom from 'react-dom';
    import { AppContainer } from 'react-hot-loader';
    import Entry from '${this.resourcePath.replace(/\\/g, '\\\\')}';
    const state = window.__INITIAL_STATE__;
    const render = (App)=>{
      ReactDom.hydrate(EASY_ENV_IS_DEV ? <AppContainer><App {...state} /></AppContainer> : <App {...state} />, document.getElementById('app'));
    };

    if (EASY_ENV_IS_DEV && module.hot) {
      module.hot.accept('${this.resourcePath.replace(/\\/g, '\\\\')}', () => { render(Entry) });
    }
    render(Entry);
  `;
};
```


### <br />

  