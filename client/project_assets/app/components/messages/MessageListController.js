(function () {
    var app = angular.module('sbb');

    app.controller('MessageListController',
                function ($scope, $location, $timeout, $state, $stateParams, MessageService, messageConfig) {
        $scope.title = $stateParams.filter || 'Inbox';
        $scope.filter = $stateParams.filter;
        $scope.state = $state;
        $scope.search.option = $state.params.option || $scope.search.option || 'content';
        $scope.search.query = $state.params.query || $scope.search.query || '';

        var validFilters = ['inbox', 'unread', 'system', 'outbox', 'search'];

        if (validFilters.indexOf($scope.filter) < 0) {
            $state.go('app.messages.list', { filter: 'inbox' });
        }

        $scope.updateItemListCount();

        getMessages();

        function getMessages(url) {
            if ($scope.filter !== 'search') {
                $location.url($location.path());
            }

            $scope.startSpin();
            MessageService.getMessages($scope.filter, $scope.search, url).then(function (data) {
                $scope.messages = data.messages;
                $scope.meta = data.meta;

                $scope.updateItemListCount($scope.meta);

                for (var i = 0; i < $scope.messages.length; ++i) {
                    $scope.addEmployeeInfo($scope.messages[i]);
                }

                $scope.getNext = function () {
                    getMessages($scope.meta.next_url);
                };

                $scope.getPrev = function () {
                    getMessages($scope.meta.prev_url);
                };

                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(messageConfig.fetchAllError, true);
                $scope.stopSpin();
            });
        }
    });
})();
