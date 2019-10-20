
---
id: 1028376
space: blog
slug: vzgcgb
url: /blog/vzgcgb
title: React Native Android APK包大小分析
summary: 原文：http://hubcarl.github.io/blog/2016/08/21/react-native-size/React Native SO库React Native 打包后文件大小分析React Native java jar包分类和主要作用React Native 详细引用j...
coverImage: null
createTime: 2019-02-15T06:08:19.000Z 
upateTime: 2019-03-22T07:08:45.000Z
wordCount: 101
layout: doc
---
> 原文：[http://hubcarl.github.io/blog/2016/08/21/react-native-size/](http://hubcarl.github.io/blog/2016/08/21/react-native-size/)


**React Native SO库**

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/x86.png#width=)

**React Native 打包后文件大小分析**

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/apk-large-file.png#width=)

**React Native java jar包分类和主要作用**

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/rn-jar-desc.png#width=)

**React Native 详细引用java jar包**

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/RNjar.png#width=)

1. so: 总大小：8.7MB  去掉x86后  5.1MB,   精简压缩后：**2.8MB**

2. classes.dex：4.4MB  其中RN依赖的 jar 2.1M,   整个压缩**1.9MB**


**React Native 一个Hello World的App大小在4M左右**

  