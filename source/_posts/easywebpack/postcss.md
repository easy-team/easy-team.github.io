
---
id: 1291391
space: easywebpack
slug: postcss
url: /easywebpack/postcss
title: PostCss
summary: 默认配置// postcss.config.js module.exports = {   plugins: [     require('autoprefixer')({ overrideBrowserslist: ['iOS &gt;= 7', 'Android &gt;= 4.0'] }...
coverImage: null
createTime: 2019-08-02T05:35:21.000Z 
upateTime: 2019-08-02T05:35:22.000Z
wordCount: 112
layout: doc
---

## 默认配置


```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.0'] })
  ]
};
```



## 自定义配置
> 在项目根目录加 postcss.config.js 文件，然后配置相关插件， 会覆盖默认配置


```javascript
// ${app_root}/postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ['iOS >= 9', 'Android >= 4.4'] })
  ]
};
```



## 注意事项

如果构建时出现大量 browsers 错误，如下错误，**browsers** 改成 overrideBrowserslist<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1560908937022-4273c167-da09-4728-a338-a82bbe459b96.png#align=left&display=inline&height=264&name=image.png&originHeight=264&originWidth=598&size=114087&status=done&width=598)

具体见：[https://github.com/easy-team/easywebpack/issues/56](https://github.com/easy-team/easywebpack/issues/56)


  