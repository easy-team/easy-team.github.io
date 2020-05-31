
---
id: 2107012
space: blog
slug: wydpi1
url: /blog/wydpi1
title: Flutter 动态更新
summary: 关于动态更新Google 考虑自家 Android 应用安全和苹果策略， 本来在 2019 的 roadmap 里面有这样一项，roadmap公布后，过一段时间后面又移除了这一项，目前不是主航道。 Android 目前可以通过整包方式实现动态更新， iOS 目前还不支持。Android Flu...
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1561109060469-0f8a49ed-e433-4a9c-a154-47a888a9757f.png
createTime: 2019-07-12T16:13:29.000Z 
upateTime: 2019-07-12T16:14:42.000Z
wordCount: 1143
layout: doc
---

## 关于动态更新

- Google 考虑自家 Android 应用安全和苹果策略， 本来在 2019 的 roadmap 里面有这样一项，roadmap公布后，过一段时间后面又移除了这一项，目前不是主航道。 
- Android 目前可以通过**整包方式**实现动态更新， iOS 目前还不支持。



## Android Flutter **整包动态更新实现**


#### Flutter 构建产物加载流程

- 在[ Flutter Android 启动流程](https://www.yuque.com/hubcarl/flutter/igznpo) 一文中，我们知道了 Android Flutter 启动流程，启动时，会去加载 data/data/{AppPackage}/app_flutter 下面如下文件。 

```bash
isolate_snapshot_instr              - 应用程序指令段
isolate_snapshot_data               - 应用程序数据段
vm_snapshot_instr                   - DartVM 指令段
vm_snapshot_data                    - DartVM 数据段
```

![apk-update.png](/medias/easyjs/blog/blog-wydpi1-apk-update-5920333.png)


#### Flutter 构建产物

- 在 [Flutter Android 混合工程实践 ](https://www.yuque.com/hubcarl/flutter/wfev72) 一文中，详细阐述了生成 Flutter 构建产物的流程。我们可以把构建产物打成压缩包上传到 CDN，然后 Native 通过下载服务器 Flutter 整体更新包进行更新。

**
```java
import android.Manifest;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.happy.R;
import com.happy.core.BaseNativeActivity;
import com.happy.core.NativeFlutterActivity;
import com.happy.utils.AppUtils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import io.flutter.util.PathUtils;

public class UpdateActivity extends BaseNativeActivity implements View.OnClickListener {

    private static final String TAG = "UpdateFlutterActivity";
    private static final String FLUTTER_UPDATE_PACKAGE_DIR = "flutter_package";
    private static final String FLUTTER_UPDATE_PACKAGE_NAME = "Flutter-package.zip";
    private static final String FLUTTER_UPDATE_PACKAGE_LOCAL_ZIP_FILE = 
    Environment.getExternalStorageDirectory().getAbsolutePath()+ File.separator + FLUTTER_UPDATE_PACKAGE_DIR + File.separator + FLUTTER_UPDATE_PACKAGE_NAME;
    private static final String FLUTTER_UPDATE_PACKAGE_LOCAL_FILE_DIR = Environment.getExternalStorageDirectory().toString() + File.separator + "happy_flutter_update" + File.separator;
    private Button btnUpdate;
    private Button btnPage;
    private CompleteReceiver mDownloadCompleteReceiver = new CompleteReceiver();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update);
        setActionToolBar();

        btnUpdate = findViewById(R.id.btn_update);
        btnPage = findViewById(R.id.btn_page);
        btnUpdate.setOnClickListener(this);
        btnPage.setOnClickListener(this);

        registerReceiver(mDownloadCompleteReceiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_update:
                checkPermission();
                break;
            case R.id.btn_page:
                Intent intent = new Intent(this, NativeFlutterActivity.class);
                intent.setAction(Intent.ACTION_RUN);
                intent.putExtra("route", "flutter://test/update");
                startActivity(intent);
                break;
        }
    }

    private void onFlutterUpdatePackageDownLoaded() throws Exception {
        final File file = new File(FLUTTER_UPDATE_PACKAGE_LOCAL_ZIP_FILE);
        if (file == null || !file.exists()) {
            Log.i(TAG, "flutter package file download error, check URL or network state");
            return;
        }
        File fileDir = new File(FLUTTER_UPDATE_PACKAGE_LOCAL_FILE_DIR);
        if (!fileDir.exists()) {
            fileDir.mkdirs();
        }
        ZipFile zipFile = new ZipFile(FLUTTER_UPDATE_PACKAGE_LOCAL_ZIP_FILE);
        Enumeration zipList = zipFile.entries();
        ZipEntry zipEntry;
        byte[] buffer = new byte[1024];
        while (zipList.hasMoreElements()) {
            zipEntry = (ZipEntry) zipList.nextElement();
            if (zipEntry.isDirectory()) {
                String destPath = FLUTTER_UPDATE_PACKAGE_LOCAL_FILE_DIR + zipEntry.getName();
                File dir = new File(destPath);
                dir.mkdirs();
                continue;
            }
            OutputStream out = new BufferedOutputStream(new FileOutputStream(new File(FLUTTER_UPDATE_PACKAGE_LOCAL_FILE_DIR + zipEntry.getName())));
            InputStream is = new BufferedInputStream(zipFile.getInputStream(zipEntry));

            int len;
            while ((len = is.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            out.flush();
            out.close();
            is.close();
        }
        zipFile.close();
    }

    public void copyToDataFlutterAssets() throws Exception {
        // String destPath = PathUtils.getDataDirectory(this.getApplicationContext()) + File.separator + "flutter_assets/";
        String destPath = PathUtils.getDataDirectory(this.getApplicationContext()) + File.separator;
        File[] files = new File(FLUTTER_UPDATE_PACKAGE_LOCAL_FILE_DIR).listFiles();
        for (File file : files) {
            if (file.getPath().contains("isolate_snapshot_data")
                    || file.getPath().contains("isolate_snapshot_instr")
                    || file.getPath().contains("vm_snapshot_data")
                    || file.getPath().contains("vm_snapshot_instr")) {
                AppUtils.copyFile(file.getPath(), destPath + File.separator + file.getName());
            }
        }
        Toast.makeText(this, "更新包更新成功", Toast.LENGTH_LONG).show();
    }

    private class CompleteReceiver extends BroadcastReceiver  {

        @Override
        public void onReceive(Context context, Intent intent) {
            if (DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(intent.getAction())) {
                try {
                    Toast.makeText(UpdateActivity.this, "更新包下载成功", Toast.LENGTH_LONG).show();
                    onFlutterUpdatePackageDownLoaded();
                    copyToDataFlutterAssets();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {

            }
        }
    }

    private void deleteFlutterPackage() {
        File zipFile = new File(FLUTTER_UPDATE_PACKAGE_LOCAL_ZIP_FILE);
        if (zipFile.exists()) {
            zipFile.delete();
        }
        File dir = new File(FLUTTER_UPDATE_PACKAGE_LOCAL_FILE_DIR);
        if (dir.isDirectory()) {
           for (File file : dir.listFiles()) {
               if (file.exists()) {
                   file.delete();
               }
           }
        }
    }

    private void downloadFlutterUpdatePackage(String url) {
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
        request.setTitle("Flutter动态更新");
        request.setDescription("Flutter动态更新包下载");
        request.setAllowedOverRoaming(false);
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
        request.setDestinationInExternalPublicDir(FLUTTER_UPDATE_PACKAGE_DIR, FLUTTER_UPDATE_PACKAGE_NAME);
        // request.setDestinationUri(Uri.fromFile(new File(FLUTTER_UPDATE_PACKAGE_LOCAL_ZIP_FILE)));
        DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        dm.enqueue(request);
    }

    private void startDownLoadFlutterPackage() {
        deleteFlutterPackage();
        String url = getFlutterUpdatePackageUrl(this);
        downloadFlutterUpdatePackage(url);
    }

    private void checkPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
            startDownLoadFlutterPackage();
        } else {
            ActivityCompat.requestPermissions(this, new String[]{ Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE }, 1000);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case 1000: {
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED &&  grantResults[1] == PackageManager.PERMISSION_GRANTED) {
                    startDownLoadFlutterPackage();
                }
            }

        }
    }

    private static String getFlutterUpdatePackageUrl(Context context) {
        if (AppUtils.isApkInDebug(context)) {
            return "https://xxxx/flutter-update-debug.zip";
        }
         return "https://xxxx/flutter-update-release.zip";
    }
}

```



## Android 动态更新效果演示


[![flutter_update.mp4 (1.36MB)](/medias/easyjs/blog/blog-wydpi1-flutter_update.mp4)](/medias/easyjs/blog/flutter-update.mp4)

  