
---
id: 3617828
space: easywebpack
slug: inline
url: /easywebpack/inline
title: 资源内联
summary: 在日常业务开发过程中，我们可能需要内联文本，JS，CSS到页面，这时我们可以 raw-loader webpack loader 实现。raw-loaderimport txt from 'raw-loader!./file.txt';Vue 内联 JavaScripttemplate 直接内...
coverImage: null
createTime: 2019-12-26T03:28:42.000Z 
upateTime: 2019-12-26T03:28:42.000Z
wordCount: 580
layout: doc
---

在日常业务开发过程中，我们可能需要内联文本，JS，CSS到页面，这时我们可以 [raw-loader](https://github.com/webpack-contrib/raw-loader) webpack loader 实现。


## raw-loader

```javascript
import txt from 'raw-loader!./file.txt';
```



## Vue 内联 JavaScript

- template 直接内联代码

```javascript
const vConsoleScript = `<script async src="//cdn.com/script/vConsole.min.js"></script>';  

<template v-html="vConsoleScript"></template>
```

- template 结合 raw-loader 内联脚本

```javascript
// inline.js
function inlineTest() {
  var name = 'easywebpack';
  var desc = 'easywebpack vue js inline';
  return name + '-' + desc;
}

// inline.vue
import inlineCode from 'raw-loader!./inline.js';

<template>
  <div>
     <template v-html="inlineScript"></template>
  	 <template v-html="inlineJSFileScript"></template>
  </div>
</template>

<script type="babel">
export default {
 computed: {
   inlineScript() {
     return '<script>console.log("inline js code");</script>';
   },
   inlineJSFileScript() {
     return `<script>${inlineCode}</script>`;
   }
  }
}
</script>
```



## React 内联 JavaScript

在日常业务开发过程中，我们可能需要内联文本，JS，CSS到页面，这时我们可以通过 webpack [raw-loader](https://github.com/webpack-contrib/raw-loader) 把文件转成字符串，为了防止 javaScript 被转义， 可以通过 dangerouslySetInnerHTML inline javaScript 代码。


```javascript
// inline.js
function inlineTest(a, b) {
  console.log('Egg React inline javascript');
  var name = 'Egg React';
  var title = 'Server Side Render';
  return name + '-' + title;
}

import React, { Component } from 'react';
import HeaderComponet from './header';
import inlineTest from 'raw-loader!./inline.js';
export default class Layout extends Component {
  
  render() {
    const inlineCode = `
      function inlineCodeTest() {
        console.log('React inline Code javascript');
        var name = 'React';
        var title = 'Inline Test';
        return name + '-' + title;
      }
    `;
    return <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
          <meta name="keywords" content={this.props.keywords}></meta>
          <meta name="description" content={this.props.description}></meta>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
          <script src="/public/lib/react-core-lib-1.0.0.min.js"></script>
          <script dangerouslySetInnerHTML={{__html: inlineCode }}></script>
          <script dangerouslySetInnerHTML={{__html: inlineTest }}></script>
          <script>inlineFileTest();inlineCodeTest();</script>
        </head>
        <body><div id="app"></div></body>
     </html>
  }
}
```



## Webpack  构建资源内联



### 指定 JS / Css 内联

```javascript
// webpack.config.js
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
module.exports = {
   // ....
   plugins:[
    {
      html: {
        inlineSource: /runtime(.[A-Za-z0-9]+)?.js$|index(.[A-Za-z0-9]+)?.css$/
      }
    },
    new HtmlWebpackInlineSourcePlugin()
  ]
}
```



### 全部资源内联

```javascript
// webpack.config.js
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
module.exports = {
   // ....
   plugins:[
    {
      html: {
        inlineSource: /.(js|css)$/
      }
    },
    new HtmlWebpackInlineSourcePlugin()
  ]
}
```


  