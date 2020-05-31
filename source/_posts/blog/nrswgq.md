
---
id: 2107011
space: blog
slug: nrswgq
url: /blog/nrswgq
title: Android 与 Flutter 入门开发实践指引
summary: 项目集成Android 集成 Flutter 项目通过 Android Studio 创建 Andriod 原生应用 AndroidApp通过 Android Studio 创建 New Flutter Project, 选择 Flutter Module，创建 Flutter Module ...
coverImage: 
createTime: 2019-07-12T16:13:18.000Z 
upateTime: 2019-07-16T03:14:04.000Z
wordCount: 3486
layout: doc
---

### 项目集成


#### Android 集成 Flutter 项目

- 通过 Android Studio 创建 Andriod 原生应用 **AndroidApp**
- 通过 Android Studio 创建 New Flutter Project, 选择 Flutter Module，创建 Flutter Module **FlutterApp**
- Android Studio 打开 **AndroidApp** 项目，然后 New -> Module-> Import Flutter Module 添加 Flutter Module  **FlutterApp** 依赖 

## 

### 开发调试


#### 纯 Flutter 项目开发调试

- 方式一： vscode 打开 Flutter 项目， 按 F5 进 DEBUG，CTRL+F5 进行 HOT RESTART  可以实现 Hot Reload （如果是 flutter run， 修改文件后，需要安 r）
- 方式二：Android Studio 打开 Flutter 项目，![image.png](/medias/easyjs/blog/blog-nrswgq-image-6112600.png)


#### Android 集成 Flutter 开发调试

> Android 与 Flutter 混合模式： Android 项目集成 Flutter Module


- 首先，进入 Flutter Module 目录， 命令行执行 `flutter attach`  修改代码后，press “r"  即可实现 Hot Reload 

![image.png](/medias/easyjs/blog/blog-nrswgq-image-7741082.png)

- Andorid Studio 打开 Android 项目，点击绿色三角按钮 ![image.png](/medias/easyjs/blog/blog-nrswgq-image-1087498.png) 进入 原生 App Debug 模式


### 安装插件

安装第三方依赖需要在 pubspec.yaml 的 **dependencies **节点添加插件配置，类似与 npm

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.2
  # flutter webview 插件
  flutter_webview_plugin: 0.3.3
  # sqlite 数据库
  sqflite: ^1.1.0
```

添加好以后，点击 AS 右上方的 Packages get 安装依赖或者进入项目根目录执行 **flutter packages get **安装依赖



### 入口函数

- pubspec.yaml文件中，将`flutter`的值设置为：`uses-material-design: true`。这允许我们可以使用一组预定义[Material icons](https://design.google.com/icons/)
- 为了继承主题数据，widget需要位于[`MaterialApp`](https://docs.flutter.io/flutter/material/MaterialApp-class.html)内才能正常显示， 因此我们使用[`MaterialApp`](https://docs.flutter.io/flutter/material/MaterialApp-class.html)来运行该应用。

```dart
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo'
    );
  }
}

void main() {
  runApp(App());
}
```



### Widget

> 一切 VIew 都为 Widget：Widget 分是无状态的[`StatelessWidget`](https://docs.flutter.io/flutter/widgets/StatelessWidget-class.html)或者是有状态的[`StatefulWidget`](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html)



#### 实现自定义 widget

- 实现继承自StatefulWidget的类来表示你要自定义的可变控件
- 实现继承自 State 的类来处理可变控件的状态和样式（build方法)
- 当用户交互发生(onPressed), 可以调用setState方法告诉组件需要重绘

```dart
class MyStatefulWidget extends MyStatefulWidget {
   final String title;
   final String content;
   @override
  _MyStatefulState createState() => _MyStatefulState();
}

class _MyStatefulState extends State<MyStatefulWidget> {
  @override
  Widget build(BuildContext context) {
  	return Scaffold(
     appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: Center(
        child: Text(widget.content),
      ),
    );
  }
}
```


#### 常用布局 [https://flutterchina.club/widgets/material/](https://flutterchina.club/widgets/material/)

## 

#### MaterialApp Widget
Material Design 风格应用，封装了 MD 应用常用的组件。MaterialApp 一般作为顶层的 Widget 使用，可以用于应用主题配置<br />

```dart
new MaterialApp(
    title: 'Flutter应用',
    theme: new ThemeData(
      //主题色
     	primarySwatch: Colors.blue,
    ),
     routes: {
       '/home':(BuildContext context) => HomePage(),
       '/category':(BuildContext context) => CategoryPage(),
       //....
     },
    initialRoute: '/home',
    ......
 );
