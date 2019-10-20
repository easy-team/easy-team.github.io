
---
id: 940891
space: egg-react
slug: babel
url: /egg-react/babel
title: Babel 配置
summary: 在进行 Egg + React 进行 SSR 模式开发时，运行 npm run dev  后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。
coverImage: null
createTime: 2019-01-11T09:43:18.000Z 
upateTime: 2019-05-27T06:34:59.000Z
wordCount: 659
layout: doc
---
在进行 Egg + React 进行 SSR 模式开发时，运行 `npm run dev`  后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。SSR 运行需要 Webapck 单独构建 `target: node`   和 `target: web`  主要的差异在于 Webpack需要处理 require 机制以及磨平 Node 和 浏览器运行环境的差异。

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1536128449742-0024eb69-d2c7-4e47-8426-ff2cc85396d5.png#width=827)

在 `easywebpack` 4.6.0 以下 SSR 版本构建方案实现时，Node 和 Web 模式采用的是一份 `.babelrc`  配置，这样导致构建的后代码全部变成 es5。 但 Node 现在LTS 版本已经是 8 了，而且 10 也在开发，不久将会发布。这样导致 Node 端构建的代码没有用到 ES6 的特性，我们期望根据 Node 版本构建指定 ES 模式代码，这样可以带来两个好处：

- Node 端运行的 ES6 模块更好的执行效率

- Node 端编译成 ES6，可以减小构建好的 JSBundle 文件大小和编译转换时间，同时带来更好的文件读取效率和执行效率。



## easywebpack 4.6.0 以下`.babelrc`  配置

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
  "comments": false
}
```



## easywebpack-react 4.4.0+ 支持 Node 和 Web 指定 ES 模式构建

> 注意： 升级 babel 7 后，不支持如下 env 方式配置 


**关键措施：** [bable 本身支持通过 process.env.BABEL_ENV  加载 .babelrc  配置文件](https://www.babeljs.cn/docs/usage/babelrc/):

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1536129170471-43b9b60e-a7da-47c3-8ad7-ef1ff7e56c22.png#width=827)

**如果.babelrc**``**   配置了 `env.node`  或者 `env.web`  节点配置，easywebpack 底层将自动设置  **[process.env.BABEL_ENV](https://www.babeljs.cn/docs/usage/babelrc/)** 变量， 启动 BABEL ENV 编译机制。easywebpack 底层支持  **[process.env.BABEL_ENV](https://www.babeljs.cn/docs/usage/babelrc/)** 支持  node 和 web 的 env  .babelrc**``**   节点配置。 另外关键的 target 配置：**

- `target.node` :  Node 环境编译模式，可以是指定版本，比如配置：8.9.3，也可以配置当前运行的node版本：current。

- `target.browsers` : Web 浏览器编译模式，可以配置浏览器的版本等



```json
{
  "env":{
    "node": {
      "presets": [
        "react",
        ["env", {
          "modules": false,
          "targets": {
            "node": "current"
          }
        }]
      ],
      "plugins": [
        "syntax-dynamic-import",
        "transform-object-rest-spread"
      ]
    },
    "web": {
      "presets": [
        "react",
        ["env", {
          "modules": false,
          "targets": {
            "browsers": ["last 2 versions", "safari >= 7"]
          }
        }]
      ],
      "plugins": [
        "react-hot-loader/babel",
        "transform-object-assign",
        "syntax-dynamic-import",
        "transform-object-rest-spread",
        ["import", {
          "libraryName": "antd",
          "libraryDirectory": "lib",
          "style": true
        }]
      ]
    }
  },
  
  "comments": false
}
```



## Babel 7 升级

[https://easy-team.github.io/easywebpack/babel7](https://easy-team.github.io/easywebpack/babel7)


  