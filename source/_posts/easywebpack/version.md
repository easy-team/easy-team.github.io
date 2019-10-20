
---
id: 685540
space: easywebpack
slug: version
url: /easywebpack/version
title: 版本历史
summary: easywebpack 版本发布说明easywebpack4 -&gt; Webpack4支持 Webpack 4 插件版本easywebpack: ^4.x.xeasywebpack-cli: ^3.x.xeasywebpack-vue: ^4.x.xeasywebpack-react: ^4.x.xeasywebpack-html: ^4.x.xeasywebpack-js: ^4.x.xegg-webpack: ^4.x.xwebpack-tool: ^4.x.xwebpack-manifest...
coverImage: null
createTime: 2018-08-21T11:50:56.000Z 
upateTime: 2019-08-30T02:29:48.000Z
wordCount: 170
layout: doc
---

# easywebpack 版本发布说明


## easywebpack4 -> Webpack4


### 支持 Webpack 4 插件版本

- easywebpack: ^4.x.x

- easywebpack-cli: ^3.x.x

- easywebpack-vue: ^4.x.x

- easywebpack-react: ^4.x.x

- easywebpack-html: ^4.x.x

- easywebpack-js: ^4.x.x

- egg-webpack: ^4.x.x

- webpack-tool: ^4.x.x

- webpack-manifest-resource-plugin: ^4.x.x



## easywebpack3 -> Webpack3


### 支持 Webpack 3 插件版本

- easywebpack: ^3.x.x

- easywebpack-cli: ^3.x.x

- easywebpack-vue: ^3.x.x

- easywebpack-react: ^3.x.x

- easywebpack-html: ^3.x.x

- easywebpack-js: ^3.x.x

- egg-webpack: ^3.x.x

- webpack-tool: ^3.x.x

- webpack-manifest-resource-plugin: ^2.x.x



## 特殊说明

- easywebpack3 默认开启  `sass-loader`, easywebpack4 默认禁用  `sass-loader`, 如果要开启：


```
loaders:{
  sass: true
}
```

- `webpack.config.js`  easywebpack4  plugins 节点配置简化,  无需 `args`  节点


     [https://www.yuque.com/hubcarl/easywebpack/plugin](https://www.yuque.com/hubcarl/easywebpack/plugin)<br />![](https://cdn.nlark.com/yuque/0/2018/png/116733/1534852230636-f1b7a2c1-953e-49c1-b0e5-a97250ae403b.png#width=827) 


  