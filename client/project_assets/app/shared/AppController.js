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

        $scope.updateItemListCount = function (meta) {
            if (!meta) {
                $scope.minItemPage = 0;
                $scope.maxItemPage = 0;
                return;
            }

            var currentPage = meta.page;
            var totalPage = meta.pages;
            var perPage = meta.per_page;
            var totalItem = meta.total;

            if (currentPage == 1) {
                $scope.minItemPage = (totalItem > 0) ? 1 : 0;
            } else {
                $scope.minItemPage = (currentPage - 1) * perPage + 1;
            }

            if (currentPage == totalPage) {
                $scope.maxItemPage = totalItem;
            } else {
                $scope.maxItemPage = (totalItem > 0) ? perPage * currentPage : 0;
            }
        };
    });
})();