```


#### Scaffold Widget
Scaffold是 Material Design 布局结构的基本实现， 定义好了基本的页面结构(appBar, body, bottomNavigationBard等），只需要配置相关信息即可快速实现一个框架页面。

```dart
@override
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar( // 典型的底部 Tab 模式
        items: <BottomNavigationBarItem>[ 
          BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('Home')),
          BottomNavigationBarItem(icon: Icon(Icons.category), title: Text('Category')),
          BottomNavigationBarItem(icon: Icon(Icons.person), title: Text('Profile')),
        ],
        currentIndex: _selectedIndex,
        fixedColor: Colors.deepPurple,
        onTap: _onItemTapped,
      ),
    );
}
```



### Material 主题常用 Widget


#### Scaffold 标准的页面骨架
> 提供 appBar, body, bottomNavigationBar 等配置入口


```dart
class About extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("关于"),
        centerTitle: true,
        leading: new IconButton(
            icon: new Icon(Icons.arrow_back),
            onPressed: () {
              SystemNavigator.pop(); // remove this activity from the stack
            }
        )
      ),
      body: new Center(
        child: new Text("Flutter About Page"),
      ),
    );
  }
}
```


#### 刷新与分页

- 结合 RefreshIndicator，通过 onRefresh 实现下拉刷新
- 结合 RefreshIndicator，通过 controller （ScrollController）实现上拉分页加载
- 通过  ListView.builder 和 ListTile 构建列表

```dart
 @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("列表加载测试"),
        centerTitle: true,
        leading: new IconButton(
          icon: new Icon(Icons.arrow_back),
          onPressed: () {
            SystemNavigator.pop(); // remove this activity from the stack
          }
        )
      ),
      body: new RefreshIndicator(
        child: ListView.builder(
          itemCount: listItems.length,
          itemBuilder: (context, index) {
            return ListTile(
              leading: new Icon(Icons.list),
              title: Text("列表加载测试-$index"),
              onTap:(){}
            );
          },
          controller: _scrollController, // 使用 ScrollController 组件实现 上拉分页
        ),
        onRefresh: _pullRefresh, // 下拉刷新回掉，默认是转圈loading
      ),
    );
  }
```



### 页面跳转


#### 静态路由

> 在 main.dart 文件 app 启动入口通过 routes 配置静态路由或者 onGenerateRoute 动态处理路由。
> 注意：默认路由是 /，不支持参数参数， 支持 home/list 模式，但不能使用 /home/list 模式，这样会导致匹配到  / 路由


- 静态路由定义

```dart
void main() => runApp(App());
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
      ),
      home: MyHomePage(title: 'HappyFlutter'),
      routes: <String, WidgetBuilder> {
        // 定义静态路由，不能传递参数
        'home': (BuildContext context) => new Home(false),
        'profile': (BuildContext context) => new Profile(),
      },
      onGenerateRoute: (settings) {
        print('--name' + settings.name);
        print(settings.arguments);
      }
    );
  }
}
```

- 静态路由跳转

> 通过 Navigator.of(context).pushNamed 方式进行静态路由跳转


```dart
Navigator.of(context).pushNamed('home');
Navigator.of(context).pushNamed('home/dialog').then((value) {
	// 获取 view 返回值
})
```

#### 

#### 动态路由

```dart
Navigator.of(context).push(new PageRouteBuilder(pageBuilder:(BuildContext context, 
		Animation<double> animation,Animation<double> secondaryAnimation) {
    // 可以通过构造函数传递参数
    return new Home();
}));
```



#### Native 跳转 Flutter 传递参数

> 目前在 Native 中直接打开 FlutterActivity 是不支持直接传递参数的(唯一的参数就是 route) , 不过可以把 route  以 url 的形式传递参数是可行的， 然后在 Flutter 的 onGenerateRoute 函数对 url 进行解析，就能变相实现参数传递。


- Android 代码

```java
Intent intent = new Intent(this, NativeFlutterActivity.class);
intent.setAction(Intent.ACTION_RUN);
intent.putExtra("route", "test?msg=Native跳转Flutter参数测试&id=111111");
startActivity(intent);
```

- Flutter 代码

```dart
// This widget is the root of your application.
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Color(0xFF008577),
      ),
      home: MyHomePage(title: 'HappyFlutter'),
      routes: <String, WidgetBuilder> {
        'home': (BuildContext context) => new Home()
      },
      onGenerateRoute: (settings) {
        Uri uri = Uri.parse(settings.name);
        String route = uri.path;
        Map<String, String> params = uri.queryParameters;
        switch(route) {
          case 'test':
            return MaterialPageRoute(builder: (context)=> Detail(params));
            break;
        }
      }
    );
  }
}
```


### 导航栏

> Navigator.pop(context) 关闭当前 FlutterView
> SystemNavigator.pop() 关闭当前Flutter 所在的 Activity


```dart
  import 'package:flutter/services.dart';

	@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("导航栏标题"),
        centerTitle: true, // 标题居中
        leading: new IconButton(  // 顶部导航栏右边返回箭头图片
          icon: new Icon(Icons.arrow_back),
          onPressed: () { // 
            SystemNavigator.pop(); // remove this activity from the stack
          }
        ),
       actions:[  // 右边菜单
					new IconButton(
						icon: new Icon(Icons.settings),    
            onPressed: () {
              Scaffold.of(context).showSnackBar(new SnackBar(content: new Text("设置")));    
            }
          )
       ]
      )
    );
  }
