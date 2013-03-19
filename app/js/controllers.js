'use strict';

/* Controllers */

var DEBUGMODE = true;

function HomeCtrl($scope, $log) {
	$log.info('> HomeCtrl');
}


//HomeCtrl.$inject = [$log];


function LogCtrl($scope, $log) {
    $log.log("> LogCtrl");
	$scope.$log = $log;
	$scope.message = 'default logmsg';
	$scope.exception = function (msg) {
		throw {exception: msg};
	}
}

function TreeCtrl($scope, $log) {//logutil
	$log.info('> TreeCtrl');
//	$log.log('logutil: ',logutil);
//	_logutil.inspect('angular');
    $scope.selected = function () {
        $log.info(this.item.name + ' is selected: ' + this.$selected);
    };
    $scope.model = [
        {
            name: '1',
            children: [
                {
                    name: '1.1'
                }, {
                    name: '1.2',
                    children: [
                        {
                            name: '1.2.1',
                            children: [
                                {
                                    name: '1.2.1.1'
                                }, {
                                    name: '1.2.1.2'
                                }
                            ]
                        }, {
                            name: '1.2.1'
                        }
                    ]
                }
            ]
        }
    ];

    $scope.changeTree = function(){
        $log.info("> changeTree: ",$scope.model[0].children[1].name);
        $scope.model[0].children[1].name = "test";
    }

}
//LogCtrl.$inject = [$log];

function DevCtrl($scope, $log){
    $log.info('> DevCtrl');

//    $scope.model = ["str",[666, true]];
//    $scope.model = ["str",{children: [666, true]}];
    $scope.model = [{obj:"test"}];
    $scope.model2 = ["str",[666, true],{obj:0}];
//    $scope.model = [666, true];
/*
  $scope.model = [
    {
      name: '1',
      children: [
        {
          name: '1.1'
        }, {
          name: '1.2',
          children: [
            {
              name: '1.2.1',
              children: [
                {
                  name: '1.2.1.1'
                }, {
                  name: '1.2.1.2'
                }
              ]
            }, {
              name: '1.2.1'
            }
          ]
        }
      ]
    }
  ];*/
}