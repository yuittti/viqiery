'use strict';

function QuestionsCtrl($scope, DataService, $window, $timeout) {
    $scope.questions = [];
    $scope.msnrLoaded = false;
    $scope.loadMore = loadMore;
    $scope.loading = false;
    $scope.firstLoad = true;
    var winScrollPos = 0;

    $scope.msnry = new Masonry('#qCardsGrid1', {
        itemSelector: ".question-card",
        columnWidth: ".q-cards-sizer",
        gutter: 0,
        percentPosition: true,
        transitionDuration: '0.2s',
        stagger: 30
    });

    // init first loading by the same function
    $scope.loadMore();

    function loadMore(){
        if ($scope.loading) {
            return false;
        }

        $scope.msnrLoaded = false;
        $scope.loading = true;

        DataService.getQuestions().then(function(data){
            addData(data);
        });
    };

    function addData(data) {
        winScrollPos = $(window).scrollTop();
        $scope.msnrLoaded = false;

        $('body').addClass('__loading');
        data.questions = data.questions.filter(function(el,i){
            if (el.answer && angular.isDefined(el.answer)) {
                if (el.answer.media && angular.isDefined(el.answer.media)) {
                    return (el.answer.media.indexOf('gif') == -1);
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });

        $scope.questions = $scope.questions.concat(data.questions);

        $scope.questions.forEach(function(el,i){
            var imgsArr = [];
            if (el.answer && angular.isDefined(el.answer)) {

                if (el.answer.media && angular.isDefined(el.answer.media) && el.answer.media.indexOf('gif') == -1) {

                    var img = new Image();
                    img.onload = function() {
                        imgsArr.push("http://dev1.visinly.com/media/thumb?file=" + el.answer.media);
                        var isLastItem = ($scope.questions.length - i) == 1;
                        addToMsnryGrid(isLastItem);
                    }
                    img.src = "http://dev1.visinly.com/media/thumb?file=" + el.answer.media;
                }
            }
        });
    };

    function addToMsnryGrid(isLastItem){
        if (angular.isDefined($scope.msnry)) {
            $timeout(function() {
                $scope.msnry.reloadItems();
            }, 100);
        }
        if (isLastItem) {
            if (angular.isDefined($scope.msnry)) {
                $scope.msnry.destroy();
            }
            $timeout(function(){
                $scope.msnry = new Masonry('#qCardsGrid1', {
                    itemSelector: ".question-card",
                    //columnWidth: ".q-cards-sizer",
                    gutter: 0,
                    percentPosition: true,
                    transitionDuration: '0.2s',
                    stagger: 30
                }, 2000);

                $scope.msnrLoaded = true;
                $scope.loading = false;
                $('body').removeClass('__loading');
                $(window).scrollTop(winScrollPos);
                $scope.firstLoad = false;
            },100);
        }
    };
};