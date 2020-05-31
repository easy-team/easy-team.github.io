
---
id: 721568
space: blog
slug: ekvirc
url: /blog/ekvirc
title: Webpack 构建流程解密
summary: 通过 Webpack 工具，可以很方便完成各种框架的构建打包支持。使用 Webpack 一段事件后，各种配置也都非常熟悉， 但只停留使用节点，对内部原理极致不是非常清新，常常带着这些疑问：Webpack 启动流程是怎么样的？Webpack 插件是怎么使用的，怎么保证调用顺序？Webpack 事件机制是怎么样的？接下来我将通过从 Webpack 启动流程， 事件机制， 插件机制， 热更新等几方面深入的讲述一下构建 Webpack 内部构建流程。启动流程首先我们来看看webpack的 webpack.js...
coverImage: null
createTime: 2018-07-10T10:35:29.000Z 
upateTime: 2019-05-23T08:13:55.000Z
wordCount: 2231
layout: doc
---
通过 Webpack 工具，可以很方便完成各种框架的构建打包支持。使用 Webpack 一段事件后，各种配置也都非常熟悉， 但只停留使用节点，对内部原理极致不是非常清新，常常带着这些疑问：

- Webpack 启动流程是怎么样的？

- Webpack 插件是怎么使用的，怎么保证调用顺序？

- Webpack 事件机制是怎么样的？


接下来我将通过从 Webpack 启动流程， 事件机制， 插件机制， 热更新等几方面深入的讲述一下构建 Webpack 内部构建流程。


## 启动流程

