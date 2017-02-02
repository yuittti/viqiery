'use strict';

function autoscrollContent($window, DataService){
    var $win = angular.element($window);
    return {
        restrict: 'A',
        scope: {
            loadMore: '&'
        },
        link: function(scope, element, attrs) {
            $win.on('scroll', function(e){
                var scrollPos = $(document).scrollTop(),
                    winHeight = $($win).height(),
                    docHeight = $(document).height(),
                    waitScroll = docHeight - winHeight;

                if (scrollPos >= waitScroll-winHeight) {
                    scope.loadMore();
                }
            });
        }
    }
};