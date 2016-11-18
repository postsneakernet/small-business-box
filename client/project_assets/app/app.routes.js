(function () {
    var app = angular.module('sbb');

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('login', {
                abstract: true,
                views: {
                    nav: {
                        templateUrl: 'app/shared/nav/login.html'
                    },
                    '': {
                        templateUrl: 'app/shared/content.html'
                    }
                }
            })
            .state('login.login', {
                url: '/login',
                template: '<h1>Login</h1>'
            });


        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    nav: {
                        templateUrl: 'app/shared/nav/app.html'
                    },
                    '': {
                        templateUrl: 'app/shared/content.html',
                        controller: 'AppController'
                    }
                },
            })
            .state('app.dashboard', {
                url: '/dashboard',
                template: '<h1>Dashboard</h1>'
            })
            .state('app.profile', {
                url: '/profile',
                templateUrl: 'app/components/profile/profileView.html',
                controller: 'ProfileController'
            })
            .state('app.apps', {
                url: '/apps',
                templateUrl: 'app/components/apps/apps.html'
            });

        $stateProvider
            .state('app.messages', {
                abstract: true,
                url: '/messages',
                template: '<ui-view/>',
                controller: 'MessageController'
            })
            .state('app.messages.list', {
                url: '/:filter/?option?query',
                templateUrl: 'app/components/messages/messageListView.html',
                controller: 'MessageListController'
            })
            .state('app.messages.detail', {
                url: '/detail',
                templateUrl: 'app/components/messages/messageDetailView.html',
                params: { messageUrl: null, filter: null },
                controller: 'MessageDetailController',
                onEnter: ['$state', '$stateParams', '$timeout', function ($state, $stateParams, $timeout) {
                    if ($stateParams.messageUrl === null) {
                        $timeout(function () {
                            $state.go('app.messages.list', {filter: 'inbox'});
                        });
                    }
                }]
            })
            .state('app.messages.compose', {
                url: '/compose',
                templateUrl: 'app/components/messages/messageDetailView.html',
                params: { messageUrl: null },
                controller: 'MessageDetailController'
            });

        $stateProvider
            .state('app.employees', {
                abstract: true,
                url: '/employees',
                template: '<ui-view/>',
                controller: 'EmployeeController'
            })
            .state('app.employees.list', {
                url: '/:filter/?option?query',
                templateUrl: 'app/components/employees/employeeListView.html',
                controller: 'EmployeeListController'
            })
            .state('app.employees.detail', {
                url: '/detail',
                templateUrl: 'app/components/employees/employeeDetailView.html',
                params: { employeeUrl: null, filter: null },
                controller: 'EmployeeDetailController',
                onEnter: ['$state', '$stateParams', '$timeout', function ($state, $stateParams, $timeout) {
                    if ($stateParams.messageUrl === null) {
                        $timeout(function () {
                            $state.go('app.employees.list', {filter: 'all'});
                        });
                    }
                }]
            });
    });
})();
