
---
id: 685691
space: egg-react
slug: build
url: /egg-react/build
title: 构建流程
summary: 基于Egg+React+Webpack构建流程1. 本地Egg项目启动首先执行node index.js 或者 npm run dev 启动 Egg应用在 Egg Agent 里面启动koa服务, 同时在koa服务里面启动Webpack编译服务挂载Webpack内存文件读取方法覆盖本地文件读取...
coverImage: null
createTime: 2018-12-14T09:56:06.000Z 
upateTime: 2019-06-05T07:33:41.000Z
wordCount: 1120
layout: doc
keywords: egg,egg react ssr,egg react server side render, ant ssr
description: Egg React Server Side Render(Egg React SSR) Webpack Babel 构建配置
---

## 基于Egg+React+Webpack构建流程


### 1. 本地Egg项目启动

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528523156331-68bdcd39-02b0-45ad-81df-5dd32a56307d.png#width=827)

- 首先执行`node index.js` 或者 `npm run dev` 启动 Egg应用

- 在 Egg Agent 里面启动koa服务, 同时在koa服务里面启动Webpack编译服务

- 挂载Webpack内存文件读取方法覆盖本地文件读取的逻辑


```javascript
app.react.render = (name, locals, options) => {
   const filePath = path.isAbsolute(name) ? name : path.join(app.config.view.root[0], name);
   const promise = app.webpack.fileSystem.readWebpackMemoryFile(filePath, name);
   return co(function* () {
     const code = yield promise;
     if (!code) {
       throw new Error(`read webpack memory file[${filePath}] content is empty, please check if the file exists`);
     }
     // dynamic execute javascript
     const wrapper = NativeModule.wrap(code);
     vm.runInThisContext(wrapper)(exports, require, module, __filename, __dirname);
     const reactClass = module.exports;
     if (options && options.markup) {
       return Promise.resolve(app.react.renderToStaticMarkup(reactClass, locals));
     }
     return Promise.resolve(app.react.renderToString(reactClass, locals));
   });
};
```

- Worker 监听Webpack编译状态, 检测Webpack 编译是否完成, 如果未完成, 显示Webpack 编译Loading, 如果编译完成, 自动打开浏览器

- Webpack编译完成, Agent 发送消息给Worker,  Worker检测到编译完成, 自动打开浏览器, Egg服务正式可用



### 2. 本地服务端渲染页面访问

- npm run dev


![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528523168052-7af7e67a-653a-4a4a-9f52-ace521dcd42c.png#width=827)

- 浏览器输入URL请求地址, 然后 Egg 接收到请求, 然后进入 Controller

- Node层获取数据后(Node通过http/rpc方式调用Java后端API数据接口), 进入模板render流程

- 进入render流程后, 通过worker进程通过调用 `app.messenger.sendToAgent` 发送文件名给Agent进程, 同时通过 `app.messenger.on` 启动监听监听agent发送过来的消

- Agent进程获取到文件名后, 从Webpack编译内存里面获取文件内容, 然后Agent 通过 `agent.messenger.sendToApp` 把文件内容发送给Worker进程

- Worker进程获取到内容以后, 进行React编译HTML, 编译成HTML后, 进入jss/css资源依赖流程

- 如果启动代理模式(见easywebpack的setProxy),  HTML直接注入相对路径的JS/CSS, 如下:

页面可以直接使用 `/public/client/js/vendor.js` 相对路径,  `/public/client/js/vendor.js` 由后端框架代理转发到webpack编译服务, 然后返回内容给后端框架, 这里涉及两个应用通信. 如下:

```html
<link rel="stylesheet" href="/public/client/css/home/android/home.css">
```

```javascript
<script type="text/javascript" src="/public/client/js/vendor.js"></script>
<script type="text/javascript" src="/public/client/js/home.js"></script>
```

- 如果非代理模式(见easywebpack的setProxy),  HTML直接注入必须是绝对路径的JS/CSS, 如下:

页面必须使用 `http://127.0.0.1:9000/public/client/js/vendor.js` 绝对路径

```html
<link rel="stylesheet" href="http://127.0.0.1:9000/public/client/css/home/android/home.css">
```

```javascript
<script type="text/javascript" src="http://127.0.0.1:9000/public/client/js/vendor.js"></script>
<script type="text/javascript" src="http://127.0.0.1:9000/public/client/js/home.js"></script>
```

其中 [http://127.0.0.1:900](http://127.0.0.1:9001)0 是 Agent里面启动的Webpack编译服务地址, 与Egg应用地址是两回事

- 最后, 模板渲染完成, 服务器输出HTML内容给浏览器.



### 3. 正式环境发布模式构建流程和运行模式

- Webpack通过本地构建或者ci直接构建好服务端文件和客户端资源文件到磁盘

- Egg render直接读取本地文件, 然后渲染成 HTML

- 根据 `manfifest.json` 文件注入 jss/css资源依赖注入

- 模板渲染完成, 服务器输出HTML内容给浏览器.



### 4. 关于 Egg 框架中的 Agent 和 Worker

- 我们利用本地开发修改Node层代码修复重启时, 只会重启Worker进程, 不会重启Agent进程, 我们可以在Agent里面启动Webpack编译服务解决Webpack compiler实例问题.

- 因为Egg App进程 和 Agent进程是两个进程, 当url访问时, 我们通过worker发送消息给agent进程, 获取服务端渲染的文件内容, 然后Agent再发送消息给Worker解决文件读取问题.

- 本地开发webpack热更新内存存储读取和线上应用本机文件读取逻辑分离功能, 我们通过本地开发模式时, 通过读取Webpack内存内容覆盖本地文件读取的逻辑, 这样在开发模式和发布模式可以无缝对接.

- worker和agent通信机制: [https://eggjs.org/zh-cn/core/cluster-and-ipc.html](https://eggjs.org/zh-cn/core/cluster-and-ipc.html)

- 实现egg项目服务器代码修改项目自动重启的功能可以使用egg-development插件.



  