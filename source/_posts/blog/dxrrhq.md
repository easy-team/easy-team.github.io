
---
id: 939531
space: blog
slug: dxrrhq
url: /blog/dxrrhq
title: Webpack 4 编译内存泄漏
summary: 增加内存堆栈大小(只能缓解，不能根除) node --max_old_space_size=4096 index.js 通过  node-heapdump 获取内存堆栈信息
coverImage: null
createTime: 2018-11-05T08:16:33.000Z 
upateTime: 2019-05-31T02:11:15.000Z
wordCount: 481
layout: doc
---

## 增加内存堆栈大小(只能缓解，不能根除)

```javascript
"scripts": {
  "dev":  "node --max_old_space_size=4096 index.js"
}
```




## 通过  [node-heapdump](https://github.com/bnoordhuis/node-heapdump) 获取内存堆栈信息

```javascript
const filepath = path.join(process.cwd(), 'dump', Date.now() + '.heapsnapshot');
// to be long time
heapdump.writeSnapshot(filepath);
```


### 获取应用运行内存堆栈信息 

- 应用启动后，在出现内存泄漏前 获取一次内存堆栈信息

- 操作应用出现内存泄漏后，再获取一次内存堆栈信息，反复操作2-3次，作为参考

- 停止操作，等待30s左右等内存回收平稳不再变化时，间隔 5s 左右获取2-3次内存堆栈信息



### 通过 Chrome Dev Tool  Memory Profile 对 heapdump 进行分析

![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541403300467-ea4515db-bf06-4ed8-a77a-416258109952.png#width=811)

- 打开 Chrome Dev Tool， 进入 Memory Tab

- 鼠标选中左边 `Profiles`  节点，右键点击，点击 `Load`  按钮， 按顺序导入应用的 heapdump 文件


> **Shallow Size:  **对象自身占用内存的大小(浅层大小)  **Retained Size** 对象本身连同其无法从 **GC 根**到达的相关对象一起删除后释放的内存大小


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541405677173-2c890bd2-2179-46b0-ae36-9bf12fb4c63f.png#width=827)

- 进行内存泄漏前和内存泄漏后堆栈对比分析：首先选中内存泄漏后堆栈 Profile 1541155180156，同时选择 `Comparison`  ，之后选中 基准对比堆栈 Profile，也就是内存泄漏前堆栈 Profile 1541154957679。（见第二个红色矿）

- 点击 Delta Tab 进行内存增加排序，+ 表示有内存泄漏，Size Delta 表示这次操作GC后， 内存增加的大小。（**如果是同样的操作，每一次导致 Delta 值都增加，并且待程序平稳后，内存一直没有降下来，表示有内存泄漏**）


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541403924750-662d0fc6-88bd-49e8-981d-bb7fceaef28f.png#width=747)

- 首先从最大的开始定位，点击 Constructor 列，，然后选择具体某一项 


![](https://cdn.nlark.com/yuque/0/2018/png/116733/1541404561346-0ca96b89-811a-4546-9486-11c5926f4874.png#width=747)







## 相关资料

- [https://github.com/webpack/webpack/issues/6929](https://github.com/webpack/webpack/issues/6929)

- [https://github.com/easy-team/easywebpack/issues/26](https://github.com/easy-team/easywebpack/issues/26)

- [https://developers.google.com/web/tools/chrome-devtools/memory-problems/](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)

- [http://imweb.io/topic/57cc5a75802d795b425977aa](http://imweb.io/topic/57cc5a75802d795b425977aa)

- [https://www.jianshu.com/p/59eeaa85715a](https://www.jianshu.com/p/59eeaa85715a)




  