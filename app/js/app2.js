/**
 * Created with JetBrains WebStorm.
 * User: jochen
 * Date: 19/03/13
 * Time: 11:51
 * To change this template use File | Settings | File Templates.
 */

angular.module('myApp', ['myApp.services']).

  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/logging', {templateUrl: 'partials/logging.html', controller: LogCtrl});
    $routeProvider.otherwise({redirectTo: '/logging'});
  }]).

/**
 * $log decorator
 */
  config(function ($provide) {

    function _getLog4js() {
      if(!log4javascript)return;

      var log4js = log4javascript.getLogger("main") || {};
      var appender = new log4javascript.InPageAppender();
      log4js.addAppender(appender);
      log4js.info('log4javascript active');

      return log4js;
    };



    $provide.decorator('$log', function ($delegate, $sniffer) {

      console.log('in decorator');

      var result = {};
//      var logLevel1 = logFactory('level 1');
      var log4js = _getLog4js();

      angular.forEach($delegate, function (value, key) {
        result[key] = function(){
//            value.apply($delegate, arguments);
            log4js[key].apply(log4js, arguments);//.bind(log4js);
            console[key].apply(console, arguments);//.bind(console);
        }
      });

      return result;
    });
  });
