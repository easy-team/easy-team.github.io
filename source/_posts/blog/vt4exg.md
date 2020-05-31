
---
id: 1247126
space: blog
slug: vt4exg
url: /blog/vt4exg
title: Webpack 4 构建内存泄漏
summary: 问题：https://github.com/easy-team/easywebpack/issues/26 (已修复)一. 增加内存堆栈大小(只能缓解，不能根除)
coverImage: 
createTime: 2019-02-14T05:53:03.000Z 
upateTime: 2019-06-05T09:26:27.000Z
wordCount: 548
layout: doc
---

### 问题：https://github.com/easy-team/easywebpack/issues/26 (已修复)



### 一. 增加内存堆栈大小(只能缓解，不能根除)

```javascript
"scripts": {
  "dev":  "node --max_old_space_size=4096 index.js"
}
```




### 二. 通过  node-heapdump 获取内存堆栈信息

```javascript
const filepath = path.join(process.cwd(), 'dump', Date.now() + '.heapsnapshot');
// to be long time
heapdump.writeSnapshot(filepath);
```


### 获取应用运行内存堆栈信息 

- 应用启动后，在出现内存泄漏前 获取一次内存堆栈信息<br />
- 操作应用出现内存泄漏后，再获取一次内存堆栈信息，反复操作2-3次，作为参考<br />
- 停止操作，等待30s左右等内存回收平稳不再变化时，间隔 5s 左右获取2-3次内存堆栈信息<br />


### 通过 Chrome Dev Tool  Memory Profile 对 heapdump 进行分析


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541403300467-ea4515db-bf06-4ed8-a77a-416258109952.png#align=left&display=inline&height=518&originHeight=518&originWidth=811&width=811)


- 打开 Chrome Dev Tool， 进入 Memory Tab<br />
- 鼠标选中左边 `Profiles`  节点，右键点击，点击 `Load`  按钮， 按顺序导入应用的 heapdump 文件<br />

> **Shallow Size:  **对象自身占用内存的大小(浅层大小)  **Retained Size** 对象本身连同其无法从 **GC 根**到达的相关对象一起删除后释放的内存大小



![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541405677173-2c890bd2-2179-46b0-ae36-9bf12fb4c63f.png#align=left&display=inline&height=347&originHeight=427&originWidth=1019&width=827)

- 进行内存泄漏前和内存泄漏后堆栈对比分析：首先选中内存泄漏后堆栈 Profile 1541155180156，同时选择 `Comparison`  ，之后选中 基准对比堆栈 Profile，也就是内存泄漏前堆栈 Profile 1541154957679。（见第二个红色矿）<br />
- 点击 Delta Tab 进行内存增加排序，+ 表示有内存泄漏，Size Delta 表示这次操作GC后， 内存增加的大小。（**如果是同样的操作，每一次导致 Delta 值都增加，并且待程序平稳后，内存一直没有降下来，表示有内存泄漏**）<br />

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541403924750-662d0fc6-88bd-49e8-981d-bb7fceaef28f.png#align=left&display=inline&height=256&originHeight=454&originWidth=1325&width=747)

- 首先从最大的开始定位，点击 Constructor 列，，然后选择具体某一项 <br />


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541404561346-0ca96b89-811a-4546-9486-11c5926f4874.png#align=left&display=inline&height=319&originHeight=556&originWidth=1301&width=747)



通过分析，最后定位到是  webpack-manifest-resource-plugin  使用 bind 导致 compiler 对象没有被释放。 目前测试只在 Egg Agent 启用 Webpack 编译会有问题， 直接用于前端应用没有问题。





## 相关资料

- https://github.com/webpack/webpack/issues/6929<br />
- https://github.com/easy-team/easywebpack/issues/26<br />
- https://developers.google.com/web/tools/chrome-devtools/memory-problems/<br />
- http://imweb.io/topic/57cc5a75802d795b425977aa<br />
- https://www.jianshu.com/p/59eeaa85715a<br />


  