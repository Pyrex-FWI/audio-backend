'use strict';

angular.module('audioBackendApp').directive('trackdetail', function() {
    return {
        template: '<tr><td>{{track.artist}} - {{track.title}} ({{track.trackId}})</td><td>{{track.score}}</td></tr>',
        restrict: 'E'
    };
});