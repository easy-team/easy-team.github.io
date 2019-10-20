
---
id: 685669
space: egg-vue
slug: render
url: /egg-vue/render
title: 渲染模式
summary: Egg + Vue 渲染模式目前 egg-view-vue-ssr 支持 服务端渲染模式 和 前端渲染模式 两种渲染模式Egg + Vue 服务端 Node 渲染模式这里服务端渲染指的是编写的 Vue 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器。MVVM 服务端渲染相比前端渲染，支持SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。 同时 MVVM 数据驱动方式有着更快的开发效率。总体来说，MVVM 框架的服务端渲染技术比较适合有一定交互性，且对SEO...
coverImage: null
createTime: 2018-06-09T05:22:23.000Z 
upateTime: 2019-06-25T11:47:59.000Z
wordCount: 933
layout: doc
---

## Egg + Vue 渲染模式

目前 [egg-view-vue-ssr](https://github.com/hubcarl/egg-view-vue-ssr) 支持 **服务端渲染模式** 和 **前端渲染模式** 两种渲染模式


### Egg + Vue 服务端 Node 渲染模式

这里服务端渲染指的是编写的 Vue 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器。MVVM 服务端渲染相比前端渲染，支持SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。 同时 MVVM 数据驱动方式有着更快的开发效率。总体来说，MVVM 框架的服务端渲染技术比较适合有一定交互性，且对SEO，首屏速度有要求的业务应用。当然, 如果想用于不属于该类型的项目(比如各种后台管理系统)也是可以的, 就当纯粹的玩一玩 Vue SSR 开发。


#### 调用 `egg-view-vue-ssr` 的 `render` 方法实现服务端渲染

- controller 调用 `render` 方法


```javascript
// controller/home.js
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.render('home/home.js', Model.getPage(1, 10));
    }
  };
};
```

- `home/home.js` 是由 Webpack(`targe:node`) 把 Vue 变成 Node 服务端运行的运行文件, 默认在 `${app_root}/app/view` 目录下。

- `Model.getPage(1, 10)` 表示在 Node 服务端获取到的业务数据，传给 Vue 组件在 Node 端进行模板编译为 HTML

- Node 编译 HTML之后会根据 `config/manifest.json` 文件把 css, js 资源依赖注入到 HTML

- 当服务队渲染失败时, `egg-view-vue-ssr` 默认开启进行客户端渲染模式。当线上流量过大时, 可以根据一定策略一部分用户服务端渲染, 一部分用户前端渲染, 减少服务端压力。

- 本地开发默认禁用缓存, 线上运行模式默认开启缓存。

- 如果是 SPA SSR 应用, 一般是在 Vue 里面提供组件的 fetch 方法由 Node 进行 fetch 数据调用, 然后把数据放入 store, 而不是在 Node 端进行获取, 具体见[egg-vue-webpack-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/app/web/page/app/app.js) 功能实现


```javascript
export default function render(options) {
  if (options.store && options.router) {
    return context => {
      options.router.push(context.state.url);
      const matchedComponents = options.router.getMatchedComponents();
      if (!matchedComponents) {
        return Promise.reject({ code: '404' });
      }
      return Promise.all(
        matchedComponents.map(component => {
          if (component.preFetch) {
            return component.preFetch(options.store);
          }
          return null;
        })
      ).then(() => {
        context.state = Object.assign(options.store.state, context.state);
        return new Vue(options);
      });
    };
  }
  return context => {
    const VueApp = Vue.extend(options);
    const app = new VueApp({ data: context.state });
    return new Promise(resolve => {
      resolve(app);
    });
  };
}
```


### Egg + Vue 客户端浏览器渲染模式


#### 调用 `egg-view-vue-ssr` 的 `renderClient` 方法实现客户端浏览器渲染

在使用上面, 客户端浏览器渲染模式只需要把 `render` 改成 `renderClient`。 正常情况下, 能进行 `render` 运行的, `renderClient`  方式也能正常运行。

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

- 使用 `renderClient` 进行渲染时, 需要存在 `${app_root}/app/view/layout.html` layout文件, 只是一个简单的 HTML 骨架，具体内容由前端进行渲染。 同时支持对 `layout` 进行模板 Vue 数据绑定。


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


  