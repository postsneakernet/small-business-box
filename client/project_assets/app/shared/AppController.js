(function () {
    var app = angular.module('sbb');

    app.controller('AppController', function ($scope, $timeout, usSpinnerService) {
        $scope.alerts = [];
        $scope.alertLimit = -3;

        $scope.addAlert = function (alertMessage, isError) {
            if (isError) {
                $scope.alerts.push({alertType: 'alert-warning', alertMessage: alertMessage});
            } else {
                $scope.alerts.push({alertType: 'alert-success', alertMessage: alertMessage});
            }
            $scope.autoRemoveAlert();
        };

        $scope.removeAlert = function (a) {
            var i = $scope.alerts.indexOf(a);
            if (i != -1) {
                $scope.alerts.splice(i, 1);
            }
            $scope.autoRemoveAlert();
        };

        $scope.autoRemoveAlert = function () {
            $timeout.cancel($scope.alertTimeout);

            $scope.alertTimeout = $timeout(function () {
                $scope.alerts.pop();

                if ($scope.alerts.length > 0) {
                    $scope.autoRemoveAlert();
                }
            }, 4000);
        };

        var spinCount = 0;
        $scope.startSpin = function () {
            ++spinCount;
            usSpinnerService.spin('app-spinner');
        };

        $scope.stopSpin = function () {
            --spinCount;
            if (spinCount < 1) {
                usSpinnerService.stop('app-spinner');
            }
        };
    });
})();
