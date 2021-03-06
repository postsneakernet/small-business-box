(function () {
    var app = angular.module('sbb');

    app.service('MessageService', function ($http, $q, $rootScope, serviceConfig) {
        var sort = '&sort=date,desc';
        var inbox = serviceConfig.filter + 'to_employee_id,eq,' + $rootScope.currentUser.id;
        var outbox = serviceConfig.filter + 'from_employee_id,eq,' + $rootScope.currentUser.id;
        var baseUrl = $rootScope.currentUser.message_url + serviceConfig.expand + serviceConfig.perPage + sort;
        var validOptions = ['content', 'subject'];

        this.getMessages = function (filter, search, url) {
            var _url = baseUrl;
            if (url) {
                _url = url;
                filter = '';
            } else if (filter === 'outbox') {
                filter = outbox;
            } else if (filter === 'unread') {
                filter = inbox + ';is_unread,eq,True';
            } else if (filter === 'system') {
                filter = inbox + ';from_employee_id,null';
            } else if (filter === 'search') {
                filter = (search.query && search.option && validOptions.indexOf(search.option) >= 0) ?
                    serviceConfig.filter + search.option + ',like,%' + search.query + '%' :
                    serviceConfig.filter + 'content,null';
            } else {
                filter = inbox;
            }

            return $http.get(_url + filter).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject();
            });
        };
    });
})();
