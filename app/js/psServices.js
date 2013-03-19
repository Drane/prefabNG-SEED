'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.psServices', []).
  value('version', '0.1').
  service('logutil', function ($log) {
    $log.info('in logutil');

    function _getLog4js() {
      if (!log4javascript)return;

      var log4js = log4javascript.getLogger("main") || {};
      var appender = new log4javascript.InPageAppender();
      log4js.addAppender(appender);
      log4js.info('log4javascript active');

      return log4js;
    };

    this.log4js = _getLog4js();
    this.log4js.info('yes');

    this.bindLog4js = function _bindLog4js(logFn, boundLog) {
      return this.log4js[logFn].bind(boundLog);
//      return logFn.bind(this.log4js);
    };
  })
;