
---
id: 2107007
space: blog
slug: lsrssy
url: /blog/lsrssy
title: Flutter  Android  混合工程实践
summary: 在 Flutter 混合工程体系 一文中，阐述了Flutter 三种开发模式，在实际业务中搭建持续集成时，我们更希望发本地开发使用混合模式，持续集成使用解耦模式， 主要是解决以下两个问题： 混合模式：开发调试方便，包括热更新， Native 与 Flutter 开发源码断点调试 解耦模式：不侵...
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1561088548020-8053b68f-c617-48d3-865e-fc426f098107.png
createTime: 2019-07-12T16:12:51.000Z 
upateTime: 2019-07-12T16:13:43.000Z
wordCount: 2125
layout: doc
---

在 [Flutter 混合工程体系 ](https://www.yuque.com/hubcarl/flutter/aylokm)一文中，阐述了Flutter 三种开发模式，在实际业务中搭建持续集成时，我们更希望发本地开发使用**混合模式**，持续集成使用**解耦模式，** 主要是解决以下两个问题：

1.  **混合模式**：开发调试方便，包括热更新， Native 与 Flutter 开发源码断点调试
1.  **解耦模式：**不侵入 Android /iOS Native工程，不对 Flutter 环境产生依赖，可以单独独立构建打包

我们这里重点阐述 **解耦模式，**要对 Android 与 Flutter 进行解藕，就需要分析**混合模式**最终生成的 APK 内容长啥样和 Flutter 构建脚本。


## Android Flutter APK 文件结构分析

我们通过 Android Studio  菜单 Build -> Analyze APK  选择构建好的 Release APK 包，可以看到如下内容：

![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561086660607-bbc006fa-ebab-4bfe-bed4-ff08655509cf.png#align=left&display=inline&height=509&name=image.png&originHeight=509&originWidth=775&size=235136&status=done&width=775)

通过上面 APK 结构，我们会发现Flutter 项目比普通的Android 项目多了如下几个文件：

> 以下文件说明参考 [https://blog.csdn.net/weixin_34001430/article/details/87942062](https://blog.csdn.net/weixin_34001430/article/details/87942062)


- lib/armeabi-v7a/libflutter.so      - Flutter 引擎 
- isolate_snapshot_instr               - 应用程序指令段
- isolate_snapshot_data               - 应用程序数据段
- vm_snapshot_instr                     - DartVM 指令段
- vm_snapshot_data                     - DartVM 数据段
- flutter_assets                             - 应用程序静态资源文件与配置


## Flutter 项目 Gradle 构建脚本分析

在 Flutter Android 工程里面，我们在 build.gradle 文件里面会看到 Flutter gradle 构建脚本：

```bash
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"
```

进入 flutter.gradle 里面，我们会看到相关 flutter 的打包构建流程，主要包括三个部分：

- **apply 方法：**flutter 引擎平台架构（arm, x86) 库处理 

![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561088212471-4f80fc9d-3fb5-484f-8edb-8cceb5edff87.png#align=left&display=inline&height=511&name=image.png&originHeight=511&originWidth=903&size=444976&status=done&width=903)


- **buildBundle 方法：**flutter aot 和 bundle 编译处理，也就是上面所说的 snapshot 相关flutter 构建产物文件 

![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561087824112-2399fa32-b62e-4e51-b9f5-f62de275a0ff.png#align=left&display=inline&height=652&name=image.png&originHeight=652&originWidth=890&size=411098&status=done&width=890)

运行以后会发现其实执行的如下两条命令：

```bash
// Debug
flutter build bundle  --debug

// release
flutter build aot  --release
```


- **getAssets: **构建产物处理,  把 flutter snapshot 构建产物复制到 assets 目录，刚好与上面 APK 文件结构分析对应起来了。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561087938933-515f994b-474b-4d52-8283-9845905861e9.png#align=left&display=inline&height=284&name=image.png&originHeight=284&originWidth=526&size=107624&status=done&width=526)




## Android Flutter 解耦处理
通过上面的 APK 文件和 Gradle 构建脚本分析，我们很清楚的知道了整个 Flutter 构建打包以及与Native 合并的过程， 接下来我们来进行 Android Native 工程 和 Flutter Module 工程解耦处理。


#### Android Native 项目依赖和构建配置处理

- 移除 Android Native 项目 ${root}/setting.gradle 对 flutter 构建的脚本的依赖

```bash
// 需要移除
evaluate(new File(
  settingsDir.parentFile,
  'happyflutter/.android/include_flutter.groovy'
))
```


- 移除 Android Native 项目 ${root}/app/build.gradle 对 flutter 引擎库的依赖 

```bash
dependencies {
  implementation project(':flutter') // 需要删除
}
```


- Android Native 项目  ${root}/app/build.gradle 添加对 libs 文件夹的 .jar .aar 库

```bash

dependencies {
    // implementation project(':flutter')
    implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
}

```



#### Flutter Mobule 打包为独立的 .aar 文件 gradle 脚本编写

- 修改 Flutter Module 项目构建类型 **com.android.application** 为  **com.android.library** 
- 简化 **$flutterRoot/packages/flutter_tools/gradle/flutter.gradle  **构建逻辑
- ${root}/android/app/build.gradle 完整内容如下
```bash
import java.nio.file.Path
import java.nio.file.Paths

apply plugin: 'com.android.library'

android {
    compileSdkVersion 28

    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
//        ndk {
//            abiFilters 'x86', 'x86_64', 'armeabi-v7a', 'armeabi-v8a', 'armeabi'
//        }
    }

    buildTypes {
        profile {
            initWith debug
        }
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    sourceSets {
        main {
            jniLibs.srcDirs "jniLibs"
        }
    }
}


// ${project.projectDir.getAbsolutePath()}
Properties properties = new Properties()
properties.load(project.rootProject.file('local.properties').newDataInputStream())
String targetArch = 'arm'
if (project.hasProperty('target-platform') && project.property('target-platform') == 'android-arm64') {
    targetArch = 'arm64'
}
// def isDebug = gradle.startParameter.taskNames.contains("assembleDebug")
// def platform = isDebug ? "android-x86" : "android-${targetArch}-release"
def flutterRoot = properties.getProperty('flutter.sdk')
def flutterJarPath = "${flutterRoot}/bin/cache/artifacts/engine/android-${targetArch}-release/flutter.jar"

Path baseEnginePath = Paths.get(flutterRoot, "bin", "cache", "artifacts", "engine")
File debugFlutterJar = baseEnginePath.resolve("android-${targetArch}").resolve("flutter.jar").toFile()
File releaseFlutterJar = baseEnginePath.resolve("android-${targetArch}-release").resolve("flutter.jar").toFile()
File flutterX86Jar = baseEnginePath.resolve("android-x86").resolve("flutter.jar").toFile()
File flutterX64Jar = baseEnginePath.resolve("android-x64").resolve("flutter.jar").toFile()

//println flutterX86Jar.length()
//println flutterX86Jar.parentFile

Task flutterX86JarTask = project.tasks.create("FlutterX86Jar", Jar) {
    from("${flutterRoot}/bin/cache/artifacts/engine/android-x86/libflutter.so") {
        into "lib/x86"
    }
    from("${flutterRoot}/bin/cache/artifacts/engine/android-x64/libflutter.so") {
        into "lib/x86_64"
    }
}

project.android.buildTypes.each {
    addFlutterJarImplementationDependency(project, flutterX86JarTask, debugFlutterJar, releaseFlutterJar, flutterX86Jar, flutterX64Jar)
}
project.android.buildTypes.whenObjectAdded {
    addFlutterJarImplementationDependency(project, flutterX86JarTask, debugFlutterJar, releaseFlutterJar, flutterX86Jar, flutterX64Jar)
}

private void addFlutterJarImplementationDependency(Project project, Task flutterX86JarTask, File debugFlutterJar, File releaseFlutterJar, File flutterX86Jar,  File flutterX64Jar) {
    def isDebug = gradle.startParameter.taskNames.contains("assembleDebug")
    project.dependencies {
        String configuration
        if (project.getConfigurations().findByName("implementation")) {
            configuration = "implementation"
        } else {
            configuration = "compile"
        }
        add(configuration, project.files {
            if (isDebug) {
                [flutterX86JarTask, releaseFlutterJar]
            } else {
                releaseFlutterJar
            }
        })
    }
}

private Properties readPropertiesIfExist(File propertiesFile) {
    Properties result = new Properties()
    if (propertiesFile.exists()) {
        propertiesFile.withReader('UTF-8') { reader -> result.load(reader) }
    }
    return result
}


afterEvaluate {
    android.libraryVariants.all { def variant ->
        // println variant.mergeAssets.outputDir
        // println variant.buildType.debuggable

        def flutterAsset = files("../../build")
        def flutterAOT = files("../../build/aot")
        def mergeFlutterAssets = project.tasks.create(name: "mergeFlutterAssets${variant.name.capitalize()}", type: Copy) {
            // dependsOn copySharedFlutterAssetsTask
            dependsOn variant.mergeAssets

            from (flutterAsset){
                include "flutter_assets/**"
                exclude{
                     details ->details.file.name.contains('isolate_snapshot_data') ||
                             details.file.name.contains('vm_snapshot_data') ||
                             details.file.name.contains('kernel_blob.bin')
                }
            }

            from (flutterAOT){
                include "vm_snapshot_data"
                include "vm_snapshot_instr"
                include "isolate_snapshot_data"
                include "isolate_snapshot_instr"
            }

            into variant.mergeAssets.outputDir

        }
        variant.outputs[0].processResources.dependsOn(mergeFlutterAssets)
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:28.0.0-alpha1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}

```



### 编写 Flutter 插件和 Flutter Module 项目自动化 shell 脚本构建

- 项目 AOT 和 Bundle 编译 ${root}/script/project.sh

```bash
#!/bin/bash
root=`pwd`

. "${root}/script/util.sh"

green "--root: ${root}, build mode: ${build},  run mode: ${run}"

green "--start flutter aot and bundle build"

flutter clean

if [[ $build = "debug" ]]
then
   # green ">>flutter build aot --debug && flutter build bundle --debug"
   # android-arm does not support AOT compilation
   # flutter build aot --debug
   # flutter build bundle --debug
   green "--android-arm does not support AOT compilation, use release build aot"
   yellow ">>flutter build aot --release && flutter build bundle --debug"
   # android-arm does not support AOT compilation
   flutter build aot --release
   flutter build bundle --debug
   if [[ $build = 'debug' ]] && [[ $run = 'simulator' ]]; then
      cp -f "${root}/build/flutter_assets/vm_snapshot_data"       "${root}/build/aot/vm_snapshot_data"
      cp -f "${root}/build/flutter_assets/isolate_snapshot_data"  "${root}/build/aot/isolate_snapshot_data"
      green ">>when debug and simulator mode, copy snapshot successfully!"
   fi
   yellow ">>./gradlew assembleDebug"
   cd android && ./gradlew clean && ./gradlew assembleDebug
   cd ..
else
   yellow ">>flutter build aot --release && flutter build bundle --release"
   flutter build aot --release
   flutter build bundle --release
   yellow ">>./gradlew assembleRelease"
   cd android && ./gradlew clean && ./gradlew assembleRelease
   cd ..
fi

green "--flutter arr file[ ${root}/android/app/build/outputs/aar/app-${build}.aar ] build successfully!"


cp -f "${root}/android/app/build/outputs/aar/app-${build}.aar"  "${root}/publish/${build}"

```

- Flutter 插件 .aar 文件生成和处理 ${root}/script/plugin.sh

这里是直接从 Flutter 插件编译的缓存目录拷贝 .arr 文件。目前需要自己手动在 Flutter Module 项目目录下执行 **flutter build apk --debug** 和** flutter build apk --release** 命令生成插件的  debug 和 release .arr 文件.

```bash
#!/bin/bash

root=`pwd`

. "${root}/script/util.sh"

echo "start flutter plugin aar copy......"

for line in $(cat .flutter-plugins)
do
    arr=(${line/=/ })
    name=${arr[0]}
    path=${arr[1]}
    plugin_name=`basename $path`
    plugin_dir=$(dirname $path)
    plugin=${path}android

    aar="${path}android/build/outputs/aar/${name}-${build}.aar"
    if [ ! -f $arr ]
    then
       cp -f $aar "${root}/publish/${build}"
    else
       echo "$aar is not exists"
    fi
done

echo "flutter plugin copy successfully!"
```

- 拷贝 Flutter Module 生成的 .aar 文件给 Android Native 项目的  app/libs 目录  ${root}/script/copy.sh

> HappyAndroid 为 Native 项目名称，  Android Native 项目 和 Flutter Module 项目放到同一根目录下即可


```bash
#!/bin/bash

root=`pwd`

. "${root}/script/util.sh"

rm -rf "../HappyAndroid/app/libs/"
cp -r "${root}/publish/${build}/"  "../HappyAndroid/app/libs"
```



### 运行 shell 命令生成 .arr 文件 ${root}/script/build.sh

```bash
#!/bin/bash
root=`pwd`

. "${root}/script/project.sh"
. "${root}/script/plugin.sh"
. "${root}/script/copy.sh"
```

- 生成 debug .aar 模拟器包：  **./script/build.sh  build=debug**
- 生成 debug .aar 真机包：     **./script/build.sh  build=debug**
- 生成 release .aar 真机包：   **./script/build.sh  build=release**

![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561097691639-c1dbc1f8-8293-41f4-b2e6-6503eabaee46.png#align=left&display=inline&height=249&name=image.png&originHeight=249&originWidth=616&size=65388&status=done&width=616)


最后，按照正常的 Android Native 工程运行方式运行项目，即可 Running！

### 

## 常见问题

| 打包模式 | 运行模式 | 构建 | 依赖包 | 可运行 |
| --- | --- | --- | --- | --- |
| Debug | 模拟器 | <br />- flutter build aot --release<br />- flutter build bundle --debug<br /> | android-arm-release/flutter.jar<br />或<br />android-x64/flutter.jar | ✅<br />条件：复制 flutter_assets 里面的isolate_snapshot_data 和 vm_snapshot_data 覆盖 aot 里面的 isolate_snapshot_data 和 vm_snapshot_data  |
|  | 真机 | <br />- flutter build aot --release<br />- flutter build bundle --debug<br /> | android-arm-release/flutter.jar | ✅ |
|  | 真机 | <br />- flutter build aot --release<br />- flutter build bundle --release<br /> | android-arm-release/flutter.jar | ✅ |
|  | 真机 | <br />- flutter build aot --release<br />- flutter build bundle --debug<br /> | android-arm/flutter.jar | ❌<br />Error:JIT runtime cannot run a precompiled snapshot |
|  | 真机 | <br />- flutter build aot --debug<br />- flutter build bundle --debug<br /> | android-arm/flutter.jar<br />或<br />android-arm-release/flutter.jar | ❌<br />android-arm does not support AOT compilation |
| Release | 模拟器 |  |  |  |
|  | 真机 | <br />- flutter build aot --release<br />- flutter build bundle --release<br /> | android-arm-release/flutter.jar | ✅ |




  