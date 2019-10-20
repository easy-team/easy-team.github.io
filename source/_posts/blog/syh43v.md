
---
id: 1028456
space: blog
slug: syh43v
url: /blog/syh43v
title: npm 常用命令
summary: 原文： http://hubcarl.github.io/blog/2018/03/22/npm/npm 初始化 package.jsonnpm initnpm install 安装npm installnpm instal同时安装 package.json 配置 dependencies 和...
coverImage: null
createTime: 2019-04-03T03:19:29.000Z 
upateTime: 2019-06-29T08:36:35.000Z
wordCount: 971
layout: doc
---
> 原文： [http://hubcarl.github.io/blog/2018/03/22/npm/](http://hubcarl.github.io/blog/2018/03/22/npm/)



## npm 初始化 package.json

```bash
npm init
```


## npm install 安装

- npm install


```bash
npm instal
```

> 同时安装 package.json 配置 `dependencies` 和 `devDependencies` 依赖，**本地开发安装模式**


- npm install --prodcution


```bash
npm instal --prodcution
```

> 只会安装 package.json 配置 `dependencies` 依赖, **线上部署安装方式**



## npm 查看指定 pakcage 最新版本

```bash
npm view <package> version
```


## npm 查看 pakcage 所有版本

> --json : 可以完整显示所有版本号, 如果不加的这个，当版本号较多时, 会显示不全，直接显示 .....


```bash
npm view <package> versions --json
```


## npm 查看 pakcage 所有发布的 tag

```bash
npm dist-tag ls <package>
```


## npm 发布模块

```bash
npm publish
```

- `npm publish` 默认是把包发到 `latest` tag, 与 `npm publish --tag latest` 是一个意思

- `npm install <package>` 都是安装 `latest` tag 包



## npm 发布指定 tag

```bash
npm publish --tag next
```

> 当我们正在开发的包还不具备正式发布，但先发布用来测试，我们可以通过此种方式进行发布。 其他人通过 `npm install` 不受影响， 但可以显示指定安装 `npm install <package>@next`



## npm 把指定 tag 发布到 latest

```bash
npm dist-tag add <package>@<version> latest
```

```bash
npm dist-tag add easywebpack@4.0.0 latest
```


## npm 发布历史版本号

> 当我开发了一个 node 模块 `easywebpack` 时， 发布了 1.0.0， 2.0.0， 3.0.0(latest) 版本时, 现在 2.0.0 版本有一个 bug 修复, 该如何发布版本呢？


- 首先在 2.0.0 的 tag 或者 branch checkout 一个 2.0.1 bugfix 分支

- 修改完 bug 和 补充单元测试后, 开始发布代码

- 如果直接 `npm publish`, 这个时候 `latest` 就是 `2.0.1`, 而不是 `3.0.0`, 这个时候大家通过 `npm install easywebpack` 安装的就是 `2.0.1`

- 如果我已经这样做了，怎样快速让 `latest` 最新版本为 `3.0.0`, 可以这样做：


```bash
npm dist-tag add easywebpack@3.0.0 latest
```

此时 `latest` 版本恢复到 `3.0.0`, 刚发布的 `2.0.1` 版本依然有效。 当大家项目 `package.json` 依赖写的时 `^2.0.0` 时, `npm install` 安装时, 安装的是 `2.0.1` 版本。这个时候大家通过 `npm install easywebpack` 安装的就是 `3.0.0`.

你可以通过 `npm publish --tag 2.x` 方式发布历史版本。

- 修复历史版本的问题发布建议方式


我们可以在 2.0.0 分支的 `package.json` 里面加上如下配置

```json
{
  "publishConfig":{
    "tag": "2.x"
  }
}
```

加上以上配置，我们就可以愉快的使用 `npm publish` 了，不用再担心版本发错了。


### 修改 package.json 版本号

- 递增一个修订号


```bash
npm version patch
```
> 1.0.0 -> 1.0.1


- 递增一个次版本号


```bash
npm version minor
```
> 1.0.0 -> 1.1.0


- 递增一个主版本号


```bash
npm version major
```

> 1.0.0 -> 2.0.0




### 包发布到 Organizations

# npm publish --access public

## 

## npm 清除缓存

```bash
npm cache clean --force
```


## npm 指定 registry

```bash
npm install --registry https://registry.npm.taobao.org
```


## npm5 的 npx

`npx`: npm 5.2.0 内置的包执行器，可以直接运行本地 `node_modules` 安装的命令。 在这之前, 我们要在命令行直接运行一些命令，比如 `easywebpack-cli` , 就必须 `npm install -g easywebpack-cli` 全局安装的方式安装依赖才能在命令行直接运行命令。 有了 `npx` 我们不必全局安装了, 只要项目 `package.json` 依赖里安装的 `easywebpack-cli` 依赖, 我们可以直接 `npx easy` 运行。

- 全局安装


```bash
npm install -g  easywebpack-cli
```

> 命令行运行： `easy build`


- 本地安装


```bash
npm install  easywebpack-cli
```

> 命令行运行： `npx easy build`



## 检查本地更新

- 使用


```bash
npm outdated
```

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1543976467451-9f49472c-3f20-4151-ab01-875baa55361d.png#align=left&display=inline&height=259&originHeight=259&originWidth=540&status=done&width=540)

- 安装 `npm-check` 插件


> 安装npm-check：


```bash
npm install -g npm-check
```

> 检查npm包的状态:


```bash
npm-check -u
```

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1543976479041-717ba56c-2f4b-41f3-9095-f50a1583b542.png#align=left&display=inline&height=434&originHeight=434&originWidth=699&status=done&width=699)

[https://www.npmjs.com/package/npm-check](https://www.npmjs.com/package/npm-check)


## 快速初始化一个 npm 模块

```bash
git clone https://github.com/hubcarl/npm-package-template
```

- NPM Package Code Tempalate

- ESlint Rule Template ESlint

- NPM Unit Test Template chai

- Code Coverage Template codecov

- CI Build Config Template travis

- Changelog Create Template conventional-changelog



  