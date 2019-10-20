(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{186:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"entry-基本配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entry-基本配置"}},[t._v("#")]),t._v(" entry 基本配置")]),t._v(" "),s("p",[s("strong",[t._v("config.entry")]),t._v(" : {String|Object}  Webpack 构建入口文件配置")]),s("p",{staticStyle:{"padding-left":"2em"}},[t._v("这里的entry 对 Webpack 的 entry 进行了增强， 除了支持 webpack 原生 Object(key:value) 方式配置， 还对entry进行了增强。")]),t._v(" "),s("h3",{attrs:{id:"webpack-entry-原生配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-entry-原生配置"}},[t._v("#")]),t._v(" Webpack entry 原生配置")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ${app_root}/webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   home"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src/page/home/home.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("h3",{attrs:{id:"webpack-entry-自动遍历配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-entry-自动遍历配置"}},[t._v("#")]),t._v(" Webpack entry 自动遍历配置")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ${app_root}/webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   include"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src/page'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   exclude"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("ul",[s("li",[s("p",[s("strong",[t._v("config.entry.include")]),t._v(" : {String/Object/Array/Regex} 必选,  文件根目录可以不写")])])]),s("ul",[s("li",[s("p",[s("strong",[t._v("config.entry.exclude")]),t._v(": {String/Array/Regex} 可选, 排除不需要构建的文件或目录,  支持正则表达式.")])])]),s("ul",[s("li",[s("p",[s("strong",[t._v("config.entry.loader")]),t._v(":  {Object}, 可选, 为 entry 配置模板,  当配置后, 可以根据 "),s("code",[t._v(".vue")]),t._v(" 和 "),s("code",[t._v(".jsx")]),t._v("文件自动创建 entry 文件, key为 "),s("code",[t._v("config.type")]),t._v(" 枚举值.  "),s("a",{attrs:{href:"https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/4.3.0/webpack.config.js",target:"_blank"}},[t._v("示例 ")])])])]),s("ul",[s("li",[s("p",[s("strong",[t._v("config.entry.extMath")]),t._v(": {String}:, 可选, entry目录查找时匹配文件后缀, 默认 "),s("code",[t._v(".js")]),t._v(", 当配置了 "),s("code",[t._v("config.entry.loader")]),t._v(" 和 "),s("code",[t._v("config.framework")]),t._v(" 参数,自动映射后缀.")])])]),t._v(" "),s("h2",{attrs:{id:"entry-自定义初始化入口代码模板"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entry-自定义初始化入口代码模板"}},[t._v("#")]),t._v(" entry 自定义初始化入口代码模板")]),t._v(" "),s("blockquote",[s("p",{staticStyle:{"padding-left":"2em"}},[s("strong",[s("span",{staticStyle:{color:"#52C41A"}},[t._v("在基于 Webpack 构建时, 我们通常都是用 js 作为 entry 入口问题, 这样需要自己写页面初始化的代码，这样导致入口代码重复繁琐,  需要简化.")])])]),s("p",{staticStyle:{"padding-left":"2em"}},[s("strong",[t._v("在进行页面构建时, 我们希望有统一的入口模板功能, 这样进行页面构建和js构建时, 就不需要写同样的入口代码,  easywebpack  提供 entry.loader 模板功能.")])])]),s("p",[s("strong",[t._v("在 Vue/React 项目构建时, 通过 loader 模板配置, 我们可以直接基于 ")]),s("strong",[t._v(".vue或.jsx")]),s("strong",[t._v(" 作为入口文件.")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ${app_root}/webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\nentry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  include"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/page'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/app'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/page/app/app.js?loader=false'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  exclude"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/page/[a-z]+/component'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/page/app'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  loader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果没有配置loader模板，默认使用 .js 文件作为构建入口")]),t._v("\n     client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/framework/vue/entry/client-loader.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     server"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/framework/vue/entry/server-loader.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\t\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("p",[s("strong",[t._v("配置说明：")])]),s("ul",[s("li",[s("p",[t._v("app/web/page 目录中所有 .vue 文件当作 Webpack 构建入口. 客户端构建采用 "),s("code",[t._v("app/web/framework/vue/entry")]),t._v("  的 "),s("code",[t._v("client-loader.js")]),t._v(" ,  服务端渲染构建使用 "),s("code",[t._v("server-loader.js")]),t._v("  模板文件。")])])]),s("ul",[s("li",[s("p",[t._v("上面 "),s("code",[t._v("{ 'app/app': 'app/web/page/app/app.js?loader=false' }")]),t._v("  这个 "),s("code",[t._v("loader=false")]),t._v("  的含义表示 "),s("code",[t._v("app/web/page")]),t._v("  目录下的 "),s("code",[t._v("app/app.js")]),t._v("  不使用 "),s("code",[t._v("entry.loader")]),t._v("  模板。因为这个app/app.js是一个SPA服务端渲染Example，实现逻辑与其他普通的页面不一样，不能用 entry.loader 模板， 这个功能在自定义entry文件构建规范时使用。")])])]),t._v(" "),s("h3",{attrs:{id:"entry-使用框架内置默认初始化代码模板-（easywebpack-4-8-0-新增支持）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entry-使用框架内置默认初始化代码模板-（easywebpack-4-8-0-新增支持）"}},[t._v("#")]),t._v(" entry 使用框架内置默认初始化代码模板 （easywebpack 4.8.0 新增支持）")]),t._v(" "),s("p",[s("strong",[t._v("config.entry")]),t._v(" : {String} 必选, 使用 "),s("a",{attrs:{href:"https://github.com/isaacs/node-glob",target:"_blank"}},[t._v("node-glob")]),t._v(" 遍历文件， 配置举例：")]),s("ul",[s("li",[s("p",[t._v("自动遍历 "),s("code",[t._v("src/page")]),t._v(" 目录的所有"),s("strong",[t._v(" js 文件 ")]),t._v("作为 entry 入口，排除 "),s("code",[t._v("component|components|view|views")]),t._v(" 目录下的文件.  这个需要自己实现 Vue/React 项目初始化入口代码逻辑，可以  "),s("a",{attrs:{href:"https://github.com/hubcarl/vue-entry-loader",target:"_blank"}},[t._v("vue-entry-loader")]),t._v(" 或 "),s("a",{attrs:{href:"https://github.com/hubcarl/react-entry-template-loader",target:"_blank"}},[t._v("react-entry-template-loader")]),t._v(" 的代码拷贝到项目里面使用。")])])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src/page/**!(component|components|view|views)/*.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("ul",[s("li",[s("p",[t._v("自动遍历 "),s("code",[t._v("app/web/page")]),t._v("  目录的所有"),s("strong",[t._v(" .vue 文件 ")]),t._v("作为 entry 入口，排除 "),s("code",[t._v("component|components|view|views")]),t._v(" 目录下的文件。 如果 webpack entry 是  .vue 文件， 自动使用 "),s("a",{attrs:{href:"https://github.com/hubcarl/vue-entry-loader",target:"_blank"}},[t._v("vue-entry-loader")]),t._v("  作为模板入口。")])])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/page/**!(component|components|view|views)/*.vue'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),s("ul",[s("li",[s("p",[t._v("自动遍历 "),s("code",[t._v("app/web/page")]),t._v("  目录的所有 jsx 文件作为 entry 入口，排除 "),s("code",[t._v("component|components|view|views")]),t._v(" 目录下的文件。如果 webpack entry 是  .jsx 文件， 自动使用 "),s("a",{attrs:{href:"https://github.com/hubcarl/react-entry-template-loader",target:"_blank"}},[t._v("react-entry-template-loader ")]),t._v("作为模板入口。")])])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/web/page/**!(component|components|view|views)/*.jsx'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);