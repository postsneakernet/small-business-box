(function () {
    var app = angular.module('sbb');

    app.controller('MessageListController',
                function ($scope, $location, $timeout, $state, $stateParams, MessageService,
                        EmployeeService, messageConfig) {
        $scope.title = $stateParams.filter || 'Inbox';
        $scope.filter = $stateParams.filter;
        $scope.state = $state;
        $scope.search.option = $state.params.option || $scope.search.option || 'content';
        $scope.search.query = $state.params.query || $scope.search.query || '';

        validFilters = ['inbox', 'unread', 'system', 'outbox', 'search'];

        if (validFilters.indexOf($scope.filter) < 0) {
            $state.go('app.messages.list', {filter: 'inbox'});
        }

        getMessages();

        function getMessages(url) {
            if ($scope.filter !== 'search') {
                $location.url($location.path());
            }

            $scope.startSpin();
            MessageService.getMessages($scope.filter, $scope.search, url).then(function (data) {
                $scope.messages = data.messages;
                $scope.meta = data.meta;

                updateMessageCount($scope.meta);

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

        function updateMessageCount(meta) {
            var currentPage = meta.page;
            var totalPage = meta.pages;
            var perPage = meta.per_page;
            var totalMessage = meta.total;

            if (currentPage == 1) {
                $scope.minMessage = (totalMessage > 0) ? 1 : 0;
            } else {
                $scope.minMessage = (currentPage - 1) * perPage + 1;
            }

            if (currentPage == totalPage) {
                $scope.maxMessage = totalMessage;
            } else {
                $scope.maxMessage = (totalMessage > 0) ? perPage * currentPage : 0;
            }
        }
    });
})();
