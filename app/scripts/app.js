'use strict';

/**
 * @ngdoc overview
 * @name audioBackendApp
 * @description
 * # audioBackendApp
 *
 * Main module of the application.
 */
angular
    .module('audioBackendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.sortable',
        'LocalStorageModule',
        'restangular'
    ])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/ddp', {
                templateUrl: 'views/ddp.html',
                controller: 'DdpCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function (RestangularProvider) {
        //RestangularProvider.setBaseUrl('http://ana/audio/web/app_dev.php/api/');
        RestangularProvider.setBaseUrl('http://127.0.0.1:8000/api/');

        RestangularProvider.setRequestInterceptor(function (elem, operation) {

            if (operation === 'put') {
                elem.id = undefined;
                return elem;
            }
            return elem;
        });
        // Hydra collections support
        RestangularProvider.addResponseInterceptor(function (data, operation) {
            // Remove trailing slash to make Restangular working
            function populateHref(data) {
                if (data['@id']) {
                    data.href = data['@id'].substring(1);
                }
            }

            // Populate href property for the collection
            populateHref(data);

            if ('getList' === operation) {
                var collectionResponse = data['hydra:member'];
                collectionResponse.metadata = {};

                // Put metadata in a property of the collection
                angular.forEach(data, function (value, key) {
                    if ('hydra:member' !== key) {
                        collectionResponse.metadata[key] = value;
                    }
                });

                // Populate href property for all elements of the collection
                angular.forEach(collectionResponse, function (value) {
                    populateHref(value);
                });

                return collectionResponse;
            }

            return data;
        });
    });
