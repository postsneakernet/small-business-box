(function () {
    var app = angular.module('sbb');

    app.service('EmployeeService', function ($http, $q, $rootScope, ManagerService, serviceConfig) {
        var sort = '&sort=last_name,asc';
        var manager = serviceConfig.filter + 'id,in';
        var department = serviceConfig.filter + 'department_id,eq,';
        var baseUrl = $rootScope.endpoints.employees_public_url + serviceConfig.expand +
                serviceConfig.perPage + sort;
        var validOptions = ['first', 'last', 'full'];

        function getManagerIds(ids, url) {
            return ManagerService.getManagers(url).then(function (response) {
                var managers = response.managers;

                for (var i = 0; i < managers.length; ++i) {
                    ids.push(managers[i].employee_id);
                }

                if (response.meta.next_url) {
                    return getManagerIds(ids, response.meta.next_url);
                }

            }, function (response) {
                return $q.reject();
            });
        }

        this.getEmployees = function (filter, search, url) {
            var _url = baseUrl;
            if (url) {
                _url = url;
                filter = '';
            } else if (filter === 'managers') {
                var empIds = [];
                var managerIds = getManagerIds(empIds);

                return $q.all([managerIds]).then(function (response) {
                    var idStr = '';
                    for (var i = 0; i < empIds.length; ++i) {
                        idStr += ',' + empIds[i];
                    }
                    filter = manager + idStr;

                    return $http.get(_url + filter).then(function (response) {
                        return response.data;
                    }, function (response) {
                        return $q.reject();
                    });

                }, function (response) {
                    return $q.reject();
                });
            } else if (filter === 'departments') {
                //filter = department + // some dept id;
            } else if (filter === 'search') {
                // use findEmployee I think
                /*
                if (search.query && search.option && validOptions.indexOf(search.option) == 2) {
                    filter = serviceConfig.filter + search.option + ',like,%' + search.query + '%';
                } else if (search.query && search.option && validOptions.indexOf(search.option) >= 0) {
                    filter = serviceConfig.filter + search.option + ',like,%' + search.query + '%';
                } else {
                    filter = '';
                }
                */
            } else {
                filter = '';
            }

            return $http.get(_url + filter).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
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
