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
			in: function () {
				ps.bindFuncAndParm.apply(this, ctx.out, ctx.logFn, console,arguments);
			}
		});
		/**Remap console, map with logFn prefix*/
		_.each(ctx.logFn, function (fn) {
			console['_' + fn] = _.bind(console[fn], console);
			console[fn] = _.bind(console[fn], console, '[' + fn + ']');
		});
//		testLogging('_ renamed console', console, '_');
//		testLogging('logFn prefix console', console);

		/**Map result*/
		_.each(ctx.logFn, function (fn) {
			ctx.out[fn] = console[fn].bind(console);
		});//testLogging('ctx.out', ctx.out);

		ctx.out.info('dskjfkls');
		ctx.in('[ALALAL]','[ALALAL]');


		ctx.out.info('dskjfkls');

		/*ctx.runTest();
		 console['_info'] = console.info.bind(console,'>');
		 ctx.runTest();*/


		return ctx.out;
	}])
;