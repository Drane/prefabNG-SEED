/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 3/21/13
 * Time: 1:16 AM
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
;(function(window, undefined) {
	'use strict';
	var prefabUtil = {};
}(this));
//Dynamically load via:


/* http://www.yearofmoo.com/2012/10/more-angularjs-magic-to-supercharge-your-webapp.html#root-scope-and-extending-scope-members

App.run(['$rootScope',function($rootScope) {

	//this will be available to all scope variables
	$rootScope.includeLibraries = true;

	//this method will be available to all scope variables as well
	$rootScope.include = function(libraries) {
		var scope = this;
		//attach each of the libraries directly to the scope variable
		for(var i=0;i<libraries.length;i++) {
			var key = libraries[i];
			scope[key] = getLibrary(key);
		}
		return scope;
	};

}]);
And then inside of your controller or directive you can do the following.

	var Ctrl = function($scope) {
	if($scope.includeLibraries) { //the flag was set in the $rootScope object
		$scope = $scope.include(['plugin1', 'library1']);
	}
};
Ctrl.$inject = ['$scope'];
*/


/* http://stackoverflow.com/questions/950087/include-javascript-file-inside-javascript-file

function loadScript(url, callback)
{
	// adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// then bind the event to the callback function
	// there are several events for cross browser compatibility
	script.onreadystatechange = callback;
	script.onload = callback;

	// fire the loading
	head.appendChild(script);
}
Then you write the code you want to use AFTER the script is loaded in a lambda function :

var myPrettyCode = function() {

	// here, do what ever you want

};
Then you run all that :

	loadScript("my_lovely_script.js", myPrettyCode);
*/