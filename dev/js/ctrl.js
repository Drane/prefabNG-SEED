/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/21/13
 * Time: 9:25 PM
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

function DevCtrl($scope, $log) {
	$log.log("> DevCtrl");

//	$scope.$log = $log;
}

function LogCtrl($scope, $log, pslog) {
	$log.log("> LogCtrl");

	$scope.$log = pslog;
	$scope.message = 'default log msg';
	$scope.exception = function (msg) {
		throw {exception: msg};

	}
}