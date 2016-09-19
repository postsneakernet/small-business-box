(function () {
    var app = angular.module('sbb', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    });

    app.run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });
})();
