
---
id: 685579
space: easywebpack
slug: cdn
url: /easywebpack/cdn
title: CDN 构建
summary: 基本配置easywebpack 提供了 cdn 配置节点, 只需要配置 cdn 地址即可(cdn地址会覆盖publicPath地址).配置如下:easywebpack3 配置后 dev，test， prod 模式都会生效, 一般通过变量控制 cdn 节点的配置// ${app_root}/webpack.config.js module.exports = {   ......   cdn:UPLOAD_CDN ? { url: &#x27;http://xxx.cdn.com/public/&#x2...
coverImage: null
createTime: 2018-09-05T07:16:29.000Z 
upateTime: 2019-05-19T05:52:27.000Z
wordCount: 433
layout: doc
---

### 基本配置

`easywebpack` 提供了 cdn 配置节点, 只需要配置 cdn 地址即可(cdn地址会覆盖publicPath地址).配置如下:

- easywebpack3 配置后 dev，test， prod 模式都会生效, 一般通过变量控制 cdn 节点的配置


```javascript
// ${app_root}/webpack.config.js
module.exports = {
  ......
  cdn:UPLOAD_CDN ? { url: 'http://xxx.cdn.com/public/' }: {},
  done(){
    // upload static file to cdn: http://xxx.cdn.com
  }
}
```

- easywebpack4 配置后只有 test， prod 模式都会生效,  所以无需通过环境变量控制


```javascript
// ${app_root}/webpack.config.js
module.exports = {
  ......
  cdn:'http://xxx.cdn.com',
  done(){
    // upload static file to cdn: http://xxx.cdn.com
  }
}
```


### 实战配置

**注意**：实际项目具体做法一般是只有上线部署才使用 cdn 生效. 我们可以在 Webpack 构建完成后, 在 `done` 函数里面上传静态资源到 `cdn.url` 地址.<br />我们可以通过添加环境变量的方式决定是否需要上传CDN, 从而控制本地开发构建不上传CDN, 只有在CI构建(CI环境里面定义UPLOAD_CDN环境变量)时才触发CDN流程.

```javascript
// ${app_root}/webpack.config.js
const UPLOAD_CDN = process.env.UPLOAD_CDN;
module.exports = {
  ......
  cdn: 'http://xxx.cdn.com/public/',
  done(){
    // upload static file to cdn: http://xxx.cdn.com
    if(UPLOAD_CDN){
      
    }
  }
}
```


### 打包配置


#### `packjson.json` 本地打正式包配置

在 `npm run build` 打正式包的时候, 开启 UPLOAD_CDN 开关

```javascript
{
   "script" :{
      "build:dev": "cross-env easy build dev",
      "build:test": "cross-env easy build test",
      "build": "cross-env UPLOAD_CDN=true easy build prod"
   }
 }
```


#### `packjson.json` CI 打正式包配置

这里无需配置 UPLOAD_CDN 参数， 请在 CI 系统配置 UPLOAD_CDN 环境变量

```javascript
{
   "script" :{
      "build:dev": "easy build dev",
      "build:test": "easy build test",
      "build": "easy build prod"
   }
 }
```


  