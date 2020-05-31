
---
id: 922184
space: ves
slug: quickstart
url: /ves/quickstart
title: 快速开始
summary: 项目初始化安装 ves-cli 命令行工具$ npm instal ves-cli -g
coverImage: null
createTime: 2019-03-13T02:39:07.000Z 
upateTime: 2019-10-09T03:42:38.000Z
wordCount: 456
layout: doc
---

## 项目初始化

- 安装 [ves-cli](https://github.com/ves-team/ves-cli) 命令行工具


```bash
$ npm instal ves-cli -g

$ ves --help

Commands:
  init [options]         init boilerplate
  dev                    start ves project for develoment mode
  start                  start ves project for production mode
  build [options] [env]  webpack building
  debug                  start project for develoment debug mode
  test                   unit test
  cov                    code cov
  add                    add tempplate or component
  print [options] [env]  print webpack config, support print by env or config key
  server [options]       static file web http server
  dll [env]              webpack dll build
  clean [dir]            webpack cache dir clean, if dir == "all", will clean cache dir and build dir
  open [dir]             open webpack cache dir
  kill [port]            kill port process
  upgrade [options]      upgrade project package to latest version
  tsc [options]          typescript compile
```


- 初始化项目


> 可以通过 ves init 和 [git clone](https://github.com/easy-team/ves-admin) 初始化代码


```bash
➜ $ ves init
$ ? please choose the boilerplate mode? create ves single page application
$ ? Please input project name: ves-app
$ ? Please input project description:
$ ? Please choose css style: css
$ ? Please choose the way to install dependency: none
$ [ves-cli]:query npm info of ves-admin
$ [ves-cli]:downloading https://registry.npmjs.org/ves-admin/-/ves-admin-0.3.0.tgz
$ [ves-cli]:extract to /var/folders/hj/fs_pkpfn7vdcg176058mb1540000gn/T/ves-cli-init
$ [ves-cli]:init ves-app project successfully!
$ [ves-cli]:Now, start coding by follow step:
$ 1) cd ves-app
$ 2) npm install or yarn install
$ 3) npm run dev or npm start
```

- 本地开发运行


> - 服务端渲染需要通过 Webpack 构建两份配置，一份给 服务端用，一份给客户端用

> - 前端渲染时，只需要构建一份配置，这个时候需要在 ves.config.js 加入 `target: web`  指定只构建前端运行文件



```bash
npm run dev
```

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541578430933-f9cc0e68-7955-4ede-a969-cb5426b17aa1.png#align=left&display=inline&height=305&originHeight=393&originWidth=962&status=done&width=827)

- 项目构建


```bash
npm run build
```

- 项目发布


npm run build 项目构建后，需要把构建后的文件和项目一起发布，可以排除所有 ts 结尾的文件。


## 模板代码


### Node代码
> 使用 json-typescirpt-mapper 实现 JSON to Model 和 Model to JSON 功能


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541573138183-86c9edca-5124-4305-b7b4-e93da95064ad.png#align=left&display=inline&height=219&originHeight=219&originWidth=633&status=done&width=633)


### 前端代码
> 前端使用 TypeScript [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 和 [vuex-class](https://github.com/ktsn/vuex-class) 插件


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541573069725-16015a06-ae7f-4eef-802b-f6aafabf540b.png#align=left&display=inline&height=208&originHeight=208&originWidth=631&status=done&width=631)



## 运行效果

> TypeScript 编写的 Vue 服务端渲染的单页面骨架项目


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541573127540-a1262ce5-9a88-4474-b157-0f8dffda998a.png#align=left&display=inline&height=262&originHeight=431&originWidth=1225&status=done&width=827)


  