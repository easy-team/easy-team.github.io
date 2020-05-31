
---
id: 685539
space: easywebpack
slug: problem
url: /easywebpack/problem
title: 常见问题
summary: Babel 快速升级问题为了更方便升级 Babel7, 同时尽量减少配置且无需安装 @babel 依赖，@easy-team 模式直接内置Babel 7 的相关依赖，只需要把 easywebpack 依赖模式改成 @easy-team/easywebpack 模式，如果代码中直接依赖了也请一并...
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1564828978624-a8e511e0-4500-4a12-8363-ccdfa3dd561e.png
createTime: 2020-05-27T06:59:51.000Z 
upateTime: 2020-05-27T06:59:51.000Z
wordCount: 2713
layout: doc
---

### Babel 快速升级问题

<br />为了更方便升级 Babel7, 同时尽量减少配置且无需安装 @babel 依赖，@easy-team 模式直接内置Babel 7 的相关依赖，只需要把 easywebpack 依赖模式改成 @easy-team/easywebpack 模式，如果代码中直接依赖了也请一并修改。<br />
<br />@easy-team/easywebpack-cli: ^4.0.0 替换  easywebpack-cli<br />@easy-team/easywebpack-react: ^4.0.0 替换  easywebpack-react<br />@easy-team/easywebpack-vue: ^4.0.0 替换  easywebpack-vue<br />


### 移除 console 日志

<br />Webpack 4 压缩是通过 optimization.minimizer 来实现，默认 console 是没有被移除，如果需要移除，可以通过TerserPlugin 配置解决。<br />

```javascript
const TerserPlugin = require('terser-webpack-plugin');
'use strict'
// webpack.config.js
module.exports = {
  optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
   }
}
```

### 

### Server Side Render 引入 node_modules UI 组件库 iview
> 在通过 webpack 构建 server side render 模块(target: 'node')时，默认情况下，node_modules 下的模块不会打进构建后的 JSBundle 文件里，而是直接通过 require 方式引用模块的。如果在业务代码中直接引用 node-modules 下的 .vue 或 .jsx 文件时，会出现不能解析引入的组件模块。这是需要通过 `nodeExternals.whitelist`  配置该模块需要编译到 JSBundle 文件里面，这样才能被相应 loader 进行编译处理。



![image.png](/medias/easyjs/easywebpack/easywebpack-problem-image-8524567.png)<br />

```javascript
// ${root}/webpack.config.js

const path = require('path');
const resolve = filepath => path.resolve(__dirname, filepath);
module.exports = {
  nodeExternals: {
    whitelist: [ moduleName => { 
      return /iview/.test(moduleName);
    }] 
  },
  module: {
    rules: [
      {
        babel: {
          include: [resolve('app/web'), resolve('node_modules/iview')],
          exclude: []
        },
      },
      {
        vue: {
          include: [resolve('app/web'), resolve('node_modules/iview')],
          exclude: [],
        }
      }
    ]
  },
};

```

### 

### 自定义扩展或查看打印 Webpack 配置


