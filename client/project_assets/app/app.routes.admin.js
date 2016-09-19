(function () {
    var app = angular.module('sbb');

    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                views: {
                    nav: {
                        templateUrl: 'app/shared/nav/admin.html'
                    },
                    '': {
                        templateUrl: 'app/shared/content.html'
                    }
                }
            })
            .state('admin.dashboard', {
                url: '/dashboard',
                template: '<h1>Dashboard</h1>'
            })
            .state('admin.messages', {
                url: '/messages',
                template: '<h1>Messages</h1>'
            })
            .state('admin.departments', {
                url: '/departments',
                template: '<h1>Departments</h1>'
            })
            .state('admin.employees', {
                url: '/employees',
                template: '<h1>Employees</h1>'
            })
            .state('admin.admins', {
                url: '/admins',
                template: '<h1>Administrators</h1>'
            })
            .state('admin.apps', {
                url: '/apps',
                template: '<h1>Apps</h1>'
            });
    });
})();