```



### 异步请求

Dart 语言中使用 Future (类比Promise) 实现异步操作，一般配合 async和 await 使用。

```dart
// 多个 Future 执行，注意不是顺序执行
Future.wait([f1(), f2()])
		.then((List responses) => {})
    .catchError((e) => {});
// 延迟 2s
Future.delayed(Duration(seconds: 2), () {});
```

- 从数据库查询用户信息
```dart
// 定义返回值 Future 函数 
Future<List<Map<String, dynamic>>> getFavoriteList() async {
    Database dbClient = await db;
    return await dbClient.rawQuery('SELECT * FROM user_info');
}

// 调用
//直接调用

getFavoriteList().then(((rows){
  
});

// async 函数内部调用
void getFavoriteListTest() async {
  List<Map<String, dynamic>> list = await getFavoriteList();
  ......
}

```




### 数据请求
> 可以通过 **FutureBuilder** 异步数据请求与UI数据绑定


```dart

  Future<List<Map<String, dynamic>>> getFavoriteList() async {
    return [];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: FutureBuilder<List<Map<String, dynamic>>>(
          future: favoriteDB.getFavoriteList(),
          builder: (context, snapshot) {
            if (snapshot.hasError) print(snapshot.error);
            List<Map<String, dynamic>> list = snapshot.data;
            return ListView.builder(
              itemCount: snapshot.data.length,
              itemBuilder: (_, int position) {
                Map item = list[position];
                return Card(
                  child: ListTile(
                    title: Text(item['title']),
                    onTap: () {
                      NavigationChannel.pushWebRoute({"title": item['title'].toString(), "url": item['url'].toString()});
                    },
                  ),
                );
              },
            );
          },
        ),
      ),
  };
```


### 平台通信

> [https://flutterchina.club/platform-channels/](https://flutterchina.club/platform-channels/)
> 
> Flutter平台特定的API支持不依赖于代码生成，而是依赖于灵活的消息传递的方式：
> - 应用的Flutter部分通过平台通道（platform channel）将消息发送到其应用程序的所在的宿主（iOS或Android）。
> - 宿主监听的平台通道，并接收该消息。然后它会调用特定于该平台的API（使用原生编程语言） - 并将响应发送回客户端，即应用程序的Flutter部分。
> 


在客户端，`MethodChannel` ([API](https://docs.flutter.io/flutter/services/MethodChannel-class.html))可以发送与方法调用相对应的消息。 在宿主平台上，`MethodChannel` 在Android（([API](https://docs.flutter.io/javadoc/io/flutter/plugin/common/MethodChannel.html)) 和 FlutterMethodChannel iOS ([API](https://docs.flutter.io/objcdoc/Classes/FlutterMethodChannel.html)) 可以接收方法调用并返回结果。这些类允许您用很少的“脚手架”代码开发平台插件。


#### Flutter 调用 Native

- Dart 发起信道调用

```dart

import 'package:flutter/services.dart';

static const MethodChannel methodChannel = MethodChannel('samples.flutter.io/battery');

Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await methodChannel.invokeMethod('getBatteryLevel');
      batteryLevel = 'Battery level: $result%.';
    } on PlatformException {
      batteryLevel = 'Failed to get battery level.';
    }
}


```

- Java 注册信道

> 1. 直接继承 FlutterActivity 可以快速建立 Native 与 Flutter 的通信桥梁
> 1. 非 FlutterActivity 时，需要自己处理 FlutterView 的应用，可以在创建 FlutterView 时，创建在 Android Application 里面



```java
public class NativeFlutterActivity extends FlutterActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GeneratedPluginRegistrant.registerWith(this);
				// Native 与 Flutter 通信依赖 FlutterView
        new MethodChannel(getFlutterView(), 'samples.flutter.io/battery').setMethodCallHandler(
              new MethodCallHandler() {
                @Override
                public void onMethodCall(MethodCall call, Result result) {
                  if (call.method.equals("getBatteryLevel")) {
                    int batteryLevel = getBatteryLevel();
                    if (batteryLevel != -1) {
                      result.success(batteryLevel);
                    } else {
                      result.error("UNAVAILABLE", "Battery level not available.", null);
                    }
                  } else {
                    result.notImplemented();
                  }
                }
             }
        );
    }
}

