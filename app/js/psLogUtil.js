/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/8/13
 * Time: 8:57 PM
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

//(function (hook) {
(function(exports) {
	'use strict';
	DEBUGMODE = true;

	console.log(exports);

	var _psLogUtil = {};
	var indent = 0;

// Binding Array#slice to Function#call allows slice(arrayLikeObject) to
// return an array.
	var slice = Function.call.bind([].slice);
// Binding Object#toString to Function#call allows toString(value) to
// return an "[object [[Class]]]" string.
	var toString = Function.call.bind({}.toString);

	_psLogUtil.log = function () {
		// Abort if logging disabled.
		if (!_psLogUtil.log.enabled) {
			return;
		}
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
		_log(args);
	};

// Enable logging by default.
	_psLogUtil.log.enabled = true;

	_psLogUtil.inspect = function (context, prop) {
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
				// Log arguments the method was called with.
				_psLogUtil.log(repeat("|-" + indent + "-" + name + "->", indent), prop + "." + name, slice(arguments, 1));
			},
			post: function (result, name) {
				// Log the result.
				_psLogUtil.log(repeat("<-" + indent + "-" + name + "-|", indent), "(" + prop + "." + name + ")", result);
				indent = Math.max(0, indent - 1);
			}
		});
		_psLogUtil.log('Inspecting "%s" methods: %o', prop, methods);
	};

// Repeat a string n times.
	function repeat(str, n) {
		return Array(n + 1).join(str);
	}

	exports.psLogUtil = _psLogUtil;

//})(log4javascript, angular);
}(typeof exports === "object" && exports || this));