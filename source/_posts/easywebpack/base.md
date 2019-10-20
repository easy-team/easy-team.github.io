
---
id: 685546
space: easywebpack
slug: base
url: /easywebpack/base
title: 扩展配置
summary: webpack.config.js 常用配置1. Egg框架配置  (扩展简化配置)config.egg : {Boolean} 特殊参数,  Egg SSR 构建时使用。easywebpack 4.8.0 无需配置，已支持自动检测使用条件:只有在使用 Egg 框架进行 Server Side...
coverImage: null
createTime: 2018-11-21T08:32:07.000Z 
upateTime: 2019-05-22T01:36:04.000Z
wordCount: 1510
layout: doc
---

## webpack.config.js 常用配置


#### 1. Egg框架配置  (扩展简化配置)

**config.egg** : {Boolean} 特殊参数,  Egg SSR 构建时使用。easywebpack 4.8.0 无需配置，已支持自动检测

> **使用条件**:只有在使用 Egg 框架进行 Server Side Render 特殊配置, 需要设置为 true, 表示 Webpack 构建的服务端文件放到 `app/view` 目录.



#### 2. 构建框架配置  (扩展简化配置)

**config.framework** : {String} 结合 `easywebpack-cli` 使用时使用, 支持 `vue`,`react`, `weex`, `html`, `js` 五种配置,  cli 根据 framework 配置获取对应解决方案动态创建 Webpack 配置.  easywebpack 4.8.0 无需配置，已支持自动检测

> **使用条件**: 使用 `easywebpack-cli` 构建时, 才需要配置该参数.


- html 解决方案 : easywebpack-html

- vue 解决方案 : easywebpack-vue

- react 解决方案 : easywebpack-react

- weex 解决方案 : easywebpack-weex

- js 解决方案 : easywebpack-js



#### 3. 环境配置  (扩展简化配置)

**config.env** : {String} **非必须**, 目前支持 `dev`, `test`, `prod` 三种环境, 本地开发默认 `dev` ，easywebapck-cli 构建时，默认是 `prod` 

