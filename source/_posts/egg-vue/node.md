
---
id: 810030
space: egg-vue
slug: node
url: /egg-vue/node
title: 服务端渲染模式
summary: Egg + Vue 服务端 Node 渲染模式目前 egg-view-vue-ssr 支持 服务端渲染模式 和 前端渲染模式 两种渲染模式这里服务端渲染指的是编写的 Vue 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器。MVVM 服务端渲染相比前端渲染，支持SEO，...
coverImage: null
createTime: 2019-07-27T05:49:44.000Z 
upateTime: 2019-08-19T14:06:57.000Z
wordCount: 816
layout: doc
---

### Egg + Vue 服务端 Node 渲染模式

目前 [egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr) 支持 **服务端渲染模式** 和 **前端渲染模式** 两种渲染模式

这里服务端渲染指的是编写的 Vue 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器。MVVM 服务端渲染相比前端渲染，支持SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。 同时 MVVM 数据驱动方式有着更快的开发效率。总体来说，MVVM 框架的服务端渲染技术比较适合有一定交互性，且对SEO，首屏速度有要求的业务应用。当然, 如果想用于不属于该类型的项目(比如各种后台管理系统)也是可以的, 就当纯粹的玩一玩 Vue SSR 开发。


#### 调用 `egg-view-vue-ssr` 的 `render` 或 `renderToHtml`  方法实现服务端渲染

```javascript
// controller/home.js
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.render('home/home.js', Model.getPage(1, 10));
    }
    async index2() {
      const { ctx } = this;
      const html = await ctx.renderToHtml('home/home.js', Model.getPage(1, 10));
      // 这里可以处理对渲染后的 HTML 进行处理
      ctx.body = html;
    }
  };
};
```


- `home/home.js` 是由 Webpack(`target:node`) 把 Vue 变成 Node 服务端运行的运行文件, 默认在 `${app_root}/app/view` 目录下。

- `Model.getPage(1, 10)` 表示在 Node 服务端获取到的业务数据，传给 Vue 组件在 Node 端进行模板编译为 HTML

- Node 编译 HTML之后会根据 `config/manifest.json` 文件把 css, js 资源依赖注入到 HTML

- 当服务队渲染失败时, `egg-view-vue-ssr` 默认开启进行客户端渲染模式。当线上流量过大时, 可以根据一定策略一部分用户服务端渲染, 一部分用户前端渲染, 减少服务端压力。

- 本地开发默认禁用缓存, 线上运行模式默认开启缓存。

- 如果是 SPA SSR 应用, 一般是在 Vue 里面提供组件的 fetch 方法由 Node 进行 fetch 数据调用, 然后把数据放入 store, 而不是在 Node 端进行获取, 具体见[egg-vue-webpack-boilerplate](https://github.com/easy-team/egg-vue-webpack-boilerplate/blob/master/app/web/page/app/app.js) 功能实现。 **如果是单页面服务端渲染，一定注意 store 的创建时机，否则 store 全局共享，内存泄漏，请见下面 38 行代码。**


```javascript
import Vue from 'vue';
import { sync } from 'vuex-router-sync';

export default class App {
  constructor(config) {
    this.config = config;
  }

  bootstrap() {
    if (EASY_ENV_IS_NODE) {
      return this.server();
    }
    return this.client();
  }

  create(initState) {
    const { index, options, createStore, createRouter } = this.config;
    const store = createStore(initState);
    const router = createRouter();
    sync(store, router);
    return {
      ...index,
      ...options,
      router,
      store
    };
  }

  client() {
    Vue.prototype.$http = require('axios');
    const options = this.create(window.__INITIAL_STATE__);
    const app = new Vue(options);
    const root = document.getElementById('app');
    const hydrate = root.childNodes.length > 0;
    app.$mount(root, hydrate);
    return app;
  }

  server() {
    return context => {
      // store 和 router 一定要在这里面创建，否则 store 全局共享，内存泄漏
      const options = this.create();
      const { store, router } = options;
      router.push(context.state.url);
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents();
          if (!matchedComponents) {
            return reject({ code: '404' });
          }
          return Promise.all(
            matchedComponents.map(component => {
              if (component.preFetch) {
                return component.preFetch(store);
              }
              return null;
            })
          ).then(() => {
            context.state = {
              ...store.state,
              ...context.state
            };
            return resolve(new Vue(options));
          });
        });
      });
    };
  }
}
```


### Egg + Vue 客户端浏览器渲染模式

[/egg-vue/wekmet](/egg-vue/wekmet)

  