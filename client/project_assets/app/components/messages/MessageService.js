(function () {
    var app = angular.module('sbb');

    app.service('MessageService', function ($http, $q, $rootScope) {
        var expand = '?expand=1';
        var sort = '&sort=date,desc';
        var perPage = '&per_page=10';
        var _filter = '&filter=';
        var inbox = _filter + 'to_employee_id,eq,' + $rootScope.currentUser.id;
        var outbox = _filter + 'from_employee_id,eq,' + $rootScope.currentUser.id;
        var baseUrl = $rootScope.currentUser.message_url + expand + sort + perPage;

        this.getMessages = function (filter, page, url) {
            var _url = baseUrl;
            if (url) {
                _url = url;
                filter = '';
            }
            else if (filter === 'outbox') {
                filter = outbox;
            } else if (filter === 'unread') {
                filter = inbox + ';is_unread,eq,True';
            } else if (filter === 'system') {
                filter = inbox + ';from_employee_id,null';
            } else if (filter === 'search') {
                filter = '';
            } else {
                filter = inbox;
            }

            return $http.get(_url + filter)
            .then(function (response) {
                return response.data;
            });
        };

        this.getMessage = function (url) {
            if (url === null) {
                return $q.when(null);
            }

            return $http.get(url).then(function (response) {
                return response.data;
            });
        };
    });
})();
