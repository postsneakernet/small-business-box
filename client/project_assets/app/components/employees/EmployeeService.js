(function () {
    var app = angular.module('sbb');

    app.service('EmployeeService', function ($http, $q, $rootScope, serviceConfig) {

        this.findEmployee = function (name) {
            if (name === null) {
                return $q.when(null);
            }

            var split = name.split(' ');
            var url = $rootScope.endpoints.employees_public_url + serviceConfig.expand + serviceConfig.perPage;
            var filter = serviceConfig.filter;

            if (split.length > 1) {
                filter += 'first_name,eq,' + split[0] + ';last_name,eq,' + split[1];
                url += filter;

                return $http.get(url).then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject();
                });
            } else {
                var searchFirst = $http.get(url + filter + 'first_name,eq,' + split[0]);
                var searchLast = $http.get(url + filter + 'last_name,eq,' + split[0]);

                return $q.all([searchFirst, searchLast]).then(function (response) {
                    var employees = response[0].data.employees;
                    employees.push.apply(employees, response[1].data.employees);
                    return { employees: employees };
                }, function (response) {
                    return $q.reject();
                });
            }
        };
    });
})();
