
---
id: 2865585
space: res
slug: ssr
url: /res/ssr
title: 服务端渲染(SSR)
summary: Node 代码实现https://easy-team.github.io/egg-react/node在 Node 服务端运行 jsbundle，并渲染成完整的 HTML 内容返回给客户端使用 ctx.render 进行 React 服务端渲染，文件名为 Webpack entry 文...
coverImage: null
createTime: 2019-10-15T12:31:54.000Z 
upateTime: 2019-10-15T12:31:54.000Z
wordCount: 278
layout: doc
---

## Node 代码实现

[https://easy-team.github.io/egg-react/node](https://easy-team.github.io/egg-react/node)

- 在 Node 服务端运行 jsbundle，并渲染成完整的 HTML 内容返回给客户端<br />
- 使用 ctx.render 进行 React 服务端渲染，文件名为 Webpack entry 文件名，对应文件为 `app/view` 目录<br />
- ctx.render 渲染时，默认渲染失败会自动降级为客户端渲染模式<br />


#### app/controller/render.ts 代码

```typescript
import { Controller, Context } from '@easy-team/res';
export default class AdminController extends Controller {
  public async reactServerRender() {
    const { ctx } = this;
    await ctx.render('react-server-render.js', { 
      title: 'React Server Render',
      text: 'Egg + React + TypeScript + Webpack Server Side Render' 
    });
  }
}
```


##### app/router.ts 代码

```typescript
  app.get('/ssr', app.controller.render.reactServerRender);
```



## 前端代码实现

${root}/app/web/page/react-server-render/index.tsx

```typescript
import React, { Component } from 'react';
import Layout from '../../component/layout';
import { SSR } from '../../framework/app';

class Index extends Component {
  componentDidMount() {
    console.log('render');
  }
  render() {
    return <Layout>
      <h1>{this.props.text}</h1>
      <h1><a href="/csr">React Client Render</a></h1>
      <h1><a href="/nun">React + Nunjucks Client Render</a></h1>
    </Layout>;
  }
}

export default SSR(Index);
```



## 构建配置实现

${root}/config/res.config.js

```javascript

const path = require('path');
module.exports = {
  entry: {
    home: 'app/web/page/home/index.tsx'
  }
}
```


  