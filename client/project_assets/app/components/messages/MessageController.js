(function () {
    var app = angular.module('sbb');

    app.controller('MessageController', function ($scope, $state, EmployeeService) {
        $scope.search = {query: '', option: 'content'};

        $scope.setParentSearch = function setSearch() {
            $state.go('app.messages.list',
                { filter: 'search', option: $scope.search.option, query: $scope.search.query },
                { reload: true }
            );
        };

        $scope.addEmployeeInfo = function (message) {
            if (message && message.from_employee_public_url) {
                EmployeeService.getEmployee(message.from_employee_public_url).then(function (data) {
                    message.fromEmployee = data;
                });
            }

            if(message) {
                EmployeeService.getEmployee(message.to_employee_public_url).then(function (data) {
                    message.toEmployee = data;
                });
            }
        };
    });
})();
