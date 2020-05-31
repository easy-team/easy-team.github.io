
---
id: 2865637
space: res
slug: html
url: /res/html
title: HTML 页面渲染
summary: React + Nunjucks 静态页面前端渲染Webpack 根据 HTML 模板 直接构建成静态 HTML 页面，然后通过 Nunjucks 执行页面渲染.${root}/app/controller/render.tsimport { Controller } from 'egg'; ...
coverImage: null
createTime: 2019-10-15T12:24:46.000Z 
upateTime: 2019-10-15T12:24:48.000Z
wordCount: 163
layout: doc
---

## React + Nunjucks 静态页面前端渲染

> Webpack 根据 HTML 模板 直接构建成静态 HTML 页面，然后通过 [Nunjucks 执行页面渲染.](/egg-react/web)


- ${root}/app/controller/render.ts

```typescript
import { Controller } from 'egg';
export default class ReactController extends Controller {
  public async reactNunjucksRender() {
    const { ctx } = this;
    await ctx.render('react-nunjucks-render.tpl', { 
      title: 'Nunjucks Render',
      data: JSON.stringify({ text: '基于 Egg + React + Nunjucks + TypeScript + Mobx + Webpack Client Side Render' }) 
    });
  }
}
```

- config/res.config.js

```typescript
// /egg-react/config
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (filepath) => path.resolve(__dirname, '..', filepath);
module.exports = {
  entry: {
    'react-nunjucks-render': 'app/web/page/react-nunjucks-render/index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['runtime', 'common', 'react-nunjucks-render'],
      filename: '../app/view/react-nunjucks-render.tpl',
      template: './app/web/view/index.tpl'
    })
  ]
};
```

  