```

see code: [https://github.com/flutter/flutter](https://github.com/flutter/flutter/examples/platform_channel)[/examples/platform_channel](https://github.com/flutter/flutter/examples/platform_channel)



#### Native 调用 Flutter

> 通过 MethodChannel.invokeMethod 可以主动调用 Flutter 通信


- java 代码
- <br />
```java
package com.easy.team.module;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import java.util.HashMap;
import java.util.Map;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;

public class NativeActivity extends Activity {

    public static String CHANNEL = "com.happy.message/notify";

    private MethodChannel channel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native);
        channel = new MethodChannel(MessageChannel.getFlutterView(), CHANNEL);

      	// Native 主动调用 Flutter
        Map<String,String> map = new HashMap<String, String>();
        map.put("from", "native");
        notifyFlutter("getFlutterVersion", map);
    }

    protected void notifyFlutter(String method, Object args) {
        channel.invokeMethod(method, args, new MethodChannel.Result() {
            @Override
            public void success(@Nullable Object o) {
                Toast.makeText(NativeActivity.this, "message:" + o.toString(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void error(String s, @Nullable String s1, @Nullable Object o) {
                Log.d("--NativeActivity:error--", s1);
            }

            @Override
            public void notImplemented() {
                Log.d("--NativeActivity:notImplemented--","");
            }
        });
    }
}

```

- Flutter 代码
- <br />
```dart
static const MethodChannel methodChannel = MethodChannel('com.happy.message/notify');

Future<dynamic> settingChannelHandler(MethodCall methodCall) async {
  switch (methodCall.method) {
    case 'getFlutterVersion':
      return '1.0.0';
    default:
  }
}


@override
void initState() {
  super.initState();
  methodChannel.setMethodCallHandler(this.settingChannelHandler);
}
```



### Native 集成 Flutter


#### Native Activity  模式

> Native 继承 FlutterActivity 就可以快速与 Flutter 建立通道。Flutter 中通过消息通知 Native 用 Activity 的方式打开 Flutter View，这种方式可以解决Native 和 Flutter 返回键问题，也就是统一交给 Native 处理。


```java
// 自定义 FlutterActivity
public class NativeFlutterActivity extends FlutterActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GeneratedPluginRegistrant.registerWith(this);
    }
}

// Native 使用 FlutterActivity 打开指定 Flutter View
Intent intent = new Intent(getActivity(), NativeFlutterActivity.class);
// 需要指定 ACTION_RUN，FlutterActiviy 底层处理
intent.setAction(Intent.ACTION_RUN); 
// FlutterActiviy 会 从Intent 里面取 route 参数,目前不支持直接传递参数
intent.putExtra("route", route); 
startActivity(intent);

```


#### Native Fragment  模式

> 在 Native 中 Fragment 根据 Flutter 路由动态创建 Fragment


```java
public class NativeFlutterFragment extends Fragment {

    private FlutterView flutterView;

    public static Fragment newInstance(String route) {
        NativeFlutterFragment fragment = new NativeFlutterFragment();
        Bundle bundle = new Bundle();
        bundle.putString("route", route);
        fragment.setArguments(bundle);
        return fragment;
    }

