(function () {
    var app = angular.module('sbb');

    app.controller('MessageController', function ($scope, $state, RestService, employeeConfig) {
        $scope.search = { query: '', option: 'content' };

        $scope.setParentSearch = function setSearch() {
            $state.go('app.messages.list',
                { filter: 'search', option: $scope.search.option, query: $scope.search.query }
            );
        };

        $scope.addEmployeeInfo = function (message) {
            if (message && message.from_employee_public_url) {
                $scope.startSpin();
                RestService.getResource(message.from_employee_public_url).then(function (data) {
                    message.fromEmployee = data;
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(employeeConfig.fetchError, true);
                    $scope.stopSpin();
                });
            }

            if (message) {
                $scope.startSpin();
                RestService.getResource(message.to_employee_public_url).then(function (data) {
                    message.toEmployee = data;
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(employeeConfig.fetchError, true);
                    $scope.stopSpin();
                });
            }
        };
    });
})();
