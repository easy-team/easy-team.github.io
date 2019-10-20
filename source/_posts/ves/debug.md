
---
id: 951318
space: ves
slug: debug
url: /ves/debug
title: 本地开发调试
summary: Node 调试ves debug 启动应用然后复制   chrome-devtools://devtools/bundled/inspector.html?experiments=true&amp;v8only=true&amp;ws=127.0.0.1:9999/__ws_proxy__    到...
coverImage: null
createTime: 2018-11-07T08:35:25.000Z 
upateTime: 2019-10-08T07:37:00.000Z
wordCount: 217
layout: doc
---

## Node 调试

> - ves debug 启动应用

> - 然后复制   chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9999/__ws_proxy__    到 chrome 地址栏，进入 Sources Tab，在指定的代码处打断点即可调试，更多请见 [vscode 调试](https://github.com/atian25/blog/issues/25)



```bash
ves debug
```



## 构建调试

> - ves build webpack 编译, 会进行文件 hash, minify

> - ves tsc  TypeScript 编译

> - ves print 检查 Webpack 配置 是否生效或者正确



- **ves build webpack 编译**


```javascript
ves build // webpack 编译

ves build --server // webpack 编译后，启动静态 server 访问直接静态文件
```

- **ves tsc TypeScript 编译 Node 端**（本地直接 ts-node 运行，发布模式需要编译成 js 文件)


```bash
ves tsc
```

- **ves print 检查 Webpack 配置 是否生效或者正确**


```javascript
ves print --help  // 查看命令使用

ves print   // 打印 webpack 配置

ves print --web 打印前端 webpack 配置

ves print -n module.rules[0].use[0] // 通过 lodash 获取配置指定节点
```


  