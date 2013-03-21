/**
 * Created with JetBrains WebStorm.
 * User: jochen
 * Date: 19/03/13
 * Time: 18:23
 * To change this template use File | Settings | File Templates.
 */
angular.module('psLog', []).

/*  service('psUtil',function ($log) {
	  $log.info('in psUtil');

  }).*/

	/*
	 * TODO: services.js en app2.js code inbrengen zodat hirarchiesche logging mogelijk is
	 * derna de filtering dan
	 * dan log 4 js (of ervoor mss)
	 * en groupen
	 * dan inspecten
	 */
  /**
   * TODO:
   * $log.log('init', 'app-run');

   dan

   $log.log('init', 'app-run'); => merged by default op parent tenzij param false extra meegegeven

   $log.log('group', 'name');
   $log.log('groupEnd',);
   $log.log('andere loglevel', 'msg');
   $log.log('inspect', ...);


   gebruikt log4js indien aanwezig
   */

  value('logWhiteList', /.*/).
	//.value('logFactory_whiteList', /!|.*Ctrl|run/)
  value('logPiercingMethods', {warn: true, error: true}).

  service('$log', ['logWhiteList', 'logPiercingMethods', function (whiteList, piercing) {

	"use strict";
	console.debug('In log service');

	whiteList = whiteList || /.*/;
	piercing = piercing || {};
	var defaultLogFn = ['log', 'info', 'warn', 'error', 'debug'];
	var log = console;
	var currentLog;


	function bindLog(log, fnName, prefix, parentLog) {

		if (angular.isUndefined(prefix) && angular.isUndefined(parentLog)) {
			var boundLog = log[fnName].bind(log, '[' + fnName + ']');
		}else{
			if (parentLog === undefined)
				boundLog = log[fnName].bind(log, '[' + fnName + ']', '[' + prefix + ']');
			else
				boundLog = parentLog[fnName].bind(parentLog, '[' + prefix + ']');
		}

		return boundLog;
	}

	function mapLogFnToLog(fnName) {

		//set fallback logFn to 'log'
		if (!log[fnName]) {
			fnName = 'log'
		}
		var mappedLog = bindLog(log, fnName/*, prefix, parentLog*/);

		if(fnName === 'log'){
			return function () {
				if(arguments[0]!=='init')
					return bindLog(log, fnName/*, prefix, parentLog*/).apply(log, arguments);
				else{
					if(angular.isUndefined(currentLog)){
						return bindLog(log, fnName, arguments[1]);//.apply(log, arguments);
					}else{
						return bindLog(log, fnName, arguments[1], currentLog);//.apply(log, arguments);
					}
				}
			};
		}else{
			return bindLog(log, fnName/*, prefix, parentLog*/);
		}
	}


	function createLog(logFnArray) {
		var newLog = {};

		for (var i = 0; i < logFnArray.length; i++) {
			newLog[logFnArray[i]] = mapLogFnToLog(logFnArray[i]);
		}

		return newLog;
	}

	return (currentLog = createLog(defaultLogFn));
}]).


/**
 * TESTING
 */
  run(function ($log) {
/*	  console.info('testing hier');
	  $log.log('log');
	  $log.info('info');
	  $log.warn('warn');
	  $log.error('error');
	  $log.debug('debug');


	  $log.log('init', 'level1');
	  $log.log('init', 'level2');

	  $log.log('log');
	  $log.info('info');
	  $log.warn('warn');
	  $log.error('error');
	  $log.debug('debug');*/

  });