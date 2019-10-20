
---
id: 685581
space: easywebpack
slug: pwd
url: /easywebpack/pwd
title: PWA 支持
summary: service-worker 生成easywebpack 3.7.0 内置支持 service-worker.js 生成, 该功能是通过 service-worker-precache-webpack-plugin实现的。你可以通过如下方式开启， 默认禁用。//${app_root}/webpack.config.js module.exports = {   plugins:{     serviceworker:true   } } 开启后, easywebpack 会自动生成 service...
coverImage: null
createTime: 2018-06-09T03:09:47.000Z 
upateTime: 2019-05-22T02:25:02.000Z
wordCount: 654
layout: doc
---

## service-worker 生成

`easywebpack` 3.7.0 内置支持 service-worker.js 生成, 该功能是通过 [service-worker-precache-webpack-plugin](https://github.com/hubcarl/service-worker-precache-webpack-plugin)实现的。你可以通过如下方式开启， 默认禁用。

```javascript
//${app_root}/webpack.config.js
module.exports = {
  plugins:{
    serviceworker:true
  }
}
```

开启后, `easywebpack` 会自动生成 `service-worker.js` 文件和 `sw-mapping.json` 文件。

- service-worker.js: 自动根据 Webpack manifest 生成静态资源映射到 service-worker.js 文件中

- sw-mapping.json: 文件是解决 service-worker.js 缓存问题生成的映射文件。当静态资源变化时, `service-worker.[hash].js` 的 hash 会自动变化, 从而达到自动更新 `service-worker.js` 文件。


```javascript
// sw-manifest.js
{
  "config": {
    "localPublicPath": "/public/",
    "publicPath": "/public/"
  },
  "service-worker.js": "service-worker.4434ddf3.js"
}
```


## service-worker 注册

可以通过 [service-worker-register](https://github.com/hubcarl/service-worker-register) 自动注册 service-worker.js 文件。

```javascript
const serviceWorkerRegister = require('service-worker-register');
// The service-worker.js name will get really url address by sw-mapping.json file
serviceWorkerRegister.default.register('service-worker.js');
```

```javascript
// 或者异步加载
import('service-worker-register').then(sw =>{
  sw.default.register('service-worker.js');
});
```

> 注意：因开发环境构建的文件在内存中，sw-precache 获取不到文件列表，目前开发环境是不会注册的。



## egg + vue/react ssr 使用 service worker

`easywebpack` 默认生成的 `service-worker.js` 是在 `${app_root}/public/service-worker.js`这里. 这样 `service-worker.js` 访问路径是 [http://127.0.0.1:7001/public/service-worker.js。](http://127.0.0.1:7001/public/service-worker.js%E3%80%82)

将 service worker 文件注册为 `/public/service-worker.js`，那么，service worker 只能收到 /public/ 路径下的 `fetch` 事件（例如： /public/page1/, /public/page2/), 但我们的页面访问是没有 /public/ 这一层路径的。正常情况下, `service-worker.js` 文件被放在这个域的根目录下，和网站同源。这个 service worker 将会收到这个域下的所有 fetch 事件。

这个问题可以通过 [egg-serviceworker](https://github.com/hubcarl/egg-serviceworker) 解决。<br />通过 `egg-serviceworker` 插件, 我们可以这样访问 [http://127.0.0.1:7001/service-worker.js](http://127.0.0.1:7001/service-worker.js)

- 启用 `egg-serviceworker`


```javascript
// ${app_root}/config/plugin.js
exports.serviceworker = {
  enable: true,
  package: 'egg-serviceworker'
};
```

- 注册 `service worker`


```javascript
const serviceWorkerRegister = require('service-worker-register');
// The service-worker.js name will get really url address by sw-mapping.json file
serviceWorkerRegister.register('service-worker.js');
```

- 自动打开 localhost 域名地址


配置本地开发启动自动打开 localhost 域名地址

```javascript
// ${app_root}/config/config.local.js
exports.webpack = {
  browser: 'http://localhost:7001'
};
```

- 本地测试


> 注意：因开发环境构建的文件在内存中，sw-precache 获取不到文件列表，目前开发环境是不会注册的。可以通过 发布模式 在本地查看 `service worker` 注册情况。


```bash
npm run build:test
npm run start:test
```

或

```bash
npm run build:prod
npm run start:prod
```


  