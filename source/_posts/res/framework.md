
---
id: 2865538
space: res
slug: framework
url: /res/framework
title: 公共代码实现
summary: React Render 初始化辅助代码${root}/app/web/framework/app.tsximport React, { Component } from 'react'; import ReactDOM from 'react-dom'; // 热更新 import { Ap...
coverImage: null
createTime: 2019-10-15T12:24:00.000Z 
upateTime: 2019-10-15T12:24:00.000Z
wordCount: 283
layout: doc
---

## React Render 初始化辅助代码

- ${root}/app/web/framework/app.tsx

```typescript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 热更新
import { AppContainer } from 'react-hot-loader';

const clientRender = (Com, method) => {
  const state = window.__INITIAL_STATE__;
  const root = document.getElementById('app');
  // Webpack 注入的静态变量，EASY_ENV_IS_DEV 开发模式
  if (EASY_ENV_IS_DEV) {
    ReactDOM[method](<AppContainer><Com {...state} /></AppContainer>, root);
    if (module.hot) {
      module.hot.accept();
    }
  } else{
    ReactDOM[method](<Com {...state} />, root);
  }
};

const serverRender = Com => {
  return Com;
};

export function SSR(Com) {
  return EASY_ENV_IS_NODE ?  serverRender(Com) : clientRender(Com, 'hydrate');
}

export function CSR(Com) {
  return clientRender(Com, 'render');
}

```



## React SSR Layout Component

- ${root}/app/web/component/layout.tsx

```javascript

import React, { Component } from 'react';
export default class Layout extends Component<any> {
  render() {
    if(EASY_ENV_IS_NODE) {
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
    return this.props.children;
  }
}
```


  