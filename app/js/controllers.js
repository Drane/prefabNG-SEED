'use strict';

/* Controllers */


function HomeCtrl($scope, $log) {
	$log.info('> HomeCtrl');
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
}
//HomeCtrl.$inject = [$log];


function LogCtrl($log, logutil) {
	$log.info('> LogCtrl');
	$log.log('logutil: ',logutil);
	_logutil.inspect('angular');

}
//LogCtrl.$inject = [$log];
