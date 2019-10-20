
---
id: 2865651
space: res
slug: csr
url: /res/csr
title: 客户端渲染(CSR)
summary: React Node 端代码实现服务端只渲染 HTML 的 HTML，HEAD，BODY 标签结构，具体 BODY 内容由 ctx.renderClient 进行 React 客户端渲染; 文件名为 webpack entry 的文件名，注入的页面 JS 文件为 app/public 文件。$...
coverImage: null
createTime: 2019-10-15T12:32:10.000Z 
upateTime: 2019-10-15T12:32:10.000Z
wordCount: 198
layout: doc
---

## React Node 端代码实现

服务端只渲染 HTML 的 HTML，HEAD，BODY 标签结构，具体 BODY 内容由 ctx.renderClient 进行 React 客户端渲染; 文件名为 webpack entry 的文件名，注入的页面 JS 文件为 app/public 文件。<br />

- ${root}/app/controller/render/render.ts

```typescript
import { Controller } from 'egg';
export default class ReactController extends Controller {
  public async reactClientRender() {
    const { ctx } = this;
    await ctx.renderClient('react-client-render.js', { 
      title: 'React Client Render',
      text: 'Egg + React + TypeScript + Webpack Client Side Render' 
    });
  }
}
```

- ${root}/app/router.ts

```typescript
app.get('/csr', app.controller.render.reactClientRender);
```


## React Web 端代码实现

${root}/app/web/page/render-client-render/index.tsx

```typescript
import React, { Component } from 'react';
import { CSR } from '../../framework/app';
class Index extends Component {
  componentDidMount() {
    console.log('client render');
  }
  render() {
    return <h1>{this.props.text}11</h1>;
  }
}
export default CSR(Index);
```


## 构建配置实现

${root}/config/res.config.js

```typescript
module.exports = {
  entry: {
   'react-client-render': 'app/web/page/react-client-render/index.tsx'
  }
}
```


  