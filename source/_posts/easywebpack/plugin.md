
---
id: 685557
space: easywebpack
slug: plugin
url: /easywebpack/plugin
title: plugins
summary: 内置pluginplugin别名默认是否开启/开启环境npm-install-webpack-pluginnpm否webpack.DefinePlugindefine是webpack.NamedModulesPluginnameModule是/devwebpack.HashedModuleId...
coverImage: null
createTime: 2019-06-28T11:31:03.000Z 
upateTime: 2019-06-28T11:31:03.000Z
wordCount: 638
layout: doc
---


## 内置plugin
| plugin | 别名 | 默认是否开启/开启环境 |
| --- | --- | --- |
| npm-install-webpack-plugin | npm | 否 |
| webpack.DefinePlugin | define | 是 |
| webpack.NamedModulesPlugin | nameModule | 是/dev |
| webpack.HashedModuleIdsPlugin | hashModule | 是/test,prod |
| webpack.optimize.ModuleConcatenationPlugin | module | 是 |
| webpack.NoEmitOnErrorsPlugin | error | 是 |
| webpack.HotModuleReplacementPlugin | hot | 是/dev |
| [webpack-manifest-resource-plugin](https://github.com/hubcarl/webpack-manifest-resource-plugin) | manifest | 是 |
| progress-bar-webpack-plugin | progress | 是/dev |
| directory-named-webpack-plugin | directoryname | 是 |
| mini-css-extract-plugin | extract | 是/test, prod |
| webpack.optimize.CommonsChunkPlugin | commonsChunk | 是 |
| html-webpack-plugin | html | 是 |
| webpack.optimize.UglifyJsPlugin | uglifyJs | 是/prod |
| imagemin-webpack-plugin | imagemini | 是/prod |
| webpack-bundle-analyzer | analyzer | 否<br />**命令行开启：**<br />**easy build --size** |
| stats-webpack-plugin | stats | 否<br />**命令行开启：**<br />**easy build --size stats** |
| speed-measure-webpack-plugin | speed | 否<br />**命令行开启：**<br />**easy build --speed** |
| service-worker-precache-webpack-plugin | serviceworker | 否 |
| clean-webpack-plugin | clean | 是(test, prod), >=easywebpack@4.6.0 |
| optimize-css-assets-webpack-plugin | cssmini | 是(prod), >=easywebpack@4.7.1 |
| copy-webpack-plugin | copy | 否 |
| webpack-filter-warnings-plugin | filter | 是<br />>=easywebpack@4.10.0 |



## config.plugins 配置

**config.plugins** 非必须，支持 Object ｜ Array。 这里的plugins 是对 Webpack `plugins` 的简化和增强。建议用 **增强配置** 方式配置.

- 兼容 Webpack 原生数组配置

- [增强]支持通过别名对内置 plugin 插件的开启和禁用，以及参数配置

- [增强]支持通过别名的方式添加 plugin 插件




### 插件配置规范

- 内置 plugin 扩展参数统一通过 args 节点配置
- <br />

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  plugins:[
    {
     ${plugin别名}:{}  // 值可以为 Boolean | Object
    }
  ]
}

或

module.exports = {
  plugins:{
     ${plugin别名}:{}  // 值可以为 Boolean | Object
    }
  }
}
```


### 插件配置举例

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  ......
  plugins:[
    { uglifyJs: false }, // 禁用内置js/css压缩插件配置
    { imagemini: false }, // 禁用内置图片压缩插件配置
    { ts: true }, // 开启内置插件配置
    { copy: [ { from: 'app/web/asset', to: 'public/asset' } ], // 已内置插件配置
    new webpack.NoEmitOnErrorsPlugin(), // 原生组件
    new webpack.HotModuleReplacementPlugin(), //原生组件
    {
      env: ['dev'] // 非必需，支持 dev, test, prod 默认所有
      name: new webpack.NamedModulesPlugin() // 插件实例
    }
  ]
}
```


### 添加新插件

我要添加一个全新且 easywebpack 没有内置的 `webpack-visualizer-plugin` 插件, 可以这样配置如下:

```javascript
{
  plugins:{
    visualizer:{
      env: ['dev'], //  开发环境启用
      name: 'webpack-visualizer-plugin',
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



### 修改内置插件参数

 这里以修改已经内置 easywebpack 的压缩插件 uglifyJs 配置信息为例：

```javascript
// easywebpack 3
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

// easywebpack 4 （args 参数可省略）
{
  plugins:{
    uglifyJs: {
      args: {
        uglifyOptions: {
          warnings: false,
          compress: {
            dead_code: true,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }
    }
  }
}

```



### 添加环境变量 webpack.DefinePlugin

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  plugins:{
    define:{
     	'BUILD_MODE': process.env.BUILD_ENV
    }
  }
}
```


### 自动加载模块 webpack.ProvidePlugin

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  plugins:{
    provide:{
       $: 'jquery',
       jQuery: 'jquery'
    }
  }
}
```


  