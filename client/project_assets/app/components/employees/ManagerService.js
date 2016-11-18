(function () {
    var app = angular.module('sbb');

    app.service('ManagerService', function ($http, $q, $rootScope, serviceConfig) {
        var baseUrl = $rootScope.endpoints.managers_url + serviceConfig.expand;

        this.findManager = function (id, byEmployee) {
            var filter = serviceConfig.filter;

            if (byEmployee) {
                filter += 'employee_id,eq,' + id;
            } else {
                filter += 'department_id,eq,' + id;
            }

            return $http.get(baseUrl + filter).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        };

        this.getManagers = function (url) {
            var _url = baseUrl + serviceConfig.perPage;
            if (url) {
                _url = url;
            }
            return $http.get(_url).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        };
    });
})();
