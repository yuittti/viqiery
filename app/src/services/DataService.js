'use strict';

function DataService($q, $http){
	var DataService = {
		page: 0,
		itemsCount: 0,
		foundTopics: [],
		questions: []
	};

	DataService.searchTopics = function(search){
		var dfd = $q.defer();

		$http
			.get('http://dev3.visinly.com/api/topics',{
				params:  {search: search}
			})
			.then(function(response){
				DataService.foundTopics = response.data;
				dfd.resolve(DataService.foundTopics);
			});
		return dfd.promise;
	};

	DataService.getQuestions = function() {
		var dfd = $q.defer();
		DataService.page += 1;
		DataService.itemsCount = 15;

		$http
			.get('http://dev1.visinly.com/ajax/getasks/?page=' + DataService.page + '&count=' + DataService.itemsCount)
			.then(function(response){
				DataService.questions = response.data;
				dfd.resolve(DataService.questions);
			});
		return dfd.promise;
	};

	return DataService;
}