'use strict';

(function() {
	angular.module('visinly-topic', ['ngSanitize']);

	angular.module('visinly-topic').config(config);

	angular.module('visinly-topic')
		.run(function ($rootScope, $timeout, $window) {
			console.log($window);
		});

	angular.module('visinly-topic')
		.controller('MainCtrl', MainCtrl)
		.controller('QuestionsCtrl', QuestionsCtrl)
		.directive('autoscrollContent', autoscrollContent)
		.factory('DataService', DataService);

	function config($sceDelegateProvider){
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'http://dev3.visinly.com/**',
			'http://dev3.visinly.com/api/topics'
		]);
	}
})();