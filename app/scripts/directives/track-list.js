'use strict';

angular.module('audioBackendApp').directive('trackList', function() {
    return {
        templateUrl: 'views/directives/track-list.html',
        restrict: 'E',
        scope: {
            tracks: '=list'
        }
    };
});