> **使用条件**: 使用 `easywebpack-cli` 构建时, 无需配置该参数. 更多请见 [配置项](http://hubcarl.github.io/easywebpack/webpack/config/)



#### 4. 构建 HTML 模板配置 (扩展简化配置)

**config.template** : {String} **非必须** HTML 模板路径地址。

> **使用条件**: 只需要构建 HTML 页面时才需要配置, 比如 Vue, React 前端渲染模式。



#### 5. webpackConfig Hook (扩展增强配置)
> easywepback 提供  customize 方法 对生成的 webpack 直接进行加工处理


```javascript
//${root}/webpack.config.js
module.exports = {
  ...
  customize(webpackConfig){ // 此外 webpackConfig 为原生生成的 webpack config
   return webpackConfig;
  }
}
```


#### 6. 构建目录配置  (扩展简化配置)

>  easywebpack>=4.11.0 时， 请使用 webpack 原生节点 **config.output.path** 配置


**config.buildPath** :  {String} **非必须**, Webpack 的 `output.path` . easywebpack 已默认 `${app_root}/public`, 无需配置.  


#### 7. 访问路径配置  (扩展简化配置)

>  easywebpack>=4.11.0 时， 请使用 webpack 原生节点 **config.output.publicPath** 配置


**config.publicPath** :  {String} **非必须**, Webpack 的 `output.publicPath` . easywebpack 已默认 `/public/`, 无需配置.


#### 8. 配置 devtool (原生增强配置)

**config.devtool** :   {String} **非必须**,  开启 source-map,  默认无。 也就是 Webpack 的 devtool。注意：只在开发模式有效。 如果想在 build 模式生效，可以强制指定，例如 easy build --devtool   默认是 source-map

```javascript
module.exports = {
  devtool:'source-map'
}
```

- 当 `prod` 模式时， 默认 devtool 只有 `source-map`, `hidden-source-map`, `nosources-source-map` 其中一种配置才会生效，否则则重置为 `source-map`.<br />因为如果配置了 `eval`，会导致 js 文件不会被压缩混淆, 导致 js 文件很大.

- 如果想强制 `prod` 模式使用指定 devtool 配置，可以用 `easy build --devtool eval` (**easywebpack-cli >3.11.0**) 传递 devtool，这种模式优先级最高。



#### 9. alias 别名配置(扩展增强配置)

**config.alias** :  {Object} **非必须**，也就是 Webpack的 `resolve.alias`，但这里有两点简化：

- 这里的 alias 会根据项目根目录自动转换为绝对路径，无需自己写项目的根目录。

- 如果要为 node_modules 添加 alias,可以采用 require.resovle('react') 或者显示指定 node_modules 'node_modules/react'


```javascript
module.exports = {
  alias:{
   asset: 'app/web/asset',
   component: 'app/web/component',
   framework: 'app/web/framework',
   store: 'app/web/store'
  }
}
```


#### 10. commonsChunk 配置  (扩展简化配置)

**config.lib** : {Array/Object} **非必须**, Array／Object, 配置需要打包出 webpack commonsChunk 的库或者公共 js 文件

**使用条件：**

- `easywebpack` ^3.5.1 版本开始支持,  默认提取的文件为 `runtime.js` 和 `common.js`

- `easywebpack-cli` 需要 ^3.5.1


**举例：**

```javascript
module.exports = {
  lib: ['react', 'react-dom']
}
```


#### 11. dll 配置支持  (扩展简化配置)

**config.dll** :  {Array/Object} **非必须**，Array／Object, 配置需要打包出 webpack dll 的库或者公共 js 文件。

**使用条件：**

- `easywebpack` ^3.5.1 版本开始支持, 默认提取的文件为 `vendor.js`.

- `easywebpack-cli` 需要 ^3.5.1


**举例：**

```javascript
module.exports = {
  dll: ['react', 'react-dom']
}
```

- 当配置了 `dll` 节点时， npm start 或者 easy build 构建时，会检查 dll 文件是否存在，不存在则会先构建dll文件，构建完成后再接着构建页面，一步完成。

- 当构建的工程较大或引入的第三方组件较多时，`dll` 方案相比  `commonsChunk` 时， 能明显的提高构建速度(通过一个实际项目测试发现，构建速度减少了2/3)。



#### 12. 本地开发启用图片hash  (扩展简化配置)

**config.imageHash**:  {Boolean} **非必须** 因本地开发时,图片没有hash。

> **使用条件**: 如果存在相同的图片名称, 就会存在覆盖问题。目前可以通过开启本地开发图片 hash 临时解决。


```javascript
// ${app_root}/webpack.config.js
module.exports= {
  imageHash: true
};
```


#### 13. 构建速度优化配置  (扩展简化配置)

**config.compile**: {Object}, **非必须**。 默认禁用。

> **使用条件**:  easywebpack > 4.2.4


默认 `babel-loader` 和 `ts-loader` 没有启用 `thread-loader` 和 `cache-loader` 加速构建。<br />当构建的 `entry` 太少时, 开启后，反而构建速度会慢一些，只有当项目足够大以后或者构建速度太慢，才建议开启，然后对比决定是否要开启该配置。

```javascript
module.exports = {
  compile:{
    thread: true,
    cache: true
  }
}
```

**config.cache**: {boolean}, **非必须**。 默认禁用，

> **使用条件**:  easywebpack3 且 easywebpack3 >3.8.7


```javascript
// ${app_root}/webpack.config.js
module.exports= {
  cache: true
};
```


#### 14. 域名代理  (扩展简化配置)

**config.host**: {String} **非必须**。 IP地址替换成域名, 域名代理功能需要自己本地配置实现。

> **使用条件**: 本地开发启用域名访问，IP地址替换成域名, 域名代理功能需要自己本地配置实现。具体见[域名代理](http://hubcarl.github.io/easywebpack/webpack/proxy/)


```javascript
// ${app_root}/webpack.config.js
module.exports= {
  host: 'http://sky.dev.com'
};
```


#### 15. 使用 webpack 部分原始节点配置(非必须)

> **使用条件**:  当提供的配置不满足要求时, 可以使用 Webpack 原始配置项配置。


```javascript
// ${app_root}/webpack.config.js
module.exports= {
  externals: {
    jquery: 'window.$'
  },
  resolve:{
    alias:{

    },
    extensions:[]
  },
  stats: {

  },
  profile: {

  },
  performance: {

  }
};
```


#### 16. 全部配置项

更多详细配置说明请见： [easywebpack 全部配置项](http://hubcarl.github.io/easywebpack/webpack/config/)  和  [参数特性配置](http://hubcarl.github.io/easywebpack/webpack/feature) 配置文档

  