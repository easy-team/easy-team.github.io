
---
id: 2865644
space: res
slug: asset
url: /res/asset
title: Asset 渲染模式
summary: React + Nunjucks Asset前端渲染https://easy-team.github.io/egg-react/asset  ${root}/app/controller/render.tsimport { Controller, Context } from '@ea...
coverImage: null
createTime: 2019-10-15T12:32:42.000Z 
upateTime: 2019-10-15T12:32:42.000Z
wordCount: 265
layout: doc
---

## React + Nunjucks Asset前端渲染

> [https://easy-team.github.io/egg-react/asset](https://easy-team.github.io/egg-react/asset)  



#### ${root}/app/controller/render.ts

```typescript
import { Controller, Context } from '@easy-team/res';
export default class AdminController extends Controller {
  public async home(ctx: Context) {
     await ctx.renderAsset('asset.js', { 
      title: 'React Asset Client Render',
      text: 'Egg + React + TypeScript + Webpack Client Side Render' 
    }, { layout: path.join(ctx.app.baseDir, 'app/web/view/layout.tpl'),} );
  }
}
```



#### ${root}/app/web/view/layout.tpl 

 renderAsset 自动注入资源依赖对象，然后自己根据 asset 对象进行 CSS和 JS 注入到 HTML 页面。

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>{{title}}</title>
  <meta name='keywords'>
  <meta name='description'>
  <meta http-equiv='content-type' content='text/html;charset=utf-8'>
  <meta name='viewport' content='initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'>
  <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
  {% for item in asset.css %}
    <link rel="stylesheet" href='{{item}}' />
  {% endfor %}
</head>
<body>
  <div id='app'></div>
  <script type="text/javascript">
    window.__INITIAL_STATE__ = {{ asset.state | safe }};
  </script>
  {% for item in asset.js %}
    <script type="text/javascript" src="{{item}}"></script>
  {% endfor %}
</body>
</html>
```


  