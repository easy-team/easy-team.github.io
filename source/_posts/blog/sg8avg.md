
---
id: 1917539
space: blog
slug: sg8avg
url: /blog/sg8avg
title: Babel 构建优化
summary: 在进行 Egg + Vue 进行 SSR 模式开发时，运行 npm run dev  后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1560616304692-20f027c3-90d3-4ba1-b406-7c71f0838826.png
createTime: 2019-06-15T16:31:45.000Z 
upateTime: 2019-06-15T16:31:45.000Z
wordCount: 727
layout: doc
---

在进行 Egg + Vue 进行 SSR 模式开发时，运行 `npm run dev`  后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。SSR 运行需要 Webapck 单独构建 `target: node`   和 `target: web`  主要的差异在于 Webpack需要处理 require 机制以及磨平 Node 和 浏览器运行环境的差异。

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1536128449742-0024eb69-d2c7-4e47-8426-ff2cc85396d5.png#align=left&display=inline&height=83&originHeight=97&originWidth=962&status=done&width=827)

在 `easywebpack` 4.6.0 以下 SSR 版本构建方案实现时，Node 和 Web 模式采用的是一份 `.babelrc`  配置，这样导致构建的后代码全部变成 es5。 但 Node 现在LTS 版本已经是 8 了，而且 10 也在开发，不久将会发布。这样导致 Node 端构建的代码没有用到 ES6 的特性，我们期望根据 Node 版本构建指定 ES 模式代码，这样可以带来两个好处：


## easywebpack 4.6.0 以下`.babelrc`  配置

```json
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

- Node 端运行的 ES6 模块更好的执行效率<br />
- Node 端编译成 ES6，可以减小构建好的 JSBundle 文件大小和编译转换时间，同时带来更好的文件读取效率和执行效率。<br />


## easywebpack 4.7.0+ 支持 Node 和 Web 指定 ES 模式构建

> 注意： 升级 babel 7 后，不支持如下 env 方式配置


**关键措施：** [bable 本身支持通过 process.env.BABEL_ENV  加载 .babelrc  配置文件](https://www.babeljs.cn/docs/usage/babelrc/):

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1536129170471-43b9b60e-a7da-47c3-8ad7-ef1ff7e56c22.png#align=left&display=inline&height=295&originHeight=311&originWidth=871&status=done&width=827)

**如果.babelrc   配置了 `env.node`  或者 `env.web`  节点配置，easywebpack 底层将自动设置  **[process.env.BABEL_ENV](https://www.babeljs.cn/docs/usage/babelrc/)** 变量， 启动 BABEL ENV 编译机制。easywebpack 底层支持  **[process.env.BABEL_ENV](https://www.babeljs.cn/docs/usage/babelrc/)** 支持  node 和 web 的 env  .babelrc   节点配置。 另外关键的 target 配置：**

- `target.node` :  Node 环境编译模式，可以是指定版本，比如配置：8.9.3，也可以配置当前运行的node版本：current。<br />
- `target.browsers` : Web 浏览器编译模式，可以配置浏览器的版本等<br />


```json
{
  "env":{
    "node": {
      "presets": [["env", {
        "modules": false,
        "targets": {
          "node": "current" 
        }
      }]],
      "plugins": [
        "transform-object-rest-spread",
        "syntax-dynamic-import"
      ]
    },
    "web": {
      "presets": [["env", {
        "modules": false,
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        }
      }]],
      "plugins": [
        "transform-object-rest-spread",
        "syntax-dynamic-import",
        "transform-object-assign"
      ]
    }
  },
  "comments":false
}
```



## 构建效率和大小

合理的使用 BABEL 编译模式，能够极大提高构建速度和JS 文件大小。 通过测试，启用 BABEL_ENV 模式和合理的配置 targets.browsers 参数，对于大型的页面，能够显著提升构建速度。下面通过 `easy build prod`  针对 [https://github.com/hubcarl/egg-vue-webpack-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate) 测试的效果，页面比较简单，效果不明显。

| **模式** | **构建大小(app/app.js)** |
| --- | --- |
| 不启用BABEL按需编译 | 15.6 KiB |
| 启用BABEL按需编译 | 15.2 KiB |
|  |  |


## Babel 7 升级

[/easywebpack/babel7](/easywebpack/babel7)


  