/**
 * Created with JetBrains WebStorm.
 * User: jochen
 * Date: 19/03/13
 * Time: 18:23
 * To change this template use File | Settings | File Templates.
 */
angular.module('psLog', []).

/**
 * $log service decorator
 */
/*  config(function ($logProvider) {
    "use strict";
		console.warn('Enabling debug for $logProvider: ',$logProvider);
		$logProvider().debugEnabled(true);
  }).*/
  service('$log', function ($window) {
    "use strict";
		console.warn('Enabling debug for $logProvider: ');

		this.log = function () {
			$window.alert('log');
		};
		this.error = function () {
			$window.alert('error');
		};

		this.$get = function () {
			var $log = {
				log: function () {
					$window.alert('yo');
				},
				log2: console.log,
				info: console.info,
				warn: console.warn,
				error: console.error
			};
			return $log;
		};

  });


/**
 * $log service decorator
 */
/*  config(function ($logProvider) {
 "use strict";
 console.warn('Enabling debug for $logProvider: ',$logProvider);
 $logProvider().debugEnabled(true);
 }).*/
service('log', function () {
	"use strict";
	console.warn('Enabling debug for $logProvider: ');

	this.$get = function () {
		var $log = {
			log: console.log,
			info: console.info,
			warn: console.warn,
			error: console.error
		};
		return $log;
	};

}).

	service(function ($provide) {
		"use strict";

		/**
		 * TODO: services.js en app2.js code inbrengen zodat hirarchiesche logging mogelijk is
		 * derna de filtering dan
		 * dan log 4 js (of ervoor mss)
		 * en groupen
		 * dan inspecten
		 * /


		 //    var piercingMethod = {warn: true, error: true};
		 //    var whiteList = /.*/;
		var defaultLogFn = ['log', 'info', 'warn', 'error', 'debug'];

		function bindLog(log, fnName, prefix, parentLog) {
			var boundLog = log[fnName].bind(log, '[' + fnName + ']');

			/* if (parentLog === undefined)
			 boundLog = log[fnName].bind(log, '[' + fnName + ']', '[' + prefix + ']');
			 else
			 boundLog = log[fnName].bind(log, '[' + prefix + ']');*/

			return boundLog;
		}

		var log = /*parentLog ||*/ console;

		function mapLogFnToLog(fnName){

			//set log to fallback logFn
			if (!log[fnName]) {
				fnName = 'log'
			}

			var mappedLog =  bindLog(log, fnName/*, prefix, parentLog*/);

			return mappedLog;
		}



		function replaceLog($delegate) {
			var replacedLog = {};

			angular.forEach($delegate, function logFnIterator(value, fnName) {
				replacedLog[fnName] = mapLogFnToLog(fnName);
			});



			return replacedLog;
		}

		$provide.decorator('$log', function ($delegate) {
			console.log('in decorator with $delegate: ',$delegate);

			return replaceLog($delegate);
		});
	}).

/**
 * TESTING
 */
	run(function ($log) {
		console.info('testing hier');
		$log.log('log');
		$log.info('info');
		$log.warn('warn');
		$log.error('error');
		$log.debug('debug');

	});