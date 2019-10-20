
---
id: 2212407
space: blog
slug: lcbfwb
url: /blog/lcbfwb
title: Vue SSR 组件加载
summary: Node 端渲染提示 window/document 没有定义业务场景首先来看一个简单的 Vue 组件
coverImage: null
createTime: 2019-07-26T10:31:23.000Z 
upateTime: 2019-07-31T08:33:14.000Z
wordCount: 808
layout: doc
---

## Node 端渲染提示 window/document 没有定义


### 业务场景

- 首先来看一个简单的 Vue 组件`test.vue`


```html
<template>
  <div>
    <h2>clientHeight: {{ clientHeight }} px </h2>
  </div>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
      }
    },
    computed :{
      clientHeight() {
        return document.body.clientHeight;
      }
    },
    mounted(){
    }
  }
</script>
```

- 上面 `test.vue`  组件通过  Vue computed 属性 clientHeight 直接获取 document 的文档高度，这段代码在前端渲染是不会报错的，也能拿到正确的值。但如果把这个组件放到 SSR(Server Side Render) 模式下,  就会报如下错误：


```javascript
ReferenceError: document is not defined
```


### 解决方案

- 通过 typeof  判断是否是存在 document 对象， 如果存在则执行后面代码。 这种方式虽然能解决问题,  但在 Webpack 构建压缩时,  不会执行的代码不会被剔除，也会打包到 js 文件中去, 因为这个是在运行期才知道结果的，  所以在 Webpack 构建方案中，不建议使用 typeof 方式判断。而是使用 Webpack 提供的 webpack.DefinePlugin 插件定义常量解决。


```javascript
clientHeight() {
  return typeof document === 'object' ? document.body.clientHeight : '';
}
```

- 使用 Webpack 提供的 webpack.DefinePlugin 插件定义常量解决。 这里直接使用 [easywebpack](https://github.com/hubcarl/easywebpack) 内置的全局 Webpack 常量 [EASY_ENV_IS_BROWSER](http://hubcarl.github.io/easywebpack/webpack/env) 进行判断。 这样在构建压缩期间,  如果是 Node 模式构建,  EASY_ENV_IS_BROWSER 会被替换为 false，如果是 Browser 模式构建,  EASY_ENV_IS_BROWSER 会被替换为 true，最后构建后代码也就是变成了 true 或者 false 的常量。 因为这个是构建期间执行的，压缩插件剔除永远不会被执行的代码,  也就是 dead_code


```javascript
clientHeight() {
  return EASY_ENV_IS_BROWSER ? document.body.clientHeight : '';
}
```



### NPM Vue 组件 SSR 支持

针对上面这种自己写的代码，我们可以通过这种方式解决，因为可以直接修改。但如果我们引入的一个 npm Vue 插件想进行SSR渲染, 但这个插件里面使用了 window/docment 等浏览器对象, 并没有对 SSR 模式进行兼容，这个时候该如何解决呢？<br />一般我们通过 `通过 v-if 来决定是否渲染该组件` 和 `Vue 只在前端挂载组件解决问题` 可以解决。


#### 通过 v-if 来决定是否渲染该组件

```html
<template>
  <div v-if="isBrowser">
    <Loading></Loading>
  </div>
</template>

<script type="text/babel">
  export default {
    componets:{
     Loading: () =>import('vue-loading');
    }
    data(){
      return {
        isBrowser: EASY_ENV_IS_BROWSER
      }
    },
    mounted(){
    }
  }
</script>
```


#### Vue 只在前端挂载组件解决问题

```html
<template>
  <div>
    <Loading></Loading>
  </div>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
      }
    },
    beforeMount() {
      // 只会在浏览器执行  
      this.$options.components.Loading = () =>import('vue-loading');
    },
    mounted(){
    }
  }
</script>
```

`loading` 组件因为没有注册, 在 SSR 模式,  `<Loading></Loading>` 会被原样输出到 HTML 中，不会报错且不能被浏览器识别,  在显示时不会有内容。当 SSR 直出 HTML 后，浏览器模式中执行 `beforeMount`   挂载组件, 从而达到解决服务端渲染报错的问题。

具体例子参考：[https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/app/web/page/dynamic/dynamic.vue](https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/app/web/page/dynamic/dynamic.vue)

  