
---
id: 685678
space: egg-vue
slug: pwa
url: https://easy-team.github.io/egg-vue/pwa
title: Service Worker
summary: Egg + Vue/React SSR 使用 service workereasywebpack 默认生成的 service-worker.js 是在 ${app_root}/public/service-worker.js这里. 这样 service-worker.js 访问路径是 http://127.0.0.1:7001/public/service-worker.js。将 service worker 文件注册为 /public/service-worker.js，那么，service...
coverImage: null
createTime: 2018-06-09T05:32:42.000Z 
upateTime: 2019-06-17T11:09:32.000Z
wordCount: 354
layout: doc
---

## Egg + Vue/React SSR 使用 service worker

`easywebpack` 默认生成的 `service-worker.js` 是在 `${app_root}/public/service-worker.js`这里. 这样 `service-worker.js` 访问路径是 [http://127.0.0.1:7001/public/service-worker.js。](http://127.0.0.1:7001/public/service-worker.js%E3%80%82)

将 service worker 文件注册为 `/public/service-worker.js`，那么，service worker 只能收到 /public/ 路径下的 `fetch` 事件（例如： /public/page1/, /public/page2/), 但我们的页面访问是没有 /public/ 这一层路径的。正常情况下, `service-worker.js` 文件被放在这个域的根目录下，和网站同源。这个 service worker 将会收到这个域下的所有 fetch 事件。

这个问题可以通过 [egg-serviceworker](https://github.com/hubcarl/egg-serviceworker) 解决。通过 `egg-serviceworker` 插件, 我们可以这样访问 [http://127.0.0.1:7001/service-worker.js](http://127.0.0.1:7001/service-worker.js)

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
serviceWorkerRegister.default.register('service-worker.js');
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
npm run build
npm run start
```


  