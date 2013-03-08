'use strict';

/* Controllers */


function HomeCtrl($scope, $log) {
	$log.info('> HomeCtrl');
}


//HomeCtrl.$inject = [$log];


function LogCtrl($log, logutil) {
	$log.info('> LogCtrl');
	$log.log('logutil: ',logutil);
	_logutil.inspect('angular');

}

function TreeCtrl($scope, $log, logutil) {
	$log.info('> TreeCtrl');
//	$log.log('logutil: ',logutil);
//	_logutil.inspect('angular');
    $scope.selected = function () {
        $log.info(this.item.name + ' is selected: ' + this.$selected);
    };
    $scope.model = [
        {
            name: 'Item 1 Name',
            children: [
                {
                    name: 'Item 2 Name'
                }, {
                    name: 'Item 3 Name',
                    children: [
                        {
                            name: 'Item 2 Name',
                            children: [
                                {
                                    name: 'Item 2 Name'
                                }, {
                                    name: 'Item 3 Name'
                                }
                            ]
                        }, {
                            name: 'Item 3 Name'
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
