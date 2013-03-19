'use strict';
//var DEBUGMODE = true;
//_logutil.inspect(this,'angular');
//_logutil.inspect(this,'angular.module');
// New injector is created from the module.
// (This is usually done automatically by angular bootstrap)
//var injector = angular.injector(['myApp', 'ng']);


// Declare app level module which depends on filters, and services
//'ui.bootstrap'
var app = angular.module('myApp', []);
//var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'angularTree']);
//_log.inspect(this,'angular');
//_log.inspect(this,"app");
app.
  config(['$routeProvider', function ($routeProvider) {
//		$log.info('myApp > $routeProvider');
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/logging', {templateUrl: 'partials/logging.html', controller: LogCtrl});
    $routeProvider.when('/tree', {templateUrl: 'partials/tree.html', controller: TreeCtrl});
    $routeProvider.when('/dev', {templateUrl: 'partials/dev.html', controller: DevCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]).
//


/**
 * $log decorator
 */
	/*
	 config(function ($provide) {
	 $provide.decorator('$log', function ($delegate, $sniffer) {




	 var _log = $delegate.log;

	 var log4js;

	 if (log4javascript) {
	 log4js = log4javascript.getLogger("main") || {};
	 var appender = new log4javascript.InPageAppender();
	 log4js.addAppender(appender);
	 log4js.info('log4javascript active');
	 }

	 $delegate.log = function (msg) {
	 _log(msg);
	 log4js && log4js.info(msg);
	 //			alert(msg);
	 };

	 var result = function (level, msg) {
	 if (level === 'group') return console.group(msg);
	 if (level === 'groupEnd') return console.groupEnd();

	 result[level](msg);
	 }

	 angular.forEach($delegate, function (value, key) {
	 result[key] = value;
	 });

	 return result;
	 });
	 }).*/
	/*config(function ($provide) {
	 var whiteList = /.*//*;
 var piercing = {log: true, warn: true, error: true};
 var prefix;
 var parentLog;

 function getLog4js() {
 var log4js;

 if (log4javascript) {
 log4js = log4javascript.getLogger("main") || {};
 var appender = new log4javascript.InPageAppender();
 log4js.addAppender(appender);
 log4js.info('log4javascript active');
 }
 return log4js;
 }

 function getLogObject(delegate) {

 var logAppender = parentLog !== undefined || delegate;

 if (prefix === undefined) {
 var result = {};

 angular.forEach(delegate, function (value, key) {
 if(key === 'log'){
 result[key] = function () {
 if (arguments[0] === 'init') {
 prefix = arguments[1];
 } else {
 doLog('log');
 }
 }
 }else{
 result[key] = value;
 }
 });
 return result;
 }

 function doLog(fnName) {


 if (!logAppender[fnName]) {
 fnName = 'log'
 }

 if (prefix === undefined) {
 return logAppender[fnName];
 }

 return (piercing[fnName] || prefix.match(whiteList))
 ? logAppender[fnName].bind(logAppender, '[' + fnName + ']' + ' ' + '[' + prefix + ']')
 : angular.noop;
 }

 return {
 log: doLog('log'),
 info: doLog('info'),
 warn: doLog('warn'),
 error: doLog('error')*//*,
 group: console.group,
 groupEnd: console.groupEnd*//*
 };
 }


 $provide.decorator('$log', function ($delegate, $sniffer) {

 //			var log4js = getLog4js();

 var result = function (level, msg) {
 if (level === 'group') return console.group(msg);
 if (level === 'groupEnd') return console.groupEnd();

 result[level](msg);
 }


 return getLogObject($delegate);
 });
 }).*/
//	config(function ($provide) {
		//http://alistapart.com/article/getoutbindingsituations

    // Superpowered logging for AngularJS.


/*

    $provide.decorator('$log', function ($delegate, $sniffer) {

//			var prefix = 'testpf';

			function Result(prefix){
				var getBindParam = function(fnName, prefix) {
					return '[' + fnName + ']' + ' ' +'[' + prefix + ']';
				}

//				this.prefix = 'rsfn';
				this.debug= function(prefix, parentLog){
					prefix = prefix;
					this.parentLog = parentLog;
				};
				this.log= function (prefix) {
					return console.log.bind(console, '[log]' + ' ' +'[' + prefix + ']');
				}(prefix);
//				var log= console.log.bind(console, '[log]' + ' ' +'[' + prefix + ']');
				this.info= console.info.bind(console, '[info]' + ' ' +'[' + prefix + ']');

				*/
/*return {
					log: log,
					info: info,
					debug: debug
				}*//*

			}

			*/
/*var res = {
				prefix: 'testpf',
				config: {parentLog: null},
				debug: debugFn,
				log: console.log.bind(result, getBindParam.apply(this,['log',this])),
				info: console.info.bind(result, getBindParam.apply(this,['info',this])),
				warn: console.warn.bind(console),
				error: console.error.bind(console),
				group: console.group.bind(console),
				groupEnd: console.groupEnd.bind(console),
				getBindParam: function(fnName) {
					return '[' + fnName + ']' + ' ' +'[' + result.prefix + ']';
				}
			};*//*


*/
/*			function getBindParam(fnName, that) {
				return '[' + fnName + ']' + ' ' +'[' + result.prefix + ']';
			}*//*


*/
/*			function debugFn(prefix2, parentLog){
				prefix = prefix2;
				result.config.parentLog = parentLog;
			}*//*


			return new Result;

		});
	}).
	run(function ($log) {
		*/
/*$log.info('begin');
		 $log.log('init', 'app-run');
		 $log.log('test');
		 $log.info('info');*//*

		*/
/*
		 $log('test');
		 *//*

//		$log.prefix='testww';
		$log('kkaka');
		var message = "testmsg";
//		$log.debug('test');
		$log().log(message);
		$log.info(message);
		$log.log(message);
		$log.info(message);
//		$log.warn(message);
//		$log.error(message);

		message = "testmsg2";
		$log.log(message);
		$log.info(message);
		$log.warn(message);
		$log.error(message);
	});*/
