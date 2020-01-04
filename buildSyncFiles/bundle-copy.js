(function(modules) {
  // webpack启动函数
	// 安装一个为了加载额外代码块的JSON的回调函数
	function webpackJsonpCallback(data) {
		// 代码块ID 
		var chunkIds = data[0];
		// 更多的模块
		var moreModules = data[1];
		// 向模块对象上增加更多的模块，然后把所有的chunkIds设置为已经加载并触发回调
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
				resolves.push(installedChunks[chunkId][0]);
			}
			// 标识这个代码块为已经ok
			installedChunks[chunkId] = 0;
		}
			// 把新拉下来的模块合并到模块对象上
		for(moduleId in moreModules) {
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
		}
			// 如果有父JSONP函数就调用
		if(parentJsonpFunction) parentJsonpFunction(data);

		while(resolves.length) {
				// 让所有的promise都Ok
			resolves.shift()();
		}

	};

	// 模块缓存
	var installedModules = {};

	// 用来存放加载完成或加载中的代码块对象
	// undefined = 代码块未加载, null = 代码块正在预加载或者预获取
	// Promise = 代码块更在加载中, 0 = 代码块已经加载
	var installedChunks = {
		"main": 0
	};

	// JSON加载的路径
	function jsonpScriptSrc(chunkId) {
		return __webpack_require__.p + "" + chunkId + ".bundle.js"
	}

	// 定义在浏览器中的方法
	function __webpack_require__(moduleId) {

		// 检查模块是否在缓存中
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// 创建一个新的模块并且放到模块的缓存中
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// 执行模块函数
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// 把模块设置为已经加载
		module.l = true;

		// 返回模块的导出对象
		return module.exports;
	}

	// 这个文件只包含入口代码块
	// 用来加载额外的代码块的函数
	__webpack_require__.e = function requireEnsure(chunkId) {
		var promises = [];

		// JSONP代码块加载
			var installedChunkData = installedChunks[chunkId];
			// 0的意思是已经安装
		if (installedChunkData !== 0) { // 0 means "already installed".

			// 如果是一个promise表示正在加载中
			if(installedChunkData) {
				promises.push(installedChunkData[2]);
			} else {
				// 正在代码块缓存中放置Promise
				var promise = new Promise(function(resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				});
				promises.push(installedChunkData[2] = promise);

				// 开始加载代码块
				var script = document.createElement('script');
				var onScriptComplete;

				script.charset = 'utf-8';
				script.timeout = 120;
				// HTMLElement 接口的 nonce 属性返回只使用一次的加密数字，被内容安全政策用来决定这次请求是否被允许处理。
				if (__webpack_require__.nc) {
					script.setAttribute("nonce", __webpack_require__.nc);
				}
				// 设置文件路径
				script.src = jsonpScriptSrc(chunkId);
				
				// 在栈展开之前创建错误以获取有用的堆栈信息
				// create error before stack unwound to get useful stacktrace later
				var error = new Error();
				onScriptComplete = function (event) {
					// avoid mem leaks in IE.
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var chunk = installedChunks[chunkId];
					if(chunk !== 0) {
						if(chunk) {
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
							error.name = 'ChunkLoadError';
							error.type = errorType;
							error.request = realSrc;
							chunk[1](error);
						}
						installedChunks[chunkId] = undefined;
					}
				};
				var timeout = setTimeout(function(){
					onScriptComplete({ type: 'timeout', target: script });
				}, 120000);
				script.onerror = script.onload = onScriptComplete;
				document.head.appendChild(script);
			}
		}
		return Promise.all(promises);
	};

	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

 	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
	__webpack_require__.p = "";

	// 异步加载中的错误处理函数
	__webpack_require__.oe = function(err) { console.error(err); throw err; };
	// 刚开始的时候会把数组赋给window["webpackJsonp"],并且赋给jsonpArray
	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	// 绑定push函数为oldJsonpFunction
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	// 把webpackJsonpCallback赋给了jsonpArray.push方法
	jsonpArray.push = webpackJsonpCallback;
	// 把数组进行截取得到一个新的数组
	jsonpArray = jsonpArray.slice();
	// 如果数组不为空，就把全部安装一次
	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
	//把oldJsonpFunction赋给parentJsonpFunction
	var parentJsonpFunction = oldJsonpFunction;
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/demoSyncFiles/index.js");
})
({
	"./src/demoSyncFiles/index.js": (function(module, exports, __webpack_require__) {
		var button = document.createElement("button");
		button.innerHTML = "点我";
		button.onclick = function () {
			__webpack_require__.e("title")
			.then(__webpack_require__.t.bind(null, "./src/demoSyncFiles/title.js", 7))
			.then(function (result) {
				console.log(result, result["default"]);
			});
		};
		document.body.appendChild(button);
	})
});