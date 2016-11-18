(function () {
    var app = angular.module('sbb');

    app.service('DepartmentService', function ($http, $q, $rootScope, serviceConfig) {
        var sort = '&sort=name,asc';
        var baseUrl = $rootScope.endpoints.departments_url + serviceConfig.expand +
                serviceConfig.perPage + sort;

        function getAllDepts(depts, url) {
            return getDepts(url).then(function (response) {
                var departments = response.departments;

                for (var i = 0; i < departments.length; ++i) {
                    depts.push(departments[i]);
                }

                if (response.meta.next_url) {
                    return getAllDepts(depts, response.meta.next_url);
                }
            }, function (response) {
                return $q.reject();
            });
        }

        function getDepts(url) {
            var _url = baseUrl;
            if (url) {
                _url = url;
            }

            return $http.get(_url).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        }

        this.getDepartments = function (url) {
            getDepts(url);
        };

        this.getAllDepartments = function () {
            var depts = [];

            var allDepts = getAllDepts(depts);

            return $q.all([allDepts]).then(function (response) {
                var d = {};
                d.departments = depts;
                return d;
            }, function (response) {
                return $q.reject();
            });
        };
    });
})();
