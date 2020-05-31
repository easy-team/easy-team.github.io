
---
id: 1028434
space: blog
slug: uhmdkg
url: /blog/uhmdkg
title: Hybrid系列-phonegap android框架详解
summary: 原文：https://hubcarl.github.io/blog/2015/04/19/hybrid-phonegap/首先, 来看一下phonegap 初始化流程以及Native 与 JS 交互流程图。说明：socket server模式下, phonegap.js 源码实现的采用1 毫秒执...
coverImage: null
createTime: 2018-12-05T02:15:20.000Z 
upateTime: 2019-03-22T07:08:45.000Z
wordCount: 1481
layout: doc
---
> 原文：[https://hubcarl.github.io/blog/2015/04/19/hybrid-phonegap/](https://hubcarl.github.io/blog/2015/04/19/hybrid-phonegap/)


首先, 来看一下phonegap 初始化流程以及Native 与 JS 交互流程图。

![](http://images.cnitblog.com/blog/53807/201501/111706565315930.png#width=)

说明：socket server模式下, phonegap.js 源码实现的采用1 毫秒执行一次XHR请求,  当Native  JS 队列里面有JS语句数据时，才是真正的1毫秒调用一下;  当没有数据, scoket server 会阻塞10毫秒, 也就是XHR 要等10秒钟才能收到结果,并进行下一次的轮询。


### 1、Activity继承 DroidGap (extends PhonegapActivity)

从phonegap.xml 中加载白名单配置 和 log配置


### 2、loadUrl （每个Activity 都初始化一次）

》》初始化webview

》》初始化callbackServer

》》插件管理器PluginManager


### 3、加载插件配置:

》》读取 plugins.xml 配置，用map存储起来。

```javascript
<plugins>
<plugin name="Camera" value="com.phonegap.CameraLauncher"/>
<plugin name="Contacts" value="com.phonegap.ContactManager"/>
<plugin name="Crypto" value="com.phonegap.CryptoHandler"/>
<plugin name="File" value="com.phonegap.FileUtils"/>
<plugin name="Network Status" value="com.phonegap.NetworkManager"/>
</plugins>
```

说明：

```js
name 是别名，javascript调用时通过别名来调用。

value：java具体实现类

web页面调用(例如查找联想人)

PhoneGap.exec(successCB, errorCB, "Contacts", "search", [fields, options]);
```

### 4、插件实现

》》编程java类，继承Plugin类(Plugin 实现了IPlugin接口)，并实现execute方法。<br />例如联系人管理插件：

```js
public class ContactManager extends Plugin{
    /**
     * action : 用来指定一个具体动作  search 表示搜索联系人
     * args： 方法参数
     * callbackId：js与java指定一个标识，
     */
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        try {
            if (action.equals("search")) {
                JSONArray res = contactAccessor.search(args.getJSONArray(0), args.optJSONObject(1));
                return new PluginResult(status, res, "navigator.contacts.cast");
            }
            else if (action.equals("save")) {
                String id = contactAccessor.save(args.getJSONObject(0));
                if (id != null) {
                                  JSONObject res = contactAccessor.getContactById(id);
                                      if (res != null) {
                                         return new PluginResult(status, res);
                                     }
                }
            }
            else if (action.equals("remove")) {
                if (contactAccessor.remove(args.getString(0))) {
                    return new PluginResult(status, result);
                }
            }
            // If we get to this point an error has occurred
                JSONObject r = new JSONObject();
                    r.put("code", UNKNOWN_ERROR);
                            return new PluginResult(PluginResult.Status.ERROR, r);
        } catch (JSONException e) {
            Log.e(LOG_TAG, e.getMessage(), e);
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        }
    }
}
```

### 5、polling和server初始化

android DroidGap 初始化时，如果loadUrl的url不是以file://开头时，polling = true, 否则是socket server方式

代码见CallbackServer.java 类init方法:

```js
public void init(String url) {
    if ((url != null) && !url.startsWith("file://")) {
       this.usePolling = true;
       this.stopServer();
    }
    else if (android.net.Proxy.getDefaultHost() != null) {
        this.usePolling = true;
        this.stopServer();
    }
    else {
        this.usePolling = false;
        this.startServer();
    }
}
```

### 6、phonegap.js  关键代码说明


phonegap.js在启动时，首先会通过prompt("usePolling", "gap_callbackServer:")获取调用方式:
 XHR 轮询 OR prompt 轮询,  如果是XHR的话, 会启动XHR调用获取http server端口 和token。


方法PhoneGap.Channel.join 启动 js server 或者polling调用 

UsePolling 默认为false。 通过 var polling = prompt("usePolling", "gap_callbackServer:") 获取调用方式。

```js
PhoneGap.Channel.join(function () {
 
    // Start listening for XHR callbacks
    setTimeout(function () {
      if (PhoneGap.UsePolling) {
        PhoneGap.JSCallbackPolling();
      }
      else {
        console.log('PhoneGap.Channel.join>>>>>>>>>>>>>>>>>>>>>>>>>');<br>      
        <span style="color: #ff6600;"> //phonegap js 首次启动获取js调用Native方式</span>
        var polling = prompt("usePolling", "gap_callbackServer:");
        PhoneGap.UsePolling = polling;
        if (polling == "true") {
          PhoneGap.UsePolling = true;
          <span style="color: #ff6600;">PhoneGap.JSCallbackPolling();</span>
        }
        else {
          PhoneGap.UsePolling = false;
         <span style="color: #ff6600;"> PhoneGap.JSCallback();</span>
        }
      }
    }, 1);
}
```

XHR轮询：PhoneGap.JSCallback方法

通过XHR 与java端 socket进行通信，每一毫秒执行一次JSCallback，从android socket获取javascript执行结果代码，最后通过eval动态执行javascript

XHR调用, 通过prompt 获取socket端口 和 token（uuid）

```js
if (PhoneGap.JSCallbackPort === null) {
   PhoneGap.JSCallbackPort = <span style="color: #ff6600;">prompt("getPort", "gap_callbackServer:");</span>
   console.log('PhoneGap.JSCallback getPort>>>>>>>>>>>>>>>>>>>>>>>>>:' + PhoneGap.JSCallbackPort);
}
if (PhoneGap.JSCallbackToken === null) {
　　PhoneGap.JSCallbackToken =<span style="color: #ff6600;"> prompt("getToken", "gap_callbackServer:");</span>
　　console.log('PhoneGap.JSCallback getToken>>>>>>>>>>>>>>>>>>>>>>>>>:' + PhoneGap.JSCallbackToken);
}
xmlhttp.open("GET", "http://127.0.0.1:" + PhoneGap.JSCallbackPort + "/" + PhoneGap.JSCallbackToken, true);
xmlhttp.send();
```

XHR返回结果代码片段

```js
var msg = decodeURIComponent(xmlhttp.responseText);
setTimeout(function () {
try {
    var t = eval(msg);
}
catch (e) {
  // If we're getting an error here, seeing the message will help in debugging
  console.log("JSCallback: Message from Server: " + msg);
  console.log("JSCallback Error: " + e);
}
 }, 1);
 <span style="color: #ff6600;">setTimeout(PhoneGap.JSCallback, 1);</span><br>}
```　　

prompt轮询： PhoneGap.JSCallbackPolling方法

```js
PhoneGap.JSCallbackPolling = function () {
    // Exit if shutting down app
    if (PhoneGap.shuttingDown) {
      return;
    }
    // If polling flag was changed, stop using polling from now on
    if (!PhoneGap.UsePolling) {
      PhoneGap.JSCallback();
      return;
    }
    var msg = prompt("", "gap_poll:");
    if (msg) {
      setTimeout(function () {
        try {
          var t = eval("" + msg);
        }
        catch (e) {
          console.log("JSCallbackPolling: Message from Server: " + msg);
          console.log("JSCallbackPolling Error: " + e);
        }
      }, 1);
      <span style="color: #ff6600;">setTimeout(PhoneGap.JSCallbackPolling, 1);</span>
    }
    else {
      setTimeout(PhoneGap.JSCallbackPolling, PhoneGap.JSCallbackPollingPeriod);
    }
  };
```


### 7、总结

#### 1、phonegap android 插件管理器PluginManager初始化时, 是每个Activity都要初始化一次, 数据都缓存一次, 导致同一份数据缓存多次。-- 暂不清楚为啥这样实现？ 难道是phonegap 框架是为单webview 实现的，如果有知道原因的请告知一下。
#### 2、同第1点一样, Socket Server 每个Activity都会初始化一下, 如果loadUrl 的url类型不同,会不会导致scoket server状体错乱, 待验证！
#### 3、phonegap 采用 prompt 和 XHR 轮询机制，一是会导致手机耗电情况严重， 二是了解到prompt 调用是会阻塞js执行的, 这样导致影响到页面加载速度。

phonegap 已经改名cordova, 在最新版本cordova 框架里面已经去掉了socket server模式, 详细请查看：http://www.cnblogs.com/hubcarl/p/4202784.html
```


  