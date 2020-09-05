
---
id: 3415456
space: egg-react
slug: learn
url: /egg-react/learn
title: 工程介绍
summary: Egg React 工程解决方案特性支持Node 端基于 Egg 开发，遵循 Egg 开发规范和 Egg 生态，支持 Egg 所有特性，比如插件机制，多进程机制。使用 TypeScript 或 JavaScript 编写前端和Node端代码，支持 ts-node 无编译 和 Webpack 编...
coverImage: null
createTime: 2019-12-01T07:41:05.000Z 
upateTime: 2019-12-01T07:41:05.000Z
wordCount: 2168
layout: doc
---

## Egg React 工程解决方案特性支持

- Node 端基于 Egg 开发，遵循 Egg 开发规范和 Egg 生态，支持 Egg 所有特性，比如插件机制，多进程机制。<br />
- 使用 TypeScript 或 JavaScript 编写前端和Node端代码，支持 ts-node 无编译 和 Webpack 编译开发模式。<br />
- 前端基于 React 框架，默认支持 React 服务端渲染，前端渲染模式，Asset 渲染，HTML 渲染多种渲染模式。
- 集成 Css/Sass/Less/Stylus 以及 Css Module 多种样式编写构建支持， 可以按需选用。
- 整合 Egg,  Webpack, TypeScript 构建工具，内置多进程，Webpack DLL和缓存等编译提速解决方案，并提供强大的 CLI 开发工具。

## ![egg-react-webpack-mini.png](/medias/easyjs/egg-react/egg-react-learn-egg-react-webpack-mini-6685779.png)
整个设计实现遵循**插件化，可组装，可扩展，可替换**思路进行设计实现，充分利用 Egg，React，Webpack 相关周边生态，不进行任何的深度封装，平时怎么写 Egg，React 代码就怎么写，同时又可以自由组合以及扩展；重点解决各种技术框架整合复杂性，开发流程与体验问题，可扩展性，稳定性以及性能等工程化问题。这样才有了整个 easy 的建设体系以及不断的进行技术演进。



## Egg React 工程解决方案 与 Next，Beidou 框架有何区别？

