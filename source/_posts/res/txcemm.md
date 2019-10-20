
---
id: 2865288
space: res
slug: txcemm
url: /res/txcemm
title: 项目配置
summary: 应用项目规范遵循 Egg 项目开发规范，其中 app/web 目录为前端代码, config/res.config.js  为 webpack 配置文件本地开发 Webpack 内存构建，发布构建静态资源在 app/public  目录，服务端在 app/view  目录TypeScript ...
coverImage: null
createTime: 2019-10-16T14:10:20.000Z 
upateTime: 2019-10-16T14:10:20.000Z
wordCount: 396
layout: doc
---

## 应用项目规范

- 遵循 Egg 项目开发规范，其中 app/web 目录为前端代码, `config/res.config.js`  为 webpack 配置文件
- 本地开发 Webpack 内存构建，发布构建静态资源在 `app/public`  目录，服务端在 `app/view`  目录
- TypeScript 除了基础配置文件和特殊声明的文件外，所有代码文件已 .tsx 作为后缀名,  详细情况请参考 [https://github.com/easy-team/res-awesome](https://github.com/easy-team/res-awesome) 骨架项目规范



## 默认配置

- `config/res.config.js`  为 [easywebpack](https://easy-team.github.io/easywebpack) 构建配置文件，除 entry 外，一般无需额外配置(注意该文件为 js 文件)

- `config/tsconfig.json`  为 前后端 TypeScript 基础配置，后续考虑内置 res 框架

- `tsconfig.json`  为 Node 端 TypeScript 基础配置，集成 `config/tsconfig.json` ， 后续考虑内置 res 框架

- `app/web/tsconfig.json`  为前端 TypeScript 基础配置，集成 `config/tsconfig.json` 后续考虑内置 res 框架



## 约束说明

- 前端渲染时，res ssr 默认 layout 为  `node_modules/res/app/web/view/layout.html`可以通过如下方式覆盖配置。无特殊要求，无需配置。


```javascript
//${root}/config/config.default.js
exports.reactssr = {
  layout: path.join(app.baseDir, 'app/web/view/layout.html'),
};
```

- 本地开发时，Webpack 编译文件在内存，res build 时落地磁盘。Node 端运行文件存放到 `app/view` 目录，前端构建文件存放到 `app/public`  目录。框架已内置处理，无需关心。


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



  