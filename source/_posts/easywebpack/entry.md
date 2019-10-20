
---
id: 685552
space: easywebpack
slug: entry
url: /easywebpack/entry
title: entry
summary: entry 基本配置config.entry : {String|Object}  Webpack 构建入口文件配置这里的entry 对 Webpack 的 entry 进行了增强， 除了支持 webpack 原生 Object(key:value) 方式配置， 还对entry进行了增强。We...
coverImage: null
createTime: 2019-06-28T16:06:10.000Z 
upateTime: 2019-06-28T16:06:10.000Z
wordCount: 869
layout: doc
---

## entry 基本配置

**config.entry** : {String|Object}  Webpack 构建入口文件配置

这里的entry 对 Webpack 的 entry 进行了增强， 除了支持 webpack 原生 Object(key:value) 方式配置， 还对entry进行了增强。


### Webpack entry 原生配置

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  ......
  entry:{
    home: path.join(__dirname, 'src/page/home/home.js')
  }
}
```


### Webpack entry 自动遍历配置

```javascript
// ${app_root}/webpack.config.js
module.exports = {
  ......
  entry:{
    include:['src/page']
    exclude:[]
  }
}
```

- **config.entry.include** : {String/Object/Array/Regex} 必选,  文件根目录可以不写

- **config.entry.exclude**: {String/Array/Regex} 可选, 排除不需要构建的文件或目录,  支持正则表达式.

- **config.entry.loader**:  {Object}, 可选, 为 entry 配置模板,  当配置后, 可以根据 `.vue` 和 `.jsx`文件自动创建 entry 文件, key为 `config.type` 枚举值.  [示例 ](https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/4.3.0/webpack.config.js)

- **config.entry.extMath**: {String}:, 可选, entry目录查找时匹配文件后缀, 默认 `.js`, 当配置了 `config.entry.loader` 和 `config.framework` 参数,自动映射后缀.



## entry 自定义初始化入口代码模板

> **在基于 Webpack 构建时, 我们通常都是用 js 作为 entry 入口问题, 这样需要自己写页面初始化的代码，这样导致入口代码重复繁琐,  需要简化.**
> 
> **在进行页面构建时, 我们希望有统一的入口模板功能, 这样进行页面构建和js构建时, 就不需要写同样的入口代码,  easywebpack  提供 entry.loader 模板功能.**


**在 Vue/React 项目构建时, 通过 loader 模板配置, 我们可以直接基于 .vue或.jsx 作为入口文件.**

```javascript
// ${app_root}/webpack.config.js
module.exports = {
 entry: {
   include: ['app/web/page', { 'app/app': 'app/web/page/app/app.js?loader=false' }],
   exclude: ['app/web/page/[a-z]+/component', 'app/web/page/app'],
   loader: { // 如果没有配置loader模板，默认使用 .js 文件作为构建入口
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
   }	
}
```

**配置说明：**

- app/web/page 目录中所有 .vue 文件当作 Webpack 构建入口. 客户端构建采用 `app/web/framework/vue/entry`  的 `client-loader.js` ,  服务端渲染构建使用 `server-loader.js`  模板文件。

- 上面 `{ 'app/app': 'app/web/page/app/app.js?loader=false' }`  这个 `loader=false`  的含义表示 `app/web/page`  目录下的 `app/app.js`  不使用 `entry.loader`  模板。因为这个app/app.js是一个SPA服务端渲染Example，实现逻辑与其他普通的页面不一样，不能用 entry.loader 模板， 这个功能在自定义entry文件构建规范时使用。



### entry 使用框架内置默认初始化代码模板 （easywebpack 4.8.0 新增支持）

**config.entry** : {String} 必选, 使用 [node-glob](https://github.com/isaacs/node-glob) 遍历文件， 配置举例：

- 自动遍历 `src/page` 目录的所有** js 文件 **作为 entry 入口，排除 `component|components|view|views` 目录下的文件.  这个需要自己实现 Vue/React 项目初始化入口代码逻辑，可以  [vue-entry-loader](https://github.com/hubcarl/vue-entry-loader) 或 [react-entry-template-loader](https://github.com/hubcarl/react-entry-template-loader) 的代码拷贝到项目里面使用。


```javascript
// webpack.config.js
module.exports = {
  entry: 'src/page/**!(component|components|view|views)/*.js'
}
```

- 自动遍历 `app/web/page`  目录的所有** .vue 文件 **作为 entry 入口，排除 `component|components|view|views` 目录下的文件。 如果 webpack entry 是  .vue 文件， 自动使用 [vue-entry-loader](https://github.com/hubcarl/vue-entry-loader)  作为模板入口。


```javascript
// webpack.config.js
module.exports = {
  entry: 'app/web/page/**!(component|components|view|views)/*.vue'
}
```

- 自动遍历 `app/web/page`  目录的所有 jsx 文件作为 entry 入口，排除 `component|components|view|views` 目录下的文件。如果 webpack entry 是  .jsx 文件， 自动使用 [react-entry-template-loader ](https://github.com/hubcarl/react-entry-template-loader)作为模板入口。


```javascript
// webpack.config.js
module.exports = {
  entry: 'app/web/page/**!(component|components|view|views)/*.jsx'
}
```


  