(function () {
    var app = angular.module('sbb');

    app.service('CredentialService', function ($http, $q, $rootScope, serviceConfig) {

        this.findCredential = function (username) {
            if (username === null) {
                return $q.when(null);
            }

            var url = $rootScope.endpoints.credentials_url + serviceConfig.expand + serviceConfig.perPage;
            var filter = serviceConfig.filter;

            filter += 'username,eq,' + username;

            return $http.get(url + filter).then(function (response) {
                return response.data.credentials[0];
            }, function (response) {
                return $q.reject();
            });
        };
    });
})();
