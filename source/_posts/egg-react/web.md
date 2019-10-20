
---
id: 814102
space: egg-react
slug: web
url: /egg-react/web
title: 前端渲染模式
summary: Egg + React 客户端浏览器渲染模式调用 egg-view-react-ssr 的 renderClient 方法实现客户端浏览器渲染renderClient 表示 Node 服务端端只渲染一个包含 HTML，header，body 的一个简单 HTML 页面骨架， 具体页面内容由 R...
coverImage: null
createTime: 2019-10-15T12:03:53.000Z 
upateTime: 2019-10-15T12:03:53.000Z
wordCount: 524
layout: doc
---

### Egg + React 客户端浏览器渲染模式


#### 调用 `egg-view-react-ssr` 的 `renderClient` 方法实现客户端浏览器渲染

**renderClient 表示 Node 服务端端只渲染一个包含 HTML，header，body 的一个简单 HTML 页面骨架， 具体页面内容由 React 在浏览器进行渲染，你可以在浏览器右键源代码看看HTML代码就明白了**

在使用上面, 客户端浏览器渲染模式只需要把 `render` 改成 `renderClient`。 正常情况下, 能进行 `render` 运行的, `renderClient`  方式也能正常运行。


### Webpack 配置优化，提高构建速度

在 `${root}/webpack.config.js`  文件添加 target: 'web'  配置选项，这样只会构建浏览器运行的 JSBundle 文件，无需构建 Node 运行的 JSBundle 文件(SSR 模式会构建两份结果，一份给 Node 运行，一份给浏览器运行)。

```javascript
//${root}/webpack.config.js
module.exports = {
  target: 'web'
  ...
}
```


### controller 调用 `renderClient` 方法

- controller 调用 `renderClient` 方法


```javascript
const Model = require('../../mocks/article/list');

module.exports = app => {
  return class HomeController extends app.Controller {
    async client() {
      const { ctx } = this;
      await ctx.renderClient('home/home.js', Model.getPage(1, 10));
    }
  };
};
```

- 前端渲染配置 HTML layout 模板文件，这里的配置是一个全局的 layout 的配置<br />

```javascript
//${root}/config/config.default.js
exports.reactssr = {
  layout: path.join(app.baseDir, 'app/web/view/layout.html')
};
```

```html
<!--${root}/app/web/view/layout.html--> 
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Egg + React</title>
  <meta name="keywords">
  <meta name="description">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</head>
<body>
  <div id="app"></div>
</body>
</html>
```


- 个性化配置 layout 文件


 <br />使用 renderClient 的第三个扩展参数配置 layout,  优先级高于全局 layout 配置

```javascript
module.exports = app => {
  return class HomeController extends app.Controller {
    async client() {
      const { ctx } = this;
      await ctx.renderClient('home/home.js', {}, 
        { layout: path.join(app.baseDir, 'app/web/page/home/layout.html')});
    }
  };
};
```


具体例子请见：[egg-react-webpack-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate) 运行后菜单 SPA-CSR 例子。


  