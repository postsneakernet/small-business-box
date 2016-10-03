(function () {
    var app = angular.module('sbb');

    app.service('RestService', function ($http,$q) {
        this.getResource = function (url) {
            if (url === null) {
                return $q.when(null);
            }

            return $http.get(url).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        };

        this.updateResource = function (url, data) {
            if (url === null) {
                return $q.when(null);
            }

            return $http.put(url, data).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        };

        this.createResource = function (url, data) {
            if (url === null) {
                return $q.when(null);
            }

            return $http.post(url, data).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        };
    });
})();
