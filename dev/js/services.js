/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/21/13
 * Time: 9:49 PM
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
angular.module('myApp.services', ['psUtil'])
	.value('logCfg', {
		logger: console
	})
	/*
	.factory('pslog', ['logCfg', 'ps', function (ctx, ps) {

		function testLogging(name, logger, prfx) {
			var prfx = prfx || '';
			console.groupCollapsed('testing "' + name + '" log methods');
			logger[prfx + 'log']('testing log method')
			logger[prfx + 'info']('testing info method');
			logger[prfx + 'warn']('testing warn method');
			logger[prfx + 'error']('testing error method');
			logger[prfx + 'debug']('testing debug method');
			console.groupEnd();
		}

		ctx = ps.getCtx(arguments, {
			logFn: ['log', 'info', 'warn', 'error', 'debug'],
			out: {},
			runTest: function () {
				var idx = 0;
				_.map(ctx.out, function (fn) {
					fn((++idx) + ') calling "' + ctx.logFn[idx - 1] + '"');
				}, this)
			}.bind(ctx),
			_in: function () {
				var ctxName = "[" + arguments[0].substr(1) + "]";
				ctx._ctxArray.push([ctxName, ctx.out]);//_.bindAll(ctx.out)
				*//**
				 * TODO: HIER VERSCHIL TUSSEN GEPUSHTE EN NIEWE CHECKEN
				 * ene zou met prefix moeten zijn ene ene zonder
//				 *//*
//				ps.bindFuncAndParm.call(null, ctx.out, ctx.logFn, console, Array.prototype.slice.call(arguments));
//				//ars in array nu... tss test method hieronder was ok :(
//			},
//			_out: function () {
//				var prevCtx = ctx._ctxArray.pop();
//				console.log('prevCtx:', prevCtx);
//				ctx.out = prevCtx[1];
//			},
//			_ctxArray: []
//		});
//		*//**Remap console, map with logFn prefix*//*
		_.each(ctx.logFn, function (fn) {
			console['_' + fn] = _.bind(console[fn], console);
			console[fn] = _.bind(console[fn], console, '[' + fn + ']');
		});
//		testLogging('_ renamed console', console, '_');
//		testLogging('logFn prefix console', console);

		*//**Map result*//*
		_.each(ctx.logFn, function (fn) {
			ctx.out[fn] = console[fn].bind(console);
		});//testLogging('ctx.out', ctx.out);

		ctx.out.info('dskjfkls');
		ctx._in('[ALALAL]');
		ctx.out.info('dskjfkls');

		ctx._out();
		ctx.out.info('dskjfkls');

		*//*ctx.runTest();
		 console['_info'] = console.info.bind(console,'>');
		 ctx.runTest();*//*


		return ctx.out;
	}])
*/
	.factory('pslog', ['ps', function (ps) {

		var doInOut = function (wrappedFn) {
			var pfx = arguments[1];
			if(pfx.substr(0,1)==='>')
				logger.in(pfx.substr(1));
			else if(pfx.substr(0,1)==='<')
				logger.out(pfx.substr(1));
//			else
				return wrappedFn(arguments[1]);
		}

		var bindConsole = function (logFn) {
			return console['log'].bind(console,'['+logFn+']');
		}

		var getLog = function (logFn) {
			return _.wrap(bindConsole, doInOut);
		}

		var logger = {
			log: getLog('log'),
			_ctx:[],
			in: function (pfx) {
				this._ctx.push(this.log);
				this.log = this.log.bind(this, pfx);
			},
			out: function () {
				this.log = this._ctx.pop();
			}
		};

		return logger;
	}])

	.run(['pslog', function (pslog) {
		pslog.log('A');
		pslog.in('P1');
		pslog.log('A');
		pslog.in('P2');
		pslog.log('A');
		pslog.in('P3');
		pslog.log('A');
		pslog.out();
		pslog.log('B');
		pslog.out();
		pslog.log('B');
		pslog.out();
		pslog.log('B');
	}])
;