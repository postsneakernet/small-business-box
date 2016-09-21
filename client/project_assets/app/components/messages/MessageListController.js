(function () {
    var app = angular.module('sbb');

    app.controller('MessageListController', function ($scope, $state, $stateParams, MessageService, EmployeeService) {
        $scope.title = $stateParams.filter || 'Inbox';
        $scope.filter = $stateParams.filter;
        $scope.page = $stateParams.page;
        $scope.state = $state;

        getMessages();

        function getMessages(url) {
            MessageService.getMessages($scope.filter, $scope.page, url).then(function (data) {
                $scope.messages = data.messages;
                $scope.meta = data.meta;

                updateMessageCount($scope.meta);

                for (var i = 0; i < $scope.messages.length; ++i) {
                    addEmployeeInfo($scope.messages[i]);
                }

                $scope.getNext = function () {
                    getMessages($scope.meta.next_url);
                };

                $scope.getPrev = function () {
                    getMessages($scope.meta.prev_url);
                };
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


        function addEmployeeInfo(message) {
            if (message.from_employee_public_url) {
                EmployeeService.getEmployee(message.from_employee_public_url).then(function (data) {
                    message.fromEmployee = data;
                });
            }

            EmployeeService.getEmployee(message.to_employee_public_url).then(function (data) {
                message.toEmployee = data;
            });
        }
    });
})();
