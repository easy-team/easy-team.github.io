
---
id: 685559
space: easywebpack
slug: allconfig
url: /easywebpack/allconfig
title: 全部配置项
summary: 
coverImage: null
createTime: 2018-09-20T01:30:00.000Z 
upateTime: 2019-05-20T16:07:16.000Z
wordCount: 2104
layout: doc
---

## webpack.config.js 参数配置说明

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  framework: 'html'
  entry:{
    
  }
  ......
}
```


## 1. 环境配置

**config.env** : 非必需, 目前支持 `dev`, `test`, `prod` 三种环境, 默认 `dev`

> **使用条件**: 使用 `easywebpack-cli` 构建时, 无需配置该参数.


- dev  : 开启热更新, image/css/js 不压缩, 不 hash

- test : 禁用热更新, image/css/js 不压缩, 不 hash

- prod : 禁用热更新, image/css/js 压缩,  hash

- 本地开发(`dev`)时, 为了支持 `css hot reload`, css 样式必须 inline, 所以默认构建是全部 inline css (`config.cssExtract=false`), `test` 和 `prod` 环境时, css是独立出css文件(`config.cssExtract=true`)



## 2. 前端框架配置

**config.framework** : 需要结合 `easywebpack-cli` 使用的, 支持 `vue`,`react`, `weex`, `html`， `js` 五种配置,  cli 根据 framework 配置获取对应解决方案动态创建 Webpack 配置.

> **使用条件**: 使用 `easywebpack-cli` 构建时, 才需要配置该参数.


- html 解决方案 : easywebpack-html

- vue 解决方案 : easywebpack-vue

- react 解决方案 : easywebpack-react

- weex 解决方案 : easywebpack-weex

- js 解决方案 : easywebpack-js



## 3. 构建类型配置

**config.type** : 需要结合 `easywebpack-cli` 使用的, 目前支持 `client`, `server`, `web`, `weex`, 其中 `client` 和 `server` 配对使用, `web` 和 `weex` 配对使用.

> **使用条件**: 使用 `easywebpack-cli` 构建时, 才需要配置该参数.


- client : 客户端(Browser)模式, 比如 `Vue` 和 `React` 前端渲染

- server : 客户端(Browser)模式, 比如 `Vue` 和 `React` 服务端渲染

- web    : Weex 客户端(Browser)模式, 构建 `Web` 页面

- weex   : Weex Native(App)模式, 构建Native运行的 `jsbundle` 文件



## 4. Egg框架配置

**config.egg** : 特殊参数, 只有在使用 Egg 框架进行 Server Side Render 特殊配置, 需要设置为 `true`, 表示Webpack构建的服务端文件放到 `app/view` 目录.


## 5. Entry构建配置

**config.entry** : Webpack 构建入口文件配置

- **config.entry.include** : {String/Object/Array} 必选, 文件根目录可以不写

1.{Object} 支持标准的 Webpack entry 配置 Object类型(key : value)

{String/Array} 支持根据目录自动创建 entry 配置. 值为String或者数组元素为String时,表示目录; 数组元素为Object时, 表示entry配置

- **config.entry.exclude**: {String/Array} 可选, 排除不需要构建的文件或目录,支持正则表达式.

- **config.entry.loader**:  {Object}, 可选, 为 entry 配置模板,  当配置后, 可以根据 `.vue` 和 `.jsx`文件自动创建 entry 文件, key为 `config.type` 枚举值.

- **config.entry.extMath**: {String}:, 可选, entry目录查找时匹配文件后缀, 默认 `.js`, 当配置了 `config.entry.loader` 和 `config.framework` 参数,自动映射后缀.

- **config.entry.template**: {String} 可选, 当需要构建html文件时, 必选

- **config.entry.html**: {Object} 可选, 当只有部分页面需要创建html时, 可以配置该参数, 参数节点与 `config.entry` 一致, 具体见举例



## 5. 构建目录配置

**config.buildPath** : Webpack的 `output.path`. easywebpack 已默认 `${app_root}/public`, 无需配置.


## 6. 访问路径配置

**config.publicPath** : Webpack的 `output.publicPath`. easywebpack 已默认 `/public/`, 无需配置.


## 7. alias别名配置

**config.alias** : 非必需, Webpack的 `resolve.alias`

> {Object} 对目录进行别名设置,  文件项目根目录可以不写



## 8. loaders配置

**easywebpack内置loader**

- easywebpack 内置了 `babel`, `eslint`, `css`, `sass`, `less`, `stylus`, `urlimage`, `urlfont` 等loader,

- easywebpack-vue 内置了 `vue`, `vuehtml` 等loader,

- easywebpack-react 内置了 `react-hot-loader` 等loader,

- easywebpack-weex 内置了 `vue`, `weex` 等loader.

- easywebpack-html 内置了 `html`, `nunjucks` 等loader.


**config.loaders** : {Object} Webpack loader 配置, 支持自定义格式和原生格式.

`key:value` 形式, 其中 `key` 为别名, 可以自由定义, easywebpack和对应解决方案内置了一些别名和loader.

比如我要添加一个全新且easywebpack没有内置的 html-swig-loader, 可以这样配置:

```javascript
{
  loaders:{
    swig : {
      test: /\.html$/,
      use: ['html-loader', 'html-swig-loader']
    }
  }
}
```

`swig` key别名随意, 我可以叫 swig, 也可以叫 htmlswig 等等

**禁用 easywebpack 内置的 `babel-loader` 可以这样配置**

```javascript
{
  loaders:{
    babel:false
  }
}
```

或

```javascript
{
  loaders:{
    babel:{
     enable:false
    }
  }
}
```

**修改 easywebpack 内置 `babel-loader` 的 test 和 use,  可以这样配置**

因use存在顺序问题, use 目前采用的策略是完全覆盖

```javascript
{
  loaders:{
    babel : {
      test: /\.(jsx|vue)?$/,
      exclude: [/node_modules/, 'page/test'],
      use: [
       {
        loader: 'babel-loader'
       },
       {
        loader: 'eslint-loader'
       }
      ]
    }
  }
}
```

**config.loaders具体loader配置项属性介绍**

config.loader配置项除了支持的loader原生属性, 还扩展了 `env`, `type`, `enable`, `postcss`, `framework` 五个属性, 其中 `postcss`, `framework` 用于css相关loader, 例如内置的 `sass-loader`

```javascript
{
  loaders:{
    sass:{
       enable: true, 
       type: ['client', 'server'],
       test: /\.sass/,
       exclude: /node_modules/,
       use: ['css-loader', {  
          loader: 'sass-loader',
          options: {
            indentedSyntax: true
          }
       }],
       postcss: true
    }
  }
}
```

- **env**: 见 `config.env` 说明, 可选, 默认全部

- **type**: 见 `config.type` 说明, 可选, 默认全部

- **enable**: {Boolean/Function} 是否启用, 可选, 默认可用

- **postcss**: {Boolean} 可选, 特殊配置, 是否启用postcss, 只有css样式loader需要配置, 其他loader不需要配置

- **use**: {Array/Function} 必须, 支持扩展的Function配置和原生Use配置, use属性是完全覆盖.



## 9. config.plugins 配置

`key:value` 形式, 其中 `key` 为别名, 可以自由定义, easywebpack和对应解决方案内置了一些别名plugin.

比如我要添加一个全新且easywebpack没有内置的 `webpack-visualizer-plugin` 插件, 可以这样配置如下:

```javascript
{
  plugins:{
    visualizer:{
      env: ['dev'], //  开发环境启用
      name: webpack-visualizer-plugin,
      args: {
       filename: './visualizer.html'
      }
    }
  }
}
```

或

```javascript
var Visualizer = require('webpack-visualizer-plugin');