    public static Fragment newInstance(String route, Bundle bundle) {
        NativeFlutterFragment fragment = new NativeFlutterFragment();
        if (bundle == null) {
            bundle = new Bundle();
        }
        bundle.putString("route", route);
        fragment.setArguments(bundle);
        return fragment;
    }


    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return this.getFlutterView();
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        this.registerMethodChannel(this.getFlutterView());
        // 保存当前活动窗口 FlutterView 实例引用，Activity 可以通过 MessageChannel.getFlutterView() 与 Flutter 通信
        MessageChannel.setFlutterView(this.flutterView);
    }

    @Override
    public void onHiddenChanged(boolean hidden) {
        Log.d("--onHiddenChanged--", String.valueOf(hidden));
        super.onHiddenChanged(hidden);
        if (!hidden) {
            MessageChannel.setFlutterView(this.flutterView);
        }
    }

    protected void registerMethodChannel(FlutterView flutterView) {
        new MethodChannel(flutterView, "com.happy/navigation").setMethodCallHandler(
                new MethodChannel.MethodCallHandler() {
                    @Override
                    public void onMethodCall(MethodCall call, MethodChannel.Result result) {
                        Log.i("--MethodChannel--", "method:"  + call.method);
                        if (call.method.equals("pushRoute")) {
                            String route = call.argument("route");
                            HashMap args = (HashMap)call.arguments;
                            Log.i("--MethodChannel--", "route:"  + route);
                            if ("native".equals(route)) {
                                Intent intent = new Intent(getActivity(), NativeActivity.class);
                                intent.putExtra("args", args);
                                startActivity(intent);
                            } else if ("web".equals(route)) {
                                Intent intent = new Intent(getActivity(), NativeWebViewActivity.class);
                                intent.putExtra("title", args.get("title").toString());
                                intent.putExtra("url", args.get("url").toString());
                                startActivity(intent);
                            } else { // 每个 Flutter View 使用一个 Native Activity 方式打开页面
                                Intent intent = new Intent(getActivity(), NativeFlutterActivity.class);
                                intent.setAction(Intent.ACTION_RUN);
                                intent.putExtra("route", route);
                                startActivity(intent);
                            }
                            result.success("success");
                        } else if (call.method.equals("pop")) {
                            result.success("success");
                        } else {
                            result.notImplemented();
                        }
                    }
                }
        );
    }

    public FlutterView getFlutterView(){
        if (this.flutterView == null) {
            String route = getArguments().getString("route");
            this.flutterView = Flutter.createView(getActivity(), getLifecycle(), route);
            // 解决 Flutter 加载黑屏问题
            this.flutterView.setZOrderOnTop(true);
            // this.flutterView.setZOrderMediaOverlay(true);
            this.flutterView.getHolder().setFormat(PixelFormat.TRANSLUCENT);
        }
        return this.flutterView;
    }
}

```

#### 

### 数据存储


#### sqfite 数据库

> 通过 sqflite 插件可以完成 sqlite  数据库操作。 经过测试，如果 Native 已经创建的数据库，通过如下方式是可以直接链接 Native 的数据库，也就是 Native 和 Flutter 数据库是可以互通操作。


```dart
import 'package:sqflite/sqflite.dart';

init() async { 
  String databasesPath = await getDatabasesPath();
	String path = join(databasesPath, "app_data");
  return await openDatabase(path, version: 1, onCreate: _onCreate);
}

 Future<Database> get db async {
    if (_db != null) return _db;
    _db = await init();
    return _db;
 }


// 使用
Future<List<Map<String, dynamic>>> getList() async {
    Database client = await db;
    return await client.rawQuery('SELECT * FROM user_info');
}

Future<int> delete(int id) async {
   Database dbClient = await db;
   return await client.rawDelete('DELETE FROM user_info WHERE id = ?', [id]);
}


```


### 常见问题

- 静态路由路径匹配问题

静态路由定义时，不能以  /home/test  多级 / 方式定义，否则出现如下错误，最终默认会指向 / 路由。 

##### One or more of those objects was null, and therefore the initial route specified will be ignored and "/" will be used instead. see [https://stackoverflow.com/questions/54556381/flutter-error-could-not-navigate-to-initial-route](https://stackoverflow.com/questions/54556381/flutter-error-could-not-navigate-to-initial-route)

- Android项目中嵌入Flutter工程时，切换 FlutterFragment页面时会出现黑屏问题


<br />解决方案见：[https://github.com/alibaba/flutter_boost/issues/105](https://github.com/alibaba/flutter_boost/issues/105)<br />
<br />

- Android Native 页面如何给 Flutter 页面发送消息？

Native 与 Flutter 通信，可以通过 MethodChannel 实现，而 MethodChannel 是依赖 FlutterView，但 Native Activity 并没有 FlutterView 的实例。目前是采用如下思路处理：在 Native FlutterView 创建时，保存当前最顶部的 FlutterView 全局引用，然后 Native Activity 拿到 FlutterView 全局引用后就可以进行通信了。

- Native 与 混合栈以及返回键问题

  <br />我们知道，默认 FlutterView 所有页面切换都是通过  View 实现的，而且都在一个 Activity 上，这样导致点击返回键时，导致所有页面都退出了，当然这里可以通过判断是拦截返回键解决。当遇到 Native ->Flutter->Native 这种交替时，整个堆栈的管理还是比较复杂的。目前是在创建 FlutterView 时，都通过一个  Activity 方式去承载，从而解决堆栈问题。当然这样处理也有不好的地方，会占用过多的内存，这一块需要继续研究一些，比如闲鱼提到的 FlutterView 重用机制。




  