(function () {
    var app = angular.module('sbb');

    app.service('EmployeeService', function ($http, $q, $rootScope, serviceConfig) {
        this.getEmployee = function (url) {
            if (url === null) {
                return $q.when(null);
            }

            return $http.get(url).then(function (response) {
                return response.data;
            });
        };

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
                });
            } else {
                var searchFirst = $http.get(url + filter + 'first_name,eq,' + split[0]);
                var searchLast = $http.get(url + filter + 'last_name,eq,' + split[0]);

                return $q.all([searchFirst, searchLast]).then(function (data) {
                    var employees = data[0].data.employees;
                    employees.push.apply(employees, data[1].data.employees);
                    return { employees: employees };
                });
            }

        };
    });
})();
