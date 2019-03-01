(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{314:function(t,s,a){"use strict";a.r(s);var e=a(46),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"babel-构建优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#babel-构建优化","aria-hidden":"true"}},[t._v("#")]),t._v(" Babel 构建优化")]),t._v(" "),a("p",{staticStyle:{"padding-left":"2em"}},[t._v("在进行 Egg + Vue 进行 SSR 模式开发时，运行 "),a("code",[t._v("npm run dev")]),t._v("  后你会看到如下界面， 启动了两个 Webpack 构建实例：Node 模式 和 Web 模式。SSR 运行需要 Webapck 单独构建 "),a("code",[t._v("target: node")]),t._v("   和 "),a("code",[t._v("target: web")]),t._v("  主要的差异在于 Webpack需要处理 require 机制以及磨平 Node 和 浏览器运行环境的差异。")]),a("p",[a("img",{staticStyle:{"max-width":"600px",width:"827px"},attrs:{alt:"",src:"https://cdn.nlark.com/yuque/0/2018/png/116733/1536128449742-0024eb69-d2c7-4e47-8426-ff2cc85396d5.png#width=827"}})]),a("p",[t._v("在 "),a("code",[t._v("easywebpack")]),t._v(" 4.6.0 以下 SSR 版本构建方案实现时，Node 和 Web 模式采用的是一份 "),a("code",[t._v(".babelrc")]),t._v("  配置，这样导致构建的后代码全部变成 es5。 但 Node 现在LTS 版本已经是 8 了，而且 10 也在开发，不久将会发布。这样导致 Node 端构建的代码没有用到 ES6 的特性，我们期望根据 Node 版本构建指定 ES 模式代码，这样可以带来两个好处：")]),t._v(" "),a("h2",{attrs:{id:"easywebpack-4-6-0-以下-babelrc-配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#easywebpack-4-6-0-以下-babelrc-配置","aria-hidden":"true"}},[t._v("#")]),t._v(" easywebpack 4.6.0 以下.babelrc  配置")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"presets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"env"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"modules"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"plugins"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-object-rest-spread"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"syntax-dynamic-import"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-object-assign"')]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"comments"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),a("ul",[a("li",[a("p",[t._v("Node 端运行的 ES6 模块更好的执行效率")])])]),a("ul",[a("li",[a("p",[t._v("Node 端编译成 ES6，可以减小构建好的 JSBundle 文件大小和编译转换时间，同时带来更好的文件读取效率和执行效率。")])])]),t._v(" "),a("h2",{attrs:{id:"easywebpack-4-7-0-支持-node-和-web-指定-es-模式构建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#easywebpack-4-7-0-支持-node-和-web-指定-es-模式构建","aria-hidden":"true"}},[t._v("#")]),t._v(" easywebpack 4.7.0+ 支持 Node 和 Web 指定 ES 模式构建")]),t._v(" "),a("blockquote",[a("p",[t._v("注意： 升级 babel 7 后，不支持如下 env 方式配置 ")])]),a("p",[a("strong",[t._v("关键措施：")]),t._v(" "),a("a",{attrs:{href:"https://www.babeljs.cn/docs/usage/babelrc/",target:"_blank"}},[t._v("bable 本身支持通过 process.env.BABEL_ENV  加载 .babelrc  配置文件")]),t._v(":")]),a("p",[a("img",{staticStyle:{"max-width":"600px",width:"827px"},attrs:{alt:"",src:"https://cdn.nlark.com/yuque/0/2018/png/116733/1536129170471-43b9b60e-a7da-47c3-8ad7-ef1ff7e56c22.png#width=827"}})]),a("p",[a("strong",[t._v("如果")]),a("strong",[t._v(".babelrc")]),a("code"),a("strong",[t._v("   配置了 ")]),a("strong",[a("code",[t._v("env.node")])]),a("strong",[t._v("  或者 ")]),a("strong",[a("code",[t._v("env.web")])]),a("strong",[t._v("  节点配置，easywebpack 底层将自动设置  ")]),a("a",{attrs:{href:"https://www.babeljs.cn/docs/usage/babelrc/",target:"_blank"}},[t._v("process.env.BABEL_ENV")]),a("strong",[t._v(" 变量， 启动 BABEL ENV 编译机制。easywebpack 底层支持  ")]),a("a",{attrs:{href:"https://www.babeljs.cn/docs/usage/babelrc/",target:"_blank"}},[t._v("process.env.BABEL_ENV")]),a("strong",[t._v(" 支持  node 和 web 的 env  ")]),a("strong",[t._v(".babelrc")]),a("code"),a("strong",[t._v("   节点配置。 另外关键的 target 配置：")])]),a("ul",[a("li",[a("p",[a("code",[t._v("target.node")]),t._v(" :  Node 环境编译模式，可以是指定版本，比如配置：8.9.3，也可以配置当前运行的node版本：current。")])])]),a("ul",[a("li",[a("p",[a("code",[t._v("target.browsers")]),t._v(" : Web 浏览器编译模式，可以配置浏览器的版本等")])])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"env"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"node"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"presets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"env"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"modules"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"targets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"node"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"current"')]),t._v(" \n       "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"plugins"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-object-rest-spread"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"syntax-dynamic-import"')]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"web"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"presets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"env"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"modules"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"targets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"browsers"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"last 2 versions"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"safari >= 7"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"plugins"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-object-rest-spread"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"syntax-dynamic-import"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-object-assign"')]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"comments"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),a("h2",{attrs:{id:"构建效率和大小"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构建效率和大小","aria-hidden":"true"}},[t._v("#")]),t._v(" 构建效率和大小")]),t._v(" "),a("p",[t._v("合理的使用 BABEL 编译模式，能够极大提高构建速度和JS 文件大小。 通过测试，启用 BABEL_ENV 模式和合理的配置 targets.browsers 参数，对于大型的页面，能够显著提升构建速度。下面通过 "),a("code",[t._v(" easy build prod")]),t._v("  针对 "),a("a",{attrs:{href:"https://github.com/hubcarl/egg-vue-webpack-boilerplate",target:"_blank"}},[t._v("https://github.com/hubcarl/egg-vue-webpack-boilerplate")]),t._v(" 测试的效果，页面比较简单，效果不明显。")]),a("table",{staticClass:"lake-table"},[a("colgroup",[a("col",{attrs:{width:"209"}}),a("col",{attrs:{width:"157"}})]),a("tbody",[a("tr",[a("td",[a("p",[a("strong",[t._v("模式")])])]),a("td",[a("p",[a("strong",[t._v("构建大小(app/app.js)")])])])]),a("tr",[a("td",[a("p",[t._v("不启用BABEL按需编译")])]),a("td",[a("p",[t._v("15.6 KiB")])])]),a("tr",[a("td",[a("p",[t._v("启用BABEL按需编译")])]),a("td",[a("p",[t._v("15.2 KiB")])])]),a("tr",[a("td"),a("td")])])]),t._v(" "),a("h2",{attrs:{id:"babel-7-升级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#babel-7-升级","aria-hidden":"true"}},[t._v("#")]),t._v(" Babel 7 升级")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.yuque.com/easy-team/easywebpack/babel7",target:"_blank"}},[t._v("https://www.yuque.com/easy-team/easywebpack/babel7")])])])},[],!1,null,null,null);s.default=n.exports}}]);