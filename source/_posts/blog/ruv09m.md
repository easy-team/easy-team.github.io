
---
id: 1917532
space: blog
slug: ruv09m
url: /blog/ruv09m
title: Egg SSR Webpack 内存编译热更新实现
summary: 
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1560616044583-df8c99ac-297d-44d0-a824-212947d3ef6d.png
createTime: 2019-06-15T16:29:11.000Z 
upateTime: 2019-06-15T16:29:11.000Z
wordCount: 1589
layout: doc
---

### 

## 1. 背景

在用 Node.js + Webpack 构建的方式进行开发时, 我们希望能实现修改代码能实时刷新页面UI的效果. 这个特性 Webpack本身是支持的, 而且基于koa也有现成的 koa-webpack-hot-middleware 和 koa-webpack-dev-middleware 封装好的组件支持.

不过这里如果需要支持Node.js服务器端修改代码自动重启webpack自动编译功能该如何实现呢, 主要存在以下几个问题:

- 如何解决 Node.js 服务器端代码修改应用重启避免 Webpack 重新编译.<br />
- 如何访问 js, css, image 等静态资源.<br />
- 服务端渲染时, Node 层如何读取 Webpack 内存编译的内容<br />
- 如何处理本地开发 Webpack 热更新内存存储读取和线上应用本机文件读取逻辑分离.<br />


## 2.构建热更新实现

> 前端渲染和服务端渲染构建热更新实现


在koa项目中, 通过 koa-webpack-dev-middleware 和 koa-webpack-hot-middleware 可以实现 Webpack 编译内存存储和热更新功能, 代码如下:

```javascript
const compiler = webpack(webpackConfig);
const devMiddleware = require('koa-webpack-dev-middleware')(compiler, options);
const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, options);
app.use(devMiddleware);
app.use(hotMiddleware);
```

如果按照上面实现, 可以满足修改修改客户端代码实现webpack自动变编译和UI界面热更新的功能.

但如果是修改 Node.js 服务器端代码重启后就会发现webpack会重新编译, 这不是我们要的效果.

原因是因为 middleware 是依赖 app 的生命周期, 当 app 销毁时, 对应 Webpack compiler 实例也就没有了, 重启时会重新执行middleware 初始化工作.

那有没有办法保持 Webpack 编译实例呢? 针对这个我们可以通过 Egg 框架已经内置了 worke r和 agent 机制来实现 Webpack内存编译功能.

