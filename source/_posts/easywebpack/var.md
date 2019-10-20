
---
id: 685570
space: easywebpack
slug: var
url: /easywebpack/var
title: 全局常量
summary: easywebpack 内置全局常量easywebpack 通过 webpack.DefinePlugin webpack 插件内置了如下全局常量, 方便业务使用。process.env.NODE_ENV首先会获取用户 process.env.NODE_ENV 值, 如果获取不到，当构建 pr...
coverImage: null
createTime: 2019-06-28T11:34:47.000Z 
upateTime: 2019-06-28T11:34:47.000Z
wordCount: 270
layout: doc
---

## easywebpack 内置全局常量

easywebpack 通过 `webpack.DefinePlugin` webpack 插件内置了如下全局常量, 方便业务使用。


### process.env.NODE_ENV

首先会获取用户 `process.env.NODE_ENV` 值, 如果获取不到，当构建 `prod` 模式时设置为 `production`, 否则为 `development`。 该设置不会影响原有的 `process.env.NODE_ENV` 系统环境参数。


### EASY_ENV_IS_DEV

是否是开发模式(dev)构建


### EASY_ENV_IS_TEST

是否是测试环境模式(test)构建


### EASY_ENV_IS_PROD

是否是正式环境模式(prod)构建


### EASY_ENV_IS_BROWSER

是否是浏览器运行构建模式


## EASY_ENV_IS_NODE

是否是Node运行构建模式, 也就是 server side render


### EASY_ENV_PUBLIC_PATH

webpack 构建的publicPath


### EASY_ENV_HOST_URL

本机启动编译服务域名，例如： [http://100.192.168.1:9000](http://100.192.168.1:9000)


## 实战技巧

> 模板里面直接可以使用这些静态变量，构建期间，Webpack 会替换为实际的值


```javascript
export default EASY_ENV_IS_NODE ?  serverRender : clientRender;

if (EASY_ENV_IS_DEV){
  return 'http://dev.com';
} else if (EASY_ENV_IS_TEST){
  return 'http://test.com';
} else if (EASY_ENV_IS_PROD){
  return 'http://prod.com';
}

```


  