
---
id: 809509
space: egg-vue
slug: web
url: https://easy-team.github.io/egg-vue/web
title: 前端渲染模式
summary: 浏览器渲染模式指的是Node 端只会根据包含html, head, body节点信息的 layout 文件输出骨架内容， 页面的实际内容交给浏览器去渲染。调用 egg-view-vue-ssr 的 renderClient 方法实现客户端浏览器渲染在使用上面, 客户端浏览器渲染模式只需要把 render 改成 renderClient。 正常情况下, 能进行 render 运行的, renderClient  方式也能正常运行。Webpack 配置优化，提高构建速度在 ${root}/webpack...
coverImage: null
createTime: 2018-09-06T07:09:43.000Z 
upateTime: 2019-07-24T10:05:33.000Z
wordCount: 646
layout: doc
---
**浏览器渲染模式**指的是Node 端只会根据包含html, head, body节点信息的 layout 文件输出骨架内容， 页面的实际内容交给浏览器去渲染。


### 调用 `egg-view-vue-ssr` 的 `renderClient` 方法实现客户端浏览器渲染

在使用上面, 客户端浏览器渲染模式只需要把 `render` 改成 `renderClient`。 正常情况下, 能进行 `render` 运行的, <br />`renderClient`  方式也能正常运行。



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

```javascript
const Model = require('../../mocks/article/list');

module.exports = app => {
  return class HomeController extends app.Controller {
    async client() {
      const { ctx } = this;
      const locals = { 
        seo: { keyword: 'Egg,Vue,SSR', description: 'Egg Vue SSR Development'}, 
        data: Model.getPage(1, 10) 
      };
      await ctx.renderClient('home/home.js', locals);
    }
  };
};
```


### layout 配置文件
使用 `renderClient` 进行渲染时, 需要存在 `${app_root}/app/view/layout.html` layout文件,  只是一个简单的 HTML 骨架，具体内容由前端进行渲染。 同时支持对 `layout` 进行模板 Vue 数据绑定。 在进行前端渲染时, Egg Node 会把 CSS/JS 依赖注入 layout 中。**默认 renderClient**``**  会对 layout  HTML 模板进行 Vue 编译； 如果不想对 layout  HTML  进行 Vue 编译，可以在第三个参数中传入 { viewEngine: null }**

- layout html 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Egg + Vue + Webpack</title>
  <meta name="keywords" content="{{seo.keywords}}">
  <meta name="description" content="{{seo.description}}">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

- 自定义配置 layout 文件路径，这里的配置是一个全局的 layout 的配置


```javascript
//${root}/config/config.default.js
exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      basedir: path.join(app.baseDir, 'app/view')
    }
 };
```

- 个性化配置 layout 文件


  <br />使用 renderClient 的第三个扩展参数配置 layout,  优先级高于全局 layout 配置

```javascript
module.exports = app => {
  return class HomeController extends app.Controller {
    async client() {
      const { ctx } = this;
      await ctx.renderClient('home/home.js', {}, 
        { layout: path.join(app.baseDir, 'app/web/page/home/layout.html'),});
    }
  };
};
```



  