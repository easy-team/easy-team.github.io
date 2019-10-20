
---
id: 2212406
space: blog
slug: test
title: Test Test Test
description: 知乎专栏：https://zhuanlan.zhihu.com/p/30683070在用Vue做服务端渲染时，大家对Vue服务端渲染的性能持怀疑态度，业界也有一些尝试，不过完整的产品项目和数据分析比较少。结合线上和本地压测，我们对 Vue 和 Nunjucks 针对模板渲染Render时间，C...
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1561601469682-887d3468-3abc-4fdd-9134-a7e214a5266c.png
createTime: 2019-07-26T10:31:12.000Z 
upateTime: 2019-07-29T09:46:13.000Z
wordCount: 3077
layout: doc
---
知乎专栏：[https://zhuanlan.zhihu.com/p/30683070](https://zhuanlan.zhihu.com/p/30683070)<br />
<br />在用Vue做服务端渲染时，大家对Vue服务端渲染的性能持怀疑态度，业界也有一些尝试，不过完整的产品项目和数据分析比较少。结合线上和本地压测，我们对 Vue 和 Nunjucks 针对模板渲染Render时间，CPU占用，内存占用进行全面的对比测试。<br />


## 渲染性能对比

通过实现相同的模板功能，分别针对无缓存和有缓存进行了对比测试. 测试方法，通过`ab`压测工具对页面进行测试，Node层收集页面render渲染时间, 然后进行汇总统计分析。<br />
<br />**Nunjucks 测试模板**<br />**
```html
<div>
    <div>
        <h2>h5GameList</h2>
        <ul>
            {% for item in h5GameList.data.list %}
            <li><a href="{{item.downloadUrl}}">{{item.name}}-{{item.resume}}</a></li>
            {% endfor %}
        </ul>
    </div>
    <div>
        <h2>recommendList</h2>
        {% for item in recommendList.data %}
        <div>
            <a href="{{item.downloadUrl}}">{{item.recommendBriefResume}}</a>
            <p>{{item.recommendResume}}</p>
        </div>
        {% endfor %}
    </div>
    <div>
        <h2>bestList</h2>
        {% for item in bestList.data.list %}
        <div>
            <a href="{{item.downloadUrl}}">{{item.resume}}</a>
            <p>{{item.packageName}}</p>
        </div>
        {% endfor %}
    </div>
    <div>
        <h2>bookingList</h2>
        {% for item in bookingList.data %}
        <div>
            <a href="{{item.logoUrl}}">{{item.name}}-{{item.categoryName}}</a>
            <p>{{item.resume}}</p>
        </div>
        {% endfor %}
    </div>
</div>
```
