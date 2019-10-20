
---
id: 813892
space: easywebpack
slug: upgrade
url: /easywebpack/upgrade
title: 升级指南
summary: Webpack 3 到 Webpack 4 经过重大更新，对应 easwebpack3 到 easywebpack4 也有相对性的更新，主要包括以下3点：Webpack 版本升级导致的配置优化和优化修改easywebpack 新特性支持和配置简化easywebpack 遗留问题修复以及去掉历史兼容 ...
coverImage: null
createTime: 2018-11-05T12:25:35.000Z 
upateTime: 2019-07-04T02:40:59.000Z
wordCount: 1112
layout: doc
---
Webpack 3 到 Webpack 4 经过重大更新，对应 easwebpack3 到 easywebpack4 也有相对性的更新，主要包括以下3点：

- Webpack 版本升级导致的配置优化和优化修改

- easywebpack 新特性支持和配置简化

- easywebpack 遗留问题修复以及去掉历史兼容 hack 代码




## 一键升级

最新 `easywebpack-cli`  提供一键升级命令： `easy upgrade`  主要升级 easywebpack 相关解决方案插件和 Webpack 相关第三方插件， 部分配置需要先确认，然后手动修改。 如果是 Egg 项目请运行 `easy upgrade --egg`


### 依赖升级
| **easywebpack3** | **easywebpack4** | **升级方式** |
| --- | --- | --- |
| easywepback@3.x.x | easywepback@4.x.x | easy upgrade |
| easywepback-vue@3.x.x | easywepback-vue@4.x.x | easy upgrade |
| easywepback-react@3.x.x | easywepback-react@4.x.x | easy upgrade |
| easywebpack-js@3.x.x | easywebpack-html@4.x.x | easy upgrade |
| easywebpack-html@3.x.x | easywebpack-js@4.x.x | easy upgrade |
| webpack-tool@3.x.x | webpack-tool@4.x.x | easy upgrade |
| webpack-manifest-resource-plugin@2.x.x | webpack-manifest-resource-plugin@4.x.x | easy upgrade |
|  |  |  |


### 依赖修改
项目`package.json`  文件依赖修改

| **easywebpack3** | **easywebpack4** | **升级方式** |
| --- | --- | --- |
| 项目依赖 autoprefixer  | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-core | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-loader | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-eslint | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 postcss-loader | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 eslint-loader | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 html-webpack-plugin | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| ​项目依赖 html-webpack-plugin | ​easywebpack方案依赖，项目package.json 无需显示依赖 | ​easy upgrade |
| 项目依赖 directory-named-webpack-plugin | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 progress-bar-webpack-plugin | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 uglifyjs-webpack-plugin | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 webpack-manifest-resource-plugin | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 server-side-render-resource | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 vue-template-compiler | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 vue-server-renderer | ​easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-plugin-add-module-exports | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-plugin-syntax-dynamic-import | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-plugin-transform-object-assign | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-plugin-transform-object-rest-spread | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-plugin-transform-runtime | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-preset-env | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |
| 项目依赖 babel-plugin-import | easywebpack方案依赖，项目package.json 无需显示依赖 | easy upgrade |


## webpack.config.js 配置修改

| **easywebpack3** | **easywebpack4** | 修改说明 | **升级方式** |
| --- | --- | --- | --- |
| plugins.buildfile  | 不需要，移除该配置 | 配置简化 | 如有，暂手动修改 |
| plugins.manifest | 不需要，移除该配置 | 配置简化 | 如有，暂手动修改 |
| plugins.manifestDeps | 不需要，移除该配置 | 配置简化 | 如有，暂手动修改 |
| cache: true | compile:{<br />    thread: true, // 多进程编译<br />    cache: true   // 启动编译缓存<br /> } | 配置增强<br />4.9.0 已默认开启 | 如有，请暂手动修改<br />[https://www.yuque.com/hubcarl/easywebpack/speed](https://www.yuque.com/hubcarl/easywebpack/speed) |
| cssModule:{<br />  include: ['src/page/css']<br />} |   **依然支持3的方式，但可以简化**<br />- 把 css module 的 样式文件改成 /\.module\(css|less|scss|stylus)/ 规范，这样就无需配置
<br />- easywebpack4 默认提供<br />/\.module\.(css|less|scss|stylus)/ 的文件规范的 CSS Module 特性 <br />
<br /> | 配置简化 | 如有，请暂手动修改 |
| cdn:UPLOAD_CDN ? { url: 'http://xxx.cdn.com/public/' }: {}, | <br />- 无需通过变量控制是否配置 CDN地址，开发模式即使配置不起作用，只有在 test 和 prod 构建模式才起作用
<br />- 配置无需配置 Object 类型，可以直接配置一个 CDN的 URL 地址，也就是支持同时String
<br /> | 配置简化 | 如有，请暂手动修改 |



## 版本说明

- easywebpack4: [https://www.yuque.com/hubcarl/easywebpack/v4](https://www.yuque.com/hubcarl/easywebpack/v4)

- easywebpack3: [https://www.yuque.com/hubcarl/easywebpack/v3](https://www.yuque.com/hubcarl/easywebpack/v3)



  