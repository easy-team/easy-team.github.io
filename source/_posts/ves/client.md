
---
id: 951107
space: ves
slug: client
url: /ves/client
title: Vue 前端开发
summary: 支持特性开发模式 Webpack 内存编译，热更新，DLL构建，Cache 和多进程编译支持服务端渲染和前端渲染模式页面入口说明：app/web/page 为页面入口参考：https://github.com/easy-team/ves-admin/blob/master/app/web/page/...
coverImage: null
createTime: 2018-11-07T07:58:17.000Z 
upateTime: 2019-06-06T02:00:22.000Z
wordCount: 665
layout: doc
---

## 支持特性

- 开发模式 Webpack 内存编译，热更新，DLL构建，Cache 和多进程编译

- 支持服务端渲染和前端渲染模式



## 页面入口

> 说明：app/web/page 为页面入口
> 参考：[https://github.com/easy-team/ves-admin/blob/master/app/web/page/admin/home/index.ts](https://github.com/easy-team/ves-admin/blob/master/app/web/page/admin/home/index.ts)


```typescript
import App from 'framework/app'; // 见下面 framework 介绍
import createStore from '../../store/index';
import createRouter from './router/index';
import entry from './view/home/index.vue';
export default new App({ entry, createStore, createRouter }).bootstrap();
```


## Framework

> 说明：当前 app.ts 可以作为参考，自己根据需求可以修改, 后续考虑发布为独立的 npm 插件
> 参考：[https://github.com/easy-team/ves-admin/blob/master/app/web/framework/app.ts](https://github.com/easy-team/ves-admin/blob/master/app/web/framework/app.ts) 


```typescript
// ${root}/app/web/framework/app.ts

import Vue from 'vue';
import { sync } from 'vuex-router-sync';

export default class App {
  config: any;
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
    const { entry, createStore, createRouter } = this.config;
    const store = createStore(initState);
    const router = createRouter();
    sync(store, router);
    return {
      router,
      store,
      render: h => { // not use ...entry, why ?
        return h(entry);
      },
    };
  }

  fetch(vm): Promise<any> {
    const { store, router } = vm;
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents) {
      return Promise.reject('No Match Component');
    }
    return Promise.all(
      matchedComponents.map((component: any) => {
        const options = component.options;
        // 自动 fetch
        if (options && options.methods && options.methods.fetchApi) {
          return options.methods.fetchApi.call(component, { store, router, route: router.currentRoute });
        }
        return null;
      })
    );
  }

  client() {
    Vue.prototype.$http = require('axios');
    const vm = this.create(window.__INITIAL_STATE__);
    // 自动 fetch
    vm.router.afterEach(() => {
      this.fetch(vm);
    });
    const app = new Vue(vm);
    app.$mount('#app');
    return app;
  }

  server() {
    return context => {
      // store 实例必须以函数返回且在 render context 内部创建 ，否则容易造成单例问题
      const vm = this.create(context.state);
      const { store, router } = vm;
      router.push(context.state.url);
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          this.fetch(vm).then(() => {
            context.state = store.state;
            return resolve(new Vue(vm));
          });
        });
      });
    };
  }
}
```



## Vuex 使用

> 说明：**store 实例必须以函数返回且在 render context 内部创建 ，否则容易造成单例问题**
> 参考：[https://github.com/easy-team/ves-admin/blob/master/app/web/page/store/index.ts](https://github.com/easy-team/ves-admin/blob/master/app/web/page/store/index.ts)


```typescript
import Vue from 'vue';
import Vuex from 'vuex';
import RootState from './state';
import Admin from './modules/admin';

Vue.use(Vuex);

// 这里必须已函数的方式返回 store 实例，否则容易造成单例问题
export default function createStore(initState: any = {}) {
  const { title, url, origin, locale, csrf, admin } = initState;
  const state = { title, url, origin, locale, csrf };
  return new Vuex.Store<RootState>({
    state,
    modules: {
      admin: new Admin(admin)
    }
  });
}
```




## TypeScript

> Vue TypeScript 支持建议使用 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 和 [vuex-class](https://github.com/ktsn/vuex-class) 插件


- 类型声明


```typescript
// ${root}/app/web/typings/global.d.ts
declare var window: Window;
declare var EASY_ENV_IS_NODE: boolean;

interface Window {
  __INITIAL_STATE__: any;
}

// ${root}/app/web/typings/vue-shims.d.ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

- [https://github.com/kaorun343/vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

- [https://github.com/ktsn/vuex-class](https://github.com/ktsn/vuex-class)




## 参考示例

- [https://github.com/easy-team/ves-admin](https://github.com/easy-team/ves-admin)



  