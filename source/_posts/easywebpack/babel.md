
---
id: 940880
space: easywebpack
slug: babel
url: /easywebpack/babel
title: Babel 配置
summary: Babel 版本说明easywebpack 体系目前内置 Babel 为 6 ，因涉及底层改动以及兼容等问题，为了保证现有已经运行项目的稳定性，暂还没有从框架层进行内置修改，目前提供两种方式进行升级 Babel 7。方式一：使用 @easy-team 插件依赖为了更方便升级 Babel7, 同...
coverImage: null
createTime: 2019-10-25T03:46:26.000Z 
upateTime: 2019-10-25T03:46:26.000Z
wordCount: 827
layout: doc
---

### Babel 版本说明

easywebpack 体系目前内置 Babel 为 6 ，因涉及底层改动以及兼容等问题，为了保证现有已经运行项目的稳定性，暂还没有从框架层进行内置修改，目前提供两种方式进行升级 Babel 7。<br />

- **方式一：使用 @easy-team 插件依赖**

为了更方便升级 Babel7, 同时尽量减少配置且无需安装 @babel 依赖，@easy-team 模式直接内置 Babel 7 的相关依赖，只需要把 easywebpack 依赖模式改成 @easy-team/easywebpack 模式以及修改 .babelrc 的插件为 [@babel](#) 模式。如果代码中直接依赖了也请一并修改。

  - @easy-team/easywebpack-cli: ^4.0.0 替换  easywebpack-cli
  - @easy-team/easywebpack-react: ^4.0.0 替换  easywebpack-react
  - @easy-team/easywebpack-vue: ^4.0.0 替换  easywebpack-vue
  - .babelrc 依赖的插件修改为  @babel 模式， 插件对应关系见 [babel 升级](https://www.yuque.com/easy-team/easywebpack/babel7)

- **方式二：覆盖内置 babel 依赖和配置  **


<br />[https://www.yuque.com/easy-team/easywebpack/babel7](https://www.yuque.com/easy-team/easywebpack/babel7)

### 

### 内置默认 .babelrc 配置
> <br />> 进一步简化babel 配置，easywebpack 解决方案内置基本的 babel 配置，无特殊要求，一般无需配置.babelrc 文件


- easywebpack 内置默认配置(^4.9.0)


[https://github.com/easy-team/easywebpack/blob/master/config/.babelrc](https://github.com/easy-team/easywebpack/blob/master/config/.babelrc)

- easywebpack-vue 内置默认配置(^4.3.0)


[https://github.com/easy-team/easywebpack-vue/blob/master/config/.babelrc](https://github.com/easy-team/easywebpack-vue/blob/master/config/.babelrc)

- easywebpack-react 默认配置(^4.4.0)


    [https://github.com/easy-team/easywebpack-react/blob/master/config/.babelrc](https://github.com/easy-team/easywebpack-react/blob/master/config/.babelrc)


### 自定义 babel.config.js  配置覆盖默认配置


#### babel7 请使用 babel.config.js 配置,  内容为 module.exports = {}  JSON  格式

> ${root}/babel.config.js


```json
module.exports = {
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
  "comments": false
};
```


#### babel6 请使用 .babelrc 文件配置,  内容为 JSON 格式

> ${root}/.babelrc


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
  "comments": false
}
```


## 支持 SSR 模式分别配置


#### 背景
在进行 Vue/React SSR 模式开发时，运行 `npm run dev`  后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。SSR 运行需要 Webapck 单独构建 `target: node`   和 `target: web`  主要的差异在于 Webpack需要处理 require 机制以及磨平 Node 和 浏览器运行环境的差异。

![](/medias/easyjs/easywebpack/easywebpack-babel-4220537.png)

在 `easywebpack` 4.6.0 以下 SSR 版本构建方案实现时，Node 和 Web 模式采用的是一份 `.babelrc`  配置，这样导致构建的后代码全部变成 es5。 但 Node 现在LTS 版本已经是 10 了，而且 12 也在开发，不久将会发布。这样导致 Node 端构建的代码没有用到 ES6，ES7，ES8 等特性，我们期望根据 Node 版本构建指定 ES 模式代码，这样可以带来两个好处：

- Node 端运行的 ES 模块更好的执行效率

- Node 端编译成 Current Node  支持的最高 ES，可以减小构建好的 JSBundle 文件大小和编译转换时间，同时带来更好的文件读取效率和执行效率。



#### 解决方案

- Egg + Vue 配置优化：[https://www.yuque.com/easy-team/egg-vue/babel](https://www.yuque.com/easy-team/egg-vue/babel)

- Egg + React 配置优化：[https://www.yuque.com/easy-team/egg-react/babel](https://www.yuque.com/easy-team/egg-react/babel)



## babel 升级

- [https://www.yuque.com/easy-team/easywebpack/babel7](https://www.yuque.com/easy-team/easywebpack/babel7)


  