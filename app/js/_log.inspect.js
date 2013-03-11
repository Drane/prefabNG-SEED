/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/8/13
 * Time: 9:31 PM
 * Copyright (C) 2013 Jochen Szostek
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/*! JavaScript Hooker - v0.2.3 - 1/22/2012
 * http://github.com/cowboy/javascript-hooker
 * Copyright (c) 2012 "Cowboy" Ben Alman; Licensed MIT */

(function(exports) {
	// Get an array from an array-like object with slice.call(arrayLikeObject).
	var slice = [].slice;
	// Get an "[object [[Class]]]" string with toString.call(value).
	var toString = {}.toString;

	// I can't think of a better way to ensure a value is a specific type other
	// than to create instances and use the `instanceof` operator.
	function HookerOverride(v) { this.value = v; }
	function HookerPreempt(v) { this.value = v; }
	function HookerFilter(c, a) { this.context = c; this.args = a; }

	// When a pre- or post-hook returns the result of this function, the value
	// passed will be used in place of the original function's return value. Any
	// post-hook override value will take precedence over a pre-hook override
	// value.
	exports.override = function(value) {
		return new HookerOverride(value);
	};

	// When a pre-hook returns the result of this function, the value passed will
	// be used in place of the original function's return value, and the original
	// function will NOT be executed.
	exports.preempt = function(value) {
		return new HookerPreempt(value);
	};

	// When a pre-hook returns the result of this function, the context and
	// arguments passed will be applied into the original function.
	exports.filter = function(context, args) {
		return new HookerFilter(context, args);
	};

	// Execute callback(s) for properties of the specified object.
	function forMethods(obj, props, callback) {
		var prop;
		if (typeof props === "string") {
			// A single prop string was passed. Create an array.
			props = [props];
		} else if (props == null) {
			// No props were passed, so iterate over all properties, building an
			// array. Unfortunately, Object.keys(obj) doesn't work everywhere yet, so
			// this has to be done manually.
			props = [];
			for (prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					props.push(prop);
				}
			}
		}
		// Execute callback for every method in the props array.
		var i = props.length;
		while (i--) {
			// If the property isn't a function...
			if (toString.call(obj[props[i]]) !== "[object Function]" ||
				// ...or the callback returns false...
				callback(obj, props[i]) === false) {
				// ...remove it from the props array to be returned.
				props.splice(i, 1);
			}
		}
		// Return an array of method names for which the callback didn't fail.
		return props;
	}

	// Monkey-patch (hook) a method of an object.
	exports.hook = function(obj, props, options) {
		// If the props argument was omitted, shuffle the arguments.
		if (options == null) {
			options = props;
			props = null;
		}
		// If just a function is passed instead of an options hash, use that as a
		// pre-hook function.
		if (typeof options === "function") {
			options = {pre: options};
		}

		// Hook the specified method of the object.
		return forMethods(obj, props, function(obj, prop) {
			// The original (current) method.
			var orig = obj[prop];
			// The new hooked function.
			function hooked() {
				var result, origResult, tmp;

				// Get an array of arguments.
				var args = slice.call(arguments);

				// If passName option is specified, prepend prop to the args array,
				// passing it as the first argument to any specified hook functions.
				if (options.passName) {
					args.unshift(prop);
				}

				// If a pre-hook function was specified, invoke it in the current
				// context with the passed-in arguments, and store its result.
				if (options.pre) {
					result = options.pre.apply(this, args);
				}

				if (result instanceof HookerFilter) {
					// If the pre-hook returned hooker.filter(context, args), invoke the
					// original function with that context and arguments, and store its
					// result.
					origResult = result = orig.apply(result.context, result.args);
				} else if (result instanceof HookerPreempt) {
					// If the pre-hook returned hooker.preempt(value) just use the passed
					// value and don't execute the original function.
					origResult = result = result.value;
				} else {
					// Invoke the original function in the current context with the
					// passed-in arguments, and store its result.
					origResult = orig.apply(this, arguments);
					// If the pre-hook returned hooker.override(value), use the passed
					// value, otherwise use the original function's result.
					result = result instanceof HookerOverride ? result.value : origResult;
				}

				if (options.post) {
					// If a post-hook function was specified, invoke it in the current
					// context, passing in the result of the original function as the
					// first argument, followed by any passed-in arguments.
					tmp = options.post.apply(this, [origResult].concat(args));
					if (tmp instanceof HookerOverride) {
						// If the post-hook returned hooker.override(value), use the passed
						// value, otherwise use the previously computed result.
						result = tmp.value;
					}
				}

				// Unhook if the "once" option was specified.
				if (options.once) {
					exports.unhook(obj, prop);
				}

				// Return the result!
				return result;
			}
			// Re-define the method.
			obj[prop] = hooked;
			// Fail if the function couldn't be hooked.
			if (obj[prop] !== hooked) { return false; }
			// Store a reference to the original method as a property on the new one.
			obj[prop]._orig = orig;
		});
	};

	// Get a reference to the original method from a hooked function.
	exports.orig = function(obj, prop) {
		return obj[prop]._orig;
	};

	// Un-monkey-patch (unhook) a method of an object.
	exports.unhook = function(obj, props) {
		return forMethods(obj, props, function(obj, prop) {
			// Get a reference to the original method, if it exists.
			var orig = exports.orig(obj, prop);
			// If there's no original method, it can't be unhooked, so fail.
			if (!orig) { return false; }
			// Unhook the method.
			obj[prop] = orig;
		});
	};
}(typeof exports === "object" && exports || this));

