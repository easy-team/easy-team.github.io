
---
id: 3315280
space: egg-vue
slug: data
url: /egg-vue/data
title: 数据请求
summary: 服务端渲染 Node 层直接获取数据在 Egg 项目如果使用模板引擎规范时是通过 render 方法进行模板渲染，render 的第一个参数模板路径，第二个参数时模板渲染数据. 如如下调用方式：async index(ctx) {     // 获取数据，可以是从数据库，后端 Http 接口 ...
coverImage: null
createTime: 2019-11-25T14:45:20.000Z 
upateTime: 2019-11-25T14:45:21.000Z
wordCount: 1965
layout: doc
---

## 服务端渲染 Node 层直接获取数据

在 Egg 项目如果使用模板引擎规范时是通过 render 方法进行模板渲染，render 的第一个参数模板路径，第二个参数时模板渲染数据. 如如下调用方式：<br />

```javascript
async index(ctx) {
    // 获取数据，可以是从数据库，后端 Http 接口 等形式
    const list = ctx.service.article.getArtilceList();
    // 对模板进行渲染，这里的 index.js 是 vue 文件通过 Webpack 构建的 JSBundle 文件
    await ctx.render('index.js', { list });
}
```

从上面的例子可以看出，这种使用方式是非常典型的也容易理解的模板渲染方式。在实际业务开发时，对于常规的页面渲染也建议使用这种方式获取数据，然后进行页面渲染。Node 获取数据后，在 Vue 文件里面就可以通过 this.list 的方式拿到 Node 获取的数据，然后就可以进行 Vue 模板文件数据绑定了。<br />
<br />在这里有个高阶用法，可以直接把 ctx 等 Node 对象传递到第二个参数里面,  这个时候你在模板里面就直接拿到 ctx 这些对象。 但这个时候就需要自己处理好 SSR 渲染时导致的 hydrate 问题，因为前端hydrate时并没有 ctx 对象。<br /> <br />
```javascript
async index(ctx) {
    // 获取数据，可以是从数据库，后端 Http 接口 等形式
    const list = ctx.service.article.getArtilceList();
    // 对模板进行渲染，这里的 index.js 是 vue 文件通过 Webpack 构建的 JSBundle 文件
    await ctx.render('index.js', { ctx, list });
}
```

如果把 ctx 对象传递到 Vue 模板文件里面，你可以通过在 Vue 模板文件进行 ctx.service.article.getArtilceList() 调用， 也就是在前端代码模板里面进行 Node 调用。<br />



## 服务端渲染 asyncData 方式获取数据

在 Vue 单页面 SSR 时涉及数据的请求方式，Node 层获取数据方式可以继续使用，但当路由切换时(页面直接刷新)，Node 层就需要根据路由获取不同页面的数据，同时还要考虑前端路由切换的情况，这个时候路由是不会走 Node 层路由，而是直接进行的前端路由，这个时候也要考虑数据的请求方式。<br />
<br />基于以上使用的优雅问题，这里提供一种 asyncData 获取数据的方式解决单页面 SSR 刷新不走 SSR 问题。 Node 不直接获取数据，获取数据的代码直接写到前端代码里面。这里需要解决如下两个问题：<br />


### 前端路由匹配 asyncData 调用

这里根据路由切换 url 获取指定的路由 componet 组件，然后检查是否有 aysncData，如果有就进行调用。调用之后，数据会放到 Vuex 的 store 里面。

```javascript
return new Promise((resolve, reject) => {
        router.onReady(() => {
          // url 为当前请求路由，可以通过服务端传递到前端页面
          const matchedComponents = router.getMatchedComponents(url);
          if (!matchedComponents) {
            return reject({ code: '404' });
          }
          return Promise.all(
            matchedComponents.map(component => {
              // 关键代码
              if (component.methods && component.methods.asyncData) {
                return component.methods.asyncData(store);
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
```


### Vue 模板定义 asyncData 方法

前端通过 Vuex 进行数据管理，把数据统一放到 store 里面，前端通过 this.$store.state 方式可以获取数据，Node 和 前端都可以获取到。

```javascript
<script type="text/babel">
  export default{
    computed: {
      isLoading(){
       return false;
      },
      articleList() {
        return this.$store.state.articleList;
      }
    },
    methods: {
      asyncData ({ state, dispatch, commit }) {
        return dispatch('FETCH_ARTICLE_LIST')
      }
    }
  }
</script>
```
 



## 前端 asyncData 数据统一调用

在服务端 asyncData 调用时，可以解决单页面 SSR 刷新问题，那直接在前端切换路由时因不走服务端路由，那数据如何处理？<br />
<br />在 Vue 单页面实现时，通常都会使用 Vue-Router，这个时候可以借助 Vue-Router 提供 afterEach 钩子进行统一数据请求，可以直接调用 Vue 模板定义的 asyncData 方法。代码如下：

```javascript
const options = this.create(window.__INITIAL_STATE__);
const { router, store } = options;
router.beforeEach((route, redirec, next) => {
  next();
});
router.afterEach((route, redirec) => {
  if (route.matched && route.matched.length) {
    const asyncData = route.matched[0].components.default.asyncData;
    if (asyncData) {
      asyncData(store);
    }
  }
});
```


最后贴上可以用的完整代码，请根据实际需要进行修改, 实际可运行例子见 [https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/spa](https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/spa) 

- Vue 页面初始化统一封装

```javascript
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import './vue/filter';
import './vue/directive';

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
    const { router, store } = options;
    router.beforeEach((route, redirec, next) => {
      next();
    });
    router.afterEach((route, redirec) => {
      console.log('>>afterEach', route);
      if (route.matched && route.matched.length) {
        const asyncData = route.matched[0].components.default.asyncData;
        if (asyncData) {
          asyncData(store);
        }
      }
    });
    const app = new Vue(options);
    const root = document.getElementById('app');
    const hydrate = root.childNodes.length > 0;
    app.$mount('#app', hydrate);
    return app;
  }

  server() {
    return context => {
      const options = this.create(context.state);
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
              if (component.asyncData) {
                return component.asyncData(store);
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


- 页面入口代码

```javascript
// index.js
'use strict';
import App from 'framework/app.js';
import index from './index.vue';
import createStore from './store';
import createRouter from './router';

const options = { base: '/' };

export default new App({
  index,
  options,
  createStore,
  createRouter,
}).bootstrap();


```

- 前端 router / store 定义

```javascript
// store/index.js

'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default function createStore(initState = {}) {

  const state = {
    articleList: [],
    article: {},
    ...initState
  };

  return new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  });
}

// router/index.js

import Vue from 'vue';

import VueRouter from 'vue-router';

import ListView from './list';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component: ListView
      },
      {
        path: '/list',
        component: ListView
      },
      {
        path: '/detail/:id',
        component: () => import('./detail')
      }
    ]
  });
}



```



## 直接 Vue 模板文件进行渲染

那有没有办法直接渲染 Vue 文件，无需自己写入口代码实现？ 答案可以。 Egg + Vue 工程化方案提供了 [https://github.com/easy-team/vue-entry-loader](https://github.com/easy-team/vue-entry-loader)  结合 Webpack 可以无需编写以上入口实现，具体使用请见：[https://www.yuque.com/easy-team/egg-vue/qpeiow](https://www.yuque.com/easy-team/egg-vue/qpeiow)

  