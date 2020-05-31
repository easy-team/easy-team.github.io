
---
id: 880830
space: egg-vue
slug: config
url: /egg-vue/config
title: 配置说明
summary: webpack.config.jseasywebpack@4.8.0 开始支持，因为有了默认配置，所以最新的骨架项目中，webpack.config.js 文件为非必须配置。使用 node-glob 遍历文件。下面配置会自动遍历 app/web/page  目录的所有 .vue 文件作为 en...
coverImage: null
createTime: 2019-02-11T02:55:39.000Z 
upateTime: 2019-06-21T09:19:15.000Z
wordCount: 264
layout: doc
---

## webpack.config.js

easywebpack@4.8.0 开始支持，因为有了默认配置，所以最新的骨架项目中，webpack.config.js 文件为非必须配置。

使用 [node-glob](https://github.com/isaacs/node-glob) 遍历文件。下面配置会自动遍历 `app/web/page`  目录的所有 .vue 文件作为 entry 入口，排除 `component|components|view|views` 目录下的文件。 这个是 [egg vue ssr ](https://github.com/hubcarl/egg-vue-webpack-boilerplate) 项目默认配置,  同时使用 [vue-entry-loader](https://github.com/hubcarl/vue-entry-loader)  作为模板入口。 **注意：只有 entry 文件是 .vue 文件(非.js）时，才会自动使用 **[vue-entry-loader](https://github.com/hubcarl/vue-entry-loader)** 模板。**

-  **统一使用 .vue 文件作为 entry 入口(easywebpack 默认配置)**


```javascript
// webpack.config.js
module.exports = {
  // 注意 只有 entry 文件是 .vue 文件(非.js）时，才会自动使用 vue-entry-loader模板
  entry: 'app/web/page/**!(component|components|view|views)/*.vue'
}
```

- **js  和 .vue 文件 entry 混合配置**


```bash
module.exports = {
  entry: {
    app: 'app/web/page/app/index.js',   // js 文件需要自己实现 vue mouted 逻辑
    list: 'app/web/page/list/index.vue' // 自动使用 vue-entry-loader模板
  }
};
```

- 自定义 entry 代码模板


[/easywebpack/entry](/easywebpack/entry)


  