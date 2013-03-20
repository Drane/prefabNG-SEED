/**
 * Created with JetBrains WebStorm.
 * User: jochen
 * Date: 20/03/13
 * Time: 17:09
 * To change this template use File | Settings | File Templates.
 */
angular.module('psUtil', []).
service('prefab',function(){
    this.include = function($rootScope) {
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
    };

    this.addArg = function(args, extra){
      return Array.prototype.slice.call(Array.prototype.slice.call(args)).push(extra);
    };
});