
---
id: 2264395
space: easywebpack
slug: css
url: /easywebpack/css
title: Css Style
summary: 
coverImage: null
createTime: 2019-10-15T01:24:03.000Z 
upateTime: 2019-10-15T01:24:03.000Z
wordCount: 135
layout: doc
---


## 开启 Sass （默认禁用）

- webpack.config.js

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module:{
     rules:[
       {
         scss: true
       }
     ]
  }
}
```

- 添加 sass 依赖

 
```javascript
// ${app_root}/package.json
{
  "devDependencies": {
    "node-sass": "^4.5.3",
    "sass-loader": "^6.0.6",
  }
}
```


## 开启 Less （默认禁用）


- webpack.config.js

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module:{
     rules:[
       {
         less: true
       }
     ]
  }
}
```

- 添加 less 依赖

 
```javascript
// ${app_root}/package.json
{
  "devDependencies": {
    "less": "^2.7.2",
		"less-loader": "^4.0.5",
  }
}
```



## 开启 Stylus （默认禁用）

- webpack.config.js

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module:{
     rules:[
       {
         stylus: true
       }
     ]
  }
}
```

- 添加 stylus 依赖

 
```javascript
// ${app_root}/package.json
{
  "devDependencies": {
    "stylus": "^0.54.5",
		"stylus-loader": "^3.0.0",
  }
}
```



  