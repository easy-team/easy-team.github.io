
---
id: 2107009
space: blog
slug: zs3hog
url: /blog/zs3hog
title: Flutter iOS 混合工程实践
summary: 在 Flutter 混合工程体系 一文中，阐述了Flutter 三种开发模式，在实际业务中搭建持续集成时，我们更希望本地开发使用混合模式，持续集成使用解耦模式， 主要是解决以下两个问题： 混合模式：开发调试方便，包括热更新， Native 与 Flutter 开发源码断点调试 解耦模式：不侵入...
coverImage: https://cdn.nlark.com/yuque/0/2019/png/116733/1561107700522-48bad7b9-f5b8-4e38-acc3-ee1355946893.png
createTime: 2019-07-12T16:13:04.000Z 
upateTime: 2019-07-12T16:22:28.000Z
wordCount: 785
layout: doc
---
在 [Flutter 混合工程体系 ](https://www.yuque.com/hubcarl/flutter/aylokm)一文中，阐述了Flutter 三种开发模式，在实际业务中搭建持续集成时，我们更希望本地开发使用**混合模式**，持续集成使用**解耦模式，** 主要是解决以下两个问题：

1.  **混合模式**：开发调试方便，包括热更新， Native 与 Flutter 开发源码断点调试
1.  **解耦模式：**不侵入 iOS Native工程，不对 Flutter 环境产生依赖，可以单独独立构建打包

我们这里重点阐述 **解耦模式，**要对 iOS 与 Flutter 进行解藕，就需要分析**混合模式**最终生成的 iPA文件内容长啥样和 Flutter 构建脚本。



## iOS Flutter 项目 IPA 文件结构分析

ipa 文件 改成 zip 文件，然后解压，进入 Payload 文件夹，会看到一个 .app 的文件，右键显示包内容，即可看到类型如下内容(该测试项目是用 swfit + flutter )。<br />经过分析，与普通的iOS 项目相比，就多了个 Flutter.framework 文件。经过查阅资料，

![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561104084861-fda83a98-9faf-48e8-84ae-855f926c774e.png#align=left&display=inline&height=525&name=image.png&originHeight=525&originWidth=365&size=121891&status=done&width=365)


## 

## 构建 iOS Flutter Framework 和 插件

- flutter build ios 编译 App.framework,   模拟器需要使用 **--simulator --no-codesign** 标识
- 复制 App.framework 和 Flutter.framework 到临时目录
- 复制 Flutter 生成的 iOS 桥接 FlutterPluginRegistrant 插件到临时目录
- 处理 Flutter 项目的依赖插件，复制 .a 文件和 .h  头文件到临时目录

[util.zip](https://www.yuque.com/attachments/yuque/0/2019/zip/116733/1561106342877-587b9580-f2a3-45d5-8ee2-a3036e158d68.zip?_lake_card=%7B%22uid%22%3A%221561106342800-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fzip%2F116733%2F1561106342877-587b9580-f2a3-45d5-8ee2-a3036e158d68.zip%22%2C%22name%22%3A%22util.zip%22%2C%22size%22%3A494%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22Dixpi%22%2C%22card%22%3A%22file%22%7D)

```bash
#!/bin/bash
root=`pwd`

. "${root}/script/util.sh"

target_dir=../HappyIOS/Flutter
flutter_engine_dir=ios
build_app_dir=${root}/build/ios/iphonesimulator
build_lib_dir=${root}/build/ios/Debug-iphonesimulator
build_cmd="flutter build ios --simulator --no-codesign --debug"

if [[ $build = "release" ]]
then
  flutter_engine_dir=ios-release
  build_app_dir=${root}/build/ios/iphoneos
  build_lib_dir=${root}/build/ios/release-iphoneos
  build_cmd="flutter build ios --release"
fi
green "--flutter module build start--"
yellow ">>${build_cmd}"

flutter clean
# flutter build ios --simulator --no-codesign --${build}

${build_cmd}

green "--flutter module build end--"

# copy Flutter.framework and App.framework

green "--flutter build file copy start--"

rm -rf ${target_dir}/**

# copy flutter engine framework
cp -r ${flutter_root}/bin/cache/artifacts/engine/${flutter_engine_dir}/Flutter.framework  ${target_dir}
# cp -rf ${build_app_dir}/Runner.app/Frameworks/Flutter.framework  ${target_dir}
cp -rf ${build_app_dir}/Runner.app/Frameworks/App.framework  ${target_dir}
cp -rf ${build_lib_dir}/FMDB "${target_dir}/FMDB"
cp -rf ${build_lib_dir}/FlutterPluginRegistrant "${target_dir}/FlutterPluginRegistrant"
cp -rf ${root}/.ios/Flutter/FlutterPluginRegistrant/Classes/GeneratedPluginRegistrant.h  "${target_dir}/FlutterPluginRegistrant/"

for line in $(cat .flutter-plugins)
do
    arr=(${line/=/ })
    name=${arr[0]}
    path=${arr[1]}
    plugin_name=`basename $path`
    plugin_dir=$(dirname $path)
    plugin=${path}android

    a_header="${path}ios/Classes/*.h"

    a_file="${build_lib_dir}/${name}"

    if [ ! -f $arr ]
    then
       cp -rf ${a_file} ${target_dir}
       cp -rf ${a_header} ${target_dir}/${name}
    else
       echo "$aar is not exists"
    fi
done


green "--flutter build file copy end--"
```



## iOS Native 本地引用构建产物文件

通过 Xcode 为 iOS Native 项目添加 Flutter 构建产物依赖. Xcode 点击项目名，找到 Build Phases Tab：

- 在Link Binary Width Libraries 添加所有构建产物的依赖
- 点击左上角加个添加一个 New Copy Files Phases 选项，然后添加 Flutter.framework 和 App.framework ，  


![image.png](https://cdn.nlark.com/yuque/0/2019/png/116733/1561107063490-a57afb6b-98e2-488f-8e30-7fb5d3dbbafc.png#align=left&display=inline&height=718&name=image.png&originHeight=718&originWidth=997&size=183589&status=done&width=997)


## 


## iOS Native 通过 Pod 引用构建产物文件

根据Flutter构建的产物构建编写 Pod 插件，然后 让 iOS Native 工程通过 Pod 方式依赖 


  