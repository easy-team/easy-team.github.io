
---
id: 1028368
space: blog
slug: xcw19a
url: /blog/xcw19a
title: React Native, Hybrid App, H5 简单对比分析
summary: 原文： http://hubcarl.github.io/blog/2016/08/07/react-native-compare/learn once write anywhereWhat we really want is the user experience of the native...
coverImage: null
createTime: 2019-02-15T06:08:44.000Z 
upateTime: 2019-03-22T07:08:45.000Z
wordCount: 515
layout: doc
---
> 原文： [http://hubcarl.github.io/blog/2016/08/07/react-native-compare/](http://hubcarl.github.io/blog/2016/08/07/react-native-compare/)



# learn once write anywhere

What we really want is the user experience of the native mobile platforms, combined with the developer experience we have when building with React on the web.

**既保留流畅的用户体验，又保留React的开发效率**


# 一. H5/Hybrid,React Native,Native对比

1. UI布局：Web布局灵活度 > React Native > Native

2. UI截面图：React Native使用的是原生组件,可以与Native持平

3. 动画：React Native动画需求基本满足

4. 安装包体积：React Native框架打包后(去掉x86 so)，4MB左右

5. 更新能力: H5/Hybrid > React Native > Native

6. 维护成本: H5/Hybrid <= React Native < Native

7. 真机体验：Native >= React Native > H5/Hybrid

8. React Native上手简单, 框架定制和扩展比Native有些大, 但是具备跨平台能力和热更新能力。



# 二. React Native优势

1. 原生应用的用户体验

2. 跨平台特性,热更新能力,调试方便

3. 开发人员单一技术栈

4. 社区繁荣

5. 适合尝试性,快速满足双平台的App应用



# 三. React Native劣势

1. React Native上手简单, 框架定制和扩展成本高

2. React Native 深入学习成本高(java,Android,JNI,C++,React)

3. 首次启动和Big ListView 问题

4. 大型应用后期的维护成本高，在崩溃率，性能优化方面是个比较大的挑战。



# 四. React-Native 做了什么

1. React-Native 丢弃了 Webview, 生成的视图是原生Native视图

2. 复用React，将 Dom 结构的改变通过 diff 算法处理后，由 js 传递给 native 进行底层视图布局。

3. css-layout引擎，前端可以继续写熟悉的 css 语法，由引擎转化成底层的布局。

4. 对js暴露底层常用的UI组建, js 层可以直接对这些组件进行布局。



# 五. 对应前端的开发模式的变化

1. JSX vs Html

2. css-layout vs css

3. ECMAScript 6 vs ECMAScript 5

4. React-Native vs DOM



# 六. React Native学习点

1. React基础知识

2. Native与JS交互原理

3. 基本的Android编程知识

4. 组件使用

5. Native和JS自定义组件编写



  