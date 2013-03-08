'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
	factory('logutil', function($log) {

		$log.info('myApp.services > logutil');

		var _logutil = {};

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
			var args = ["[PS-LOG]"];
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
			$log.log.apply(console, args);
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
					$log.log(repeat(">", indent), prop + "." + name, slice(arguments, 1));
				},
				post: function(result, name) {
					// Log the result.
					$log.log(repeat("<", indent), "(" + prop + "." + name + ")", result);
					indent = Math.max(0, indent - 1);
				}
			});
			_logutil.log('Inspecting "%s" methods: %o', prop, methods);
		};

		// Repeat a string n times.
		function repeat(str, n) {
			return Array(n + 1).join(str);
		}


		return _logutil; // returning this is very important
	})
	;
