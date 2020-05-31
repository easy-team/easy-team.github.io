
---
id: 1050061
space: egg-vue
slug: asset
url: /egg-vue/asset
title: asset 渲染模式
summary: 背景在 前端渲染模式 章节讲到了基于 Vue 的一体化的前端渲染模式，好处是不需要借助第三方模板引擎且无需关注静态资源注入问题，但有两个小的功能限制：layout 模板数据绑定能力较弱资源注入不能自己定义，比如 async， crossorigin 等配置针对上面问题 egg-view-vue...
coverImage: null
createTime: 2019-07-26T12:18:09.000Z 
upateTime: 2019-07-26T12:18:09.000Z
wordCount: 737
layout: doc
---

## 背景

在 [前端渲染模式](/egg-vue/web) 章节讲到了基于 Vue 的一体化的前端渲染模式，好处是不需要借助第三方模板引擎且无需关注静态资源注入问题，但有两个小的功能限制：

- layout 模板数据绑定能力较弱

- 资源注入不能自己定义，比如 async， crossorigin 等配置


针对上面问题[ egg-view-vue-ssr ](https://github.com/easy-team/egg-view-vue-ssr)(>=3.2.0)扩展 [renderAsset](https://github.com/easy-team/egg-view-vue-ssr/blob/master/app/extend/context.js#L8) 方法支持基于 asset 的**前端渲染模式**，方便对 layout 进行定制和数据绑定。<br />


## 使用

- renderAsset 模式默认使用 egg-view-nunjucks 模板引擎对 layout 进行数据模板编译，你需要在项目 package.json 中同时安装 [egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr) 和 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 插件依赖。


```javascript
// ${root}/package.json
{
   "dependencies": {
     "egg-view-nunjucks": "^2.2.0",
     "egg-view-vue-ssr": "^3.2.0"
   }
}
```

- 开启 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) 插件配置


```javascript
// ${root}/config/plugin.js
exports.vuessr = {
  enable: true,
  package: 'egg-view-vue-ssr'
};
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
```

- 配置 layout.html  模板


> 模板默认路径：${root}/app/view/layout.html， 你可以通过[ egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr) 的 layout 属性配置指定模板位置。


   **渲染上下文暴露全局 asset 对象，参数如下：**

**asset.js** { Array } 页面依赖的静态 JS 资源 URL 列表， 来自 `config/manifest.json` 具体见 [资源依赖](/easywebpack/deps)<br />**asset.css** { Array } 页面依赖的静态 JS 资源 URL 列表，来自`config/manifest.json`具体见 [资源依赖](/easywebpack/deps)<br />**asset.state** { Object } 页面渲染原始数据，用于 MV 框架初始化 state

以下就是基于 nunjucks 的语法的 layout 模板配置, 你可以根据指定渲染引擎编写 layout 文件。

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

- renderAsset  默认调用，使用 nunjucks 模板引擎


```javascript
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async home(ctx) {
    await ctx.renderAsset('admin.js', { title: 'egg-vue-asset' });
  }
}
```

- renderAsset 自定义模板引擎（支持两种方式, 注意要安装指定模板引擎)


> 1. 可以通过 [egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr) 的 viewEngine  配置全局渲染引擎

> 2. 通过 renderAsset 的第三个参数 viewEngine 配置对应渲染引擎，只在当前渲染生效

> 

```javascript
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async home(ctx) {
    // 使用 ejs 引擎，注意项目请安装 https://github.com/eggjs/egg-view-ejs 依赖
    await ctx.renderAsset('admin.js', { title: 'egg-vue-asset' }, { viewEngine: 'ejs' });
  }
}
```


## 骨架项目

[https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/asset](https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/asset)



## 参考实现

[https://github.com/eggjs/egg-view-assets](https://github.com/eggjs/egg-view-assets)


  