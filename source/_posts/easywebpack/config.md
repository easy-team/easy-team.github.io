
---
id: 685541
space: easywebpack
slug: config
url: /easywebpack/config
title: webpack.config.js
summary: webpack.config.js
coverImage: null
createTime: 2019-06-28T15:07:00.000Z 
upateTime: 2019-06-28T15:07:00.000Z
wordCount: 515
layout: doc
---

## webpack.config.js

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  // framework 支持 `js`,`html`, `vue`, `react`, `weex`
  framework: 'html' 
  entry:{ 
    index: 'src/app.js'
  },
  template: 'src/view/layout.html' 
  loaders:{
    // 默认可以不用配置, 添加或扩展请见配置loaders章节  
  },
  pugins:{
    // 默认可以不用配置, 添加或扩展请见配置loaders章节  
  },
  customize(webpackConfig){ // 非必须
    // 此处 webpackConfig 为原生的 webpackconfig, 你可以进行加工处理
    return webpackConfig;
  }
  done(){
    // Webpack 编译完成回调, 默认可以不用配置,当你需要编译完成做某某事情(比如上传cdn)才需要配置
  }
}
```

**这样一份简单的配置具备以下能力**

- 支持 `easy start` 方式启动 Webpack dev server

- 支持 easy build dev/test/prod 三种环境构建

- 支持纯静态 HTML Webpack构建

- 支持 es6, babel, sass, postcss, eslint 能力

- 支持开发期热更新能力,同时 Webpack 构建文件不落地磁盘

- 支持编译结果UI展示和访问

- 支持图片压缩, js压缩, css压缩, extract能力

- 通过 `easy build` 即可构建发布模式



## 配置编写

目前这里我们仅仅讲解通过 `easywebpack-cli` 的配置编写和构建, 直接基于 `easywebpakc-vue`, `easywebpakc-react`, `easywebpakc-html` ,`easywebpakc-weex`解决方案的配置请见解决方案对应章节介绍.

**要使用 `easywebpack-cli` 进行项目构建和开发, 只需要简单的四步**

- 全局安装 [easywebpack-cli](https://github.com/hubcarl/easywebpack-cli)


```bash
npm install -g easywebpack-cli
```

- 编写一份 `easywebpack-cli` 配置文件 `webpack.config.js` 放到要构建项目根目录


开始之前, 我们首先来看看一份最简单的基于easywebpack构建的 `webpack.config.js` 配置

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  framework: 'html'
  entry: {
    index: 'src/app.js'
  }
  template: 'src/view/layout.html'  
}
```

- 添加 `${app_root}/.babelrc` 文件


```bash
{
  "presets": [["env",{ "modules": false }]],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-object-assign"
  ],
  "comments": false
}
```

- 添加 `${app_root}/postcss.config.js` 文件.  easywebapck 4.8.0 已内置如下默认配置，无需配置


```bash
'use strict';
module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['iOS >= 7', 'Android >= 4.0'] })
  ]
};
```


## 编译运行

- 开发


```bash
easy dev
```

- 编译


```bash
easy build
```


  