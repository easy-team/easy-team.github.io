
---
id: 1111327
space: blog
slug: og9ogk
url: /blog/og9ogk
title: vscode 插件开发
summary: 插件初始化安装Yeoman和VS Code脚手架npm install -g yo generator-code生成项目模版yo code插件开发https://marketplace.visualstudio.com/items?itemName=hubcarl.vscode-easy-pl...
coverImage: null
createTime: 2019-01-04T05:44:18.000Z 
upateTime: 2019-06-15T16:06:25.000Z
wordCount: 84
layout: doc
---

## 插件初始化

- 安装Yeoman和VS Code脚手架

```bash
npm install -g yo generator-code
```

- 生成项目模版


```bash
yo code
```

## 

## 插件开发

[https://marketplace.visualstudio.com/items?itemName=hubcarl.vscode-easy-plugin#overview](https://marketplace.visualstudio.com/items?itemName=hubcarl.vscode-easy-plugin#overview)



## 插件发布

- 注册账号: [https://visualstudio.microsoft.com/zh-hans/team-services/](https://visualstudio.microsoft.com/zh-hans/team-services/)
- 创建 Personal Access Token：https://[username].visualstudio.com/_usersSettings/tokens 注意权限设置
- npm install -g vsce
- vsce create-publisher
- vsce publish

  