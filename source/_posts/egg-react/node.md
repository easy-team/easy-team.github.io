
---
id: 814103
space: egg-react
slug: node
url: /egg-react/node
title: 服务端渲染模式
summary: 目前 egg-view-react-ssr 支持 服务端渲染模式 和 前端渲染模式 两种渲染模式Egg + React 服务端 SSR 渲染模式这里服务端渲染指的是编写的 React 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器。MVVM 服务端渲染相比前端渲染，支...
coverImage: null
createTime: 2019-10-03T14:12:56.000Z 
upateTime: 2019-10-03T14:12:56.000Z
wordCount: 524
layout: doc
---
目前 [egg-view-react-ssr](https://github.com/easy-team/egg-view-react-ssr) 支持 **服务端渲染模式** 和 **前端渲染模式** 两种渲染模式


### Egg + React 服务端 SSR 渲染模式

这里服务端渲染指的是编写的 React 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器。MVVM 服务端渲染相比前端渲染，支持SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。 同时 MVVM 数据驱动方式有着更快的开发效率。总体来说，MVVM 框架的服务端渲染技术比较适合有一定交互性，且对SEO，首屏速度有要求的业务应用。当然, 如果想用于不属于该类型的项目(比如各种后台管理系统)也是可以的, 就当纯粹的玩一玩 React SSR 开发。


#### 调用 `egg-view-react-ssr` 的 `render` 方法实现服务端渲染

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

- `home/home.js` 是由 Webpack(`target:node`) 把 React 变成 Node 服务端运行的运行文件, 默认在 `${app_root}/app/view` 目录下。

- `Model.getPage(1, 10)` 表示在 Node 服务端获取到的业务数据，传给 React 组件在 Node 端进行模板编译为 HTML

- Node 编译 HTML之后会根据 `config/manifest.json` 文件把 css, js 资源依赖注入到 HTML

- 当服务队渲染失败时, `egg-view-react-ssr` 默认开启进行客户端渲染模式。当线上流量过大时, 可以根据一定策略一部分用户服务端渲染, 一部分用户前端渲染, 减少服务端压力。

- 本地开发默认禁用缓存, 线上运行模式默认开启缓存。

- 如果是 SPA SSR 应用, 一般是在 React 里面提供组件的 fetch 方法由 Node 进行 fetch 数据调用, 然后把数据放入 store, 而不是在 Node 端进行获取, 具体见[egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate/) SPA-SSR 功能实现



  