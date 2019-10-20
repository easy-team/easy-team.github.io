'use strict';
const path = require('path');

module.exports = {
  title: 'easy-team',
  description: 'easy-team',
  base: `/${process.env.repo}`,
  dest: path.resolve(__dirname, '../', process.env.repo),
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