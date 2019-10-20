(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{164:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"typescript-构建支持"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-构建支持"}},[t._v("#")]),t._v(" TypeScript 构建支持")]),t._v(" "),s("blockquote",[s("p",{staticStyle:{"padding-left":"2em"}},[s("span",{staticStyle:{"background-color":"#FFFFFF"}},[s("span",{staticStyle:{color:"#262626"}},[t._v("在用 TypeScript 编写 Vue 应用时， Vue 里面的 TypeScript 代码建议不要写在 Vue 文件里面，请以单独 ts 文件存放 TypeScript 代码。目前测试发现与 thread-loader 一起使用是有问题的。easywebpack  4.10.0 开始，默认开启了 thread-loader, 你可以通过如下方式禁用 thread-loader：")])])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ${root}/webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\ncompile"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  thread"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" \n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])])]),t._v(" "),s("h3",{attrs:{id:"版本要求-3-6-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#版本要求-3-6-0"}},[t._v("#")]),t._v(" 版本要求 ^3.6.0")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("easywebpack: ^3.6.0")])])]),t._v(" "),s("h3",{attrs:{id:"新增-typescript-构建支持"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#新增-typescript-构建支持"}},[t._v("#")]),t._v(" 新增 typescript 构建支持")]),t._v(" "),s("p",[t._v("支持通过 Webpack 构建 typescript 项目, 默认开启 tslint 检查")]),t._v(" "),s("h4",{attrs:{id:"启用-typescript-编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启用-typescript-编译"}},[t._v("#")]),t._v(" 启用 typescript 编译")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n loaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   typescript"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("h4",{attrs:{id:"启用-tslint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启用-tslint"}},[t._v("#")]),t._v(" 启用 tslint")]),t._v(" "),s("p",[t._v("自动修复功能，tslint 默认启用, 自动修复默认禁用，可以通过如下方式开启")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n loaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   tslint"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       fix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("h4",{attrs:{id:"项目骨架"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目骨架"}},[t._v("#")]),t._v(" 项目骨架")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/easy-team/egg-vue-typescript-boilerplate",target:"_blank"}},[t._v("Egg + Vue + TypeScript + Webpack")])])])}),[],!1,null,null,null);a.default=e.exports}}]);