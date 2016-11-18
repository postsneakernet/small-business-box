(function () {
    var app = angular.module('sbb');

    app.controller('EmployeeListController', function ($scope, $state, $stateParams, $location,
                EmployeeService, employeeConfig, DepartmentService, departmentConfig) {
        $scope.title = $stateParams.filter || 'all';
        $scope.filter = $stateParams.filter;
        $scope.state = $state;
        $scope.search.option = $state.params.option || $scope.search.option || 'last';
        $scope.search.query = $state.params.query || $scope.search.query || '';

        if ($scope.title === 'all') {
            $scope.title = 'All Employees';
        }

        var validFilters = ['all', 'managers', 'departments', 'search'];

        if (validFilters.indexOf($scope.filter) < 0) {
            $state.go('app.employees.list', {filter: 'all'});
        }

        // temp
        getDepartments();

        $scope.ActiveDept = 1;

        $scope.updateItemListCount();

        getEmployees();

        function getDepartments() {
            $scope.startSpin();
            DepartmentService.getAllDepartments().then(function (data) {
                $scope.departments = data.departments;
                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(departmentConfig.fetchAllError, true);
                $scope.stopSpin();
            });
        }

        function getEmployees(url) {
            if ($scope.filter !== 'search') {
                $location.url($location.path());
            }

            $scope.startSpin();
            EmployeeService.getEmployees($scope.filter, $scope.search, url).then(function (data) {
                $scope.employees = data.employees;
                $scope.meta = data.meta;

                $scope.updateItemListCount($scope.meta);

                for (var i = 0; i < $scope.employees.length; ++i) {
                    $scope.addDepartmentInfo($scope.employees[i]);
                    $scope.addManagerStatusInfo($scope.employees[i]);
                }

                $scope.getNext = function () {
                    getEmployees($scope.meta.next_url);
                };

                $scope.getPrev = function () {
                    getEmployees($scope.meta.prev_url);
                };

                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(employeeConfig.fetchAllError, true);
                $scope.stopSpin();
            });
        }
    });
})();
