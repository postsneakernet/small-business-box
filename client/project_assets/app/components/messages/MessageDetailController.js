(function () {
    var app = angular.module('sbb');

    app.controller('MessageDetailController', function ($scope, $state, $stateParams, MessageService, EmployeeService) {
        $scope.title = 'Detail';
        $scope.filter = $stateParams.filter;

        console.log($stateParams.messageUrl);
        MessageService.getMessage($stateParams.messageUrl).then(function (data) {
            $scope.message = data;

            if ($scope.message) {
                EmployeeService.getEmployee($scope.message.from_employee_public_url).then(function (data) {
                    $scope.employee = data;
                });
            }
        });

    });
})();
