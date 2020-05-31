
---
id: 1104836
space: blog
slug: egret
url: /blog/egret
title: Egret  游戏开发
summary: 命令行egret buildegret run -a   自动编译，浏览器不能自动刷新Stagepublic constructor() {    super();    this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this...
coverImage: null
createTime: 2019-01-02T07:40:43.000Z 
upateTime: 2019-06-15T16:06:35.000Z
wordCount: 1112
layout: doc
---

## 命令行

- egret build

- egret run -a   自动编译，浏览器不能自动刷新



## Stage

```javascript
public constructor() {
   super();
   this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
}

private onAddToStage(event:egret.Event) {
  this.stage.frameRate = 50;
}
```


## 事件


通过 addEventListener 注册监听事件，可以是系统和自定义事件， 通过 dispatchEventWith 和 dispatchEventWith 触发事件， 另外可以通过 removeEventListener 移除监听事件

```javascript
this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
this.dispatchEventWith("createBullet", false, data);
this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
```

常用系统事件

- egret.TouchEvent.TOUCH_MOVE

- egret.TimerEvent.TIMER

- egret.TouchEvent.TOUCH_MOVE



## 拖动

> [http://developer.egret.com/cn/example/egret2d/index.html#060-interact-drag-drop](http://developer.egret.com/cn/example/egret2d/index.html#060-interact-drag-drop)


```javascript
// 鼠标点击时，鼠标全局坐标与e的位置差
private _distance:egret.Point = new egret.Point(); 

this.e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
this.e.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

private mouseDown(evt:egret.TouchEvent)
{
    this._touchStatus = true;
    this._distance.x = evt.stageX - this.e.x;
    this._distance.y = evt.stageY - this.e.y;
    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
}

private mouseMove(evt:egret.TouchEvent)
{
    if( this._touchStatus )
    {
        this.e.x = evt.stageX - this._distance.x;
        this.e.y = evt.stageY - this._distance.y;
    }
}
```

- egret.TouchEvent.TOUCH_BEGIN



## 锚点
> anchoroffsetX  和  anchoroffsetX 可以用来作为虚拟的中心点或者参考点


```javascript
this.fire.x = 200;
this.fire.y = 200;
this.fire.scaleX = 0.7;
this.fire.scaleY = 0.7;
this.fire.anchorOffsetX = this.fire.width / 2;
this.fire.anchorOffsetY = this.fire.height / 2;
```




## 动画

> 监听 `ENTER_FRAME` 将会按照帧频进行回调


```javascript
this.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
  e.rotation += 3;
}, this );
```

- e.rotation[ 旋转](http://developer.egret.com/cn/example/egret2d/index.html#010-disp-anchor-rota-scale)

- e.scaleX (0-1) [缩放 ](http://developer.egret.com/cn/example/egret2d/index.html#010-disp-anchor-rota-scale)



## 富文本

> [http://developer.egret.com/cn/example/egret2d/index.html#110-text-text-flow-2](http://developer.egret.com/cn/example/egret2d/index.html#110-text-text-flow-2)


```javascript
const html:egret.TextField = new egret.TextField();
html.textFlow = new egret.HtmlTextParser().parser(str);
this.addChild(html);
```



## 粒子 particle

```json
{
 "modules":[
  {
   "name": "particle",
   "path": "../particle/libsrc"
  }
 ]
}
```

> [http://developer.egret.com/cn/github/egret-docs/extension/threes/instructions/index.html](http://developer.egret.com/cn/github/egret-docs/extension/threes/instructions/index.html)

下载地址：[https://github.com/egret-labs/egret-game-library/tree/master/particle](https://github.com/egret-labs/egret-game-library/tree/master/particle)<br />教程文档：[http://developer.egret.com/cn/github/egret-docs/extension/particle/introduction/index.html](http://developer.egret.com/cn/github/egret-docs/extension/particle/introduction/index.html)


粒子编辑器： [http://developer.egret.com/cn/github/egret-docs/tools/Feather/manual/index.html](http://developer.egret.com/cn/github/egret-docs/tools/Feather/manual/index.html)<br />[silver.zip](https://www.yuque.com/attachments/yuque/0/2018/zip/116733/1543482819156-6fa0dc2b-73aa-40a3-bc3b-dad8c6542eff.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2018%2Fzip%2F116733%2F1543482819156-6fa0dc2b-73aa-40a3-bc3b-dad8c6542eff.zip%22%2C%22name%22%3A%22silver.zip%22%2C%22size%22%3A3621%2C%22ext%22%3A%22zip%22%2C%22type%22%3A%22application%2Fzip%22%2C%22card%22%3A%22file%22%7D)<br />![](https://cdn.nlark.com/yuque/0/2018/png/116733/1543482690971-4bc964a4-b29c-4fd3-a6b4-93bbe379b839.png#width=827)


## 资源加载

> [http://edn.egret.com/cn/article/index/id/123](http://edn.egret.com/cn/article/index/id/123)


```javascript
// 同步加载资源，这种方式只能获取已经缓存过的资源，例如之前调用过loadGroup()被预加载的资源
// 可以在 resource/default.res.json 配置
const res = RES.getRes("red_icon_png");
// 异步获取资源，这种方式可以获取配置中含有的所有资源项。如果缓存中存在，
// 直接调用回调函数返回，若不存在，就启动网络加载文件并解析后回调。
const res = RES.getResAsync(name:string,compFunc:Function,thisObject:any):void
```


## 纹理集

- 纹理集实际上就是将一些零碎的小图放到一张大图当中, 可以用 [Texture Merger](http://edn.egret.com/cn/index.php?g=portal&amp;m=article&amp;a=index&amp;id=238) 工具制作[http://edn.egret.com/cn/article/index/id/135](http://edn.egret.com/cn/article/index/id/135)


- 可以通过 `markman`  软件获取已有纹理图元素坐标，用于编写 纹理图 json 文件,  需要先安装 AdobeAIR


[MarkMan.air.zip](https://www.yuque.com/attachments/yuque/0/2018/zip/116733/1544149398492-7070a934-fc8f-4a2c-989b-39b895996db7.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2018%2Fzip%2F116733%2F1544149398492-7070a934-fc8f-4a2c-989b-39b895996db7.zip%22%2C%22name%22%3A%22MarkMan.air.zip%22%2C%22size%22%3A1644801%2C%22ext%22%3A%22zip%22%2C%22type%22%3A%22application%2Fzip%22%2C%22card%22%3A%22file%22%7D)


## 飞机大战

[egret-air-fight.zip](https://www.yuque.com/attachments/yuque/0/2019/zip/116733/1546414664425-5010a57a-e7e2-4c7f-bac5-663daa4e4648.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fzip%2F116733%2F1546414664425-5010a57a-e7e2-4c7f-bac5-663daa4e4648.zip%22%2C%22name%22%3A%22egret-air-fight.zip%22%2C%22size%22%3A10981593%2C%22ext%22%3A%22zip%22%2C%22type%22%3A%22application%2Fzip%22%2C%22card%22%3A%22file%22%7D)


### 游戏逻辑

1. 创建默认背景图和启动按钮，同时创建可滚动背景图。飞机不动， 利用负坐标，背景向下移动，背景图循环滚动，循环利用

2. 点击启动按钮启动游戏，开始创建飞机和发射子弹

3. 监听 egret.Event.ENTER_FRAME 事件，更新飞机和子弹位置，通过不停的更改飞机和子弹的 y 坐标实现子弹发射效果， 通过 hitTestPoint 进行我的子弹与敌机， 敌机子弹与我的飞机进行碰撞检测，进行相应的扣血

4. 创建我的飞机和发射子弹，监听创建子弹事件，监听我的飞机 egret.TouchEvent.TOUCH_MOVE 事件，同时调整飞机和子弹坐标

5. 定时创建不同类型的敌机，同时开火，监听创建子弹事件

6. 增加护卫机子弹发射，滚石场景，BOSS 场景，能量，爆炸，音乐等场景



### 开发技巧

- 飞机不动， 背景向下移动，背景图循环滚动，循环利用 

- 通过 egret.TimerEvent.TIMER 事件执行重复操作，比如创建飞机，滚石，发射子弹等

- 敌机，子弹，滚石，道具都需要进行回收（超出屏幕）和重复利用，同时停止发射等事件

- 通过设置 子弹的 scaleX 和 scaleY 改变子弹的发射角度和方向， 可以使用坐标递增，递减或 egret.Tween.get 动画实现子弹发射效果

- 游戏结束，清理现场，包括 TIMER，ENTER_FRAME以及自定义事件



  