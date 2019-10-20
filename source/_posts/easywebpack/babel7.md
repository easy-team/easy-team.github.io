
---
id: 940934
space: easywebpack
slug: babel7
url: /easywebpack/babel7
title: Babel 升级
summary: easywebpack 体系目前内置 Babel 为 6 ，因涉及底层改动以及兼容性等问题，为了保证现有已经运行项目的稳定性，暂还没有从框架层进行内置修改，目前提供两种方式进行升级 Babel 7。方式一：基于 easy-team 插件模式 Babel 快速升级方案为了更方便升级 Babel7...
coverImage: null
createTime: 2019-10-13T12:38:38.000Z 
upateTime: 2019-10-13T12:38:38.000Z
wordCount: 752
layout: doc
---

easywebpack 体系目前内置 Babel 为 6 ，因涉及底层改动以及兼容性等问题，为了保证现有已经运行项目的稳定性，暂还没有从框架层进行内置修改，目前提供两种方式进行升级 Babel 7。



## 方式一：基于 easy-team 插件模式 Babel 快速升级方案

为了更方便升级 Babel7, 同时尽量减少配置且无需安装 @babel 依赖，@easy-team 模式直接内置Babel 7 的相关依赖，只需要把 easywebpack 依赖模式改成 @easy-team/easywebpack 模式，如果代码中直接依赖了也请一并修改。

@easy-team/easywebpack-cli: ^4.0.0 替换  easywebpack-cli<br />@easy-team/easywebpack-react: ^4.0.0 替换  easywebpack-react<br />@easy-team/easywebpack-vue: ^4.0.0 替换  easywebpack-vue

## 


## 方式二：基于 easywebpack@4 直接升级

直接基于 easywebpack@4 直接升级，通过在项目 package.json 中显示安装 babel7 相关依赖升级

```bash
easy upgrade --babel
```



## 重大修改

- babel 6 babel-* 的命名方式统一改成 @babel/*-* 命名空间方式

- 废弃 `stage-x`插件配置，需要显示配置各 babel 插件

- 支持 typescript 编译



## 插件修改

- 插件映射对比

| **Babel 6** | **Babel 7** |
| --- | --- |
| babel-core | @babel/core |
| babel-plugin-transform-class-properties | @babel/plugin-proposal-class-properties |
| babel-plugin-transform-object-rest-spread | @babel/plugin-proposal-object-rest-spread |
| babel-plugin-syntax-dynamic-import | @babel/plugin-syntax-dynamic-import |
| babel-plugin-transform-object-assign | @babel/plugin-transform-object-assign |
| babel-plugin-transform-runtime | @babel/plugin-transform-runtime |
| babel-preset-env | @babel/preset-env |
| babel-preset-react | @babel/preset-react |
| babel-loader@7 | babel-loader@8 |

- babel 7 相关插件版本


```json
"@babel/core": "^7.0.0",
"@babel/plugin-proposal-class-properties": "^7.0.0",
"@babel/plugin-proposal-object-rest-spread": "^7.0.0",
"@babel/plugin-syntax-dynamic-import": "^7.0.0",
"@babel/plugin-transform-object-assign": "^7.0.0",
"@babel/plugin-transform-runtime": "^7.0.0",
"@babel/preset-env": "^7.0.0",
"@babel/preset-react": "^7.0.0",
"babel-loader": "^8.0.0",
```


## Vue 项目 .babelrc 配置对比

- Babel6 配置([https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/4.0.0](https://github.com/easy-team/egg-vue-webpack-boilerplate/tree/4.0.0))


```json
{
  "presets": [["env",{ "modules": false }]],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-object-assign"
  ],
}
```

- Babel7 配置([https://github.com/easy-team/egg-react-webpack-boilerplate/tree/babel7](https://github.com/easy-team/egg-react-webpack-boilerplate/tree/babel7))


```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "last 2 versions",
            "safari >= 7"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-object-assign"
  ],
}
```


## React 项目.babelrc 配置对比

- Babel6 配置([https://github.com/easy-team/egg-react-webpack-boilerplate/tree/4.3.0](https://github.com/easy-team/egg-react-webpack-boilerplate/tree/4.3.0))


```json
{
  "presets": [
    "react", ["env", {
      "modules": false
    }]
  ],
  "plugins": [
    "transform-object-assign",
    "syntax-dynamic-import",
    "transform-object-rest-spread", ["import", {
      "libraryName": "antd",
      "style": "css"
    }]
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  },
}
```

- Babel7 配置([https://github.com/easy-team/egg-react-webpack-boilerplate/tree/babel7](https://github.com/easy-team/egg-react-webpack-boilerplate/tree/babel7))


```json
{
  "presets": [
    "@babel/preset-react", 
    ["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties", 
    ["import", {
      "libraryName": "antd",
      "style": "css"
    }]
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  },
}
```


## 项目升级

> 以下步骤可以通过 工具 [babel-upgrade](https://github.com/babel/babel-upgrade) --write  一键升级


- 请在项目中显示安装  babel 7 相关插件（devDependencies 中添加 babel 7 相关插件依赖，删除babel 6 相关插件)

- 修改 .babelrc 配置文件

- 重新 `npm install`   or `yarn install`  安装依赖



## 工具自动升级

> 升级时，如果 package.json 中没有显示依赖 babel 6 的插件，不会主动在 package.json 添加babel依赖，请手动添赖。


[https://github.com/babel/babel-upgrade](https://github.com/babel/babel-upgrade)







  