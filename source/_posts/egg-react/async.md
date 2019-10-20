
---
id: 2002908
space: egg-react
slug: async
url: /egg-react/async
title: 组件异步加载
summary: 
coverImage: null
createTime: 2019-06-28T15:58:59.000Z 
upateTime: 2019-06-28T15:58:59.000Z
wordCount: 266
layout: doc
---


# issue: [react-loadable 怎么加入这个骨架中 ](https://github.com/easy-team/egg-react-webpack-boilerplate/issues/23)[#23](https://github.com/easy-team/egg-react-webpack-boilerplate/issues/23)


## 安装依赖

```bash
npm install react-loadable --save
```

## 

## 实现异步组件

```javascript
// async-image.jsx
import React, { Component } from 'react';
import Logo from '../../../../asset/images/react.png';
export default class AsyncImage extends React.Component {
    render() {
        return <div><img src={Logo} /><div>这是异步加载的内容</div></div>
    }
}

// loading.jsx    
import React, { Component } from 'react';
export default class Loading extends React.Component {
    render() {
        return <div>Loading.....</div>
    }
}

```



## 引入异步组件

```javascript
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './widget/loading';

const AsyncImageLoadableComponent = Loadable({
  loader: () => import('./widget/async-image'),
  loading: Loading,
});

export default class About extends Component {

  render() {
    return <div>
      <h3 className="spa-title">Egg + React + Redux + React Router SPA Server Side + Webpack Render Example</h3>
      <div style={{ 'text-align': 'center' }}><AsyncImageLoadableComponent /></div>
    </div>;
  }
}

```


## 本地开发模式异步模块找不到问题
![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561737398221-51eaf5dc-f791-4b30-b930-5914a59c10b6.png#align=left&display=inline&height=430&name=image.png&originHeight=860&originWidth=1360&size=756879&status=done&width=680)


#### 解决方案：easywebpack 在开发模式构建时，筛选出异步chunk 模块，然后落地磁盘
<br />

- [easy-team/easywebpack-react@891c882](https://github.com/easy-team/easywebpack-react/commit/891c882)
- [easy-team/egg-webpack-react@0895534](https://github.com/easy-team/egg-webpack-react/commit/08955343239ae1fbe95035492ce188153d465563)

具体例子见：[https://github.com/easy-team/egg-react-webpack-boilerplate/blob/dynamic-import/app/web/page/app/components/router/about.jsx](https://github.com/easy-team/egg-react-webpack-boilerplate/blob/dynamic-import/app/web/page/app/components/router/about.jsx)

  