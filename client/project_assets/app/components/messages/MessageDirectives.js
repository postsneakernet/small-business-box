(function () {
    var app = angular.module('sbb');

    app.directive('messageNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/messages/messageNavTemplate.html'
        };
    });

    app.directive('messageSearch', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/messages/messageSearchTemplate.html'
        };
    });

    app.directive('messageList', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/messages/messageListTemplate.html'
        };
    });

    app.directive('messageDetail', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/messages/messageDetailTemplate.html'
        };
    });
})();
