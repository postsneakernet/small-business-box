(function () {
    var app = angular.module('sbb');

    app.controller('AppController', function ($scope, usSpinnerService) {
        $scope.startSpin = function () {
            usSpinnerService.spin('app-spinner');
        };

        $scope.stopSpin = function () {
            usSpinnerService.stop('app-spinner');
        };
    });
})();
