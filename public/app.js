(function iife(){
    var app = angular.module("myChatApp",['ngRoute','ngCookies','ngSanitize']);
    app.config(config)
    app.run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$cookiesProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/chat', {
                controller: 'chatController',
                templateUrl: './templates/userchats.html'
            })

            .when('/login', {
                controller: 'loginCtrl',
                templateUrl: './templates/userlogin.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }
    run.$inject = ['$rootScope', '$location', '$http'];
    function run($rootScope, $location, $http) {
                $location.path('/login');
    }
})();