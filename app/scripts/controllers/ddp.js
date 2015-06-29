'use strict';

/**
 * @ngdoc function
 * @name audioBackendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the audioBackendApp
 */

angular.module('audioBackendApp')
    .controller('DdpCtrl', function ($scope, Restangular) {
        $scope.tracks = Restangular.all("tracks").getList().$object;
    });