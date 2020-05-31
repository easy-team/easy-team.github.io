
---
id: 685553
space: easywebpack
slug: loader
url: /easywebpack/loader
title: loaders
summary: v3 代表 easywebpack 3.x.x, v4 代表 easywebpack 4.x.x内置配置 loaderseasywebpack 内置了 babel, eslint, css, sass, less, stylus, urlimage, urlfont 等loader,easyw...
coverImage: null
createTime: 2020-05-31T08:10:50.000Z 
upateTime: 2020-05-31T08:10:51.000Z
wordCount: 1539
layout: doc
---
`v3` 代表 easywebpack 3.x.x, `v4` 代表 easywebpack 4.x.x<br />


## 内置配置 loaders


- easywebpack 内置了 `babel`, `eslint`, `css`, `sass`, `less`, `stylus`, `urlimage`, `urlfont` 等loader,

- easywebpack-vue 内置了 `vue`, `vuehtml` 等loader,

- easywebpack-react 内置了 `react-hot-loader` 等loader,

- easywebpack-weex 内置了 `vue`, `weex` 等loader.

- easywebpack-html 内置了 `html`, `nunjucks` 等loader.

| loader | 别名 | 默认是否开启 | webpack.config.js配置举例 |
| --- | --- | --- | --- |
| babel-loader | babel | 是 | **禁用:**<br />loaders:{ babel: false} |
| eslint-loader | eslint | 否 | **启用:**<br />loaders: { eslint: true} <br /> **自动修复:**<br /> loaders:{ eslint: {options: {fix: true}} |
| tslint-loader | tslint | 否 | **启用:**<br />loaders:{ tslint: tue} <br /> **自动修复:**<br /> loaders:{ tslint: {options: {fix: true} |
| ts-loader | ts  | 否 | **禁用:**<br />loaders:{ ts: false} <br />**开启:**<br />loaders:{ ts: true}** |
| css-loader | css | 是 | N/A |
| sass-loader | sass | v3 是 v4 否 | **开启: **<br />**loaders:{ sass: true}**<br /> **路径配置:**<br /> **loaders:{sass: {options: {includePaths: ["asset/css"]}}**<br />**安装依赖：**<br />"[node-sass](https://github.com/sass/node-sass)": "^4.5.3",<br />"[sass-loader](https://github.com/webpack-contrib/sass-loader)": "^6.0.6", |
| sass-loader | scss | v3 是 v4 否 | **开启:**<br />loaders:{ scss: true}<br />**安装依赖：**<br /> "[node-sass](https://github.com/sass/node-sass)": "^4.5.3",<br />    "[sass-loader](https://github.com/webpack-contrib/sass-loader)": "^6.0.6", |
| less-loader | less | 否 | **开启:**<br />loaders:{ less: true}<br />**安装依赖：**<br />"[less](https://github.com/less/less.js)": "^2.7.2",<br />"[less-loader](https://github.com/webpack-contrib/less-loader)": "^4.0.5", |
| stylus-loader | stylus | 否 | **开启:**<br />loaders:{ stylus: true }<br />"stylus": "^0.54.5",<br />"stylus-loader": "^3.0.0", |
| url-loader | urlimage | 是 | **禁用:**<br />loaders:{ urlimage: false} <br /> **配置limit(默认1024):**<br /> loaders:{urlimage: {options: {limit: 2048 }} |
| url-loader | urlfont | 是 | **禁用:**<br />loaders:{ urlfont: false} <br /> **配置limit(默认1024):**<br /> loaders:{urlfont: {options: {limit: 2048 }} |
| url-loader | urlmedia | 是 | 禁用:<br />loaders:{ urlmedia: false} <br /> **配置limit(默认1024):**<br /> loaders:{urlmedia: {options: {limit: 2048 }} |
| nunjucks-html-loader | nunjucks | 否 | **启用:**<br />loaders:{ nunjucks: true } |
| ejs-loader | ejs | 否 | **启用:**<br />loaders:{ ejs: true } |


## 内置 loader 扩展参数统一通过 options 节点配置


```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module:{
     rules:[
       {
         ${loader别名}:{
            options:{
              // 具体loader参数
            }
    			}
       }
     ]
  }
}


或

module.exports = {
  loaders:{
     ${loader别名}:{
      options:{
        // 具体loader参数
      }
    }
  }
}
```

<br />


## Webpack 与 easywebpack 配置对比



### Webpack 配置


```javascript
module: {
  rules: [
    { test: /\.tsx?$/, loader: "ts-loader" }
  ]
}
```



### easywebpack 内置 loader 配置， 同时支持 Webpack 原生配置


```javascript
// 最新版本建议配置
module: {
  rules: [
    { ts: true }
  ]
}

```



## module.rules  | loaders 配置

<br />**config.loaders |  config.module.rules** 非必须，支持 Object ｜ Array。 这里的loaders 是对 Webpack `module.rules` 的简化和增强。建议用 **增强配置** 方式配置.<br />

- 兼容 Webpack 原生数组配置

- [增强]支持通过别名对内置 loader 开启和禁用，以及参数配置

- [增强]支持通过别名的方式添加 loader 插件





### 内置 loader 扩展参数统一通过 options 节点配置


```javascript
// ${app_root}/webpack.config.js

// 最新版本建议配置
module: {
  rules: [
    { 
      ${loader别名}:{
          include:[],
          options:{
            // 具体loader参数
          }
       }
    }
  ]
}

```



### Webpack  module.rules 原生数组配置举例


```javascript
// ${app_root}/webpack.config.js
module.exports = {
  ......
  module: {
   rules:[
    { ts: true },
    {
      test: /\.html$/,
      use: ['html-loader', 'html-swig-loader']
    }
   ]
}
```



### Webpack module.rules 增强配置举例


```javascript
// ${app_root}/webpack.config.js

// 最新版本建议配置
module.exports = {
  ......
  module: {
   rules: [
    { ts: true },
    { less: true }
   ]
  }
}

```

<br />


### eslint 配置自动修复功能, 默认禁用


```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module:{
    rules:[
      {
        eslint:{
          options:{
            fix: true
          }
    		}
      }
    ]
  }
}
```



### sass/scss 配置 css 文件查找目录


```javascript
// ${app_root}/webpack.config.js
const path = require('path');
module.exports = {
  module:{
    rules:[
      {
       sass: {
        options: {
          includePaths: [
            path.resolve(process.cwd(), 'app/web/asset/style')
          ]
        }
    	 }
      },
      {
       scss: {
         options: {
           includePaths: [
             path.resolve(process.cwd(), 'app/web/asset/style')
           ]
         }
    	 } 
      }
    ]
  }
}
```



### vue 配置 img 图片自定义属性 webpack 解析


```javascript
// ${app_root}/webpack.config.js
module.exports = {
  module:{
    rules:[
      {
        vue: {
      		options: { transformToRequire: { img: ['url', 'src'] } }
    		}
      }
    ]
  }
}
```

<br />


### 自定义格式和原生格式.

<br />**module.rules** : {Object} Webpack loader 配置, 支持自定义格式和原生格式<br />
<br />`key:value` 形式, 其中 `key` 为别名, 可以自由定义, easywebpack和对应解决方案内置了一些别名和loader.<br />
<br />比如我要添加一个全新且 easywebpack 没有内置的 html-swig-loader, 可以这样配置:<br />

```javascript
// 最新版本建议配置
module.exports = {
  ......
  module: {
   rules: [  // 内置 loader 和 原生 loader 混合配置
    { ts: true },
    { 
      test: /\.html$/,
      use: ['html-loader', 'html-swig-loader']
    }
   ]
  }
}

```

<br />`swig` key 别名随意, 我可以叫 swig, 也可以叫 htmlswig 等等<br />


### 禁用 easywebpack 内置的 `babel-loader` 可以这样配置


```javascript
// 最新版本建议配置
module.exports = {
  ......
  module: {
   rules: [  
    { babel:false }
   ]
  }
}

```

<br />


### 修改 easywebpack 内置 `babel-loader` 的 test 和 use,  可以这样配置

<br />因 use 存在顺序问题, use 目前采用的策略是完全覆盖<br />

```javascript
// 最新版本建议配置

module.exports = {
  ......
  module: {
   rules: [  
    { babel: false }, // 禁用默认
    {                // 自己配置
      test: /\.(jsx|vue)?$/,
      exclude: [/node_modules/, 'page/test'],
      use: [
       {
        loader: 'babel-loader'
       },
       {
        loader: 'eslint-loader'
       }
      ]
    }
   ]
  }
}

```



### config.loaders 具体loader配置项属性介绍

<br />config.loader 配置项除了支持的loader原生属性, 还扩展了 `env`, `type`, `enable`, `postcss`, `framework` 五个属性, 其中 `postcss`, `framework` 用于css相关loader, 例如内置的 `sass-loader`<br />

```javascript
// 最新版本建议配置
module.exports = {
  ......
  module: {
   rules: [  
    { sass: false }, // 禁用默认
    {                // 自己配置
     test: /\.sass/,
     exclude: /node_modules/,
      use: ['css-loader', {  
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
      }
     }]
    }
   ]
  }
}
```


- **env**: 见 `config.env` 说明, 可选, 默认全部

- **type**: 见 `config.type` 说明, 可选, 默认全部

- **enable**: {Boolean/Function} 是否启用, 可选, 默认可用

- **postcss**: {Boolean} 可选, 特殊配置, 是否启用postcss, 只有css样式loader需要配置, 其他loader不需要配置

- **use**: {Array/Function} 必须, 支持扩展的Function配置和原生Use配置, use属性是完全覆盖.





  