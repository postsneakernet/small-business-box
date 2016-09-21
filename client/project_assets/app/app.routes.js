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
                        templateUrl: 'app/shared/content.html'
                    }
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                template: '<h1>Dashboard</h1>'
            });

        $stateProvider
            .state('app.messages', {
                abstract: true,
                url: '/messages',
                template: '<ui-view/>'
            })
            .state('app.messages.list', {
                url: '/:filter/',
                templateUrl: 'app/components/messages/listView.html',
                controller: 'MessageListController'
            })
            .state('app.messages.compose', {
                url: '/compose',
                templateUrl: 'app/components/messages/composeView.html',
                controller: 'ComposeController'
            })
            .state('app.messages.detail', {
                url: '/detail',
                templateUrl: 'app/components/messages/detailView.html',
                params: { messageUrl: null, filter: null },
                controller: 'MessageDetailController',
                onEnter: ['$state', '$stateParams', '$timeout', function ($state, $stateParams, $timeout) {
                    if ($stateParams.messageUrl === null) {
                        $timeout(function () {
                            $state.go('app.messages.list', {filter: 'inbox'});
                        });
                    }
                }]
            });

        $stateProvider
            .state('app.profile', {
                url: '/profile',
                template: '<h1>Profile</h1>'
            })
            .state('app.employees', {
                url: '/employees',
                template: '<h1>Employee Directory</h1>'
            })
            .state('app.apps', {
                url: '/apps',
                templateUrl: 'app/components/apps/apps.html'
            });
    });
})();
