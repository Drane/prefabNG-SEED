'use strict';

var _logutil = {};
var indent = 0;

// Binding Array#slice to Function#call allows slice(arrayLikeObject) to
// return an array.
var slice = Function.call.bind([].slice);
// Binding Object#toString to Function#call allows toString(value) to
// return an "[object [[Class]]]" string.
var toString = Function.call.bind({}.toString);

_logutil.log = function() {
	// Abort if logging disabled.
	if (!_logutil.log.enabled) { return; }
	// Build array of arguments, converting any Arguments object passed into
	// an array.
	var args = ["[PS-INSPECT]"];
	for (var i = 0; i < arguments.length; i++) {
		if (toString(arguments[i]) === "[object Arguments]") {
			// Convert Arguments object into an array for prettier logging.
			args = args.concat(slice(arguments[i]));
		} else if (i === 0 && typeof arguments[i] === "string") {
			// Concatenate 1st string argument to existing "[PS-LOG]" string so
			// printf-style formatting placeholders work.
			args[0] = args[0] + " " + arguments[0];
		} else {
			// Just push argument onto array.
			args.push(arguments[i]);
		}
	}
	// Actually log.
	console.log.apply(console, args);
};

// Enable logging by default.
_logutil.log.enabled = true;

_logutil.inspect = function(context, prop){
	// If context was omitted, default to window.
	if (typeof context === "string") {
		prop = context;
		context = window;
	}

	// The object to be inspected.
	var obj = context[prop];

	var methods = hook(obj, {
		passName: true,
		pre: function(name) {
			indent++;
			// Log arguments the method was called with.
			_logutil.log(repeat("|-"+indent+"-"+name+"->", indent), prop + "." + name, slice(arguments, 1));
		},
		post: function(result, name) {
			// Log the result.
			_logutil.log(repeat("<-"+indent+"-"+name+"-|", indent), "(" + prop + "." + name + ")", result);
			indent = Math.max(0, indent - 1);
		}
	});
	_logutil.log('Inspecting "%s" methods: %o', prop, methods);
};

// Repeat a string n times.
function repeat(str, n) {
	return Array(n + 1).join(str);
}

//_logutil.inspect(this,'angular');
//_logutil.inspect(this,'angular.module');
// New injector is created from the module.
// (This is usually done automatically by angular bootstrap)
//var injector = angular.injector(['myApp', 'ng']);


// _logutil.inspect(this,'angular');Declare app level module which depends on filters, and services
//'ui.bootstrap'
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','angularTree']);
 _logutil.inspect(this,"app");
app.
	config(['$routeProvider', function ($routeProvider) {
//		$log.info('myApp > $routeProvider');
		$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
		$routeProvider.when('/logging', {templateUrl: 'partials/logging.html', controller: LogCtrl});
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);