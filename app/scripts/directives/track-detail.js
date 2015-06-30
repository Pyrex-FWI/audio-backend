'use strict';

angular.module('audioBackendApp').directive('trackDetail', function() {
    return {
        //template: '<tr ng-repeat="track in ><td>{{track.artist}} - {{track.title}} ({{track.trackId}})</td><td>{{track.score}}</td></tr>',
        templateUrl: 'views/directives/track-detail.html',

        restrict: 'E'
    };
});