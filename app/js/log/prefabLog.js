/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/20/13
 * Time: 7:49 PM
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

angular.module('prefabLog', ['psUtil']).

	//.value('logFactory_whiteList', /!|.*Ctrl|run/)
	value('logCfg', {
//	  log: null,
		allowName: /.*/,
		allowMethod: {warn: true, error: true}
	}).

	factory('$log', ['logCfg', 'ps', function (ctx, ps) {
		'use strict';
		ctx = ps.getCtx(arguments, {
			logFn: ['log', 'info', 'warn', 'error', 'debug'],
			log: console,
			out: {}
		});

		function bindConsoleMethods(logFn, prefix) {
			_.each(logFn, function (fn) {
				if(prefix)
					this[fn] = console[fn].bind(console, prefix);
				else
					this[fn] = ps.bindMethod(fn, console);

			}, this);
		}

//		bindConsoleMethods.call(ctx.out, _.rest(ctx.logFn));
		bindConsoleMethods.call(ctx.out, ctx.logFn);

		var wrapper = _.wrap(ctx.out.log, function (logFn) {
			console.log(arguments[1][0]);
			var prefix = _.first(arguments[1]);
			if(prefix==='>'){
				console.log('ahaha');
				if(ctx.out._ctxArray===undefined)
					ctx.out._ctxArray = [];

				var ctxName = arguments[1];//.substr(1);

				ctx.out._ctxArray.push([ctxName, ctx.out.log]);
				return bindConsoleMethods.call(ctx.out, ['log'], ctxName);
			}else if(prefix==='<'){

			}else{
				return logFn.apply(ctx.out,arguments);
			}
		});

		ctx.out.log = wrapper;
		return ctx.out;
	}]).

/**
 * TESTING
 */
	run(function ($log) {
/*

		function extracted(logFn) {
			_.each(logFn, function (fn) {
				this[fn] = _.partial(console[fn].bind(console), 'tester');
			}, this);
		}

		var Log = function () {
			"use strict";
			var logFn = ['log', 'info', 'warn', 'error', 'debug'];

			extracted.call(this, logFn);

//			var tester = _.partial(console.log.bind(console), 'tester');
			this.warn('yo');
//			_.bindAll(this, logFn, )

*/
/*			console.warn(_.at(console, logFn));
			_.each(_.at(console, logFn), function (consoleMethodFromArray) {
					consoleMethodFromArray.bind(console);
			},this);

			var cb = function (method) {
				console.log(method);
				if(console[method]){
					console.log(this);
					this[method] = console[method].bind(console);
				}
			}

			console.log(_.forEach(logFn, cb, this));*//*

//			_.map(logF)

			*/
/*_.assign(this, _.bindAll(console, logFn), cb, this);*//*

		};

		var log = new Log();
*/

		/*log.log('log');
		log.info('info');
		log.warn('warn');
		log.error('error');
		log.debug('debug');*/

/*		var log = {

//			log: _.bindAll(console).,

			_ctxArray: [],
			in: function (ctx) {
				"use strict";

			},
			out: function () {
				"use strict";

			}
		};*/

		console.info('testing hier');

		 $log.log('log');
		 $log.info('info');
		 $log.warn('warn');
		 $log.error('error');
		 $log.debug('debug');

		$log.log('>level1');
		$log.log('in?');
		$log.log('>level2');
		$log.log('in2?');
		/*

		 $log.log('init', 'level1');
		 $log.log('init', 'level2');

		 $log.log('log');
		 $log.info('info');
		 $log.warn('warn');
		 $log.error('error');
		 $log.debug('debug');*/
	});