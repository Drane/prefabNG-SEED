'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  service('logutil', function($log){
    $log.info('in logutil');

   /* function _getLog4js() {
      if(!log4javascript)return;

      var log4js = log4javascript.getLogger("main") || {};
      var appender = new log4javascript.InPageAppender();
      log4js.addAppender(appender);
      log4js.info('log4javascript active');

      return log4js;
    };

    this.log4js = _getLog4js();
    this.log4js.info('yes');

    this.bindLog4js = function _bindLog4js(logFn, boundLog){
      return this.log4js[logFn].bind(boundLog);
//      return logFn.bind(this.log4js);
    };*/
  }).
  value('version', '0.1').

value('logFactory_whiteList', /.*/).
//.value('logFactory_whiteList', /!|.*Ctrl|run/)
  value('logFactory_piercingMethods', {warn: true, error: true}).
  factory('logFactory', ['$log', 'logFactory_whiteList' , 'logFactory_piercingMethods', 'logutil', function ($log, whiteList, piercing, logutil) {

    console.log('in logFactory');

    piercing = piercing || {}
    whiteList = whiteList || /.*/

    function bindLog(log, fnName, prefix, parentLog) {
      var result;

      if (parentLog === undefined)
        result = log[fnName].bind(log, '[' + fnName + ']', '[' + prefix + ']');
      else
        result = log[fnName].bind(log, '[' + prefix + ']');

      return result;
    }

    return function (prefix, parentLog) {
      var log = parentLog || console;
      var match = prefix.match(whiteList);

      function e(fnName) {
        if (!log[fnName]) {
          fnName = 'log'
        }

        var boundLog = (piercing[fnName] || match) ?
          bindLog(log, fnName, prefix, parentLog)
          : angular.noop;

        logutil.bindLog4js(fnName, boundLog);

        return boundLog;
      }

      return {
        debug: e('debug'),
        info: e('info'),
        log: e('log'),
        warn: e('warn'),
        error: e('error')
      }
    }
  }]).run(function (logFactory) {
    var logLevel1 = logFactory('level 1')
    var logLevel1_1 = logFactory('level 1_1', logLevel1)
    var logLevel1_2 = logFactory('level 1_2', logLevel1)
    var logLevel1_1_1 = logFactory('level 1_1_1', logLevel1_1)
    logLevel1.log('one')
    logLevel1_1.log('two')
    logLevel1_2.log('three')
    logLevel1_1_1.log('four')

    logLevel1.log('one')
    logLevel1_1.info('two')
    logLevel1_2.warn('three')
    logLevel1_1_1.error('four')
    logLevel1_1_1.debug('debug four')
  })

	;