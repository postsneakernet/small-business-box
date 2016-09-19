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
            .state('app.messages.inbox', {
                url: '',
                templateUrl: 'app/components/messages/list.html',
                controller: 'InboxCtrl'
            })
            .state('app.messages.unread', {
                url: '/unread',
                templateUrl: 'app/components/messages/list.html',
                controller: 'UnreadCtrl'
            })
            .state('app.messages.system', {
                url: '/system',
                templateUrl: 'app/components/messages/list.html',
                controller: 'SystemCtrl'
            })
            .state('app.messages.outbox', {
                url: '/outbox',
                templateUrl: 'app/components/messages/list.html',
                controller: 'OutboxCtrl'
            })
            .state('app.messages.search', {
                url: '/search',
                templateUrl: 'app/components/messages/list.html',
                controller: 'SearchCtrl'
            })
            .state('app.messages.compose', {
                url: '/compose',
                templateUrl: 'app/components/messages/compose.html',
                controller: 'ComposeCtrl'
            })
            .state('app.messages.detail', {
                url: '/detail',
                templateUrl: 'app/components/messages/detail.html',
                controller: 'DetailCtrl'
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
