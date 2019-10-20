
---
id: 685551
space: easywebpack
slug: build
url: /easywebpack/build
title: deploy
summary: 打包配置支持 webpack.config.js 文件配置 和 &nbsp;easyweback-cli 模式, &nbsp;easywebpack-cli@4.3.2 开始支持。注意打部署包时, 如果把 node 和 alinode 打进依赖包里面，请保证打包机器操作系统与线上运行的操作系统...
coverImage: null
createTime: 2019-08-25T05:22:56.000Z 
upateTime: 2019-08-25T05:25:56.000Z
wordCount: 1378
layout: doc
---

## 打包配置

> 支持 webpack.config.js 文件配置 和  easyweback-cli 模式,  easywebpack-cli@4.3.2 开始支持。注意打部署包时, 如果把 node 和 alinode 打进依赖包里面，请保证打包机器操作系统与线上运行的操作系统一致。目前已测试 Mac 系统，Windows 待测试。



### webpack.config.js 配置模式

**config.deploy {Object} 非必须**

- **filename**:  { String } 非必须, 默认是当前时间戳 YYYYDDhhmmss， 无需填写 zip 和 tar 后缀

- **source**: {Array} 非必须, 打包的文件，元素可以是目录和文件，默认  ['src', 'app', 'config', 'public', 'lib', 'app.js', 'index.js', 'agent.js', 'package.json']，会与自定义进行 merge 合并。

- **target**: {String} 非必须, 打包文件存放位置， 默认为系统的全局临时目录

- **mode**: { String } 非必须，依赖安装模式，支持 npm, cnpm, yarn, tnpm，如果配置了，就表示把依赖打进 node_modules

- **nodejs**: { Boolean|String|Object}  是否把 node 依赖打进 node_modules， 默认 false.  **当前不支持直接在 Window是系统中把 node 打进 node_modules 里面，具体见 **[**nodeinstall issue**](https://github.com/cnpm/nodeinstall/issues/13)。
  - Boolean: true  启用

  - String:  '10.13.0'  可以配置指定 node 版本

  - Object:  见 [https://github.com/cnpm/nodeinstall](https://github.com/cnpm/nodeinstall)  的 Options

- **alinode**: { Boolean|String|Object} 是否把 alinode 依赖打进 node_modules， 默认 false

  - Boolean: true   启用

  - String： 可以配置指定 alinode 版本

  - Object: 见 [https://github.com/cnpm/nodeinstall](https://github.com/cnpm/nodeinstall)  的 Options


- **done**: { Function } 打包完成后回调函数，参数为打包后的文件路径, 这里可以通过部署的平台的接口自动上传压缩包


```javascript
// ${root}/webpack.config.js
module.exports = {
 deploy: {
    mode: 'yarn', // 支持 npm, cnpm, yarn, tnpm , 
    nodejs: true, // 是否把 node 打进 node_modules, 默认 false
    filename: 'test',
    source: ['dist', 'package.json'],
    target: './zip',
    done(filepath) {
      console.log('>>filepath', filepath);
    }
 }
}
```


### easywebpack-cli 模式

- **easy zip 或 easy tar 命令行参数说明**


```bash
$ easy tar --help   // or  easy zip --help

Usage: tar [options]

archive files to tar file

Options:
  --filename [filename]  archive tar file name
  --source [path]        archive files root path
  --target [path]        archive zip file path
  --deps                 install dependencies into node_modules
  --mode [mode]          mode: npm, cnpm, tnpm, yarn and so on
  --registry [registry]  dependence install registry url
  --node                 install node into node_modules
  --alinode              install alinode into node_modules
  -h, --help             output usage information
```

- **easywebpack-cli zip --deps --nodejs 模式**


> **这里会把代码，构建文件，node_modules 以及 node 一起压缩程 zip， 这样线上在启动时就不需要按照依赖。当前不支持直接在 Window是系统中把 node 打进 node_modules 里面，具体见 **[**nodeinstall issue**](https://github.com/cnpm/nodeinstall/issues/13)。请使用与部署平台一致的打包机器进行打包，比如 linux 或 centos。


```bash
easy clean
easy build
easy zip --deps --nodejs
```

- **easywebpack-cli zip 模式：**


> **这里仅仅把代码，构建文件一起压缩程 zip， 这样线上在启动时需要运行 npm install --production 按照依赖。**


```bash
easy clean
easy build
easy zip
```


## 打包流程

在使用 `easywebpack` 工程化方式时， 我们会经常用到 `easy build dev`, `easy build test`, `easy build prod` 三个命令。从字面意思我们初步大概知道各自的含义，分别对应开发模式构建， 测试环境模式模式构建，正式环境模式构建， 那这三种模式有什么具体差别呢？


### 构建配置

在 `easywebpack` 解决方案里面， 默认支持了通过 env 参数支持了三套环境(`dev`, `test`, `prod`), 根据环境控制是否开启 Webpack 构建配置选项。

**config.env** : 非必需, 目前支持 `dev`, `test`, `prod` 三种环境.  4.8.0 以下版本是 dev，4.8.0 以上默认是 prod

> 使用 `easywebpack-cli` 构建时,无需配置该参数.环境变量配置从 `easy build [env]` env 参数获取。



### 环境说明


#### 开发环境(easy build dev)

- 开启 HMR 热更新,构建文件不落地磁盘

- js, css, image 禁用压缩

- js, css, image 禁用 Hash



#### 测试环境(easy build test)

- 禁用 HMR 热更新, 构建文件落地磁盘

- js, css, image 禁用压缩

- js, css, image 开启 Hash

- css 分离出独立的 css 文件



#### 正式环境(easy build prod)

- 禁用 HMR 热更新, 构建文件落地磁盘

- js, css, image 开启压缩

- js, css, image 开启 Hash

- css 分离出独立的 css 文件



### 打包部署

一般我们推荐把 `easy build dev`, `easy build test`, `easy build prod` 配置到 项目的 `package.json` 的 script 中去, 然后通过 npm run [command] 的方式使用。

- 通过 `npm run [command]` 方式使用 easy 命令时，不需要全局安装 `easywepback-cli` 命令行工具, 只需要把 `easywepback-cli` 安装到项目 `devDependencies` 即可。

- 在命令行直接使用 `easy` 命令时，需要全局安装 `easywepback-cli` 命令行工具。如果不安装, 可以通过 npm5 支持的 `npx easy` 方式运行。


```javascript
{
   "scripts": {
    "clean": "easy clean",
    "build": "easy build prod",
    "build:dev": "easy build dev",
    "build:test": "easy build test",
    "build:prod": "easy build prod"
   }
}
```

项目开发完成以后，我们要部署上线, 一般如下步骤:


#### 清除缓存

```bash
npm run clean
```


#### 开始构建

```bash
npm run build
```


#### 打包上传

> 这里需要你自己实现把构建好的文件和项目问题一起打成 zip 或 tar 包，然后上传到部署平台进行部署。


```bash
easy tar
```

- 需要把构建后的文件和配置文件进行打包部署，当然部分文件([README.md](http://README.md), eslint, gitignore等)可以不打进去。

- 如果 `node_modules` 在打包时也打进去，packjson.json 里面的 devDependencies 依赖是不需要打进去的，这些只在开发期间和 Webpack 构建期间用到，不需要打进去。如果打进去也没有问题，只是包非常大，部署上传是个问题。

- 如果 `node_modules` 在打包时不打进去，在**启动**之前，你需要先按照依赖 `npm install --production`



  