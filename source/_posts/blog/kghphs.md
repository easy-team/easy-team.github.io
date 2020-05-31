
---
id: 1028397
space: blog
slug: kghphs
url: /blog/kghphs
title: React Native代码执行跟踪和调试
summary: 原文 https://hubcarl.github.io/blog/2016/09/04/react-native-debug/在本地开发时, React Native 是加载本地Node服务, 可以通过npm start 启动， package.json 代码如下：&quot;scripts&...
coverImage: null
createTime: 2018-12-05T02:09:16.000Z 
upateTime: 2019-08-06T06:02:12.000Z
wordCount: 4891
layout: doc
---
> 原文 [https://hubcarl.github.io/blog/2016/09/04/react-native-debug/](https://hubcarl.github.io/blog/2016/09/04/react-native-debug/)


在本地开发时, React Native 是加载本地Node服务, 可以通过npm start 启动， package.json 代码如下：

```bash
"scripts": {
  "start": "node node_modules/react-native/local-cli/cli.js start"
}
```

加载的地址为：[http://localhost:8081/debug.android.bundle?platform=android&dev=true&hot=false&minify=false](http://localhost:8081/debug.android.bundle?platform=android&dev=true&hot=false&minify=false)

首次在电脑上面打开该地址，被庞大的源代码吓一跳。一个简单的HelloWorld App 足足有5万多行JS代码(开发模式)。仔细分析和梳理调用流程后，也没有那么的恐怖。代码主要包括React源码, 所有初始化定义的Native组件定义，Bridge层调用相关的MessageQueue，NativeModules，原生JS常用方法polyfill等代码定义实现。

如果是正式发布包，在应用运行时，是不存在本地nodejs服务器这个概念的，所以JS整合文件都是预先打包到asset资源文件里的，减少网络下载JS耗时。当然也可以从网络下载JSBundle，这时就需要考虑首次启动下载JSBundle的网络耗时和下载失败的情况处理。在项目开发时，其实可以在打包时内置一份JSBundle文件，然后启动后异步去下载最新JSBundle，下次启动时就可以加载新的JSBundle。

针对如此庞大的JSBundle文件，首次启动加载和解析的性能如何呢？


### 一.远程本地调试

通过创建ReactInstanceManager.builder 设置setUseDeveloperSupport(true)支持远程本地调试。<br />远程调试时，如果是通过Android studio 打包时，可以先通过npm start启动启动本地服务，启动后服务地址：

[http://localhost:8081/debug.android.bundle?platform=android&dev=true&hot=false&minify=false](http://localhost:8081/debug.android.bundle?platform=android&dev=true&hot=false&minify=false)

如果想加载asset下的JSBundle文件，需要先把JSBundle打到本地assets目录下面，可以通过react-native bundle实现。命令自动会分析图片依赖，然后拷贝到res目录下面。

```bash
react-native bundle 
--entry-file ./index.android.js  
--bundle-output ./app/src/main/assets/index.android.jsbundle 
--platform android --assets-dest ./app/src/main/res/ --dev
```

然后setUseDeveloperSupport(false)，之后重新打包即可。


### 二.远程加载JSBundle文件

在`ReactInstanceManager` 类里面提供了`setJSBundleFile`方法,这个就是动态更新的入口.

```java
public Builder setJSBundleFile(String jsBundleFile) {
      mJSBundleFile = jsBundleFile;
      return this;
    }
```

由于React Native加载的js文件都打包在bundle中，通过这个方法，可以设置app加载的bundle来源。若检测到远端存在更新的bundle文件，下载好后重新加载即可。

在`ReactInstanceManager` 类里面提供了`recreateReactContextInBackground`方法, 可以通过调用该方法重新加载JSBundle文件.

```java
private void recreateReactContextInBackground(JavaScriptExecutor jsExecutor, 
JSBundleLoader jsBundleLoader) {
    UiThreadUtil.assertOnUiThread();

    ReactContextInitParams initParams = new ReactContextInitParams(jsExecutor, jsBundleLoader);
    if (!mIsContextInitAsyncTaskRunning) {
      // No background task to create react context is currently running, create and execute one.
      ReactContextInitAsyncTask initTask = new ReactContextInitAsyncTask();
      initTask.execute(initParams);
      mIsContextInitAsyncTaskRunning = true;
    } else {
      // Background task is currently running, queue up most recent init params to recreate context
      // once task completes.
      mPendingReactContextInitParams = initParams;
    }
  }
```

目前该方法访问权限上private,需要通过反射才能调用, 希望未来 React Native 能够从官方支持. 代码如下:

```java
private void onJSBundleLoadedFromServer() {
    try {
            Class<?> RIManagerClazz = mReactInstanceManager.getClass();
            Method method = RIManagerClazz.getDeclaredMethod("recreateReactContextInBackground",
                JavaScriptExecutor.class, JSBundleLoader.class);
            method.setAccessible(true);
            method.invoke(mReactInstanceManager, new JSCJavaScriptExecutor(),
                    JSBundleLoader.createFileLoader(getApplicationContext(), 
                    JS_BUNDLE_LOCAL_PATH));
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
    }
```


### 三.开启ReactNative日志打印

React Native 增加了关键日志自定义listener回调接口MarkerListener，只要在React Activity onCreate设置ReactMarker.setMarkerListener方法，<br />实现MarkerListener接口logMarker方法，即可实现控制台日志打印。我们可以记录下每个关键路径的当前时间，即可计算出每个关键路径的执行时间。

```java
ReactMarker.setMarkerListener(new ReactMarker.MarkerListener(){
    @Override
    public void logMarker(String name) {
        Log.i("ReactNativeJS", name.toLowerCase() + " cost:" + System.currentTimeMillis());
    }
});
```

```
09-03 20:33:47.637 I/ReactNativeJS: process_packages_end cost:1472387627637

09-03 20:33:47.637 I/ReactNativeJS: build_native_module_registry_start cost:1472387627637

09-03 20:33:47.639 I/ReactNativeJS: build_native_module_registry_end cost:1472387627639

09-03 20:33:47.646 I/ReactNativeJS: create_catalyst_instance_start cost:1472387627646

09-03 20:33:47.688 I/ReactNativeJS: create_catalyst_instance_end cost:1472387627688

09-03 20:33:47.688 I/ReactNativeJS: run_js_bundle_start cost:1472387627688

09-03 20:33:47.717 I/ReactNativeJS: loadapplicationscript_startstringconvert cost:1472387627717

09-03 20:33:47.833 I/ReactNativeJS: loadapplicationscript_endstringconvert cost:1472387627832

09-03 20:33:48.787 I/ReactNativeJS: create_react_context_end cost:1472387628786

09-03 20:33:48.787 I/ReactNativeJS: run_js_bundle_end cost:1472387628787
```


### 四.简单的React Native View创建流程

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/rn-simple-view.jpg#width=)


#### 1.React View源码

```
render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                {this.state.text}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={this._getJSNativeCost}>
                <Text style={styles.instructions}>
                    点击我，测试JS调用Native性能
                </Text>
            </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} onPress={this._setCache}>
                <Text style={styles.instructions}>
                    点击我，设置缓存测试
                </Text>
              </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} onPress={this._getCache}>
              <Text style={styles.instructions}>
                  点击我，获取缓存值
              </Text>
             </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._secondActivity}>
                <Text style={styles.instructions}>
                    点击我，打开Android Native Activity页面
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._secondReactActivity}>
                <Text style={styles.instructions}>
                    点击我，打开Android Second React Activity页面
                </Text>
            </TouchableOpacity>
            <Text style={styles.instructions}>
                Shake or press menu button for dev menu
            </Text>
        </View>
    );
}
```


#### 2.React bundle.js 打包构建后

```
{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.Text,{style:styles.welcome},
this.state.text),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._getJSNativeCost},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，测试JS调用Native性能')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._setCache},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，设置缓存测试')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._getCache},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，获取缓存值')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._secondActivity},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，打开Android Native Activity页面')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._secondReactActivity},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，打开Android Second React Activity页面')),

_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'Shake or press menu button for dev menu')));
}}
```


#### 3.Native View创建之JS调用Native

```
09-03 20:19:19.462  Running application "SmartDebugReactApp" with appParams: 
{"initialProps":{},"rootTag":1}. __DEV__ === true, 
development-level warning are ON, performance optimizations are OFF

09-03 20:19:19.526  'JS->N : ', 8, 18, 'NaN.createView([2,"RCTView",1,{"flex":1}])'

09-03 20:19:19.545  'JS->N : ', 8, 18, 'NaN.createView([3,"RCTView",1,
{"collapsable":true,"flex":1}])'

09-03 20:19:19.584  'JS->N : ', 28, 1, 'NaN.createTimer([2,1,1472386759583,false])'

09-03 20:19:19.706  'JS->N : ', 8, 18, 'NaN.createView([4,"RCTView",1,{"flex":1,"justifyContent":"center","alignItems":"center","backgroundColor":-656129}])'

09-03 20:19:19.721  'JS->N : ', 8, 18, 'NaN.createView([5,"RCTText",1,
{"fontSize":20,"textAlign":"center","margin":10,"color":-65536,
"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'

09-03 20:19:19.732  'JS->N : ', 8, 18, 'NaN.createView([6,"RCTRawText",1,
{"text":"Welcome to React Native!"}])'

09-03 20:19:19.738  'JS->N : ', 8, 9, 'NaN.setChildren([5,[6]])'

09-03 20:19:19.768  'JS->N : ', 8, 18, 'NaN.createView([7,"RCTView",1,
{"accessible":true,"opacity":1}])'

09-03 20:19:19.777  'JS->N : ', 8, 18, 'NaN.createView([8,"RCTText",1,
{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,
"fontSize":14,"accessible":true,"allowFontScaling":true,
"ellipsizeMode":"tail"}])'

09-03 20:19:19.779  'JS->N : ', 8, 18, 'NaN.createView([9,"RCTRawText",1,
{"text":"点击我，测试JS调用Native性能"}])'

09-03 20:19:19.782  'JS->N : ', 8, 9, 'NaN.setChildren([8,[9]])'

09-03 20:19:19.783  'JS->N : ', 8, 9, 'NaN.setChildren([7,[8]])'

09-03 20:19:19.801  'JS->N : ', 8, 18, 'NaN.createView([10,"RCTView",1,
{"accessible":true,"opacity":1}])'

09-03 20:19:19.810  'JS->N : ', 8, 18, 'NaN.createView([12,"RCTText",1,
{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,
"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'

09-03 20:19:19.812  'JS->N : ', 8, 18, 'NaN.createView([13,"RCTRawText",1,
{"text":"点击我，设置缓存测试"}])'

09-03 20:19:19.813  'JS->N : ', 8, 9, 'NaN.setChildren([12,[13]])'


09-03 20:19:19.814  'JS->N : ', 8, 9, 'NaN.setChildren([10,[12]])'

09-03 20:19:19.834  'JS->N : ', 8, 18, 'NaN.createView([14,"RCTView",1,
{"accessible":true,"opacity":1}])'

09-03 20:19:19.849  'JS->N : ', 8, 18, 'NaN.createView([15,"RCTText",1,
{"textAlign":"center","color":-13421773,"marginTop":15,
"marginBottom":5,"fontSize":14,"accessible":true,
"allowFontScaling":true,"ellipsizeMode":"tail"}])'

09-03 20:19:19.851  'JS->N : ', 8, 18, 'NaN.createView([16,"RCTRawText",1,
{"text":"点击我，获取缓存值"}])'

09-03 20:19:19.851  'JS->N : ', 8, 9, 'NaN.setChildren([15,[16]])'

09-03 20:19:19.854  'JS->N : ', 8, 9, 'NaN.setChildren([14,[15]])'

09-03 20:19:19.881  'JS->N : ', 8, 18, 'NaN.createView([17,"RCTView",1,
{"accessible":true,"opacity":1}])'

09-03 20:19:19.890  'JS->N : ', 8, 18, 'NaN.createView([18,"RCTText",1,
{"textAlign":"center","color":-13421773,"marginTop":15,
"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,
"ellipsizeMode":"tail"}])'

09-03 20:19:19.894  'JS->N : ', 8, 18, 'NaN.createView([19,"RCTRawText",1,
{"text":"点击我，打开Android Native Activity页面"}])'

09-03 20:19:19.895  'JS->N : ', 8, 9, 'NaN.setChildren([18,[19]])'

09-03 20:19:19.896  'JS->N : ', 8, 9, 'NaN.setChildren([17,[18]])'

09-03 20:19:19.914  'JS->N : ', 8, 18, 'NaN.createView([20,"RCTView",1,
{"accessible":true,"opacity":1}])'

09-03 20:19:19.924  'JS->N : ', 8, 18, 'NaN.createView([22,"RCTText",1,
{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,
"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'

09-03 20:19:19.927  'JS->N : ', 8, 18, 'NaN.createView([23,"RCTRawText",1,
{"text":"点击我，打开Android Second React Activity页面"}])'

09-03 20:19:19.932  'JS->N : ', 8, 9, 'NaN.setChildren([22,[23]])'

09-03 20:19:19.935  'JS->N : ', 8, 9, 'NaN.setChildren([20,[22]])'

09-03 20:19:19.941  'JS->N : ', 8, 18, 'NaN.createView([24,"RCTText",1,
{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,
"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'

09-03 20:19:19.945  'JS->N : ', 8, 18, 'NaN.createView([25,"RCTRawText",1,
{"text":"Shake or press menu button for dev menu"}])'

09-03 20:19:19.946  'JS->N : ', 8, 9, 'NaN.setChildren([24,[25]])'

09-03 20:19:19.950  'JS->N : ', 8, 9, 'NaN.setChildren([4,[5,7,10,14,17,20,24]])'

09-03 20:19:19.951  'JS->N : ', 8, 9, 'NaN.setChildren([3,[4]])'

09-03 20:19:19.962  'JS->N : ', 8, 18, 'NaN.createView([26,"RCTView",1,
{"collapsable":true,"position":"absolute"}])'

09-03 20:19:19.963  'JS->N : ', 8, 9, 'NaN.setChildren([2,[3,26]])'

09-03 20:19:19.964  'JS->N : ', 8, 9, 'NaN.setChildren([1,[2]])'

09-03 20:19:19.976  'JS->N : ', 24, 0, 'NaN.getDataFromIntent([0,1])'

09-03 20:19:19.978  'JS->N : ', 1, 1, 'NaN.show(["Toast 是原生支持的!",3000])'

09-03 20:19:20.056  'JS->N : ', 8, 12, 'NaN.updateView([6,"RCTRawText",
{"text":"注意：数据为空！"}])'
```


### 五.性能测试


#### 1.React Native 简单测试JS调用Native接口性能

准备三组测试数据:

第一组(简单):   key: 随机生成  value: 我是来自React Native缓存消息

第二组(长字符): key: 随机生成  value: 我是来自React Native缓存消息(循环50遍)

第二组(JSON):  key: 随机生成  value: 下面JSON字符串,循环10遍, 内容不重复

{<br />"id": 000001,<br />"title": "React Native接口性能测试",<br />"summary": "炫斗不停，精彩不断，不要怂就是干的全武将萌化翻转扮演的新式三国策略养成手游《女神三国》邀您...",<br />"category": "React Native",<br />"createTime": "2016-09-09 17:48:38",<br />"publicTime": "2016-09-09 17:48:00"<br />}

```java
@ReactMethod
public void setCache(String key, String value, 
    Callback successCallback, Callback errorCallback) {
    try {
        sharedPreference = getCurrentActivity().getSharedPreferences("rn_cache", 0);
        sharedPreference.edit().putString(key, value).commit();
        successCallback.invoke("save success");
    } catch (Exception e) {
        e.printStackTrace();
        errorCallback.invoke(e.getMessage());
    }
}

//Java中的方法需要导出才能给JS使用，要导出Java方法，需要使用@ReactMethod来注解，且方法的返回值只能是void。
@ReactMethod
public void getCache(String key, Callback callback) {
    callback.invoke(sharedPreference.getString(key, ""));
}
```

```javascript
const start = +new Date();
NativeModules.IntentModule.getCache('RN001',(value)=>{
    const time = +new Date()-start;
    console.log('>>>>cost[getCache]:', time);
    NativeModules.ToastAndroid.show(value+' cost:'+ time, 3000)
});
```

Native收到JS传递过来的值直接返回给JS, 经过多次对三组进行测试（Nexus 5 Android 5.0, MX3 5.0），时间稳定在2-4ms, 偶尔会出现5ms, 数据的大小对接口调用耗时影响不大.


#### 2.WebView addJavascriptInterface 接口测试

```java
@JavascriptInterface
public void setCache(String key, String value) {
    try {
        sharedPreference = context.getSharedPreferences("rn_cache", 0);
        sharedPreference.edit().putString(key, value).commit();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

@JavascriptInterface
public String getCache(String key) {
    return sharedPreference.getString(key, "");
}
```

```javascript
function getCache() {
        var start = +new Date();
        var ret = HybridApp.getCache('RN001');
        var end = +new Date();
        var str = '>>>cost[getCache]:' + (end - start) + '  result:' + ret;
        console.log(str);
}
```

JS从Native获取数据, 经过多次进行三组数据测试（Nexus 5 Android 5.0），时间稳定在0-3ms, 多次点击后,时间更短,时间稳定范围0s-1s,说明Interface有缓存机制和数据的大小对接口调用耗时影响不大.


#### 3.WebView prompt 接口测试

```javascript
@Override
public boolean onJsPrompt(WebView view, String url, String message, 
    String defaultValue, JsPromptResult result) {
    result.confirm(message);
    return true;
}
```

经过多次对三组进行数据进行测试（Nexus 5 Android 5.），时间稳定在1-2ms,数据的大小对接口调用耗时影响不大


#### 4.三种方式耗时总结

1. 从测试效果来看, 三种方式接口调用耗时都在1s-4s级别, 性能表现都非常不错. React Native因为进行了接口封装转换, 比addJavascriptInterface和prompt方式都是简单的数据透传返回要慢1ms-2ms是可以预期的.

2. 说明: 这里只是简单的接口调用测试, 当前运行环境(Native线程切换,Native数据获取方式,数据回调方式等)都可能会影响实际的接口调用耗时.



#### 2.React Native 首次加载性能测试


#### Nexus5 5.0系统测试

**第一次测试**

```
09-08 20:41:39.002   I/ReactNativeJS﹕ >>>react performance react start:1473338499002
09-08 20:41:39.081   I/ReactNativeJS﹕ >>>react performance react end:1473338499081
09-08 20:41:39.601   I/ReactNativeJS﹕ >>>react[runApplication]:1473338499600
09-08 20:41:39.618   I/ReactNativeJS﹕ >>>react#constructor, 1473338499616
09-08 20:41:39.618   I/ReactNativeJS﹕ >>>react#componentWillMount, 1473338499618
09-08 20:41:39.711   I/ReactNativeJS﹕ >>>react#componentDidMount, 1473338499711
```

cost:1473338499711-1473338499002=709ms

**第二次测试**

```
09-08 20:45:42.774   I/ReactNativeJS﹕ >>>react performance react start:1473338742774
09-08 20:45:42.806   I/ReactNativeJS﹕ >>>react performance react end:1473338742806
09-08 20:45:43.300  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react[runApplication]:1473338743299
09-08 20:45:43.320  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react#constructor, 1473338743319
09-08 20:45:43.321  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react#componentWillMount, 1473338743321
09-08 20:45:43.471  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473338743471
```

cost:1473338743471-1473338742774=697ms

**第三次测试**

```
09-08 20:41:39.002   I/ReactNativeJS﹕ >>>react performance react start:1473338499002
09-08 20:41:39.081   I/ReactNativeJS﹕ >>>react performance react end:1473338499081
09-08 20:41:39.601   I/ReactNativeJS﹕ >>>react[runApplication]:1473338499600
09-08 20:41:39.618   I/ReactNativeJS﹕ >>>react#constructor, 1473338499616
09-08 20:41:39.618   I/ReactNativeJS﹕ >>>react#componentWillMount, 1473338499618
09-08 20:41:39.711   I/ReactNativeJS﹕ >>>react#componentDidMount, 1473338499711
```

cost:1473338499711-1473338499002=709ms

**第四次测试**

```
09-08 20:50:46.781   I/ReactNativeJS﹕ >>>react performance react start:1473339046781
09-08 20:50:46.789   I/ReactNativeJS﹕ >>>react performance react end:1473339046789
09-08 20:50:47.213   I/ReactNativeJS﹕ >>>react[runApplication]:1473339047213
09-08 20:50:47.231   I/ReactNativeJS﹕ >>>react#constructor, 1473339047229
09-08 20:50:47.231   I/ReactNativeJS﹕ >>>react#componentWillMount, 1473339047231
09-08 20:50:47.327   I/ReactNativeJS﹕ >>>react#componentDidMount, 1473339047327
```

cost:1473339047327-1473339046781=546ms

从测试结果来看, Nexus5 时间稳定在500ms-700ms之间, 时间可以接受.


#### MX3 5.0系统测试

**第一次测试**

```
09-11 16:51:36.967   I/ReactNativeJS﹕ >>>react performance react start:1473583896967
09-11 16:51:37.091   I/ReactNativeJS﹕ >>>react performance react end:1473583897091
09-11 16:51:38.349   I/ReactNativeJS﹕ '>>>react#constructor', 1473583898342
09-11 16:51:38.350   I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473583898349
09-11 16:51:38.523   I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473583898523
09-11 16:51:38.528   I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473583898527
```

cost:1473583898527-1473583896967=1560ms

**第二次测试**

```
09-11 16:53:48.688   I/ReactNativeJS﹕ >>>react performance react start:1473584028688
09-11 16:53:48.887   I/ReactNativeJS﹕ >>>react performance react end:1473584028887
09-11 16:53:50.345   I/ReactNativeJS﹕ '>>>react#constructor', 1473584030342
09-11 16:53:50.346   I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473584030345
09-11 16:53:50.500   I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473584030500
09-11 16:53:50.504   I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473584030503
```

cost:1473584030503-1473584028688=1815ms

**第三次测试**

```
09-11 17:10:20.694   I/ReactNativeJS﹕ >>>react performance react start:1473585020694
09-11 17:10:20.894   I/ReactNativeJS﹕ >>>react performance react end:1473585020894
09-11 17:10:22.225   I/ReactNativeJS﹕ '>>>react#constructor', 1473585022222
09-11 17:10:22.226   I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473585022225
09-11 17:10:22.405   I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473585022405
09-11 17:10:22.409   I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473585022408
```

cost:1473585022408-1473585020694=1714ms

**第四次测试**

```
09-11 17:11:25.690   I/ReactNativeJS﹕ >>>react performance react start:1473585085690
09-11 17:11:25.865   I/ReactNativeJS﹕ >>>react performance react end:1473585085865
09-11 17:11:27.173   I/ReactNativeJS﹕ '>>>react#constructor', 1473585087169
09-11 17:11:27.173   I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473585087173
09-11 17:11:27.336   I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473585087335
09-11 17:11:27.340   I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473585087339
```

cost: 1473585087339-1473585085690=1649ms

从测试结果来看, MX3 时间稳定在1500ms-1800ms之间, 明显比Nexus5要慢.


#### 3.MX3 内存占用和cpu消耗

**内存占用曲线图**

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/rn-memory.png#width=)

从曲线图看出内存占用非常稳定, 一个HellWord的React Native App占用内存大概在20M

**cpu曲线图**

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/rn-cpu.png#width=)

从曲线图看出启动的时候cpu瞬间飙到40%, 原因是因为启动时涉及Android和React Native JS与Native的大量调用,这个可以从上面View的绘制的过程可以看出.

第二个cpu波动是我这边频繁的点击[点击我]相关测试, 停止点击后, cpu马上就降落下来.

  