
---
id: 951101
space: ves
slug: node
url: /ves/node
title: Node 端开发
summary: 说明：Node 开发遵循 Eggjs  所有已有项目规范参考：https://github.com/easy-team/ves-admin服务端渲染在 Node 服务端运行 jsbundle，并渲染成完整的 HTML 内容返回给客户端使用 ctx.render 进行 Vue 服务端渲染， 文件名为 ...
coverImage: null
createTime: 2018-11-07T08:07:02.000Z 
upateTime: 2019-07-08T09:47:34.000Z
wordCount: 243
layout: doc
---
> 说明：Node 开发遵循 Eggjs  所有已有项目规范
> 参考：[https://github.com/easy-team/ves-admin](https://github.com/easy-team/ves-admin)




## 服务端渲染

> - 在 Node 服务端运行 jsbundle，并渲染成完整的 HTML 内容返回给客户端

> - 使用 ctx.render 进行 Vue 服务端渲染， 文件名为 webpack entry 的文件名，对应文件为 `app/view` 目录

> - ctx.render 渲染时，默认渲染失败会自动降级为客户端渲染模式



```typescript
import { Controller, Context } from 'ves';
export default class AdminController extends Controller {
  public async home(ctx: Context) {
    await ctx.render('admin/home.js', { url: ctx.url.replace(/\/admin/, '') });
  }
}
```



## 客户端渲染

> - 服务端只渲染 HTML 的 HTML，HEAD，BODY 标签结构，具体 BODY 内容由浏览器进行渲染

> - 使用 ctx.renderClient 进行 Vue 客户端渲染， 文件名为 webpack entry 的文件名，注入的页面 JS 文件为 app/public 文件。



```typescript
import { Controller, Context } from 'ves';
export default class AdminController extends Controller {
  public async home(ctx: Context) {
    await ctx.renderClient('admin/home.js', { url: ctx.url.replace(/\/admin/, '') });
  }
}
```


  