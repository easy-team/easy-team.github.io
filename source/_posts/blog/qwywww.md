
---
id: 1028408
space: blog
slug: qwywww
url: /blog/qwywww
title: React Native 热更新实现
summary: 原文：https://hubcarl.github.io/blog/2016/09/15/react-native-update/React Native 动态更新实际效果如下React Native 热更新实现APK我们知道, React Native所有的js文件都打包在一个jsbundle...
coverImage: null
createTime: 2018-12-05T02:10:28.000Z 
upateTime: 2019-07-12T10:34:52.000Z
wordCount: 2287
layout: doc
---
> 原文：[https://hubcarl.github.io/blog/2016/09/15/react-native-update/](https://hubcarl.github.io/blog/2016/09/15/react-native-update/)


React Native 动态更新实际效果如下

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/react-native-update.gif#width=)

[React Native 热更新实现APK](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/react-native-update.apk)

![](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/react-native-update-qrcode.png#width=)

我们知道, React Native所有的js文件都打包在一个jsbundle文件中，发布时也是打包到app里面,一般是放到asset目录.<br />如是猜想是不是可以从远程下载jsbundle文件覆盖asset的jsbundle. 查资料发现asset目录是只读的,该想法行不通.

在看React Native 启动入口时,看到通过是setBundleAssetName指定 asset文件的, 查看方法实现:

```java
public ReactInstanceManager.Builder setBundleAssetName(String bundleAssetName) {
    return this.setJSBundleFile(bundleAssetName == null?null:"assets://" + bundleAssetName);
}
```

发现调用了setJSBundleFile方法,  而且该方法是public的, 也就是可以通过这个方法指定的jsbundle文件

```java
public ReactInstanceManager.Builder setJSBundleFile(String jsBundleFile) {
    this.mJSBundleFile = jsBundleFile;
    this.mJSBundleLoader = null;
    return this;
}
```

可以设置了jsbundle文件, 那我们就可以把jsbundle文件放到sdcard, 经过测试发现, 确实可以读取sdcard jsbundle.

sdcar的文件开业读取了,那我们就可以把文件放到远程服务器, 启动后下载远程jsbundle文件到sdcard. 大概思路如下:

1. 我们打好包jsbundle文件放到[远程服务器](https://raw.githubusercontent.com/hubcarl/smart-react-native-app/debug/app/src/main/assets/index.android.bundle)

2. 启动React Native, 检查sdcard是否有jsbundle文件, 如果没有调用setBundleAssetName加载asset目录的jsbundle, 同时启动线程下载远程jsbundle文件到sdcard目录.

3. 待下次启动时, sdcard是有jsbundle文件的, 加载的就是最新的jsbundle文件.


实现代码如下:

```java
public static final String JS_BUNDLE_REACT_UPDATE_PATH = 
Environment.getExternalStorageDirectory().toString() + 
File.separator + "react_native_update/debug.android.bundle";

private void iniReactRootView(boolean isRelease) {
        ReactInstanceManager.Builder builder = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setJSMainModuleName("debug.android.bundle")
                .addPackage(new MainReactPackage())
                .addPackage(new Package())
                .setInitialLifecycleState(LifecycleState.RESUMED);

        File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (isRelease && file != null && file.exists()) {
            builder.setJSBundleFile(JS_BUNDLE_LOCAL_PATH);
            Log.i(TAG, "load bundle from local cache");
        } else {
            builder.setBundleAssetName(JS_BUNDLE_LOCAL_FILE);
            Log.i(TAG, "load bundle from asset");
            updateJSBundle();
        }

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = builder.build();
        mReactRootView.startReactApplication(mReactInstanceManager, "SmartReactApp", null);
        setContentView(mReactRootView);
}

// 从远程服务器下载新的jsbundle文件
private void updateJSBundle() {
        DownloadManager.Request request = new DownloadManager.Request(
            Uri.parse(JS_BUNDLE_REMOTE_URL));
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
        request.setDestinationUri(Uri.parse("file://" + JS_BUNDLE_LOCAL_PATH));
        DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        mDownloadId = dm.enqueue(request);
        Log.i(TAG, "start download remote js bundle file");
}
```

经过测试发现, 确实可以实现动态更新, 但要下次启动才能看到最新的效果, 那有没有办法实现立即看到更新效果呢?

通过查看React Native 源码和[查阅资料](https://github.com/fengjundev/React-Native-Remote-Update)是可以实现的, 具体实现如下:

为了在运行中重新加载bundle文件，查看ReactInstanceManager的源码，找到如下方法：

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

虽然这个方法是private的，但是可以通过反射调用,下面是0.29版本的实现(上面React-Native-Remote-Update项目实现React Native版本旧了,直接拷贝反射参数有问题)

```java
private void onJSBundleLoadedFromServer() {
        File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (file == null || !file.exists()) {
            Log.i(TAG, "js bundle file download error, check URL or network state");
            return;
        }

        Log.i(TAG, "js bundle file file success, reload js bundle");

        Toast.makeText(UpdateReactActivity.this, "download bundle complete", 
            Toast.LENGTH_SHORT).show();
        try {

            Class<?> RIManagerClazz = mReactInstanceManager.getClass();

            Field f = RIManagerClazz.getDeclaredField("mJSCConfig");
            f.setAccessible(true);
            JSCConfig jscConfig = (JSCConfig)f.get(mReactInstanceManager);

            Method method = RIManagerClazz.getDeclaredMethod("recreateReactContextInBackground",
                    com.facebook.react.cxxbridge.JavaScriptExecutor.Factory.class,
                    com.facebook.react.cxxbridge.JSBundleLoader.class);
            method.setAccessible(true);
            method.invoke(mReactInstanceManager,
                    new com.facebook.react.cxxbridge.JSCJavaScriptExecutor.Factory(jscConfig.getConfigMap()),
                    com.facebook.react.cxxbridge.JSBundleLoader.createFileLoader(
                        getApplicationContext(), JS_BUNDLE_LOCAL_PATH));
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e){
            e.printStackTrace();
        }
}
```

通过监听下载成功事件, 然后调用onJSBundleLoadedFromServer接口就可以看到立即更新的效果.

```java
private CompleteReceiver mDownloadCompleteReceiver;
private long mDownloadId;

private void initDownloadManager() {
   mDownloadCompleteReceiver = new CompleteReceiver();
   registerReceiver(mDownloadCompleteReceiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
}

private class CompleteReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        long completeDownloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        if (completeDownloadId == mDownloadId) {
            onJSBundleLoadedFromServer();
        }
    }
}
```

尝试以后果然可以更新, 当时心情非常好~  可是......,  后面继续实现项目时发现,  动态更新后, 本地图片始终不显示, 远程图片可以.

接下来查看React Native, jsbundle 源码和查看资料,  终于寻的一点蛛丝马迹, 大概的意思如下:

1. 如果bundle在sd卡【 比如bundle在file://sdcard/react_native_update/index.android.bundle 那么图片目录在file://sdcard/react_native_update/drawable-mdpi】

2. 如果你的bundle在assets里，图片资源要放到res文件夹里,例如res/drawable-mdpi


接下来按照该说法进行了实验, 发现确实可以. 当界面刷新时,心情格外好! 下面是详细代码实现(部分代码参考React-Native-Remote-Update项目,在这里直接引用):

```java
package com.react.smart;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.JSCConfig;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.react.smart.componet.Package;
import com.react.smart.utils.FileAssetUtils;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
/**
 * Created by sky on 16/7/15.
 * https://github.com/hubcarl
 */
/**
 * Created by sky on 16/9/4.
 *
 */
public class UpdateReactActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private static final String TAG = "UpdateReactActivity";

    public static final String JS_BUNDLE_REMOTE_APP= 
    "https://raw.githubusercontent.com/hubcarl/smart-react-native-app";
    public static final String JS_BUNDLE_REMOTE_URL = JS_BUNDLE_REMOTE_APP 
    + "/debug/app/src/main/assets/index.android.bundle";
    public static final String JS_BUNDLE_LOCAL_FILE = "debug.android.bundle";
    public static final String JS_BUNDLE_REACT_UPDATE_PATH = 
    Environment.getExternalStorageDirectory().toString() + File.separator + "react_native_update";
    public static final String JS_BUNDLE_LOCAL_PATH = JS_BUNDLE_REACT_UPDATE_PATH
    + File.separator + JS_BUNDLE_LOCAL_FILE;

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private CompleteReceiver mDownloadCompleteReceiver;
    private long mDownloadId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        iniReactRootView(true);
        initDownloadManager();
        updateJSBundle(true);
    }

    // 如果bundle在sd卡【 比如bundle在file://sdcard/react_native_update/index.android.bundle 
    // 那么图片目录在file://sdcard/react_native_update/drawable-mdpi】
    // 如果你的bundle在assets里，图片资源要放到res文件夹里,例如res/drawable-mdpi
    private void iniReactRootView(boolean isRelease) {
        ReactInstanceManager.Builder builder = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setJSMainModuleName(JS_BUNDLE_LOCAL_FILE)
                .addPackage(new MainReactPackage())
                .addPackage(new Package())
                .setInitialLifecycleState(LifecycleState.RESUMED);

        File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (isRelease && file != null && file.exists()) {
            builder.setJSBundleFile(JS_BUNDLE_LOCAL_PATH);
            Log.i(TAG, "load bundle from local cache");
        } else {
            builder.setBundleAssetName(JS_BUNDLE_LOCAL_FILE);
            Log.i(TAG, "load bundle from asset");
        }

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = builder.build();
        mReactRootView.startReactApplication(mReactInstanceManager, "SmartReactApp", null);
        setContentView(mReactRootView);
    }

    private void updateJSBundle(boolean isRelease) {

        File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (isRelease && file != null && file.exists()) {
            Log.i(TAG, "new bundle exists !");
            return;
        }


        File rootDir = new File(JS_BUNDLE_REACT_UPDATE_PATH);
        if (rootDir != null && !rootDir.exists()) {
            rootDir.mkdir();
        }

        File res = new File(JS_BUNDLE_REACT_UPDATE_PATH + File.separator + "drawable-mdpi");
        if (res != null && !res.exists()) {
            res.mkdir();
        }

        FileAssetUtils.copyAssets(this, "drawable-mdpi", JS_BUNDLE_REACT_UPDATE_PATH);


        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(JS_BUNDLE_REMOTE_URL));
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
        request.setDestinationUri(Uri.parse("file://" + JS_BUNDLE_LOCAL_PATH));
        DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        mDownloadId = dm.enqueue(request);

        Log.i(TAG, "start download remote js bundle file");
    }

    private void initDownloadManager() {
        mDownloadCompleteReceiver = new CompleteReceiver();
        registerReceiver(mDownloadCompleteReceiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    private class CompleteReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            long completeDownloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (completeDownloadId == mDownloadId) {
                onJSBundleLoadedFromServer();
            }
        }
    }

    private void onJSBundleLoadedFromServer() {
        File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (file == null || !file.exists()) {
            Log.i(TAG, "js bundle file download error, check URL or network state");
            return;
        }

        Log.i(TAG, "js bundle file file success, reload js bundle");

        Toast.makeText(UpdateReactActivity.this, "download bundle complete", Toast.LENGTH_SHORT).show();
        try {

            Class<?> RIManagerClazz = mReactInstanceManager.getClass();

            Field f = RIManagerClazz.getDeclaredField("mJSCConfig");
            f.setAccessible(true);
            JSCConfig jscConfig = (JSCConfig)f.get(mReactInstanceManager);

            Method method = RIManagerClazz.getDeclaredMethod("recreateReactContextInBackground",
                    com.facebook.react.cxxbridge.JavaScriptExecutor.Factory.class,
                    com.facebook.react.cxxbridge.JSBundleLoader.class);
            method.setAccessible(true);
            method.invoke(mReactInstanceManager,
                    new com.facebook.react.cxxbridge.JSCJavaScriptExecutor.Factory(
                        jscConfig.getConfigMap()
                    ),
                    com.facebook.react.cxxbridge.JSBundleLoader.createFileLoader(
                        getApplicationContext(),
                        JS_BUNDLE_LOCAL_PATH)
                    );
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e){
            e.printStackTrace();
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mDownloadCompleteReceiver);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }
}
```

asset资源文件拷贝到sdcard, 当然实际实现时, 资源文件和jsbundle文件可以都应该放到远程服务器.

```java
package com.react.smart.utils;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import java.io.*;

/**
 * Created by sky on 16/9/19.
 */
public class FileAssetUtils {

    public static void copyAssets(Context context, String src, String dist) {
        AssetManager assetManager = context.getAssets();
        String[] files = null;
        try {
            files = assetManager.list(src);
        } catch (IOException e) {
            Log.e("tag", "Failed to get asset file list.", e);
        }
        for(String filename : files) {
            InputStream in = null;
            OutputStream out = null;
            try {
                in = assetManager.open(src + File.separator + filename);
                File outFile = new File(dist + File.separator + src, filename);
                out = new FileOutputStream(outFile);
                copyFile(in, out);
                in.close();
                in = null;
                out.flush();
                out.close();
                out = null;
            } catch(IOException e) {
                Log.e("tag", "Failed to copy asset file: " + filename, e);
            }
        }
    }

    public static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while((read = in.read(buffer)) != -1){
            out.write(buffer, 0, read);
        }
    }
}
```

最后附上github项目地址:[https://github.com/hubcarl/smart-react-native-app](https://github.com/hubcarl/smart-react-native-app),欢迎follow!

  