(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{160:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"component-async-load-render-组件异步加载渲染"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#component-async-load-render-组件异步加载渲染"}},[t._v("#")]),t._v(" Component Async Load Render / 组件异步加载渲染")]),t._v(" "),a("h3",{attrs:{id:"_1-javascript-file-code-spliting-代码分离"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-javascript-file-code-spliting-代码分离"}},[t._v("#")]),t._v(" 1. JavaScript File Code Spliting 代码分离")]),t._v(" "),a("p",{staticStyle:{"padding-left":"2em"}},[t._v("Webpack打包是把所有js代码打成一个js文件，我们可以通过 "),a("code",[t._v("CommonsChunkPlugin")]),t._v(" 分离出公共组件，但这远远不够。 实际业务开发时，一些主要页面内容往往比较多， 而且会引入第三方组件或者监控脚本。其中有些内容的展示不再首屏或者监控脚本等对用户不是那么重要的脚本我们可以通过 "),a("code",[t._v("require.ensure")]),t._v(" 代码分离延迟加载。在webpack在构建时，解析到"),a("code",[t._v("require.ensure")]),t._v(" 时，会单独针对引入的js资源单独构建出chunk文件，这样就能从主js文件里面分离出来。 然后页面加载完后， 通过script标签的方式动态插入到文档中。")]),a("p",[t._v("require.ensure 使用方式， 第三个参数是指定生产的 chunk 文件名，不设置时是用数字编号代理。相同 require.ensure 只会生产一个chunk文件。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("require"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ensure")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'swiper'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Swiper "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'swiper'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'swiper'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n")])])]),a("h3",{attrs:{id:"_2-vue-component-code-spliting-代码分离"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-vue-component-code-spliting-代码分离"}},[t._v("#")]),t._v(" 2. Vue Component Code Spliting 代码分离")]),t._v(" "),a("p",{staticStyle:{"padding-left":"2em"}},[t._v("异步加载 Vue 组件(.vue) 已在 Vue 2.5+ 版本支持，包括路由异步加载和非路由异步加载。在具体实现时，我们可以通过 "),a("code",[t._v("import(filepath)")]),t._v(" 加载组件。")]),a("p",[a("code",[t._v("import()")]),t._v(" 方案已经列入 "),a("a",{attrs:{href:"https://github.com/tc39/proposal-dynamic-import",target:"_blank"}},[t._v("ECMAScript提案")]),t._v("，虽然在提案阶段，但 Webpack 已经支持了该特性。import() 返回的 Promise，通过注释 webpackChunkName 指定生成的 chunk 名称。 Webpack 构建时会独立的 chunkjs 文件，然后在客户端动态插入组件，chunk 机制与 require.ensure 一样。有了动态加载的方案，可以减少服务端渲染 jsbundle 文件的大小，页面 Vue 组件模块也可以按需加载。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("component")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'async-swiper'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过注释webpackChunkName 指定生成的chunk名称")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "asyncSwiper" */')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./AsyncSwiper.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("AsyncSwiper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AsyncSwiper"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"app"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Vue dynamic component load"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("async"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("swiper"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("async"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("swiper"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" \n")])])]),a("h3",{attrs:{id:"_3-egg-vue-ssr-vue-component-code-spliting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-egg-vue-ssr-vue-component-code-spliting"}},[t._v("#")]),t._v(" 3. Egg + Vue SSR Vue Component Code Spliting")]),t._v(" "),a("h4",{attrs:{id:"_3-1-easywebpack-vue-版本要求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-easywebpack-vue-版本要求"}},[t._v("#")]),t._v(" 3.1 easywebpack-vue 版本要求")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("easywebpack-vue: ^3.5.1")])])]),a("p",[t._v("构建适配 "),a("code",[t._v("vue-server-renderer")]),t._v(" 异步渲染查找 "),a("code",[t._v("chunk")]),t._v(" 文件逻辑。这里直接把 "),a("code",[t._v("chunk")]),t._v(" 文件构建到 "),a("code",[t._v("app/view/node_modules")]),t._v(" 下面, 这样异步渲染才能找到该文件。")]),t._v(" "),a("h4",{attrs:{id:"_3-2-项目添加-egg-view-vue-ssr-插件参数配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-项目添加-egg-view-vue-ssr-插件参数配置"}},[t._v("#")]),t._v(" 3.2 项目添加 egg-view-vue-ssr 插件参数配置")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fs "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("app")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("vuessr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   renderOptions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件")]),t._v("\n     basedir"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("baseDir"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/view'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n")])])]),a("p",[a("a",{attrs:{href:"https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/config/config.default.js",target:"_blank"}},[t._v("config/config.default.js")])]),t._v(" "),a("h4",{attrs:{id:"_3-3-动态加载举例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-动态加载举例"}},[t._v("#")]),t._v(" 3.3 动态加载举例")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/easy-team/egg-vue-webpack-boilerplate/blob/webpack3/app/web/page/dynamic/dynamic.vue",target:"_blank"}},[t._v("app/web/page/dynamic/dynamic.vue")])]),t._v(" "),a("h4",{attrs:{id:"_3-4-referenceerror-document-is-not-defined"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-referenceerror-document-is-not-defined"}},[t._v("#")]),t._v(" 3.4 ReferenceError: document is not defined")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/36233639",target:"_blank"}},[t._v("ReferenceError: document/window is not defined")])])])}),[],!1,null,null,null);s.default=e.exports}}]);