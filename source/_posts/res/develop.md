
---
id: 2865292
space: res
slug: develop
url: /res/develop
title: 项目开发
summary: 默认集成插件res-cliegg-view-react-ssregg-view-nunjucksegg-webpackegg-webpack-react说明：Node 开发遵循 Eggjs  所有已有项目规范, 参考：https://github.com/easy-team/res-aweso...
coverImage: null
createTime: 2019-10-15T12:08:05.000Z 
upateTime: 2019-10-15T12:13:45.000Z
wordCount: 694
layout: doc
---


## 默认集成插件

- res-cli
- egg-view-react-ssr
- egg-view-nunjucks
- egg-webpack
- egg-webpack-react


说明：Node 开发遵循 Eggjs  所有已有项目规范, 参考：[https://github.com/easy-team/res-awesome](https://github.com/easy-team/res-aweseom)



## React 服务端渲染
> [https://easy-team.github.io/egg-react/node](https://easy-team.github.io/egg-react/node)
> - 在 Node 服务端运行 jsbundle，并渲染成完整的 HTML 内容返回给客户端

> - 使用 ctx.render 进行 React 服务端渲染，文件名为 Webpack entry 文件名，对应文件为 `app/view` 目录

> - ctx.render 渲染时，默认渲染失败会自动降级为客户端渲染模式



```typescript
import { Controller, Context } from '@easy-team/res';
export default class AdminController extends Controller {
  public async home(ctx: Context) {
    await ctx.render('admin/home.js', { url: ctx.url.replace(/\/admin/, '') });
  }
}
```



## React 客户端渲染

> - 服务端只渲染 HTML 的 HTML，HEAD，BODY 标签结构，具体 BODY 内容由浏览器进行渲染

> - 使用 ctx.renderClient 进行 Vue 客户端渲染， 文件名为 webpack entry 的文件名，注入的页面 JS 文件为 app/public 文件。



```typescript
import { Controller, Context } from '@easy-team/res';
export default class AdminController extends Controller {
  public async home(ctx: Context) {
    await ctx.renderClient('admin/home.js', { url: ctx.url.replace(/\/admin/, '') });
  }
}
```



## React + Nunjucks 静态页面前端渲染

Webpack 根据 HTML 模板 直接构建成静态 HTML 页面，然后通过 [Nunjucks 执行页面渲染.](https://easy-team.github.io/egg-react/web)<br />

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
// https://easy-team.github.io/egg-react/config
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



## React + Nunjucks Asset前端渲染

> [https://easy-team.github.io/egg-react/asset](https://easy-team.github.io/egg-react/asset)  


- ${root}/app/controller/render.ts

```typescript
import { Controller, Context } from '@easy-team/res';
export default class AdminController extends Controller {
  public async home(ctx: Context) {
     await ctx.renderAsset('asset.js', { 
      title: 'React Asset Client Render',
      text: 'Egg + React + TypeScript + Webpack Client Side Render' 
    }, { layout: path.join(ctx.app.baseDir, 'app/web/view/layout.tpl'),} );
  }
}
```

- ${root}/app/web/view/layout.tpl   renderAsset 自动注入资源依赖对象，然后自己根据 asset 对象进行 CSS和 JS 注入到 HTML 页面。

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>{{title}}</title>
  <meta name='keywords'>
  <meta name='description'>
  <meta http-equiv='content-type' content='text/html;charset=utf-8'>
  <meta name='viewport' content='initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'>
  <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
  {% for item in asset.css %}
    <link rel="stylesheet" href='{{item}}' />
  {% endfor %}
</head>
<body>
  <div id='app'></div>
  <script type="text/javascript">
    window.__INITIAL_STATE__ = {{ asset.state | safe }};
  </script>
  {% for item in asset.js %}
    <script type="text/javascript" src="{{item}}"></script>
  {% endfor %}
</body>
</html>
```


  