'use strict';
DEBUGMODE = true;
//_logutil.inspect(this,'angular');
//_logutil.inspect(this,'angular.module');
// New injector is created from the module.
// (This is usually done automatically by angular bootstrap)
//var injector = angular.injector(['myApp', 'ng']);



// Declare app level module which depends on filters, and services
//'ui.bootstrap'
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','angularTree']);
//_log.inspect(this,'angular');
//_log.inspect(this,"app");
app.
	config(['$routeProvider', function ($routeProvider) {
//		$log.info('myApp > $routeProvider');
		$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
		$routeProvider.when('/logging', {templateUrl: 'partials/logging.html', controller: LogCtrl});
		$routeProvider.when('/tree', {templateUrl: 'partials/tree.html', controller: TreeCtrl});
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);