
---
id: 2865289
space: res
slug: quickstart
url: /res/quickstart
title: 快速开始
summary: 项目初始化安装 res-cli 命令行工具
coverImage: null
createTime: 2019-10-15T12:40:54.000Z 
upateTime: 2019-10-15T12:40:54.000Z
wordCount: 421
layout: doc
---

## 项目初始化

- 安装 [res-cli](https://github.com/easy-team/res-cli) 命令行工具


```bash
$ npm install @easy-team/res-cli -g

$ res --help

Commands:
  init [options]         init boilerplate
  dev                    start res project for develoment mode
  start                  start res project for production mode
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


> 可以通过 res init 和 [git clone](https://github.com/easy-team/res-awesome) 初始化代码


```bash
➜ $ res init
$ ? please choose the boilerplate mode? create res application
$ ? Please input project name: res-app
$ ? Please input project description:
$ ? Please choose css style: css
$ ? Please choose the way to install dependency: none
$ [res-cli]:query npm info of res-awesome
$ [res-cli]:downloading https://registry.npmjs.org/res-admin/-/res-awesome-1.0.0.tgz
$ [res-cli]:extract to /var/folders/hj/fs_pkpfn7vdcg176058mb1540000gn/T/res-cli-init
$ [res-cli]:init res-app project successfully!
$ [res-cli]:Now, start coding by follow step:
$ 1) cd res-app
$ 2) npm install or yarn install
$ 3) npm run dev or npm start
```

- 本地开发运行


> - 服务端渲染需要通过 Webpack 构建两份配置，一份给 服务端用，一份给客户端用

> - 前端渲染时，只需要构建一份配置，这个时候需要在 res.config.js 加入 `target: web`  指定只构建前端运行文件



```bash
npm run dev
```

![](/medias/easyjs/res/res-quickstart-437395.png)

- 项目构建


```bash
npm run build
```

- 项目发布


npm run build 项目构建后，需要把构建后的文件和项目一起发布，可以排除所有 ts 结尾的文件。


## 模板代码


### Node代码

> 渲染方式：React Server Render  | React Client Render  | React Nunjucks Render


![image.png](/medias/easyjs/res/res-quickstart-image-6648949.png)


### 前端代码

![image.png](/medias/easyjs/res/res-quickstart-image-8383250.png)![image.png](/medias/easyjs/res/res-quickstart-image-1976944.png)




## 

  