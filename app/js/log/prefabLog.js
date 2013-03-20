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

angular.module('prefabLog', []).

	//.value('logFactory_whiteList', /!|.*Ctrl|run/)
  value('logCfg',{
//	  log: console,
	  allowName: /.*/,
	  allowMethod: {warn: true, error: true}
  }).

  factory('$log', ['logCfg', function (cfg) {
	  'use strict';

	  var log = cfg.log || console;



	  return newLog;
  }]).

/**
 * TESTING
 */
  run(function ($log) {
	  console.info('testing hier');
	  $log.log('log');
	  $log.info('info');
	  $log.warn('warn');
	  $log.error('error');
	  $log.debug('debug');


	  $log.log('init', 'level1');
	  $log.log('init', 'level2');

	  $log.log('log');
	  $log.info('info');
	  $log.warn('warn');
	  $log.error('error');
	  $log.debug('debug');

  });