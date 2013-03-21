/**
 * Idea: create global function storing used module list (for require etc) in browser storage
 */
angular.module('psUtil', []).
	factory('ps', function () {
		"use strict";
		console.log('ps');

		var _bind = Function.prototype.call.bind;
		var _slice = Function.prototype.call.bind(Array.prototype.slice);
		var _shift = Function.prototype.call.bind(Array.prototype.shift);
		var _unshift = Function.prototype.call.bind(Array.prototype.unshift);
		var _push = Function.prototype.call.bind(Array.prototype.push);
		var _pop = Function.prototype.call.bind(Array.prototype.pop);
		var _pop = Function.prototype.call.bind(Array.prototype.pop);

		function _getCtx() {
			console.log('getCtx arguments', arguments);
			var arg = Array.prototype.slice.call(arguments);
			var ctx = arg.shift()[0];
			var def = arg.shift();
//		  var ctx = Array.prototype.slice.call(ctx);

			console.log('ctx:', ctx, ' def: ', def);

			var result = angular.extend(def, ctx);
			console.log('result:', result);

			return result;
		};

		function _bindConsoleMethods(logFn) {
			_.each(logFn, function (fn) {
				this[fn] = console[fn].bind(console);
			}, this);
		};

		function _bindMethod(fn, src) {
			var fn = _shift(arguments);
			var src = _shift(arguments);

			return _bind.apply(src[fn],[src].concat(_slice(arguments)));
		}

		return {
			getCtx: _getCtx,
			bindConsoleMethods: _bindConsoleMethods,
			bindMethod: _bindMethod
		};
	})
;