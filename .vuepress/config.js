'use strict';
const path = require('path');

module.exports = {
  title: 'Egg + Vue 工程化解决方案',
  description: 'Egg + Vue 服务端和前端渲染工程方案',
  dest: path.resolve(__dirname, '../dist', process.env.repo),
  themeConfig: {
    nav: [
      { text: 'easywebpack', link: '/easywebpack' },
      { text: 'egg + vue', link: '/egg-vue' },
      { text: 'egg + react', link: '/egg-react' },
    ]
  },
  plugins: [
    [
      'vuepress-plugin-yuque', {
        repoUrl: `https://www.yuque.com/easy-team/${process.env.repo}`,
        html: true
      }
    ]
  ]
 } 