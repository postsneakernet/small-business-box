(function () {
    var app = angular.module('sbb');

    app.directive('employeeNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/employees/employeeNavTemplate.html'
        };
    });

    app.directive('employeeSearch', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/employees/employeeSearchTemplate.html'
        };
    });

    app.directive('employeeList', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/employees/employeeListTemplate.html'
        };
    });
})();
