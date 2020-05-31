
---
id: 3618119
space: egg-react
slug: lib
url: /egg-react/lib
title: Script公共包
summary: 在实际业务开发过程中，如果有多个项目都用同样的基础包，我们可以公共基础包单独打成独立的 Script 包，然后各项目通过 Script 引入，这样的好处就是能够提高构建速度，同时因多个项目都引用同一份静态资源，这样就能够重复利用浏览器缓存。构建 react，react-dom 公共包编写公共包...
coverImage: null
createTime: 2019-12-15T13:37:00.000Z 
upateTime: 2019-12-15T13:37:01.000Z
wordCount: 478
layout: doc
---

在实际业务开发过程中，如果有多个项目都用同样的基础包，我们可以公共基础包单独打成独立的 Script 包，然后各项目通过 Script 引入，这样的好处就是能够提高构建速度，同时因多个项目都引用同一份静态资源，这样就能够重复利用浏览器缓存。



## 构建 react，react-dom 公共包


### 编写公共包代码

> ${root}/src/react-lib.js


```javascript
import React from 'react';
import ReactDOM from 'react-dom';

export {
  React,
  ReactDOM
}
```


#### Webpack 构建公共包

通过 [easywebpack-js](https://github.com/easy-team/easywebpack-js/) 可以快速实现公共包构建打包。

> ${root}/webpack.config.js


```javascript
module.exports = {
  framework: 'js',
  entry: {
    'react-core-lib-1.0.0': 'scr/react-lib.js'
  },
  output: {
    library: "ReactCoreLib" 
  }
}
```


### 项目 webpack.config.js 配置

> ${root}/webpack.config.js


- 前端渲染非 SSR 模式只需要如下配置

```javascript
module.exports = {
  externals: {
    'react': 'ReactCoreLib.React',
    'react-dom': 'ReactCoreLib.ReactDOM'
  },
}
```

- SSR 模式 externals 只能在 web 模式生效

```javascript
module.exports = {
  ......
  plugins:[
    {
      copy: [{ from: 'app/web/asset/lib', to: 'lib' }] // 直接 Script 方式引入 React 包
    }
  ],
  customize(webpackConfig) {
    // Node Render 时不能 externals script lib
    if (webpackConfig.target === 'web') {
      webpackConfig.externals.push({ 
        react: 'ReactCoreLib.React',
        'react-dom': 'ReactCoreLib.ReactDOM'
      });
    }
    return webpackConfig;
  }
};
```


### 项目引入 Script 链接

```javascript
import React, { Component } from 'react';
import HeaderComponet from './header';
export default class Layout extends Component {
  render() {
    if(EASY_ENV_IS_NODE) {
      return <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
          <meta name="keywords" content={this.props.keywords}></meta>
          <meta name="description" content={this.props.description}></meta>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
          <script src="/public/lib/react-core-lib-1.0.0.js"></script>
        </head>
        <body><HeaderComponet></HeaderComponet><div id="app">{this.props.children}</div></body>
      </html>;
    }
    return this.props.children;
  }
}
```


相关 issue：[https://github.com/easy-team/egg-react-webpack-boilerplate/issues/47](https://github.com/easy-team/egg-react-webpack-boilerplate/issues/47)

  