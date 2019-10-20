
---
id: 777022
space: easywebpack
slug: pdwchd
url: /easywebpack/pdwchd
title: 构建大小
summary: easywebpack-cli 构建大小分析在项目开发时， 当页面构建的文件太大, 我们可以直接通过 cli 提供功能进行构建大小分析通过 -s 参数启动构建大小分析工具, 支持 analyzer(webpack-bundle-analyzer) 和 stats(stats-webpack-plugin) , 默认用 analyzer 插件。如果运行时, 提示安装缺少插件，请先安装依赖开发模式分析easy build -s  测试模式分析, 移除开发辅助代码easy build test -s...
coverImage: null
createTime: 2018-10-09T07:28:13.000Z 
upateTime: 2019-05-20T08:43:51.000Z
wordCount: 1395
layout: doc
---

## easywebpack-cli 构建大小分析


在项目开发时， 当页面构建的文件太大, 我们可以直接通过 cli 提供功能进行构建大小分析


#### 通过 -s 参数启动构建大小分析工具, 支持 analyzer(webpack-bundle-analyzer) 和 stats(stats-webpack-plugin) , 默认用 analyzer 插件。

> 如果运行时, 提示安装缺少插件，请先安装依赖


- 开发模式分析


```bash
easy build -s
```

- 测试模式分析, 移除开发辅助代码


```bash
easy build test -s
```

- 发布模式分析, 移除开发辅助代码, 压缩js/css/imagess以及hash


```bash
easy build prod -s
```

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528513212579-add62c3b-de8e-49bd-b4dc-7ebb8f126d3a.png#width=827)


#### 使用 stats(stats-webpack-plugin) 构建大小分析工具

> 如果运行时, 提示安装缺少插件，请先安装依赖


- 开发模式分析


```bash
easy build -s stats
```

- 测试模式分析, 移除开发辅助代码


```bash
easy build test -s stats
```

- 发布模式分析, 移除开发辅助代码, 压缩js/css/imagess以及hash


```bash
easy build prod -s stats
```

**运行后, 会生成  `client_stats.json` 文件,  然后通过以下两个工具可以清晰分析出项目文件层次结构和项目文件依赖大小**

- 打开 [webpack-chart](http://alexkuz.github.io/webpack-chart/) 然后上传 stat.json 文件，即可生成整体的项目文件层次结构图。<br />点击任何一个区域，进入子目录文件分析，这个工具只能提供一个整体的文件依赖结构。


![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528513227023-9b1f1ab6-f434-415b-9bbb-7d823094d8bd.png#width=650)

- 打开 [analyse](http://webpack.github.io/analyse/) 然后上传stat.json文件，即可生成整个项目文件个数(包括vue文件，js，css， image， chunk等)，文件大小，文件依赖关系统计，可以很方便找出筛选出大的js，image， css，然后进行针对性的优化，信息很全，对优化文件大小有很大帮助，唯一不方便的是统计结果不能排序


![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528513236394-625fa458-aeae-41d9-a7d9-cdc8d41197ba.png#width=800)



## 构建大小优化措施



### 1.1 Webpack构建Node端设置externals

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)通过require方式获取依赖。


### 1.2 lodash 按需打包

根据需要独立安装`lodash`相关依赖， 目前lodash各个方法都有独立的npm库

```javascript
var merge = require('lodash.merge')
// or ES6
import merge from 'lodash.merge'
```


### 1.3 Webpack常量

- 用`webpack.DefinePlugin` 插件注入常量替换 typeof window 判断， 这样Webpack打包压缩时会自动移除不会执行的代码。

- Vue框架或者第三方框架，有很多地方通过 `process.env.NODE_ENV` 加入一些调试或者监控代码，在线上发布模式时，是不需要的， 用`webpack.DefinePlugin` 插件注入`NODE_ENV=production`可以减少打包大小和执行效率。

- [easywebpack 内置常量](https://www.yuque.com/hubcarl/easywebpack/var)



### 1.4 CommonChunkPlugin 抽离公共代码

- 在多页面构建中， 一些公共代码可以通过`webpack.optimize.CommonsChunkPlugin` 抽离公共代码库，比如 `vue`,`axios` 等



### 1.5 Code Spliting代码分离

Webpack打包是把所有js代码打成一个js文件，我们可以通过 `CommonsChunkPlugin` 分离出公共组件，但这远远不够。 实际业务开发时，一些主要页面内容往往比较多， 而且会引入第三方组件或者监控脚本。其中有些内容的展示不再首屏或者监控脚本等对用户不是那么重要的脚本我们可以通过`require.ensure`代码分离延迟加载。在 Webpack 在构建时，解析到`require.ensure`时，会单独针对引入的js资源单独构建出chunk文件，这样就能从主js文件里面分离出来。 然后页面加载完后， 通过script标签的方式动态插入到文档中。

require.ensure 使用方式， 第三个参数是指定生产的chunk文件名，不设置时是用数字编号代理。相同require.ensure只会生产一个chunk文件。
```javascript
require.ensure(['swiper'], ()=> {
  const Swiper = require('swiper');
  ......
 }, 'swiper');
```

游戏中心项目swpier，fastclick, sentry，曝光率组件，各大APP的JSSDK加载都采用require.ensure动态加载或者按需加载。<br />![](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/2ce263b58700273f.png#width=)<br />另外一种动态加载Vue组件import()方案已经列入[ECMAScript提案](https://github.com/tc39/proposal-dynamic-import)，虽然在提案阶段，但 Webpack 已经支持了该特性。import() 返回的Promise，通过注释webpackChunkName 指定生成的chunk名称。 Webpack构建时会独立的chunkjs文件，然后在客户端动态插入组件，chunk机制与require.ensure一样。有了动态加载的方案，可以减少服务端渲染jsbundle文件的大小，页面Vue组件模块也可以按需加载。 比如单页面动态路由加载。

```javascript
Vue.component('async-swiper', (resolve) => {
  // 通过注释webpackChunkName 指定生成的chunk名称
  import(/* webpackChunkName: "asyncSwiper" */ './AsyncSwiper.js')
    .then((AsyncSwiper) => {
      resolve(AsyncSwiper.default);
    });
});

<div id="app">
  <p>Vue dynamic component load</p>
  <async-swiper></async-swiper>
</div>
```

- [具体服务端渲染例子](https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/app/web/page/dynamic/dynamic.vue)

- [https://zhuanlan.zhihu.com/p/36233639](https://zhuanlan.zhihu.com/p/36233639)



### 1.6 Tree Shaking

Tree Shaking 冗余代码移除技术还不完善，必须按照 ES Module 的方式编写代码，但这与我们项目复杂，js代码量大，全部使用method方式不利于代码维护和扩展，我们采用面向对象的组织代码的方式有出入。Tree Shaking 目前来说比较适合一些简单类库，当然 Webpack 社区也在不断的完善.


### 1.7 最小原则

项目开发时，尽量不要引入一些第三方库，能不用尽量不用，如果要引入，要考虑包大小以及是否可以动态加载。因为当页面多，功能复杂后，JS文件会越来越大。


  