- worker 和 agent 通信机制: [https://eggjs.org/zh-cn/core/cluster-and-ipc.html](https://eggjs.org/zh-cn/core/cluster-and-ipc.html)<br />
- 实现 egg 项目服务器代码修改项目自动重启的功能可以使用 egg-development 插件.<br />


## 3. Egg 框架中 Webpack 构建


### 3.1 解决思路

- 我们利用本地开发修改 Node 层代码修复重启时, 只会重启 Worker 进程, 不会重启 Agent 进程, 我们可以在 Agent 里面启动 Webpack 编译服务解决 Webpack compiler 实例问题.<br />
- 因为 Egg App 进程 和 Agent 进程是两个进程, 当 url 访问时, 我们通过 Worker 发送消息给 Agent 进程, 获取服务端渲染的文件内容, 然后 Agent 再发送消息给 Worker 解决文件读取问题.<br />
- 本地开发 Webpack 热更新内存存储读取和线上应用本机文件读取逻辑分离功能, 我们通过本地开发模式时, 通过读取Webpack 内存内容覆盖本地文件读取的逻辑, 这样在开发模式和发布模式可以无缝对接.<br />


### 3.2 本地开发模式


#### 3.2.1 Egg项目启动

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528521824273-8fc185c1-8124-4422-919e-33341ebff8c3.png#align=left&display=inline&height=594&originHeight=600&originWidth=836&status=done&width=827)

- 首先执行`node index.js` 或者 `npm run dev` 启动 Egg 应用<br />
- 在 Egg Agent 里面启动 koa 服务, 同时在koa服务里面启动 Webpack 编译服务<br />
- 挂载 Webpack 内存文件读取方法覆盖本地文件读取的逻辑<br />

```javascript
app.vue.renderBundle = (name, context, options) => {
  const filePath = path.isAbsolute(name) ? name : path.join(app.config.view.root[0], name);
  const promise = app.webpack.fileSystem.readWebpackMemoryFile(filePath, name);
  return co(function* () {
    const content = yield promise;
    if (!content) {
      throw new Error(`read webpack memory file[${filePath}]
      content is empty, please check if the file exists`);
    }
    return renderBundle.bind(app.vue)(content, context, options);
  });
};
```

- Worker 监听 Webpack 编译状态, 检测 Webpack 编译是否完成, 如果未完成, 显示 Webpack 编译 Loading, 如果编译完成, 自动打开浏览器<br />
- Webpack 编译完成, Agent 发送消息给 Worker,  Worker 检测到编译完成, 自动打开浏览器, Egg 服务正式可用<br />


#### 3.2.2 本地开发服务端渲染页面访问

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528521836714-be7dd0fe-f89d-4a50-af97-902f1d0fe50f.png#align=left&display=inline&height=548&originHeight=663&originWidth=1000&status=done&width=827)

- 浏览器输入URL请求地址, 然后Egg接收到请求, 然后进入Controller<br />
- Node层获取数据后(Node通过http/rpc方式调用Java后端API数据接口), 进入模板render流程<br />
- 进入render流程后, 通过worker进程通过调用 `app.messenger.sendToAgent` 发送文件名给Agent进程, 同时通过 `app.messenger.on` 启动监听监听agent发送过来的消<br />
- Agent进程获取到文件名后, 从Webpack编译内存里面获取文件内容, 然后Agent 通过 `agent.messenger.sendToApp` 把文件内容发送给Worker进程<br />
- Worker进程获取到内容以后, 进行Vue编译HTML, 编译成HTML后, 进入jss/css资源依赖流程<br />
- 如果启动代理模式(见easywebpack的setProxy),  HTML直接注入相对路径的JS/CSS, 如下:

     页面可以直接使用 `/public/client/js/vendor.js` 相对路径,  `/public/client/js/vendor.js` 由后端框架代理转发到webpack编译服务, 然后返回内容给后端框架, 这里涉及两个应用通信. 如下:<br />
```html
<link rel="stylesheet" href="/public/client/css/home/android/home.css">
```

- <br />
```javascript
<script type="text/javascript" src="/public/client/js/vendor.js"></script>
<script type="text/javascript" src="/public/client/js/home.js"></script>
```

- 如果非代理模式,  HTML直接注入必须是绝对路径的 JS/CSS , 如下:<br />
> 页面必须使用 `http://127.0.0.1:9001/public/client/js/vendor.js` 绝对路径

- <br />
```html
<link rel="stylesheet" href="http://127.0.0.1:9001/public/client/css/home/android/home.css">
```

- <br />
```javascript
<script type="text/javascript" src="http://127.0.0.1:9001/public/client/js/vendor.js"></script>
<script type="text/javascript" src="http://127.0.0.1:9001/public/client/js/home.js"></script>
```

- 其中 [http://127.0.0.1:9001](http://127.0.0.1:9001/) 是 Agent里面启动的Webpack编译服务地址, 与Egg应用地址是两回事
- 最后, 模板渲染完成, 服务器输出HTML内容给浏览器.<br />


### 4. 发布模式构建流程和运行模式

- easywebpack 通过本地构建或者ci直接构建好服务端和客户端渲染文件到磁盘, 命令是 `easy build prod`<br />
- Egg render 直接读取本地文件, 然后渲染成 HTML.<br />
- 根据 `manfifest.json` 文件注入 jss/css 资源依赖注入.<br />
- 模板渲染完成, 服务器输出HTML内容给浏览器.<br />



## 解决方案

- Egg + Vue：[/egg-vue/build](/egg-vue/build)
- Egg + React ： [/egg-react/build](/egg-react/build)

  