- 通过 [easywebpack-cli  ](https://github.com/easy-team/easywebpack-cli)命令行工具的 easy print 命令
- 通过 `customize`  钩子处理 
```javascript
//${root}/webpack.config.js
module.exports = {
  ...
  customize(webpackConfig){ 
   // 此外 webpackConfig 为原生生成的 webpack config，可以进行自定义处理
   return webpackConfig;
  }
}
```

<br />


### 关闭自动打开浏览器


- 使用 egg-webpack 进行开发时，可以通过配置 browser: false 关闭自动打开浏览器



```javascript
// ${root}/config/config.local.js

module.exports = app => {
  const exports = {};

  exports.webpack = {
    browser: false, // 这里可以打开指定 url 地址
  };

  return exports;
};


```


- 没有使用 egg-webpack 插件时，可以通过 devServer 的 open 开关设置是否打开指定页面



```javascript
// ${root}/webpack.config.js

module.exports = {
  devServer: {
    open: 'http://127.0.0.1:8888'
  }
};


```

<br />


### 编译装饰器 Unexpected charactor @ 错误

<br />.babelrc 配置 babel 装饰器编译插件： [https://babeljs.io/docs/en/babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

### 

### autoprefixer对@import方式引用css文件无效的解决方案


- 方式一：改为 import 方式

- 增加 css importLoaders 配置




```javascript
// ${root}/webpack.config.js
module.exports = {
 loaders: {
  css: {
   importLoaders: 1
  }
 } 
}
```

<br />


### TypeScript  + Vue 项目找不到 .vue 文件

<br />在用 TypeScript 编写 Vue 应用时， Vue 里面的 TypeScript 代码建议不要写在 Vue 文件里面，请以单独 ts 文件存放 TypeScript 代码。目前测试发现与 thread-loader 一起使用是有问题的。easywebpack  4.10.0 开始，默认开启了 thread-loader, 你可以通过如下方式禁用 thread-loader：<br />

```javascript
// ${root}/webpack.config.js
module.exports = {
 compile: { 
  thread: false 
 } 
}
```

<br />


### 禁用 node-sass 安装

<br />目前 easywebpack 3 默认是 开启了 sass 功能，但安装 `node-sass` 时, 会出现安装不成功(二进制本地编译)的情况，这个时候可以按照如下方式禁用 node-sass .  **easywebpack 4** 已默认禁用。<br />

- 确保代码引用里面没有用 sass 编写样式

- 删除 `package.json` 里面的  `node-sass` 依赖

- 禁用 webpack 引用 `node-sass` 编译




```javascript
// ${app_root}/webpack.config.js
module.exports= {
  module: {
    rules:[
   		{ scss: false }
  	]
 }
};
```

<br />


### 禁用图片压缩插件 imagemin-webpack-plugin 安装

<br />目前 easywebpack 默认是打正式包时开启了图片压缩功能，但在某些部分机器安装 `imagemin-webpack-plugin` 时, 会出现安装不成功的情况(二进制本地编译, 系统缺少某些本地库)，这个时候可以按照如下方式禁用 `imagemin-webpack-plugin`<br />

- 删除 `package.json` 里面的  `imagemin-webpack-plugin` 依赖

- 禁用 webpack 引用 `imagemin-webpack-plugin` 编译




```javascript
// ${app_root}/webpack.config.js
module.exports= {
  plugins :[
    { imagemini: false }
  ]
};
```



### 

### 引入 node_modules 下的 module 没有编译为 es5，导致压缩报错

<br />easy 体现 默认 node_modules  是被 babel 排除的，如果有 es6+ 的模块，需要包含进来才行，否则压缩报错
```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module: {
    rules:[
      {
        babel: {
          exclude: []
        }
      }
    ]
  }
}
```

### 

### 引入 node_modules 下 vue 组件报找不到对应的 loader 错误

<br />`easywebpack-vue` 默认的 `vue-loader` 配置排除了 `node_moudles` 目录, 主要目的是避免 `node_moudles` 被扫描，加快构建速度。如果你需要 引入 `node_moudles` 下 vue 组件, 请把对应的组件加入 `include` 配置 或者 用 `exclude` 覆盖默认配置，建议`include` 配置.<br />


#### `include` 配置

<br />例如： 代码在 app/web 目录，  引入 node_modules 下 vue 组件为<br />

```javascript
// ${app_root}/webpack.config.js
const path = require('path');
const resolve = filepath => path.resolve(__dirname, filepath);

module.exports= {
	module: {
    rules:[
      {
        vue: {
      		include: [resolve('app/web'), /node_module\/vue-datepicker-local/]
    		}
      }
    ]
  }
}

```

<br />相关issue: [import 外部模块失败](https://github.com/hubcarl/egg-vue-webpack-boilerplate/issues/53)<br />


#### `exclude` 配置


```javascript
// ${app_root}/webpack.config.js

module.exports = {
  module: {
    rules:[
      {
        babel: {
          exclude: []
        }
      }
    ]
  }
}

```

<br />see: [https://github.com/webpack/webpack/issues/2031](https://github.com/webpack/webpack/issues/2031)<br />
<br />


### Egg + Vue/React 修改静态资源 publicPath 路径

<br />在 Egg + Vue/React 解决方案中, Webpack publicPath 使用的是默认 `publicPath: '/public/'` 配置。<br />
<br />如果要修复默认的publicPath，比如要修改 `/static/`，需要修改三个地方：<br />


#### 首先版本要求


- easywebpack: ^3.5.1

- egg-webpack: ^3.2.5





#### 配置修改


- Webpack `webpack.config.js` 配置添加 `publicPath` 配置覆盖默认配置




```javascript
// ${app_root}/webpack.config.js
module.exports = {
  .....
  output: {
    path: 'static',
    publicPath: '/static/
  }
};
```


- Egg 配置 `config.default.js` 添加静态资源




```javascript
// ${app_root}/config/config.local.js
 exports.static = {
    prefix: '/static/',
    dir: path.join(app.baseDir, 'static')
  };
```


- 本地开发 Webpack 静态代理
> see： [https://github.com/easy-team/egg-webpack](https://github.com/easy-team/egg-webpack)

```javascript
// ${app_root}/config/config.local.js
 exports.webpack = {
    proxy: {
      match: /^\/static\//
    }
  };
```

<br />


### `npm install` 安装后, `npm start` 启动失败

<br />在使用 `easywebpack` 体系构建时, 在首次 `npm start` 时, `easywebpack` 会检查开启的 loader, plugin 插件是否已经安装, 如果没有安装则自动安装.
在这个过程会打印动态安装的 `npm` 模块, 如果安装失败则会导致启动失败, 这个时候你可以手动安装动态安装的 `npm` 模块 或者通过 `easy install` 自动动态安装缺失的依赖, 同时把依赖写入 `package.json` 的 `devDependencies`中.
然后重新启动.<br />
<br />`easywebpack` 解决方案只内置了必须的几个常用 loader 和 plugin, 其他 loader (比如 less, stylus) 和 plugin (imagemini) 都是需要项目自己根据需要安装。如果你自己搭建项目，遇到依赖缺失错误，除了手动 npm install 安装以外, 可以使用 `easy install` 命令，安装所有缺失的依赖，默认是 `npm` 方式<br />

```bash
easy install
```

<br />通过 `mode` 参数指定 `cnpm` 方式安装依赖(前提是你全局安装了cnpm)<br />

```bash
easy install --mode cnpm
```

<br />**这里采用动态安装是因为如果把所有插件都内置, 会导致安装很多无用的 `npm` 模块, 安装缓慢, 更严重的是有些 `loader`, `plugin` 如果出现问题, 则导致整个 `easywebpack` 体系不能用.**<br />


### Egg + Vue/React 启动端口修改

<br />**注意： 该问题已在最新版本 easywebpack@4.8.0解决方案中已自动检测端口占用问题，无需配置。**<br />
<br />Egg 应用本地开发时, npm run dev 默认启动打开浏览器的端口是 7001, 如果要修改自动打开的端口为6001, 可以在 `config/config.local.js` 中 添加 端口配置<br />

```javascript
// ${app_root}/config/config.local.js
exports.webpack = {
  appPort: 6001
  webpackConfigList: EasyWebpack.getWebpackConfig()
};
```

<br />`egg-webpack` 启动打开浏览器的取端口逻辑: `this.config.webpack.appPort || process.env.PORT || 7001`<br />


### 多项目开发时, 端口占用问题

<br />**注意： 该问题已在最新版本 easywebpack@4.8.0 解决方案中已自动检测端口占用问题，无需配置。**<br />
<br />在 Egg + Webpack 项目开发过程中, 会用到 7001, 9000, 9001 三个端口<br />

- 7001 是 Egg 应用启动的默认端口

- 9000, 9001 是 Webpack 启动 Webpack dev server 的端口, 9000 为 构建前端渲染js, 9001 构建后端渲染逻辑.



<br />如果有两个项目同时开发, 第二个项目需要修改这三个端口, 假如 egg 应用: 5000,  Webpack 构建 9100 和 9101<br />

- 修改 Egg 应用端口为 5000



<br />Egg 应用默认会读取  `process.env.PORT` 变量, 这里我们新起一个环境变量或者直接写 5000<br />

```javascript
// ${app_root}/index.js
require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.EGG_PORT || 5000
});
```


- 修改 Webpack dev server 端口




```javascript
// ${app_root}/config/config.local.js
exports.webpack = {
  port: 9100, 
  proxy: {
  	host: 'http://127.0.0.1:9100'
  }
  webpackConfigList: EasyWebpack.getWebpackConfig()
};
```


- 为了让热更新生效,需要修改 `webpack.config.js` 的 port 配置




```javascript
// ${app_root}/webpack.config.js
module.exports = {
  port: 9100, 
  ......
};
```



### 骨架项目中前端使用 `async/await` 特性时, 报错：regeneratorRuntime is not defined。

<br />目前骨架前端是没有用 `async/await`，所以没有内置。有需要的自己可以在 .bablerc 文件加 `transform-runtime`，同时安装对应依赖到 `devDependencies` 中即可。<br />

```bash
npm install babel-plugin-transform-runtime --save-dev
```


```javascript
// ${app_root}/.bablerc
{
  'plugins':['transform-runtime']
}
```



### 本地开发时, 相同的图片名称存在覆盖问题

<br />因本地开发时,图片没有hash,如果存在相同的图片名称, 就会存在覆盖问题。目前可以通过开启本地开发图片 hash 临时解决。<br />

```javascript
// ${app_root}/webpack.config.js
module.exports= {
  imageHash: true
};
```



### 本地开发时, Chrome 偶尔出现 call 或 require 未定义等 JS 错误


- 开发期间禁用 Chrome Network控制面板网络缓存, Disable cache 勾选上

- 运行 npx easy clean all 或 easy clean all (cli)





### windows 平台 node-sass 编译错误


```javascript
Error: ENOENT: no such file or directory, scandir '{PATH}\node-sass\vendor'
    at Error (native)
    at Object.fs.readdirSync (fs.js:856:18)
    at Object.getInstalledBinaries ({PATH}\node_modules\.npminstall\node-sass\3.7.0\node-sass\lib\extensions.js:74:13)
    at foundBinariesList ({PATH}\node_modules\.npminstall\node-sass\3.7.0\node-sass\lib\errors.js:20:15)
    at foundBinaries ({PATH}\node_modules\.npminstall\node-sass\3.7.0\node-sass\lib\errors.js:15:5)
    at Object.module.exports.missingBinary ({PATH}\node_modules\.npminstall\node-sass\3.7.0\node-sass\lib\errors.js:45:5)
    at Object.<anonymous> ({PATH}\node_modules\.npminstall\node-sass\3.7.0\node-sass\lib\index.js:14:28)
    at Module._compile (module.js:413:34)
```

<br />这时需要重新编译 node-sass:  `npm rebuild node-sass`  解决

  