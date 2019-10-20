
---
id: 922185
space: ves
slug: config
url: /ves/config
title: 项目配置
summary: 应用项目规范除了基础配置文件和特殊声明的文件外，所有代码文件已 .ts 作为后缀名详细情况请参考 https://github.com/easy-team/ves-admin  骨架项目规范               项目整体结构                               ...
coverImage: null
createTime: 2019-03-13T02:39:31.000Z 
upateTime: 2019-08-29T01:55:10.000Z
wordCount: 349
layout: doc
---

## 应用项目规范

> 除了基础配置文件和特殊声明的文件外，所有代码文件已 .ts 作为后缀名
> 详细情况请参考 [https://github.com/easy-team/ves-admin](https://github.com/ves-team/ves-admin)  骨架项目规范



               项目整体结构                                                                      web 前端工程结构<br />![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541574029096-69c9ce16-e34d-4ef4-8145-7807b76df1ef.png#align=left&display=inline&height=647&originHeight=634&originWidth=235&status=done&width=240)                                       ![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541574215994-09150745-1bd6-4ce5-b199-54d5af2f248a.png#align=left&display=inline&height=650&originHeight=686&originWidth=226&status=done&width=214)


## 默认配置

- `config/ves.config.js`  为 [easywebpack](https://easy-team.github.io/easywebpack) 构建配置文件，除 entry 外，一般无需额外配置(注意该文件为 js 文件)

- `config/tsconfig.json`  为 前后端 TypeScript 基础配置，后续考虑内置 ves 框架

- `tsconfig.json`  为 Node 端 TypeScript 基础配置，集成 `config/tsconfig.json` ， 后续考虑内置 ves 框架

- `app/web/tsconfig.json`  为前端 TypeScript 基础配置，集成 `config/tsconfig.json` 后续考虑内置 ves 框架



## 约束说明

- 前端渲染时，vue ssr 默认 layout 为  `node_modules/ves/app/web/view/layout.html`可以通过如下方式覆盖配置。无特殊要求，无需配置。


```javascript
//${root}/config/config.default.js
exports.vuessr = {
  layout: path.join(app.baseDir, 'app/web/view/layout.html'),
};
```

- 本地开发时，Webpack 编译文件在内存，ves build 时落地磁盘。Node 端运行文件存放到 `app/view` 目录，前端构建文件存放到 `app/public`  目录。框架已内置处理，无需关心。


- TypeScript 构建会在各目录生成 ts 对应的 js 文件，js 文件是被 Git 忽略的，同时需要配置 [vscode 隐藏 js 文件](https://github.com/Microsoft/vscode/issues/869)


```json
{
 "files.exclude": {
    "**/*.js": {
      "when": "$(basename).ts"
    }
  }
}
```



  