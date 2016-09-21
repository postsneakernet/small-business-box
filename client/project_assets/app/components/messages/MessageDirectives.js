(function () {
    var app = angular.module('sbb');

    app.directive('message', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/messages/messageTemplate.html'
        };
    });

    app.directive('messageNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/messages/navTemplate.html'
        };
    });
})();