Egg React 工程化解决方案不仅仅解决渲染问题，渲染只是整个工程化中的一个环节，基于 Egg 企业级 Node 开发框架和成熟生态，在 Node 方面你可以做很多事情，同时解决 Egg, React, Webpack 相关技术的**工程化(框架整合，开发流程，开发体验，扩展性，稳定与性能等)**问题，充分利用现有的 Egg，Webpack，React，TypeScript 等技术框架能力，然后进行合理的模块化和解耦设计，使得整个体系能够自由组合和拓展(你可以使用 JavaScript，也可以是 TypeScript，你可以独立使用 React 渲染，也可以使用 React Nunjucks/ejs 混合渲染)，同时又不对具体使用的技术进行过多的封装与限制，特别是涉及业务开发要写 Egg 和 React 代码，这里没有任何的封装和限制，所有代码都是透明的，自由灵活。但这样相对来说，刚开始对新手可能上手理解稍微困难一点，但只要对 Egg，React，Webpack 相关技术有一点了解后，结合本系列相关文章，你很快就能完整的掌握整个工程体系的设计流程和详细细节。之后如果你又需要打造自己的工程化方案，你就可以很容易的实现自己的个性化工程化方案，比如[基于 Egg + React 上层 Node 框架 Res ](https://www.yuque.com/easy-team/res)，Res 对整个 Egg React 工程方案进行封装，屏蔽了上面说的众多细节。同时针对新手问题，整个体系提供了多种骨架方案，可以通过工程套件快速初始化。<br />

- 遵循 Egg 开发规范生态，支持 Egg 所有特性，开发模式与普通 Egg 项目一样，对 Egg 使用无任何封装限制。
- 在 React 使用方面没有任何限制和封装，平时怎么写 React 应用就怎么写 React 代码，所有代码透明。
- 在 Webpack 工程构建方面进行了一定简化抽象封装，但兼容 Webpack 原生配置，可以随意扩展与修改
- 提供 SSR，CSR， Asset，Nunjucks 等多种渲染方式，可以根据业务特性进行自由选择和扩展。
- 在公共包，异步加载，构建打包性能，渲染性能等方面进行了工程化建设，项目可以无缝应用。
- 整个工程体系搭建都是基于插件方式实现，可以自由组合和扩展，非常容易构建自己的个性化解决方案。



## Egg React 服务端渲染相关知识点介绍



#### 什么是 React 服务端渲染（SSR - Server Side Render) ？

React 服务端渲染指的是编写的 React 组件在 Node 服务端直接编译成完整的HTML, 然后直接输出给浏览器，用户就能快速的看到内容. 服务端渲染的页面在浏览器里面你右键源代码可以看到完整的 HTML页面结构, 包括 id='app' 节点里面所有内容； 而目前所说的 React 前端渲染你只能看到简单的 html, body,  script 结构，id='app' 节点里面的实际内容在浏览器前端渲染出来的。<br />
<br />服务端渲染相比前端渲染，更好的支持SEO，更快的首屏渲染，React 服务端渲染相比传统的模板引擎，更好的组件化，前后端模板共用。 同时 MVVM 数据驱动方式有着更快的开发效率。总体来说，MVVM 框架的服务端渲染技术比较适合有一定交互性，且对SEO，首屏速度有要求的业务应用。当然, 如果想用于不属于该类型的项目(比如各种后台管理系统)也是可以的, 就当纯粹的技术学习也是一种不错的选择。


#### Egg React SSR Webpack 如何构建, 与普通 Webpack 构建有何区别？

<br />![image.png](/medias/easyjs/egg-react/egg-react-learn-image-3250284.png)<br />
<br />React 服务端渲染构建是需要构建两份 JSBundle 文件。SSR 模式开发时，SSR 运行需要 Webapck 单独构建 target: node 和 target: web 的JSBundle，主要的差异在于 Webpack需要处理 require 机制以及磨平 Node 和浏览器运行环境的差异。服务端的JSBundle用来生产HTML，客户端的JSBundle需要script到文档，用来进行事件绑定等操作，也就是 React 的 hydrate 机制。


#### Egg Webpack 本地开发构建文件是放到内存中，SSR 如何读取文件进行渲染？
在进行 Egg + React 进行 SSR 模式开发时，运行 npm run dev 后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。具体实现见[ egg-webpack ](https://github.com/easy-team/egg-webpack)代码实现。<br />

- 本地开发启动 Webpack 构建, 默认配置文件为项目根目录 `webpack.config.js` 文件。 SSR 需要配置两份 Webpack 配置，所以构建会同时启动两个 Webpack 构建服务。web 表示构建 JSBundle 给前端用，构建后文件目录 `public`, 默认端口 9000; node 表示构建 JSBundle 给 Node 端渲染用，构建后文件目录 `app/view`, 默认端口 9001.<br />
- 本地构建是 Webpack 内存构建，文件不落地磁盘，所以 `app/view` 和 `public` 在本地开发时，是看不到文件的。 只有发布模式(npm run build)才能在这两个目录中看到构建后的内容。<br />


![](/medias/easyjs/egg-react/egg-react-learn-3432749.png)



#### Egg React SSR 发布模式如何渲染？

1.Webpack通过本地构建或者ci直接构建好服务端文件和客户端资源文件到磁盘<br />2.Egg render直接读取本地文件, 然后渲染成 HTML<br />3.根据 manfifest.json 文件注入 jss/css资源依赖注入<br />4.模板渲染完成, 服务器输出HTML内容给浏览器



## Egg React 骨架特性支持介绍

GitHub： [https://github.com/easy-team/egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate)

- 基于 React 多页面/单页面服务端渲染, 前端渲染以及 asyncData 同构实现
- 支持服务端渲染失败时, 自动降级为前端渲染模式; 支持 react-loadable 异步组件渲染
- 数据层面进行了简单设计，支持 FileDB，MySQL，Mongo 接口
- 支持 Node 和 前端代码修改 Webpack 时时编译和热更新
- 支持服务端渲染 和 纯前端渲染 以及 Nunjucks React 混合渲染
- 支持自动根据 jsx 文件构建 Webpack entry 入口文件
- 支持 css, sass, scss, less, stylus  样式编写
- 支持 css module , 且同时支持 css 和 css module 共存的情况
- 支持 react-router, react-redux 服务端渲染(SSR)和前端渲染(CSR)
- 支持 Webpack dll 自动化构建, 与多进程编译结合，构建速度减少 2/3
- Node 8 版本的 async 和 await 特性, Controller 采用 class 方式编写

![image.png](/medias/easyjs/egg-react/egg-react-learn-image-6806063.png)


![image.png](/medias/easyjs/egg-react/egg-react-learn-image-3892291.png)

  