{
  plugins:{
    visualizer:{
      env: ['dev'], //  开发环境启用
      name: new Visualizer({ filename: './visualizer.html'})
    }
  }
}
```

**修改已经内置 `easywebpack` 的压缩插件 uglifyJs 配置信息**

自定义已经内置 `easywebpack` plugin 插件的参数信息, 统一通过 `args` 配置

```javascript
{
  plugins:{
    uglifyJs: {
      args: {
        compress: {
          warnings: false,
          dead_code: true,
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
}
```

**禁用 uglifyJs 配置**

```javascript
{
  plugins:{
    uglifyJs: false
  }
}
```

**config.plugins** 配置相属性介绍

- **env**: 见 `config.env` 说明, 可选, 默认全部

- **type**: 见 `config.type` 说明, 可选, 默认全部

- **enable**: {Boolean/Function} 是否启用, 可选, 默认可用

- **name**: {String/Object} 插件名称, 支持字符串或Object

- **args**: {Object/Function} 插件参数


**内置plugin**

- npm : npm-install-webpack-plugin

- nameModule: webpack.NamedModulesPlugin

- hashModule: webpack.HashedModuleIdsPlugin

- module: webpack.optimize.ModuleConcatenationPlugin

- error: webpack.NoEmitOnErrorsPlugin

- hot: webpack.HotModuleReplacementPlugin

- manifest: webpack-manifest-plugin

- progress: progress-bar-webpack-plugin

- directoryname: directory-named-webpack-plugin

- extract: extract-text-webpack-plugin

- commonsChunk: webpack.optimize.CommonsChunkPlugin

- html: html-webpack-plugin

- directoryname: directory-named-webpack-plugin



## 10. packs单独打包配置

**config.packs**: 可选, {Object} `key:value` 形式, 其中 `key` 为生成的文件名, `value`为要打包的文件


## 11. cdn配置

**config.cdn.url**: 可选, url为地址配置, 一般为线上环境使用.


## 12. 常用简化配置

- hot:  {Boolean} 是否启用热更新, 无需配置, 框架处理

- hash: {Boolean} 是否 hash 所有, 无需配置, 框架处理

- fileHash: {Boolean} 是否 hash js, 无需配置, 框架处理

- imageHash: {Boolean} 是否 hash图片, 无需配置, 框架处理

- cssHash: {Boolean} 是否 hash css, 无需配置, 框架处理

- mediaHash: {Boolean} 是否 hash 多媒体文件, 无需配置, 框架处理

- fontHash: {Boolean} 是否 hash  字体文件, 无需配置, 框架处理

- cssExtract: {Boolean} 是否extract css, 无需配置, 框架处理

- cssModule: {Array} 指定那些文件使用css module, 无默认, 自己根据需要配置



## 13. devtool 配置

```javascript
module.exports = {
  devtool:'source-map'
}
```

- 当 `prod` 模式时， 默认 devtool 只有 `source-map`, `hidden-source-map`, `nosources-source-map` 其中一种配置才会生效，否则则重置为 `source-map`.<br />因为如果配置了 `eval`，会导致 js 文件不会被压缩混淆, 导致 js 文件很大.

- 如果想强制 `prod` 模式使用指定 devtool 配置，可以用 `easy build prod --devtool eval` 传递 devtool，这种模式优先级最高。



## 14. 构建速度优化配置

默认 `babel-loader` 和 `ts-loader` 没有启用 `thread-loader` 和 `cache-loader` 加速构建。<br />当构建的 `entry` 太少时, 开启后，反而构建速度会慢一些，只有当项目足够大以后或者构建速度太慢，才建议开启，然后对比决定是否要开启该配置。

```javascript
module.exports = {
  compile:{
    thread: true,
    cache: true
  }
}
```

- 当 `prod` 模式时， 默认 devtool 只有 `source-map`, `hidden-source-map`, `nosources-source-map` 其中一种配置才会生效，否则则重置为 `source-map`.<br />因为如果配置了 `eval`，会导致 js 文件不会被压缩混淆, 导致 js 文件很大.

- 如果想强制 `prod` 模式使用使用指定 devtool 配置，可以用 `easy build prod --devtool eval` 传递 devtool，这种模式优先级最高。



## 15. config 扩展方法

**config.done**: {Function} 编译完成回调方法

**config.create**: {Function} 扩展方法, 调用`create`方法之前调用

**根据 `config.type` 提供对应的 `on[this.type]` (type首字母大写)方法**

- `easywebpack-vue` 和 `easywebpack-react` 提供 `onClient` 和 `onServer` 方法

- `easywebpack-weex` 提供 `onWeb` 和 `onWeex` 方法



  