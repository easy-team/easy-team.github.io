
---
id: 2865297
space: res
slug: dev
url: /res/dev
title: 本地开发
summary: Node 调试res debug 启动应用然后复制   chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9999/__ws_proxy__    到 chro...
coverImage: null
createTime: 2019-10-15T11:48:08.000Z 
upateTime: 2019-10-15T11:48:08.000Z
wordCount: 222
layout: doc
---

## Node 调试

> - res debug 启动应用

> - 然后复制   chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9999/__ws_proxy__    到 chrome 地址栏，进入 Sources Tab，在指定的代码处打断点即可调试，更多请见 [vscode 调试](https://github.com/atian25/blog/issues/25)



```bash
res debug
```



## 构建调试

> - res build webpack 编译, 会进行文件 hash, minify

> - res tsc  TypeScript 编译

> - res print 检查 Webpack 配置 是否生效或者正确



- **res build webpack 编译**


```javascript
res build // webpack 编译

res build --server // webpack 编译后，启动静态 server 访问直接静态文件
```

- **res tsc TypeScript 编译 Node 端**（本地直接 ts-node 运行，发布模式需要编译成 js 文件)


```bash
res tsc
```

- **res print 检查 Webpack 配置 是否生效或者正确**


```javascript
res print --help  // 查看命令使用

res print   // 打印 webpack 配置

res print --web 打印前端 webpack 配置

res print -n module.rules[0].use[0] // 通过 lodash 获取配置指定节点
```


  