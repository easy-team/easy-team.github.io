
---
id: 947188
space: egg-react
slug: antd
url: /egg-react/antd
title: AntD 配置
summary: 项目示例： https://github.com/easy-team/egg-react-webpack-boilerplate/tree/antd-theme按需加载依赖配置
coverImage: null
createTime: 2018-11-06T06:00:08.000Z 
upateTime: 2019-05-27T06:11:57.000Z
wordCount: 368
layout: doc
keywords: egg,egg react ssr,egg react server side render, ant ssr
description: Egg React Server Side Render, Egg React SSR, Egg AntD SSR, Egg React 服务端渲染
---
项目示例： [https://github.com/easy-team/egg-react-webpack-boilerplate/tree/antd-theme](https://github.com/easy-team/egg-react-webpack-boilerplate/tree/antd-theme)


## 按需加载


#### 依赖配置

```javascript
// ${root}/package.json
{
 "devDependencies": {
   "babel-plugin-import": "^1.0.0"
 }
}
```


#### 代码编写

```javascript
import { Button } from 'antd';
```

官方文档： [https://ant.design/docs/react/getting-started-cn](https://ant.design/docs/react/getting-started-cn)


## 主题定制

> 主题定制需要开启 webpack less 编译 



#### 依赖配置

```javascript
// ${root}/package.json
{
 "devDependencies": {
   "less": "^2.7.2",
   "less-loader": "^4.1.0"
 }
}
```


#### 构建配置

```javascript
//${root}/webpack.config.js
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);
module.exports = {
  loaders: {
    babel: {
      include: [resolve('app/web'), resolve('node_modules')]
    },
    less: {
      include: [resolve('app/web'), resolve('node_modules')],
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': 'red',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        }
      }
    }
  }
};
```


#### .babelrc 配置

> 如果是 SSR 模式，需要按如下 env 配置；前端渲染模式可以不用 env 方式。 BABEL_ENV 使用，请参考 [/egg-react/babel](/egg-react/babel)


```javascript
{
  "env":{
    "node": {
      "presets": [
        "react",
        ["env", {
          "modules": false,
          "targets": {
            "node": "current"
          }
        }]
      ],
      "plugins": [
        "syntax-dynamic-import",
        "transform-object-rest-spread"
      ]
    },
    "web": {
      "presets": [
        "react",
        ["env", {
          "modules": false,
          "targets": {
            "browsers": ["last 2 versions", "safari >= 7"]
          }
        }]
      ],
      "plugins": [
        "react-hot-loader/babel",
        "transform-object-assign",
        "syntax-dynamic-import",
        "transform-object-rest-spread",
        ["import", {
          "libraryName": "antd",
          "libraryDirectory": "lib",
          "style": true
        }]
      ]
    }
  },
  
  "comments": false
}
```

官方文档：[https://ant.design/docs/react/customize-theme-cn](https://ant.design/docs/react/customize-theme-cn)

  