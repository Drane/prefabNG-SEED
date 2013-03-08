/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/7/13
 * Time: 10:24 PM
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

var cfg = {overrideConsole: false};
var log = log4javascript.getLogger("main");
var appender = new log4javascript.InPageAppender();
log.addAppender(appender);
log.info('log4javascript active');

var originalConsole = {
	log : console.log,
	info : console.info,
	warn : console.warn,
	error : console.error,
	dir : console.dir,
	time : console.time,
	timeEnd : console.timeEnd,
	trace : console.trace,
	assert : console.assert
}

angular.forEach(originalConsole, function (value, key) {
	if(log[key]){
		console['_'+key] = value;
		console[key] = function () {
			log[key].apply(log, arguments);
			if(!cfg.overrideConsole){
				console['_'+key].apply(console, arguments);
			}
		};
	}else{
		log[key] = console[key];
	}
})