(function(_log, exports) {
		if(exports.DEBUGMODE===undefined)
				exports.DEBUGMODE = false;

		var Log = Error; // does this do anything?  proper inheritance...?
		Log.prototype.write = function (args, method) {
			/// <summary>
			/// Paulirish-like console.log wrapper.  Includes stack trace via @fredrik SO suggestion (see remarks for sources).
			/// </summary>
			/// <param name="args" type="Array">list of details to log, as provided by `arguments`</param>
			/// <param name="method" type="string">the console method to use:  debug, log, warn, info, error</param>
			/// <remarks>Includes line numbers by calling Error object -- see
			/// * http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
			/// * http://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
			/// * http://stackoverflow.com/a/3806596/1037948
			/// </remarks>
			// via @fredrik SO trace suggestion; wrapping in special construct so it stands out
			var suffix =
				"@ "+ (this.lineNumber
					? this.fileName + ':' + this.lineNumber + ":1" // add arbitrary column value for chrome linking
					: extractLineNumberFromStack(this.stack)
					)
			;

//			args.push(suffix);

//			args.shift("%o %s");
			// via @paulirish console wrapper
			if (console && console[method]) {
				if (console[method].apply) { console[method].apply(console, args); } else { console[method](args); } // nicer display in some browsers
			}
			args.toString()+suffix;
			console.groupCollapsed.apply(console, [suffix]);
		};
		var extractLineNumberFromStack = function (stack) {
			/// <summary>
			/// Get the line/filename detail from a Webkit stack trace.  See http://stackoverflow.com/a/3806596/1037948
			/// </summary>
			/// <param name="stack" type="String">the stack string</param>

			// correct line number according to how Log().write implemented
			var line = stack.split('\n')[4];
			// fix for various display text
			line = (line.indexOf(' (') >= 0
				? line.split(' (')[1].substring(0, line.length - 1)
				: line.split('at ')[1]
				);
			return line;
		};

		// method builder
		var logMethod = function(method) { return function (params) {
			/// <summary>
			/// Paulirish-like console.log wrapper
			/// </summary>
			/// <param name="params" type="[...]">list your logging parameters</param>

			// only if explicitly true somewhere
			if (typeof DEBUGMODE === typeof undefined || !DEBUGMODE) return;

			// call handler extension which provides stack trace
			Log().write(Array.prototype.slice.call(arguments, 0), method); // turn into proper array & declare method to use
		};//--  fn  logMethod
		};
		var _psLogUtil = logMethod('inspect'); // base for backwards compatibility, simplicity
		// add some extra juice
	_psLogUtil['inspect'] = logMethod('inspect');



		var _psLogUtil = {};
		var indent = 0;
		var currentGroupName;

// Binding Array#slice to Function#call allows slice(arrayLikeObject) to
// return an array.
		var slice = Function.call.bind([].slice);
// Binding Object#toString to Function#call allows toString(value) to
// return an "[object [[Class]]]" string.
		var toString = Function.call.bind({}.toString);

		_psLogUtil.log = function () {
			// Build array of arguments, converting any Arguments object passed into
			// an array.
			var args = ["%c[PS-INSPECT]"];
			for (var i = 0; i < arguments.length; i++) {
				if (toString(arguments[i]) === "[object Arguments]") {
					// Convert Arguments object into an array for prettier logging.
					args = args.concat(slice(arguments[i]));
				} else if (i === 0 && typeof arguments[i] === "string") {
					// Concatenate 1st string argument to existing "[PS-INSPECT]" string so
					// printf-style formatting placeholders work.
					args[0] = args[0] + " " + arguments[0];
				} else {
					// Just push argument onto array.
					args.push(arguments[i]);
				}
			}
			// Actually log.
			Log().write.apply(Log(), [args,'log']);
		};

	_psLogUtil.inspect = function (context, prop) {
		// Abort if logging disabled.
		if (typeof DEBUGMODE === typeof undefined || !DEBUGMODE) return;
			// If context was omitted, default to window.
			if (typeof context === "string") {
				prop = context;
				context = window;
			}

			// The object to be inspected.
			var obj = context[prop];

			var methods = hook(obj, {
				passName: true,
				pre: function (name) {
					indent++;
					arguments[0] = "[PRE]|" + indent + repeat("-", indent-1)+ "->"+ prop + "." + name+"(";
					var args = Array.prototype.slice.call(arguments);
					args.push(')');
					// Log arguments the method was called with.
					console.groupCollapsed.apply(console, args);
				},
				post: function (result, name) {
					console.groupEnd();
					// Log the result.
					console.log("%c[POST]<"+ indent +repeat("-", indent-1)+"|"+ prop + "." + name + " returns: ","font-weight: bold", result);
					indent = Math.max(0, indent - 1);
					if(indent==0)
						console.groupEnd();
				}
			});
			_psLogUtil.log('Inspecting "%s" methods: %o', "font-weight: bold", prop, methods);
		};

// Repeat a string n times.
		function repeat(str, n) {
			return Array(n + 1).join(str);
		}

		exports._log = (exports._log || {});
		exports._log['inspect'] = _psLogUtil.inspect;

}(_log, typeof exports === "object" && exports || this));

/**
 * testing inspect
 */
//DEBUGMODE = true;
if(DEBUGMODE){
	var interestingObjectToInspect = {
		doNothing: function(number){
			console.log('doing nothing with '+number);
			return {a: number, b: "returningThis"};
		},
		doInterestingStuff: function (number) {
			if(number==663)
				return this.doNothing(number).b+"Too";

			console.log('interestingObjectToInspect doing interesting stuff with '+number);
			if(number>660)
				interestingObjectToInspect.doInterestingStuff(number-1);

			return number+1;
		}
	};

	_log.inspect("interestingObjectToInspect");

	interestingObjectToInspect.doInterestingStuff(666,666);
	interestingObjectToInspect.doInterestingStuff([666,666]);
}
DEBUGMODE = false;