(function () {
    var app = angular.module('sbb');

    app.service('EmployeeService', function ($http, $q, $rootScope) {
        this.getEmployee = function (url) {
            if (url === null) {
                return $q.when(null);
            }

            return $http.get(url).then(function (response) {
                return response.data;
            });
        };
    });
})();
