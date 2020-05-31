
---
id: 685571
space: easywebpack
slug: deps
url: /easywebpack/deps
title: 资源依赖
summary: easywebpack 静态资源 manifest 文件easywebpack 3.5.0 新增自定义插件 webpack-manifest-resource-plugin 替换 webpack-manifest-plugin。 之前的 manifest 依赖关系是在 Egg 运行期间解析的，...
coverImage: null
createTime: 2019-06-28T15:13:16.000Z 
upateTime: 2019-06-28T15:13:16.000Z
wordCount: 262
layout: doc
---

## easywebpack 静态资源 manifest 文件

easywebpack 3.5.0 新增自定义插件 webpack-manifest-resource-plugin 替换 webpack-manifest-plugin。 之前的 manifest 依赖关系是在 Egg 运行期间解析的，现在改为构建期组装好资源依赖关系。新生成的 manifest 可以在纯前端项目使用，比如 PWA 场景。

- webpack-manifest-plugin


```javascript
// ${app_root}/config/manifest.json
{
    "app/app.js": "/public/js/app/app.2cf6dfd1.js",
    "app/app.css": "/public/css/app/app.cda9bc64.css",
    "common.js": "/public/js/common.b59f7169.js",
    "common.css": "/public/css/common.cda9bc64.css"
}
```

- webpack-manifest-resource-plugin


```javascript
// ${app_root}/config/manifest.json
{
    "app/app.js": "/public/js/app/app.2cf6dfd1.js",
    "app/app.css": "/public/css/app/app.cda9bc64.css",
    "common.js": "/public/js/common.b59f7169.js",
    "common.css": "/public/css/common.cda9bc64.css",
    "deps": {
        "app/app.js": {
        "js": [
            "/public/js/vendor.337ab787.js",
            "/public/js/common.b59f7169.js",
            "/public/js/app/app.2cf6dfd1.js"
        ],
        "css": [
            "/public/css/common.cda9bc64.css",
            "/public/css/app/app.cda9bc64.css"
        ]
    }
}
```


- manifest CDN 支持，请见 [/easywebpack/cdn](/easywebpack/cdn)



  