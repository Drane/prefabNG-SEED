/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/18/13
 * Time: 9:47 PM
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

/**
 * Tests for psTree
 */

describe('psTree', function () {
	var elm, scope;

	//load the psTree module
	beforeEach(module('myApp.directives'));

	beforeEach(inject(function ($rootScope, $compile) {
		elm = angular.element('<ul ps-tree="model">\n  <li>{{item}}</li>\n</ul>');

		scope = $rootScope;
		scope.model = ["str",[666, true]];
		$compile(elm)(scope);
		scope.$digest();
	}));

it('should hold four li items', inject(function($compile, $rootScope){
//	console.log('elm:', elm);
	var ul = elm.find('li');
//	console.log('ul:', ul);

	expect(ul.length).toBe(4);
}))

});