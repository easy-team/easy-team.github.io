
---
id: 685681
space: egg-vue
slug: about
url: https://easy-team.github.io/egg-vue/about
title: 相关问题
summary: 常见问题 issue 汇总服务端 SEO 设置问题 文件打包部署问题Server Side Render 时，$mount节点重新渲染问题see issue：https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/125a...
coverImage: null
createTime: 2019-07-27T06:07:04.000Z 
upateTime: 2019-10-10T10:42:49.000Z
wordCount: 349
layout: doc
---

## 常见问题 issue 汇总

- [服务端 SEO 设置问题 ](https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/120)
- [文件打包部署问题](https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/122)

## 

## Server Side Render 时，$mount节点重新渲染问题

see issue：[https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/125](https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/125)

```javascript
app.$mount('app');

改为

const root = document.getElementById('app');
const hydrate = root.childNodes.length > 0;
app.$mount(root, hydrate);
```



## 自定义静态资源路径

在 Egg + Vue/React 解决方案中, Webpack publicPath 使用的是默认 `publicPath: '/public/'` 配置。

如果要修复默认的 publicPath，比如要修改 `/static/`，需要修改两个地方：


#### 首先版本要求

- easywebpack: ^3.5.1

- egg-webpack: ^3.2.5



#### 配置修改

- Webpack `webpack.config.js` 配置添加 `publicPath` 配置覆盖默认配置


```javascript
// ${app_root}/webpack.config.js
 module.exports = {
    .....
    publicPath: '/static/' 
  };
```

- Egg 配置 `config.default.js` 添加静态资源


```javascript
// ${app_root}/config/config.local.js
 exports.static = {
    prefix: '/static/',
    dir: path.join(app.baseDir, 'public')
  };
```

- 修改默认静态资源代理问题


```javascript
// ${app_root}/config/config.local.js
 exports.webpack = {
    proxy: {
      match:/\/static\//
    }
 };
```

see [https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/80](https://github.com/easy-team/egg-vue-webpack-boilerplate/issues/80)


## 禁用自动打开浏览器

```javascript
// ${app_root}/config/config.local.js
exports.webpack = {
  browser: false
};
```

通过 [egg-webpack](https://github.com/hubcarl/egg-webpack) 实现该功能，详细可以看插件具体文档。



## 自定义浏览器地址

```javascript
// ${app_root}/config/config.local.js
exports.webpack = {
  browser: 'http://localhost:7001'
};
```

通过 [egg-webpack](https://github.com/hubcarl/egg-webpack) 实现该功能，详细可以看插件具体文档。



## document is not defined

> ReferenceError: document is not defined


[https://zhuanlan.zhihu.com/p/36233639](https://zhuanlan.zhihu.com/p/36233639)


## 其它问题

[https://yuque.com/easy-team/easywebpack/problem](https://yuque.com/easy-team/easywebpack/problem)


  