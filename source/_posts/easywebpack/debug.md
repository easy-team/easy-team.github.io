
---
id: 685565
space: easywebpack
slug: debug
url: /easywebpack/debug
title: 开发调试
summary: 当我们使用 easywebpack 时， 遇到构建问题时，我们可以通过 easywebpack-cli 的  easy print 命令检查一下生成的 webpack config 配置是否正确。默认读取项目根目录下的 webpack.config.js 配置, 你可以通过 -f  参数指定指...
coverImage: null
createTime: 2019-06-28T15:13:02.000Z 
upateTime: 2019-06-28T15:13:03.000Z
wordCount: 1143
layout: doc
---
- 当我们使用 `easywebpack` 时， 遇到构建问题时，我们可以通过 `easywebpack-cli` 的  `easy print` 命令检查一下生成的 webpack config 配置是否正确。

- 默认读取项目根目录下的 `webpack.config.js` 配置, 你可以通过 `-f`  参数指定指定 cli 配置文件

- easywebpack print 默认打印 dev 模式配置信息



### 安装cli

```bash
npm i easywebpack-cli  -g
```

- 安装成功以后, 就可以在命令行中使用  `easy` 命令, 比如 `easy init`, `easy build`, `easy server`, `easy print`, `easy clean`, `easy open` 等. 如果是本地安装到项目依赖里面，可以使用 `npx easy` 运行本地命令。

- `easy build [env]` 和 `easy print [env]` 的 env 支持 `dev`, `test`, `prod` 三种模式, 默认开发模式

- 可以通过 `easy -h` 查看相关命令



### 编译

- 本地开发模式编译(无hash,启用热更新)


```bash
easy build dev
```

- 测试环境模式编译(hash, 移除调试代码)


```bash
easy build test
```

- 线上发布编译(hash, 移除调试代码，压缩代码)


```bash
easy build prod
```


### 清理

- 清理编译缓存文件，比如 DLL 缓存


```bash
easy clean
```

- 清理编译所有文件


```bash
easy clean all
```

- 清理自定义目录文件


```bash
easy clean ./dist
```


### 杀端口功能

在本地开发时, 时不时遇到端口占用问题, 特别时 windows 平台, 杀进程很繁琐, 通过 `easy kill` 可以快速实现杀掉端口占用进程。

```bash
easy kill 7001
easy kill 7001,9000,9001
```


### 构建大小分析

在项目开发时， 当页面构建的文件太大, 我们可以直接通过 cli 提供功能进行构建大小分析


#### 通过 -s 参数启动构建大小分析工具, 支持 analyzer(webpack-bundle-analyzer) 和 stats(stats-webpack-plugin) , 默认用 analyzer 插件。

> 如果运行时, 提示安装缺少插件，请先安装依赖


- 开发模式分析


```bash
easy build -s
```

- 测试模式分析, 移除开发辅助代码


```bash
easy build test -s
```

- 发布模式分析, 移除开发辅助代码, 压缩js/css/imagess以及hash


```bash
easy build prod -s
```

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528513212579-add62c3b-de8e-49bd-b4dc-7ebb8f126d3a.png#align=left&display=inline&height=565&originHeight=565&originWidth=1392&status=done&width=827)


#### 使用 stats(stats-webpack-plugin) 构建大小分析工具

> 如果运行时, 提示安装缺少插件，请先安装依赖


- 开发模式分析


```bash
easy build -s stats
```

- 测试模式分析, 移除开发辅助代码


```bash
easy build test -s stats
```

- 发布模式分析, 移除开发辅助代码, 压缩js/css/imagess以及hash


```bash
easy build prod -s stats
```

**运行后, 会生成  `client_stats.json` 文件,  然后通过以下两个工具可以清晰分析出项目文件层次结构和项目文件依赖大小**

- 打开 [webpack-chart](http://alexkuz.github.io/webpack-chart/) 然后上传 stat.json 文件，即可生成整体的项目文件层次结构图。<br />点击任何一个区域，进入子目录文件分析，这个工具只能提供一个整体的文件依赖结构。


![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528513227023-9b1f1ab6-f434-415b-9bbb-7d823094d8bd.png#align=left&display=inline&height=615&originHeight=615&originWidth=620&status=done&width=650)

- 打开 [analyse](http://webpack.github.io/analyse/) 然后上传stat.json文件，即可生成整个项目文件个数(包括vue文件，js，css， image， chunk等)，文件大小，文件依赖关系统计，可以很方便找出筛选出大的js，image， css，然后进行针对性的优化，信息很全，对优化文件大小有很大帮助，唯一不方便的是统计结果不能排序


![](https://cdn.yuque.com/yuque/0/2018/png/116733/1528513236394-625fa458-aeae-41d9-a7d9-cdc8d41197ba.png#align=left&display=inline&height=257&originHeight=257&originWidth=620&status=done&width=800)


### 打印配置

easywebpack print 打印 webpack 配置信息时通过 `lodash` 实现的，你可以使用 `lodash` 的相关语法打印配置信息。

```bash
easywebpack print -h
```

Usage: print [env] [options]

print webpack config, support print by env or config node key

Options:

```undefined
-n, --node [key]  print webpack config info by config node key, example: [module/module.rules/plugins] and so on
-h, --help        output usage information
```


#### 查看 webpack 所有配置

```bash
easy print
```


#### 查看 build/webpack.config.js 文件生产的 webpack配置

默认读取项目根目录下的 `webpack.config.js` 配置, 你可以通过 `-f`  参数指定指定 cli 配置文件

```bash
easy print -f build/webpack.config.js
```


#### 查看 webpack 配置 dll 配置

```bash
easy print --dll
```


#### 查看 webpack 浏览器构建模式配置

通过 -t 参数指定构建类型，也就是对应 `config.target`

```bash
easy print prod -t --web
```

or

```bash
easy print prod --web
```


#### 查看 webpack Node构建模式配置

通过 -t 参数指定构建类型，也就是对应 `config.target`

```bash
easy print prod -t server
```

or

```bash
easy print prod --node
```


#### 查看 webpack 配置 dll 配置

```bash
easy print --dll
```


#### 查看 webpack 配置 module 信息

```bash
easy print -n module
```


#### 查看 webpack 配置 entry 信息

```bash
easy print -n entry
```


#### 查看 webpack 配置发布 prod 模式 entry 信息

```bash
easy print prod -n entry
```


#### 查看 webpack 配置 module.rulues 信息

```bash
easy print -n module.rulues
```


#### 查看 webpack 配置 module.rulues 第三个loader信息

```bash
easy print -n module.rulues[2]
```


#### 查看 webpack 配置 plugins 信息

```bash
easy print -n plugins
```


#### 查看 webpack 配置 plugins 第三个 plugin 信息

```bash
easy print -n plugins[2]
```


  