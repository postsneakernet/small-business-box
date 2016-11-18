(function () {
    var app = angular.module('sbb');

    app.controller('EmployeeController', function ($scope, $state, RestService, ManagerService, managerConfig,
                departmentConfig) {
        $scope.search = { query: '', option: 'last' };

        $scope.setParentSearch = function setSearch() {
            $state.go('app.employees.list',
                { filter: 'search', option: $scope.search.option, query: $scope.search.query }
            );
        };

        $scope.addDepartmentInfo = function (employee) {
            if (employee && employee.department_url) {
                $scope.startSpin();
                RestService.getResource(employee.department_url).then(function (data) {
                    employee.department = data;
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(departmentConfig.fetchError, true);
                    $scope.stopSpin();
                });
            }
        };

        $scope.addManagerStatusInfo = function (employee) {
            if (!employee) {
                return;
            }

            $scope.startSpin();
            ManagerService.findManager(employee.id, true).then(function (data) {
                employee.manager = data.managers[0];
                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(managerConfig.fetchError, true);
                $scope.stopSpin();
            });
        };
    });
})();
