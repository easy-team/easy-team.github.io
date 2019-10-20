
---
id: 685675
space: egg-vue
slug: seo
url: https://easy-team.github.io/egg-vue/seo
title: SEO实现
summary: Egg + Vue SSR SEO 实现MVVM 服务端渲染相比前端渲染，支持SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。在 Egg + Vue 的方案里面, HTML head 里面 meta 信息也作为 Vue 服务端渲染的一部分, 和普通的数据绑定没有什么差别。在实现上面, 考虑到页面有统一的 HTML, header, footer, body 骨架, 可以结合 Vue 的 slot 封装成一个统一的 layout 组件。一. layout...
coverImage: null
createTime: 2018-06-09T05:30:35.000Z 
upateTime: 2019-05-29T09:25:28.000Z
wordCount: 878
layout: doc
---

## Egg + Vue SSR SEO 实现

MVVM 服务端渲染相比前端渲染，支持SEO，更快的首屏渲染，相比传统的模板引擎，更好的组件化，前后端模板共用。在 Egg + Vue 的方案里面, HTML head 里面 meta 信息也作为 Vue 服务端渲染的一部分, 和普通的数据绑定没有什么差别。

在实现上面, 考虑到页面有统一的 HTML, header, footer, body 骨架, 可以结合 Vue 的 `slot` 封装成一个统一的 layout 组件。


### 一. layout 组件实现

```javascript
// component/layout/index.js 组件
import MainLayout from './main';

const content = '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>';

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{title}}</title>
  <meta name="keywords" :content="vTitle">
  <meta name="description" :content="vKeywords">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</head>
<body :class="baseClass">
  <div id="app">${content}</div>
</body>
</html>`;

export default {
  name: 'Layout',
  props: [ 'title', 'description', 'keywords' ],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || 'Egg + Vue';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || 'egg, vue, webpack, server side render';
    },
    vDescription() {
      return this.$root.description || this.description || 'egg-vue-webpack server side render';
    },
    baseClass() {
      return this.$root.baseClass;
    }
  },
  template: EASY_ENV_IS_NODE ? template : content
};
```


#### layout 组件依赖的 `main.vue` 实现

```javascript
// component/layout/main.vue 组件
<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <LayoutContent>
      <div slot="content">
        <slot name="main"></slot>
      </div>
    </LayoutContent>
  </div>
</template>
<style lang="css">
  @import "../../../asset/css/global.css";
</style>
<script type="text/babel">
  import LayoutHeader from './header';
  import LayoutContent from './content';
  export default{
    components: {
      LayoutHeader,
      LayoutContent
    }
  }
</script>
```


#### MainLayout 组件依赖的 `header.vue` 实现

```javascript
// component/layout/header.vue 组件
<template>
  <header class="header">
    <div class="container"><h1>
      <a href="/" class="router-link-active">Egg + Vue</a></h1>
      <ul class="nav">
        <li class="nav-item"><a href="/">Server-Render</a></li>
        <li class="nav-item"><a href="/client">Client-Render</a></li>
      </ul>
    </div>
  </header>
</template>
<style>
  @import "./header.css";
</style>
<script type="text/babel">
  export default{
    data(){
      return {
        selectedMenu : '/'
      }
    },
    computed:{
    },
    mounted(){
     
    }
  }
</script>
```


#### MainLayout 组件依赖的 `content.vue` 实现

```javascript
// component/layout/content.vue 组件
<template>
  <div class="main">
    <div class="page-container page-component">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style>
  @import "content.css";
</style>
<script type="text/babel">
  export default{
    name:'v-content',
    data(){
      return {

      }
    },
    components: {},
    mounted() {

    }
  }
</script>
```


### 二. layout 组件使用

- Layout 组件注册


```javascript
import Vue from 'vue';
import Layout from 'component/layout';
Vue.component(Layout.name, Layout);
```

- Layout 组件使用


写页面时, 直接在 template 顶层套上 layout 组件即可。 SEO 信息可以是静态, 也可以 Node 服务端传递过来进行数据绑定。

```html
// ${app_root}/app/web/page/home/index.vue
<template>
<Layout description="vue server side render" keywords="{{seo.keywords}}">
    <div class="container smart-container">

    </div>
  </Layout>
</template>
```


自己根据实际需要，可以扩展相关 layout 的 props 参数传递配置。

  