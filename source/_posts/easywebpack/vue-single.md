
---
id: 685628
space: easywebpack
slug: vue-single
url: /easywebpack/vue-single
title: 单页面举例
summary: easywebpack-vue 构建单页面应用Vue + Vuex + Vue-Router 基本实现router/index.js 实现// router/index.js import Vue from &#x27;vue&#x27;; import VueRouter from &#x27;vue-router&#x27;; import ListView from &#x27;./list&#x27;; import DetailView from &#x27;./detail&#x2...
coverImage: null
createTime: 2018-06-09T03:47:42.000Z 
upateTime: 2018-06-09T03:47:42.000Z
wordCount: 787
layout: doc
---

## easywebpack-vue 构建单页面应用


### Vue + Vuex + Vue-Router 基本实现


#### `router/index.js` 实现

```javascript
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import ListView from './list';
import DetailView from './detail';

Vue.use(VueRouter);

const router = new VueRouter({
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
      component: DetailView
    }
  ]
});

export default router;
```


#### `store` 实现

- actions


```javascript
// store/actions
import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Article from 'mocks/article/list';
Vue.use(Vuex);

const host = 'http://127.0.0.1:9000';

const actions = {

  FETCH_ARTICLE_LIST: ({ commit, dispatch, state }) => {
    if (!state.articleList.length) {
      return Promise.resolve(Article.getPage(1, 10)).then(data => {
        commit(Type.SET_ARTICLE_LIST, data.list);
      });
    }
    return Promise.resolve();
  },

  FETCH_ARTICLE_DETAIL: ({ commit, dispatch, state }, { id }) => {
    if (state.article.id !== id) {
      return axios.get(`${host}/app/api/article/${id}`)
        .then(response => {
          const data = response.data;
          commit(Type.SET_ARTICLE_DETAIL, data);
        });
    }
    return Promise.resolve();
  }
};

export default actions;
```

- getters


```javascript
// store/getters
const getters = {

};

export default getters;
```

- mutations


```javascript
// store/mutations-type
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';
export const SET_ARTICLE_DETAIL = 'SET_ARTICLE_DETAIL';
```

```javascript
// store/mutations
import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL
} from './mutations-type';

const mutations = {
  [SET_ARTICLE_LIST](state, items) {
    state.articleList = items;
  },
  [SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  }
};
export default mutations;
```

- store 入口


```javascript
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  articleList: [],
  article: {}
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
```


#### `app.vue` 实现

```html
<template>
  <app-layout>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </app-layout>
</template>
<style lang="scss">

</style>
<script type="text/babel">
  export default {
    computed: {

    },
    mounted(){

    }
  }
</script>
```


#### `app.js` entry 入口实现

```javascript
// src/page/app.js
import Vue from 'vue';
import axios from 'axios';
import { sync } from 'vuex-router-sync';
import store from 'store';
import router from 'router';
import Entry from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';

Vue.component(Layout.name, Layout);

sync(store, router);

export default function() {
  Vue.prototype.$http = ;
  const app = new Vue({
    ...Entry,
    router,
    store
  });
  app.$mount('#app');
};
```


### 已经存在的单页面应用

如果你有一个已经存在的单页面应用, 可以很快用 `easywebpack` 工程化方案进行构建, 只需要以下几个步骤步骤：

- 安装依赖


```bash
npm install easywebpack-cli -g
npm install easywebpack-vue --save-dev
```

- `${app_root}/.babelrc` 配置文件


```javascript
{
  "presets": [["env",{ "modules": false }]],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-object-assign"
  ],
  "comments": false
}
```

- `${app_root}/postcss.config.js` 配置文件


```javascript
'use strict';
module.exports = {
  plugins: [
    // equire('autoprefixer')
  ]
};
```

- 编写 `webpack.config.js`


```javascript
//${app_root}/webpack.config.js
'use strict';
module.exports = {
  type: 'client',
  framework: 'vue',
  entry: {
    app: 'src/page/app.js'
  },
  template: 'src/view/layout.html'
}
```

- 运行


```bash
easy start
```

- 编译


```bash
easy build prod
```


### 基于 `easywebpack-cli` 初始化一个单页面应用

通过 `easywebpack-cli` 命令行工具 `easy init` 命令初始化一个单页面应用, 选择项目类型: Client Reander + Vue

- 初始化应用


```
>create Client Render project boilerplate for Vue/React
>create Vue Client Render project boilerplate
```

- 安装依赖


```bash
npm install
```

- 运行


```bash
easy start
```

- 编译


```bash
easy build prod
```


**你可以直接通过 easywebpack-cli 命令行初始化 Vue 单页面应用。**


  