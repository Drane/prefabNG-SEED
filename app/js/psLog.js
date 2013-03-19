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
  config(function ($provide) {

    /**
     * TODO: services.js en app2.js code inbrengen zodat hirarchiesche logging mogelijk is
     * derna de filtering dan
     * dan log 4 js (of ervoor mss)
     * en groupen
     * dan inspecten
     * /


//    var piercingMethod = {warn: true, error: true};
//    var whiteList = /.*/;

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

      angular.forEach($delegate, function logFnIterator(value, key) {
        replacedLog[key] = mapLogFnToLog(key);
      });

      return replacedLog;
    }

    $provide.decorator('$log', function ($delegate) {
      console.log('in decorator');

      return replaceLog($delegate);
    });
  }).

/**
 * TESTING
 */
  run(function ($log) {
    console.info('testing hier');
    $log.log('log')
    $log.info('info')
    $log.warn('warn')
    $log.error('error')
    $log.debug('debug')

  });