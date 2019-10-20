
---
id: 685622
space: easywebpack
slug: abtuv0
url: /easywebpack/abtuv0
title: 基础配置
summary: 在使用相关方案时, 请在项目中添加 babel  和 postcss  基础配置文件添加
coverImage: null
createTime: 2018-06-09T03:44:02.000Z 
upateTime: 2019-06-10T10:21:54.000Z
wordCount: 131
layout: doc
---

### 在使用相关方案时, 请在项目中添加 `babel`  和 `postcss`  基础配置文件

- 添加 `${app_root}/.babelrc` 文件


具体根据实际情况添加相关 babel 插件配置，以下仅仅是举例：

```javascript
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

- 添加 `${app_root}/postcss.config.js` 文件


具体根据实际情况添加 postcss 配置，以下仅仅是举例：

```javascript
'use strict';
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```


  