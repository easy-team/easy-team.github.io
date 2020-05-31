
---
id: 1231914
space: egg-vue
slug: qpeiow
url: /egg-vue/qpeiow
title: 入口实现
summary: 服务端渲染模式需要对同一份 vue 文件构建出两份 JSBundle 文件出来，一份给 Node 渲染使用，一份给浏览器渲染使用，但 Node 和浏览器文件初始化代码是不一样的，这就需要我们针对入口代码进行分别实现。这里提供三种实现方案，请根据项目需要选择合适的方案。方案一： 完全自定义入口代...
coverImage: null
createTime: 2019-03-01T08:51:38.000Z 
upateTime: 2019-05-20T00:21:38.000Z
wordCount: 1245
layout: doc
---
服务端渲染模式需要对同一份 vue 文件构建出两份 JSBundle 文件出来，一份给 Node 渲染使用，一份给浏览器渲染使用，但 Node 和浏览器文件初始化代码是不一样的，这就需要我们针对入口代码进行分别实现。这里提供三种实现方案，请根据项目需要选择合适的方案。


## 方案一： 完全自定义入口代码逻辑

> 这里仅提供代码基本实现，请根据项目实际情况进行修改。


- 编写 vue 服务端公共入口 `${app_root}/app/web/framework/app.js`

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
    const app = new Vue(options);
    app.$mount('#app');
    return app;
  }

  server() {
    return context => {
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
              if (component.methods && component.methods.fetchApi) {
                  return component.methods.fetchApi(store);
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

```

- 新建 `${app_root}/app/web/page/home/home.js`  webpack entry 入口文件

> 这种方式适合需要自定义实现入口代码的比较少页面入口项目，如果项目有多个单独页面，就需要编写下面类似的重复代码，但通过公共代码抽离，问题也不是太大，能满足所有自定义要求，这个完全交给项目自己去实现。


```javascript

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

详细实现请见：[https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/spa](https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/spa)



## 方案二： 自定义入口代码模板化

> easywebpack 提供了通过 配置 [entry.loader 实现入口代码模板化](/easywebpack/entry)，并且代码模板完全有项目自己实现. 项目只需要实现对应的 loader 即可。这里仅提供代码基本实现，请根据实际项目情况进行修改。


- 编写 webpack 服务端模式构建 loader 代码 `${app_root}/app/web/framework/vue/entry/server-loader.js`

```javascript
'use strict';
module.exports = function(source) {
  this.cacheable();
  return `
    import Vue from 'vue';
    import vm from '${this.resourcePath.replace(/\\/g, '\\\\')}';
    export default function(context) {
      const store = typeof vm.store === 'function' ? vm.store(context.state) : vm.store;
      const router = typeof vm.router === 'function' ? vm.router() : vm.router;
      if (store && router) {
        const sync = require('vuex-router-sync').sync;
        sync(store, router);
        router.push(context.state.url);
        return new Promise((resolve, reject) => {
          router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents) {
              return reject({ code: '404' });
            }
            return Promise.all(
              matchedComponents.map(component => {
                if (component.methods && component.methods.fetchApi) {
                  return component.methods.fetchApi(store);
                }
                return null;
              })
            ).then(() => {
              context.state = { ...store.state, ...context.state };
              const instanceOptions = {
                ...vm,
                store,
                router,
              };
              return resolve(new Vue(instanceOptions));
            });
          });
        });
      }
      const VueApp = Vue.extend(vm);
      const instanceOptions = {
        ...vm,
        data: context.state
      };
      return new VueApp(instanceOptions);
    };
  `;
};
```

- 编写 webpack 浏览器模式构建 loader 代码  `${app_root}/app/web/framework/vue/entry/client-loader.js`

```javascript
'use strict';
module.exports = function(source) {
  return `
    import Vue from 'vue';
    import vm from '${this.resourcePath.replace(/\\/g, '\\\\')}';
    const initState = window.__INITIAL_STATE__ || {};
    const context = { state: initState };
    const store = typeof vm.store === 'function' ? vm.store(initState) : vm.store;
    const router = typeof vm.router === 'function' ? vm.router() : vm.router;
    const data = typeof vm.data === 'function' ? vm.data() :  {};
    const options = store && router ? {
      ...vm, 
      store,
      router
    } : { 
      ...vm,
      ...{
        data() {
          return { ...initState, ...data};
        }
      } 
    };
    const app = new Vue(options);
    app.$mount('#app');
  `;
};
```

- Webpack entry loader 配置， 这样就不用写单独的 js 入口文件， vue  文件作为 entry 就可以直接构建出完整的 JSBundle 文件。easywebpack 直接根据 include 目录下的 vue 文件 和  entry loader 构建出完整的 JSBundle 文件。

```javascript
'use strict';
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: ['app/web/page'],
    exclude: ['app/web/page/[a-z]+/component', 'app/web/page/test'],
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    }
  }
 }

```

具体例子可以参考：[https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/multi](https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/feature/green/multi)



## 方案三： 使用框架内置初始化模板loader

> easywebpack@4.8.0 开始支持默认 entry  node-glob 配置模式。node-glob 模式会自动遍历 `app/web/page`  目录的所有 .vue 文件作为 entry 入口，排除 `component|components|view|views` 目录下的文件。 如果 entry 是已 .vue 文件，则使用 [vue-entry-loader ](https://github.com/hubcarl/vue-entry-loader) 作为模板入口。 
> 
> **注意：只有 entry 文件是 .vue 文件(非.js）时，才会自动使用 **vue-entry-loader** 模板。**


- **统一使用 .vue 文件作为 entry 入口**

```javascript
// webpack.config.js
module.exports = {
  // 注意 只有 entry 文件是 .vue 文件(非.js）时，才会自动使用 vue-entry-loader模板
  entry: 'app/web/page/**!(component|components|view|views)/*.vue'
}
```

- **js  和 .vue 文件 entry 混合配置**<br />

```bash
module.exports = {
  entry: {
    app: 'app/web/page/app/index.js', // js 文件需要自己实现初始化逻辑，这个时候可以结合方案一
    list: 'app/web/page/list/index.vue' // 自动使用 vue-entry-loader模板
  }
};
```



### entry 更多配置

[/easywebpack/entry](/easywebpack/entry)

  