(function () {
    var app = angular.module('sbb', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    });

    app.run(function ($rootScope, $state, $http) {
        $rootScope.$state = $state;

        (function () {
            $http.get("http://localhost:5000").then( function (response) {
                $rootScope.endpoints = response.data.versions;
            });
        })();

        // temp
        $rootScope.currentUser = {
            message_url: "http://localhost:5000/v1/employees/1/messages/",
            id: 1
        };

    });
})();
