(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{153:function(e,t,r){"use strict";r.r(t);var a=r(0),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"前端渲染模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#前端渲染模式"}},[e._v("#")]),e._v(" 前端渲染模式")]),e._v(" "),r("div",{staticClass:"lake-content-editor-core lake-engine",attrs:{"data-lake-element":"root","data-selection-116733":"%7B%22path%22%3A%5B%5B31%2C0%2C1%2C0%2C3%2C0%2C0%2C0%5D%2C%5B31%2C0%2C1%2C0%2C3%2C0%2C0%2C0%5D%5D%2C%22uuid%22%3A%22116733%22%2C%22active%22%3Atrue%7D"}},[r("h3",{attrs:{id:"egg-react-客户端浏览器渲染模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#egg-react-客户端浏览器渲染模式"}},[e._v("#")]),e._v(" Egg + React 客户端浏览器渲染模式")]),e._v(" "),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),e._v(" "),r("h4",{attrs:{id:"调用-egg-view-react-ssr-的-renderclient-方法实现客户端浏览器渲染"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#调用-egg-view-react-ssr-的-renderclient-方法实现客户端浏览器渲染"}},[e._v("#")]),e._v(" 调用 egg-view-react-ssr 的 renderClient 方法实现客户端浏览器渲染")]),e._v(" "),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("strong",[e._v("renderClient 表示 Node 服务端端只渲染一个包含 HTML，header，body 的一个简单 HTML 页面骨架， 具体页面内容由 React 在浏览器进行渲染，你可以在浏览器右键源代码看看HTML代码就明白了")])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[e._v("在使用上面, 客户端浏览器渲染模式只需要把 "),r("code",{staticStyle:{"font-family":"monospace","font-size":"inherit","background-color":"rgba(0, 0, 0, 0.06)",padding:"0px 2px",border:"1px solid rgba(0, 0, 0, 0.08)","border-radius":"2px","line-height":"inherit","overflow-wrap":"break-word","text-indent":"0px"}},[e._v("render")]),e._v(" 改成 "),r("code",{staticStyle:{"font-family":"monospace","font-size":"inherit","background-color":"rgba(0, 0, 0, 0.06)",padding:"0px 2px",border:"1px solid rgba(0, 0, 0, 0.08)","border-radius":"2px","line-height":"inherit","overflow-wrap":"break-word","text-indent":"0px"}},[e._v("renderClient")]),e._v("。 正常情况下, 能进行 "),r("code",{staticStyle:{"font-family":"monospace","font-size":"inherit","background-color":"rgba(0, 0, 0, 0.06)",padding:"0px 2px",border:"1px solid rgba(0, 0, 0, 0.08)","border-radius":"2px","line-height":"inherit","overflow-wrap":"break-word","text-indent":"0px"}},[e._v("render")]),e._v(" 运行的, "),r("code",{staticStyle:{"font-family":"monospace","font-size":"inherit","background-color":"rgba(0, 0, 0, 0.06)",padding:"0px 2px",border:"1px solid rgba(0, 0, 0, 0.08)","border-radius":"2px","line-height":"inherit","overflow-wrap":"break-word","text-indent":"0px"}},[e._v("renderClient")]),e._v("  方式也能正常运行。")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),e._v(" "),r("h3",{attrs:{id:"webpack-配置优化，提高构建速度"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#webpack-配置优化，提高构建速度"}},[e._v("#")]),e._v(" Webpack 配置优化，提高构建速度")]),e._v(" "),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[e._v("在 "),r("code",{staticStyle:{"font-family":"monospace","font-size":"inherit","background-color":"rgba(0, 0, 0, 0.06)",padding:"0px 2px",border:"1px solid rgba(0, 0, 0, 0.08)","border-radius":"2px","line-height":"inherit","overflow-wrap":"break-word","text-indent":"0px"}},[e._v("${root}/webpack.config.js")]),e._v("  文件添加 target: 'web'  配置选项，这样只会构建浏览器运行的 JSBundle 文件，无需构建 Node 运行的 JSBundle 文件(SSR 模式会构建两份结果，一份给 Node 运行，一份给浏览器运行)。")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("div",{attrs:{"data-card-type":"block","data-lake-card":"codeblock",id:"c9a1a79b"}},[r("div",{staticClass:"lake-codeblock-content",staticStyle:{border:"1px solid rgb(232, 232, 232)","max-width":"750px",color:"rgb(38, 38, 38)",margin:"0px",padding:"0px",background:"rgb(249, 249, 249)"}},[r("div",{staticStyle:{color:"rgb(89, 89, 89)",margin:"0px",padding:"16px",background:"none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)"}},[r("div",{staticClass:"language-undefined extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(" \n")])])])])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),e._v(" "),r("h3",{attrs:{id:"controller-调用-renderclient-方法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#controller-调用-renderclient-方法"}},[e._v("#")]),e._v(" controller 调用 renderClient 方法")]),e._v(" "),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("ul",{staticStyle:{"list-style-type":"disc",margin:"0px","padding-left":"23px","font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word"},attrs:{"lake-indent":"0"}},[r("li",[r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[e._v("controller 调用 "),r("code",{staticStyle:{"font-family":"monospace","font-size":"inherit","background-color":"rgba(0, 0, 0, 0.06)",padding:"0px 2px",border:"1px solid rgba(0, 0, 0, 0.08)","border-radius":"2px","line-height":"inherit","overflow-wrap":"break-word","text-indent":"0px"}},[e._v("renderClient")]),e._v(" 方法")])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("div",{attrs:{"data-card-type":"block","data-lake-card":"codeblock",id:"737d83e9"}},[r("div",{staticClass:"lake-codeblock-content",staticStyle:{border:"1px solid rgb(232, 232, 232)","max-width":"750px",color:"rgb(38, 38, 38)",margin:"0px",padding:"0px",background:"rgb(249, 249, 249)"}},[r("div",{staticStyle:{color:"rgb(89, 89, 89)",margin:"0px",padding:"16px",background:"none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)"}},[r("div",{staticClass:"language-undefined extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(" \n")])])])])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("ul",{staticStyle:{"list-style-type":"disc",margin:"0px","padding-left":"23px","font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word"},attrs:{"lake-indent":"0"}},[r("li",[r("span",[e._v("前端渲染配置 HTML layout 模板文件")]),e._v("，这里的配置是一个全局的 layout 的配置"),r("br")])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("div",{attrs:{"data-card-type":"block","data-lake-card":"codeblock",id:"0081475a"}},[r("div",{staticClass:"lake-codeblock-content",staticStyle:{border:"1px solid rgb(232, 232, 232)","max-width":"750px",color:"rgb(38, 38, 38)",margin:"0px",padding:"0px",background:"rgb(249, 249, 249)"}},[r("div",{staticStyle:{color:"rgb(89, 89, 89)",margin:"0px",padding:"16px",background:"none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)"}},[r("div",{staticClass:"language-undefined extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(" \n")])])])])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("div",{attrs:{"data-card-type":"block","data-lake-card":"codeblock",id:"19eaa91f"}},[r("div",{staticClass:"lake-codeblock-content",staticStyle:{border:"1px solid rgb(232, 232, 232)","max-width":"750px",color:"rgb(38, 38, 38)",margin:"0px",padding:"0px",background:"rgb(249, 249, 249)"}},[r("div",{staticStyle:{color:"rgb(89, 89, 89)",margin:"0px",padding:"16px",background:"none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)"}},[r("div",{staticClass:"language-undefined extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(" \n")])])])])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("ul",{staticStyle:{"list-style-type":"disc",margin:"0px","padding-left":"23px","font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word"},attrs:{"lake-indent":"0"}},[r("li",[r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[e._v("个性化配置 layout 文件")])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}}),r("p",{staticStyle:{"padding-left":"2em","font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[e._v("使用 renderClient 的第三个扩展参数配置 layout,  优先级高于全局 layout 配置")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("div",{attrs:{"data-card-type":"block","data-lake-card":"codeblock",id:"72b088b6"}},[r("div",{staticClass:"lake-codeblock-content",staticStyle:{border:"1px solid rgb(232, 232, 232)","max-width":"750px",color:"rgb(38, 38, 38)",margin:"0px",padding:"0px",background:"rgb(249, 249, 249)"}},[r("div",{staticStyle:{color:"rgb(89, 89, 89)",margin:"0px",padding:"16px",background:"none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)"}},[r("div",{staticClass:"language-undefined extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(" \n")])])])])])]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[e._v("具体例子请见："),r("a",{attrs:{href:"https://github.com/hubcarl/egg-react-webpack-boilerplate",target:"_blank"}},[e._v("egg-react-webpack-boilerplate")]),e._v(" 运行后菜单 SPA-CSR 例子。")]),r("p",{staticStyle:{"font-size":"14px",color:"rgb(38, 38, 38)","line-height":"24px","letter-spacing":"0.05em","outline-style":"none","overflow-wrap":"break-word",margin:"0px"}},[r("br")])])])}),[],!1,null,null,null);t.default=o.exports}}]);