(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{175:function(a,s,e){"use strict";e.r(s);var t=e(0),l=Object(t.a)({},(function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"开发调试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开发调试"}},[a._v("#")]),a._v(" 开发调试")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("当我们使用 "),e("code",[a._v("easywebpack")]),a._v(" 时， 遇到构建问题时，我们可以通过 "),e("code",[a._v("easywebpack-cli")]),a._v(" 的  "),e("code",[a._v("easy print")]),a._v(" 命令检查一下生成的 webpack config 配置是否正确。")])])]),e("ul",[e("li",[e("p",[a._v("默认读取项目根目录下的 "),e("code",[a._v("webpack.config.js")]),a._v(" 配置, 你可以通过 "),e("code",[a._v("-f")]),a._v("  参数指定指定 cli 配置文件")])])]),e("ul",[e("li",[e("p",[a._v("easywebpack print 默认打印 dev 模式配置信息")])])]),a._v(" "),e("h3",{attrs:{id:"安装cli"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装cli"}},[a._v("#")]),a._v(" 安装cli")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" i easywebpack-cli  -g \n")])])]),e("ul",[e("li",[e("p",[a._v("安装成功以后, 就可以在命令行中使用  "),e("code",[a._v("easy")]),a._v(" 命令, 比如 "),e("code",[a._v("easy init")]),a._v(", "),e("code",[a._v("easy build")]),a._v(", "),e("code",[a._v("easy server")]),a._v(", "),e("code",[a._v("easy print")]),a._v(", "),e("code",[a._v("easy clean")]),a._v(", "),e("code",[a._v("easy open")]),a._v(" 等. 如果是本地安装到项目依赖里面，可以使用 "),e("code",[a._v("npx easy")]),a._v(" 运行本地命令。")])])]),e("ul",[e("li",[e("p",[e("code",[a._v("easy build [env]")]),a._v(" 和 "),e("code",[a._v("easy print [env]")]),a._v(" 的 env 支持 "),e("code",[a._v("dev")]),a._v(", "),e("code",[a._v("test")]),a._v(", "),e("code",[a._v("prod")]),a._v(" 三种模式, 默认开发模式")])])]),e("ul",[e("li",[e("p",[a._v("可以通过 "),e("code",[a._v("easy -h")]),a._v(" 查看相关命令")])])]),a._v(" "),e("h3",{attrs:{id:"编译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编译"}},[a._v("#")]),a._v(" 编译")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("本地开发模式编译(无hash,启用热更新)")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build dev \n")])])]),e("ul",[e("li",[e("p",[a._v("测试环境模式编译(hash, 移除调试代码)")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" \n")])])]),e("ul",[e("li",[e("p",[a._v("线上发布编译(hash, 移除调试代码，压缩代码)")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build prod \n")])])]),e("h3",{attrs:{id:"清理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#清理"}},[a._v("#")]),a._v(" 清理")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("清理编译缓存文件，比如 DLL 缓存")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy clean \n")])])]),e("ul",[e("li",[e("p",[a._v("清理编译所有文件")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy clean all \n")])])]),e("ul",[e("li",[e("p",[a._v("清理自定义目录文件")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy clean ./dist \n")])])]),e("h3",{attrs:{id:"杀端口功能"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#杀端口功能"}},[a._v("#")]),a._v(" 杀端口功能")]),a._v(" "),e("p",[a._v("在本地开发时, 时不时遇到端口占用问题, 特别时 windows 平台, 杀进程很繁琐, 通过 "),e("code",[a._v("easy kill")]),a._v(" 可以快速实现杀掉端口占用进程。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("7001")]),a._v("\neasy "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("7001,9000")]),a._v(",9001 \n")])])]),e("h3",{attrs:{id:"构建大小分析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#构建大小分析"}},[a._v("#")]),a._v(" 构建大小分析")]),a._v(" "),e("p",[a._v("在项目开发时， 当页面构建的文件太大, 我们可以直接通过 cli 提供功能进行构建大小分析")]),a._v(" "),e("h4",{attrs:{id:"通过-s-参数启动构建大小分析工具-支持-analyzer-webpack-bundle-analyzer-和-stats-stats-webpack-plugin-默认用-analyzer-插件。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#通过-s-参数启动构建大小分析工具-支持-analyzer-webpack-bundle-analyzer-和-stats-stats-webpack-plugin-默认用-analyzer-插件。"}},[a._v("#")]),a._v(" 通过 -s 参数启动构建大小分析工具, 支持 analyzer(webpack-bundle-analyzer) 和 stats(stats-webpack-plugin) , 默认用 analyzer 插件。")]),a._v(" "),e("blockquote",[e("p",[a._v("如果运行时, 提示安装缺少插件，请先安装依赖")])]),e("ul",[e("li",[e("p",[a._v("开发模式分析")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build -s \n")])])]),e("ul",[e("li",[e("p",[a._v("测试模式分析, 移除开发辅助代码")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" -s \n")])])]),e("ul",[e("li",[e("p",[a._v("发布模式分析, 移除开发辅助代码, 压缩js/css/imagess以及hash")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build prod -s \n")])])]),e("p",[e("img",{staticStyle:{"max-width":"600px",width:"827px"},attrs:{src:"https://cdn.yuque.com/yuque/0/2018/png/116733/1528513212579-add62c3b-de8e-49bd-b4dc-7ebb8f126d3a.png#align=left&display=inline&height=565&originHeight=565&originWidth=1392&status=done&width=827"}})]),a._v(" "),e("h4",{attrs:{id:"使用-stats-stats-webpack-plugin-构建大小分析工具"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用-stats-stats-webpack-plugin-构建大小分析工具"}},[a._v("#")]),a._v(" 使用 stats(stats-webpack-plugin) 构建大小分析工具")]),a._v(" "),e("blockquote",[e("p",[a._v("如果运行时, 提示安装缺少插件，请先安装依赖")])]),e("ul",[e("li",[e("p",[a._v("开发模式分析")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build -s stats \n")])])]),e("ul",[e("li",[e("p",[a._v("测试模式分析, 移除开发辅助代码")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" -s stats \n")])])]),e("ul",[e("li",[e("p",[a._v("发布模式分析, 移除开发辅助代码, 压缩js/css/imagess以及hash")])])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy build prod -s stats \n")])])]),e("p",[e("strong",[a._v("运行后, 会生成  ")]),e("strong",[e("code",[a._v("client_stats.json")])]),e("strong",[a._v(" 文件,  然后通过以下两个工具可以清晰分析出项目文件层次结构和项目文件依赖大小")])]),e("ul",[e("li",[e("p",[a._v("打开 "),e("a",{attrs:{href:"http://alexkuz.github.io/webpack-chart/",target:"_blank"}},[a._v("webpack-chart")]),a._v(" 然后上传 stat.json 文件，即可生成整体的项目文件层次结构图。"),e("br"),a._v("点击任何一个区域，进入子目录文件分析，这个工具只能提供一个整体的文件依赖结构。")])])]),e("p",[e("img",{staticStyle:{"max-width":"600px",width:"650px"},attrs:{src:"https://cdn.yuque.com/yuque/0/2018/png/116733/1528513227023-9b1f1ab6-f434-415b-9bbb-7d823094d8bd.png#align=left&display=inline&height=615&originHeight=615&originWidth=620&status=done&width=650"}})]),e("ul",[e("li",[e("p",[a._v("打开 "),e("a",{attrs:{href:"http://webpack.github.io/analyse/",target:"_blank"}},[a._v("analyse")]),a._v(" 然后上传stat.json文件，即可生成整个项目文件个数(包括vue文件，js，css， image， chunk等)，文件大小，文件依赖关系统计，可以很方便找出筛选出大的js，image， css，然后进行针对性的优化，信息很全，对优化文件大小有很大帮助，唯一不方便的是统计结果不能排序")])])]),e("p",[e("img",{staticStyle:{"max-width":"600px",width:"800px"},attrs:{src:"https://cdn.yuque.com/yuque/0/2018/png/116733/1528513236394-625fa458-aeae-41d9-a7d9-cdc8d41197ba.png#align=left&display=inline&height=257&originHeight=257&originWidth=620&status=done&width=800"}})]),a._v(" "),e("h3",{attrs:{id:"打印配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#打印配置"}},[a._v("#")]),a._v(" 打印配置")]),a._v(" "),e("p",[a._v("easywebpack print 打印 webpack 配置信息时通过 "),e("code",[a._v("lodash")]),a._v(" 实现的，你可以使用 "),e("code",[a._v("lodash")]),a._v(" 的相关语法打印配置信息。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easywebpack print -h \n")])])]),e("p",[a._v("Usage: print [env] [options]")]),e("p",[a._v("print webpack config, support print by env or config node key")]),e("p",[a._v("Options:")]),a._v(" "),e("div",{staticClass:"language-undefined extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("-n, --node [key]  print webpack config info by config node key, example: [module/module.rules/plugins] and so on\n-h, --help        output usage information \n")])])]),e("h4",{attrs:{id:"查看-webpack-所有配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-所有配置"}},[a._v("#")]),a._v(" 查看 webpack 所有配置")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print \n")])])]),e("h4",{attrs:{id:"查看-build-webpack-config-js-文件生产的-webpack配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-build-webpack-config-js-文件生产的-webpack配置"}},[a._v("#")]),a._v(" 查看 build/webpack.config.js 文件生产的 webpack配置")]),a._v(" "),e("p",[a._v("默认读取项目根目录下的 "),e("code",[a._v("webpack.config.js")]),a._v(" 配置, 你可以通过 "),e("code",[a._v("-f")]),a._v("  参数指定指定 cli 配置文件")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -f build/webpack.config.js \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-dll-配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-dll-配置"}},[a._v("#")]),a._v(" 查看 webpack 配置 dll 配置")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print --dll \n")])])]),e("h4",{attrs:{id:"查看-webpack-浏览器构建模式配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-浏览器构建模式配置"}},[a._v("#")]),a._v(" 查看 webpack 浏览器构建模式配置")]),a._v(" "),e("p",[a._v("通过 -t 参数指定构建类型，也就是对应 "),e("code",[a._v("config.target")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print prod -t --web \n")])])]),e("p",[a._v("or")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print prod --web \n")])])]),e("h4",{attrs:{id:"查看-webpack-node构建模式配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-node构建模式配置"}},[a._v("#")]),a._v(" 查看 webpack Node构建模式配置")]),a._v(" "),e("p",[a._v("通过 -t 参数指定构建类型，也就是对应 "),e("code",[a._v("config.target")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print prod -t server \n")])])]),e("p",[a._v("or")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print prod --node \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-dll-配置-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-dll-配置-2"}},[a._v("#")]),a._v(" 查看 webpack 配置 dll 配置")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print --dll \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-module-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-module-信息"}},[a._v("#")]),a._v(" 查看 webpack 配置 module 信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -n module \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-entry-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-entry-信息"}},[a._v("#")]),a._v(" 查看 webpack 配置 entry 信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -n entry \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置发布-prod-模式-entry-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置发布-prod-模式-entry-信息"}},[a._v("#")]),a._v(" 查看 webpack 配置发布 prod 模式 entry 信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print prod -n entry \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-module-rulues-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-module-rulues-信息"}},[a._v("#")]),a._v(" 查看 webpack 配置 module.rulues 信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -n module.rulues \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-module-rulues-第三个loader信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-module-rulues-第三个loader信息"}},[a._v("#")]),a._v(" 查看 webpack 配置 module.rulues 第三个loader信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -n module.rulues"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-plugins-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-plugins-信息"}},[a._v("#")]),a._v(" 查看 webpack 配置 plugins 信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -n plugins \n")])])]),e("h4",{attrs:{id:"查看-webpack-配置-plugins-第三个-plugin-信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-webpack-配置-plugins-第三个-plugin-信息"}},[a._v("#")]),a._v(" 查看 webpack 配置 plugins 第三个 plugin 信息")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("easy print -n plugins"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" \n")])])])])}),[],!1,null,null,null);s.default=l.exports}}]);