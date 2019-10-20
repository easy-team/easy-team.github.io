
---
id: 1028386
space: blog
slug: wk5ney
url: /blog/wk5ney
title: React Native 自定义插件
summary: 原文： http://hubcarl.github.io/blog/2016/08/13/react-native-plugin/编写自定义插件需要继承ReactContextBaseJavaModule和实现ReactPackage接口, 具体实现步骤如下：1. 继承ReactContext...
coverImage: null
createTime: 2018-12-05T02:08:09.000Z 
upateTime: 2019-03-22T07:08:45.000Z
wordCount: 210
layout: doc
---
> 原文： [http://hubcarl.github.io/blog/2016/08/13/react-native-plugin/](http://hubcarl.github.io/blog/2016/08/13/react-native-plugin/)


编写自定义插件需要继承ReactContextBaseJavaModule和实现ReactPackage接口, 具体实现步骤如下：


#### 1. 继承ReactContextBaseJavaModule接口

```java
public class IntentModule extends ReactContextBaseJavaModule
```


#### 2. 重写 getName方法,暴露给JS端调用名

```java
@Override
public String getName() {
    return "IntentModule";
}
```


#### 3. 给暴露给JS的方法添加 @ReactMethod 注解，且方法的返回值只能是void

```java
@ReactMethod
public void backActivity(int count) {
    if (count > 0) {
        try {
            Activity currentActivity = getCurrentActivity();
            currentActivity.finish();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```


#### 4.实现ReactPackage接口

```java
public class IntentPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new IntentModule(reactContext)
        );
    }
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```


#### 5.在Application中注册IntentPackage

```java
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new IntentPackage()
  );
}
```


#### 6.JavaScript调用IntentModule的backActivity方法

```java
NativeModules.IntentModule.backActivity();
```


  