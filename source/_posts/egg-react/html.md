
---
id: 2229382
space: egg-react
slug: html
url: /egg-react/html
title: HTML前端渲染
summary: 背景在 前端渲染模式 和 asset 渲染模式 章节讲到了基于 React 的前端渲染模式，但都依赖  egg-view-react-ssr 插件，那如何基于已有 egg 模板引擎 (egg-view-nunjucks 或 egg-view-ejs) + Webpack 完全自定义前端方案呢？...
coverImage: null
createTime: 2019-10-08T07:11:39.000Z 
upateTime: 2019-10-08T07:11:39.000Z
wordCount: 652
layout: doc
---

## 背景

在 [前端渲染模式](https://easy-team.github.io/egg-react/web) 和 [asset 渲染模式](https://easy-team.github.io/egg-react/web) 章节讲到了基于 React 的前端渲染模式，但都依赖  [egg-view-react-ssr](https://github.com/easy-team/egg-view-react-ssr) 插件，那如何基于已有 egg 模板引擎 ([egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 或 [egg-view-ejs](https://github.com/eggjs/egg-view-ejs)) + Webpack 完全自定义前端方案呢？


## 关键问题

- 本地开发 Webpack 与 Egg 集成，可以直接使用 [egg-webpack](https://easy-team.github.io/blog/wumyiw)， 该插件可以独立使用, 当然你可以实现。
- 通过 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 或 [egg-view-ejs](https://github.com/eggjs/egg-view-ejs) 插件进行数据绑定
- 通过 `html-webpack-plugin`  插件生成 HTML 文件，并自动注入 JS/CSS 依赖
- 本地开发时，需要通过 `write-file-webpack-plugin`  插件把 Webpack HTML 文件写到本地。Webpack 默认是在内存里面，无法直接读取。


## 如何实现

> 这里以 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 为例，其它模板引擎类似。


- 安装 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 插件依赖

`npm install egg-view-nunjucks --save` <br />`npm install egg-webpack --save-dev`

```javascript
// ${root}/package.json
{
   "dependencies": {
     "egg-webpack": "^4.0.0",
     "egg-view-nunjucks": "^2.2.0",
   }
}
```

- 开启 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 插件配置<br />

```javascript
// ${root}/config/plugin.local.js
exports.webpack = {
  enable: true,
  package: 'egg-webpack',
};

// ${root}/config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
```

- 配置 layout.tpl  模板<br />

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
  <!-- html-webpack-plugin 自动注入 css -->
</head>
<body>
  <div id='app'></div>
  <script type="text/javascript">
    window.__INITIAL_STATE__ = {{  }};
  </script>
  <!-- html-webpack-plugin 自动注入 js -->
</body>
</html>
```

- 配置默认渲染引擎

```javascript
// ${root}/config/local.js
module.exports = app => {
  const exports = {};

  exports.webpack = {
    webpackConfigList: require('@easy-team/easywebpack-react').getWebpackConfig()
  };
  
  return exports;
}

// ${root}/config/default.js
module.exports = app => {
  const exports = {};

  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    },
  };
  return exports;
}
```

- render默认调用，使用 nunjucks 模板引擎<br />

```javascript
const egg = require('egg');
module.exports = class AppController extends egg.Controller {
  async home(ctx) {
    await ctx.render('app.tpl', { title: 'HTML渲染' });
  }
}
```

- webpack.config.js 配置 
> 该配置基于 easywebpack 配置，如果要用原生 webpack 请参考：[https://easy-team.github.io/blog/wumyiw](https://easy-team.github.io/blog/wumyiw)


```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  egg: true,
  target: 'web',
  entry: {
    app: 'app/web/page/app/app.js'
  },
  plugins: [
     new HtmlWebpackPlugin({
      chunks: ['runtime','common', 'app'],
      filename: '../view/app.tpl',
      template: './app/web/view/layout.tpl'
    }),
    new HtmlWebpackPlugin({
      chunks: ['runtime','common', 'test'],
      filename: '../view/test.tpl',
      template: './app/web/view/layout.tpl'
    }),
  ]
};
```


## 依赖插件

- [egg-webpack](https://easy-team.github.io/blog/wumyiw)
- [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 
- [write-file-webpack-plugin](https://github.com/gajus/write-file-webpack-plugin)
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)


## 骨架项目

[https://github.com/easy-team/egg-react-webpack-boilerplate/tree/feature/green/html](https://github.com/easy-team/egg-react-webpack-boilerplate/tree/feature/green/html)




  