首先我们来看看webpack的 [webpack.js](https://github.com/webpack/webpack/tree/master/lib/webpack.js)入口定义：

```javascript
function webpack(options, callback) {
  ......
  // 初始化所有plugin, 包括自定义事件, 事件回调定义
  if(options.plugins && Array.isArray(options.plugins)) {
	compiler.apply.apply(compiler, options.plugins);
  }
  var compiler = new Compiler();
  // 这里比较关键，如果有提供回调函数，直接启动编译，这个是用于发布构建使用，
  // 构建文件落地磁盘，需要提供callback进入构建流程；当使用 webpack-dev-middlerware 
  // 和 webpack-hot-middleware 时，不需要提供callback函数， 由 触发。
  if(callback) {
    // 启动 webpack 编译
   	compiler.run(callback);
  }
  return compiler;
}
```

![](https://cdn.yuque.com/yuque/0/2018/png/116733/1531218906866-6357a41d-3295-43ef-bdb7-9ea2a2b09e54.png#width=576)

以上图片来自[冯淼森的博客](https://fengmiaosen.github.io/2017/03/21/webpack-core-code/)


## 事件机制


### 关键事件


#### before-run

- NodeEnvironmentPlugin



#### run

- CachePlugin



#### watch-run

- CachePlugin



#### before-compile

#### compile

#### entry-option

- EntryOptionPlugin



#### make

- SingleEntryPlugin



#### after-compile

- CachePlugin



#### after-emit

- SizeLimitsPlugin



#### after-resolvers

- AMDPlugin

- NodeSourcePlugin



#### compilation

- FunctionModulePlugin

- NodeSourcePlugin

- LoaderTargetPlugin

- EvalSourceMapDevToolPlugin

- CompatibilityPlugin

- HarmonyModulesPlugin

- AMDPlugin

- CommonJsPlugin

- LoaderPlugin

- NodeStuffPlugin

- RequireJsStuffPlugin

- APIPlugin

- ConstPlugin

- UseStrictPlugin

- RequireIncludePlugin

- RequireEnsurePlugin

- RequireContextPlugin

- ImportPlugin

- SystemPlugin

- EnsureChunkConditionsPlugin

- RemoveParentModulesPlugin

- RemoveEmptyChunksPlugin

- MergeDuplicateChunksPlugin

- FlagIncludedChunksPlugin

- OccurrenceOrderPlugin

- FlagDependencyExportsPlugin

- FlagDependencyUsagePlugin

- TemplatedPathPlugin

- RecordIdsPlugin

- WarnCaseSensitiveModulesPlugin



#### this-compilation

- CachePlugin

- JsonpTemplatePlugin



#### done

上面是列举的几个重要的事件名，通过打日志发现，你还会发现还有很多自定义事件, 更多事件请参考官网[Event Hooks](https://webpack.js.org/api/compiler/)。你可以通过 compiler.plugin(‘事件名’, callback) 的方式监听这些事件，并提供回调函数。通过Webpack构建提供的生命周期事件，你可以控制 Webpack 编译流程的每个环节，从而实现对 Webpack 的自定义扩展功能。


### 事件定义

- 全局事件容器定义


```javascript
// Tapable.prototype.plugin 定义事件， 一个事件可以多个回调函数
compiler.plugin = function plugin(name, fn){
  if(Array.isArray(name)) {
		name.forEach(function(name) {
			this.plugin(name, fn);
		}, this);
		return;
   }
   if(!this._plugins[name]) this._plugins[name] = [fn];
   else this._plugins[name].push(fn);
}
```

- Webpack 启动入口组件初始化


```javascript
// node_modules/webpack/lib/webpack.js
function webpack(options, callback) {
  ......
  // 初始化所有plugin, 同时注册自定义事件和定义事件回调
  if(options.plugins && Array.isArray(options.plugins)) {
    // apply 是每个plugin必须实现的方法
	compiler.apply.apply(compiler, options.plugins);
  }
  ......
}
```

- 插件内部事件注册


查阅代码 Webpack 插件代码你会发现， 很多插件会在 `apply` 里面监听关键事件，然后处理相关逻辑

```javascript
apply(compiler) {
  compiler.plugin("compilation", (compilation, params) => {
   ......
  });
  compiler.plugin("make", (compilation, callback) => {
   ......
  });
}
```


### 触发事件

在 `node_modules/tapable/lib/Tapable.js` 文件中提供很多触发事件的方法(方法命名好多，1，2，3，4这种命名，怀疑是版本兼容时不停增加导致的)，下面介绍一下主要的两个。

- applyPlugins


```javascript
compiler.applyPlugins("compile", params);
```

- applyPluginsAsync


```javascript
compiler.applyPluginsAsync("before-compile", params, err => {
});
```

applyPluginsAsyncSeries [ Compiler {<br />_plugins:<br />{ 'before-run': [Array],<br />'this-compilation': [Array],<br />compilation: [Array],<br />'after-resolvers': [Array],<br />'entry-option': [Array],<br />make: [Array],<br />'after-emit': [Array],<br />'watch-run': [Array],<br />run: [Array],<br />'after-compile': [Array] },


## 代码执行流程


## webpack.js

#### WebpackOptionsDefaulter 初始化 webpack 默认配置

#### NodeEnvironmentPlugin.apply(before-run)
初始化 inputFileSystem/outputFileSystem/watchFileSystem

#### compiler.applyPlugins("environment");

#### compiler.applyPlugins("after-environment");

#### WebpackOptionsApply
根据 webpack 配置 target 初始化 对应 Webpack plugin,  同时初始化文件查找<br />ResolverFactory.createResolver

##### web
```javascript
compiler.apply(
    // jsonp-script, require-ensure, bootstrap 脚本注入
    new JsonpTemplatePlugin(options.output), 
    // __webpack_require__ 定义
    new FunctionModulePlugin(options.output),
    new NodeSourcePlugin(options.node),
    new LoaderTargetPlugin(options.target)
);
```


##### node
```javascript
compiler.apply(
  new NodeTemplatePlugin({
    asyncChunkLoading: options.target === "async-node"
  }),
  new FunctionModulePlugin(options.output),
  new NodeTargetPlugin(),
  new LoaderTargetPlugin("node")
);
```
```javascript
compiler.apply(new EntryOptionPlugin());
    compiler.applyPluginsBailResult("entry-option", options.context, options.entry);
    compiler.apply(
      new CompatibilityPlugin(),
      new HarmonyModulesPlugin(options.module),
      new AMDPlugin(options.module, options.amd || {}),
      new CommonJsPlugin(options.module),
      new LoaderPlugin(),
      new NodeStuffPlugin(options.node),
      new RequireJsStuffPlugin(),
      new APIPlugin(),
      new ConstPlugin(),
      new UseStrictPlugin(),
      new RequireIncludePlugin(),
      new RequireEnsurePlugin(),
      new RequireContextPlugin(options.resolve.modules, 
            options.resolve.extensions, 
            options.resolve.mainFiles),
      new ImportPlugin(options.module),
      new SystemPlugin(options.module)
    );
```
```javascript
compiler.apply(
      new EnsureChunkConditionsPlugin(),
      new RemoveParentModulesPlugin(),
      new RemoveEmptyChunksPlugin(),
      new MergeDuplicateChunksPlugin(),
      new FlagIncludedChunksPlugin(),
      new OccurrenceOrderPlugin(true),
      new FlagDependencyExportsPlugin(),
      new FlagDependencyUsagePlugin()
    );
    if(options.performance) {
      compiler.apply(new SizeLimitsPlugin(options.performance));
    }
    compiler.apply(new TemplatedPathPlugin());
    compiler.apply(new RecordIdsPlugin());
    compiler.apply(new WarnCaseSensitiveModulesPlugin());
    if(options.cache) {
      let CachePlugin = require("./CachePlugin");
      compiler.apply(new CachePlugin(options.cache));
    }
```

#### compiler.run(callback) 进入run流程


## Compiler extends Tapable


#### compiler.run(callback) 进入编译流程

```javascript
run(callback) {
		const startTime = Date.now();

		const onCompiled = (err, compilation) => {
			//console.log('---run:onCompiled');
			if(err) return callback(err);

			if(this.applyPluginsBailResult("should-emit", compilation) === false) {
				this.applyPlugins("done", stats);
				return callback(null, stats);
			}

			this.emitAssets(compilation, err => {
				if(err) return callback(err);
				if(compilation.applyPluginsBailResult("need-additional-pass")) {
					this.applyPlugins("done", stats);
					this.applyPluginsAsync("additional-pass", err => {
						if(err) return callback(err);
						this.compile(onCompiled);
					});
					return;
				}
				this.emitRecords(err => {
					if(err) return callback(err);
					this.applyPlugins("done", stats);
					return callback(null, stats);
				});
			});
		};

		this.applyPluginsAsync("before-run", this, err => {
			if(err) return callback(err);
			this.applyPluginsAsync("run", this, err => {
				if(err) return callback(err);
				//console.log('---applyPluginsAsync:run');
				this.readRecords(err => {
					if(err) return callback(err);
					this.compile(onCompiled);
				});
			});
		});
	}
```


#### Webpack Loader 处理初始化 NormalModuleFactory
**NormalModuleFactory: /node_modules/webpack/lib/NormalModuleFactory.js**
```javascript
createNormalModuleFactory() {
       // /node_modules/webpack/lib/NormalModuleFactory.js
    const normalModuleFactory = new NormalModuleFactory(this.options.context, 
    this.resolvers, this.options.module || {});
		this.applyPlugins("normal-module-factory", normalModuleFactory);
		return normalModuleFactory;
	}

	createContextModuleFactory() {
    const contextModuleFactory = new ContextModuleFactory(
      this.resolvers, 
      this.inputFileSystem
    );
		this.applyPlugins("context-module-factory", contextModuleFactory);
		return contextModuleFactory;
	}

	newCompilationParams() {
		const params = {
			normalModuleFactory: this.createNormalModuleFactory(),
			contextModuleFactory: this.createContextModuleFactory(),
			compilationDependencies: []
		};
		return params;
  }
```


#### compiler.compile(onCompiled) 进入编译流程

```javascript
compile(callback) {
	const params = this.newCompilationParams();
	this.applyPluginsAsync("before-compile", params, err => {
		if(err) return callback(err);
		this.applyPlugins("compile", params);
		const compilation = this.newCompilation(params);
		this.applyPluginsParallel("make", compilation, err => {
			if(err) return callback(err);
				compilation.finish();
				compilation.seal(err => {
					if(err) return callback(err);
					this.applyPluginsAsync("after-compile", compilation, err => {
						if(err) return callback(err);
						return callback(null, compilation);
					});
				});
			});
	});
}
```



#### 

## Entry


#### entry-option:EntryOptionPlugin


#### make:SingleEntryPlugin

// Compilation: node_modules/webpack/lib/Compilation.js
```
Compilation.addEntry(context, entry, name, callback)
```


## 关键代码


### Webpack.js

- function webpack(options)

  - new WebpackOptionsDefaulter().process(options);

  - compiler.apply.apply(compiler, options.plugins);

  - new NodeEnvironmentPlugin().apply(compiler);

  - NodeEnvironmentPlugin.js: compiler.plugin("before-run")

  - compiler.applyPlugins("environment");

  - compiler.applyPlugins("after-environment");

  - compiler.options = new WebpackOptionsApply().process(options, compiler);

  - WebpackOptionsApply.js 

    - EntryOptionPlugin: "entry-option"

    - SingleEntryPlugin: "make" or MultiEntryPlugin: "make"

    - 若干组件初始化

    - compiler.resolvers.context = ResolverFactory.createResolver(options.resolve)

    - compiler.resolvers.loader = ResolverFactory.createResolver(options.resolveLoader);

  - compiler.run(callback)


### Compiler.js

- compiler.run(callback)

  - this.applyPluginsAsync("before-run")

  - this.applyPluginsAsync("run")

- this.compile(onCompiled);

  - new NormalModuleFactory(this.options.context, this.resolvers, this.options.module || {})

  - this.applyPluginsAsync("before-compile")

  - this.applyPlugins("compile")

  - this.applyPluginsParallel("make")

  - this.applyPluginsAsync("after-compile")

  - callback(null, compilation)



### WebpackOptionsApply.js

- new EntryOptionPlugin: 'entry-option'

- compiler.apply('entry-option')

- compiler.apply(new SingleEntryPlugin: "make" or MultiEntryPlugin: "make");

- SingleEntryPlugin

  - compiler.plugin("make", (compilation, callback) => {});

- 若干组件初始化

- compiler.resolvers.context = ResolverFactory.createResolver(options.resolve)

- compiler.resolvers.loader = ResolverFactory.createResolver(options.resolveLoader);


### Compilation.js

- addEntry

- _addModuleChain

- NormalModuleFactory.create

- buildModule:build-module

- NormalModule.js: build

- loader-runner:runLoaders

- NormalModule.js: parser.parse HarmonyImportDependency 文件依赖

- processModuleDependencies( 递归解析文件和处理文件依赖 )


 

#### Dependencies

- factory: NullFactory & NormalModuleFactory

```json
[ HarmonyCompatibilityDependency { module: null, originModule: [Object], loc: [Object] } ],
  [ HarmonyImportDependency {
      module: null,
      request: 'vue',
      userRequest: 'vue',
      range: [Array],
      importedVar: '__WEBPACK_IMPORTED_MODULE_0_vue__',
      loc: [Object] } ],
  [ HarmonyImportDependency {
      module: null,
      request: './components/Hello.vue',
      userRequest: './components/Hello.vue',
      range: [Array],
      importedVar: '__WEBPACK_IMPORTED_MODULE_1__components_Hello_vue__',
      loc: [Object] } ],
  [ HarmonyImportDependency {
      module: null,
      request: './components/HelloDecorator.vue',
      userRequest: './components/HelloDecorator.vue',
      range: [Array],
      importedVar: '__WEBPACK_IMPORTED_MODULE_2__components_HelloDecorator_vue__',
      loc: [Object] } ],
  [ HarmonyImportSpecifierDependency {
      module: null,
      importDependency: [Object],
      importedVar: '__WEBPACK_IMPORTED_MODULE_0_vue__',
      id: 'default',
      name: 'Vue',
      range: [Array],
      strictExportPresence: false,
      namespaceObjectAsContext: false,
      callArgs: undefined,
      call: undefined,
      directImport: true,
      shorthand: undefined,
      loc: [Object] } ],
  [ HarmonyImportSpecifierDependency {
      module: null,
      importDependency: [Object],
      importedVar: '__WEBPACK_IMPORTED_MODULE_1__components_Hello_vue__',
      id: 'default',
      name: 'HelloComponent',
      range: [Array],
      strictExportPresence: false,
      namespaceObjectAsContext: false,
      callArgs: undefined,
      call: undefined,
      directImport: true,
      shorthand: undefined,
      loc: [Object] } ],
  [ HarmonyImportSpecifierDependency {
      module: null,
      importDependency: [Object],
      importedVar: '__WEBPACK_IMPORTED_MODULE_2__components_HelloDecorator_vue__',
      id: 'default',
      name: 'HelloDecoratorComponent',
      range: [Array],
      strictExportPresence: false,
      namespaceObjectAsContext: false,
      callArgs: undefined,
      call: undefined,
      directImport: true,
      shorthand: undefined,
      loc: [Object] } ] ]
```

### 


#### NormalModuleFactory.js

- this.plugin("factory")

- this.plugin("resolver")

- create(data, callback)


创建模块：
```javascript
new NormalModule(
 result.request, ///TypeScript-Vue-Starter/node_modules/_ts-loader@3.2.0
 // @ts-loader/index.js??ref--1!/TypeScript-Vue-Starter/src/index.ts
 result.userRequest, //'/TypeScript-Vue-Starter/src/index.ts',
 result.rawRequest, //'./src/index.ts'
 result.loaders,
 result.resource,
 result.parser
);
```



[https://github.com/webpack/enhanced-resolve/tree/master/lib](https://github.com/webpack/enhanced-resolve/tree/master/lib)<br />[https://doc.webpack-china.org/concepts/module-resolution/](https://doc.webpack-china.org/concepts/module-resolution/)

TypeScript-Vue-Starter/node_modules/enhanced-resolve/lib/ResolverFactory.js

TypeScript-Vue-Starter/node_modules/enhanced-resolve/lib/Resolver.js

TypeScript-Vue-Starter/node_modules/webpack/lib/NormalModuleFactory.js


#### ResolverFactory

- TypeScript-Vue-Starter/node_modules/_enhanced-resolve@3.4.1@enhanced-resolve/lib/ResolverFactory.js


- TypeScript-Vue-Starter/node_modules/enhanced-resolve/lib/node.js


- TypeScript-Vue-Starter/node_modules/webpack/lib/WebpackOptionsApply.js


- TypeScript-Vue-Starter/node_modules/_webpack@3.10.0@webpack/lib/webpack.js


```javascript
new WebpackOptionsDefaulter().process(options);
compiler.options = new WebpackOptionsApply().process(options, compiler);
```


### 插件初始化
class Compiler extends Tapable

- 

  1. 执行plugin 的apply方法


```javascript
Tapable.prototype.apply = function apply() {
	for(var i = 0; i < arguments.length; i++) {
		console.log('Tapable#apply', arguments[i].constructor.name);
		arguments[i].apply(this);
	}
};
```

- 


  1. 注册事件回调函数


```javascript
// name  hook 事件名称
// fn: function (request, callback) {
//	resolver.doResolve(target, obj, appending, callback);
// }
Tapable.prototype.plugin = function plugin(name, fn) {
	if(Array.isArray(name)) {
		name.forEach(function(name) {
			this.plugin(name, fn);
		}, this);
		return;
	}
	// 一个事件名可以注册多个回调函数
	if(!this._plugins[name]) this._plugins[name] = [fn];
	else this._plugins[name].push(fn);
};
```


#### 插件执行循序

- SingleEntryPlugin


- [webpack.js](https://github.com/webpack/webpack/tree/master/lib/webpack.js)

- [Tabable.js](https://github.com/webpack/webpack/tree/master/lib/Tabable.js)

- [Compiler.js](https://github.com/webpack/webpack/tree/master/lib/Compiler.js)

- [NodeEnvironmentPlugin.js](https://github.com/webpack/webpack/tree/master/lib/node/NodeEnvironmentPlugin.js)



## 参考文章

- [webpack之plugin内部运行机制](https://fengmiaosen.github.io/2017/03/21/webpack-core-code/)

- [Webpack Module Resolution](https://www.jianshu.com/p/223bb6edc0eb)



  