'use strict';

function MainCtrl($scope, DataService, $window) {
	var vm = this;
	vm.searchInput = '';
	vm.topics = [];
	vm.choosedTopics = [];

	// todo: convert into directive
	angular.element(document).ready(function () {
		var predefTopics = [];
		if ($window.vsnlPredefTopic && $window.vsnlPredefTopic.hasOwnProperty('slug')) {
			predefTopics.push($window.vsnlPredefTopic);
			$scope.$apply(function(){
				vm.choosedTopics = predefTopics;
			});
		} else {
			vm.choosedTopics = [];
		}
	});

	vm.search = function(){
		if (vm.searchInput && vm.searchInput.length >= 3) {
			DataService.searchTopics(vm.searchInput).then(function(data){
				vm.topics = data;
				vm.topics = [];
				data.forEach(function(el,i){
					if (!isInChoosed(el.slug)) {
						vm.topics.push(el);
					}
				});
			});
		} else {
			vm.topics = [];
		};
	};

	vm.check = function(topic){
		if (isInChoosed(topic.slug)){
			vm.choosedTopics = removeFromChoosed(topic.slug);
		} else {
			vm.choosedTopics.push(topic);
		}
		vm.topics = [];
		vm.searchInput = '';
		console.log('CLEAR');
	};

	function isInChoosed(slug) {
		var arr = [];
		if (vm.choosedTopics && vm.choosedTopics.length > 0 && slug && slug.length > 0) {
			arr = vm.choosedTopics.filter(function(el,i){
				return slug == el.slug;
			});
		}
		return arr.length;
	};

	function removeFromChoosed(slug) {
		var arr = [];
		vm.choosedTopics.forEach(function(el,i){
			if (slug != el.slug) {
				arr.push(el);
			}
		});
		vm.choosedTopics = arr;
		return arr;
	};

	vm.removeFromChoosed = removeFromChoosed;
	vm.isInChoosed = isInChoosed;

};