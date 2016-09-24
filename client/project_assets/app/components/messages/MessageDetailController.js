(function () {
    var app = angular.module('sbb');

    app.controller('MessageDetailController',
                   function ($scope, $state, $stateParams, MessageService, EmployeeService) {
        if ($state.is('app.messages.detail')) {
            $scope.title = 'Message Detail';
            $scope.filter = $stateParams.filter;
            $scope.isReadOnly = true;

            MessageService.getMessage($stateParams.messageUrl).then(function (data) {
                $scope.message = data;
                $scope.reply = function () {
                    $state.go('app.messages.compose', {messageUrl: $scope.message.self_url});
                };

                $scope.addEmployeeInfo($scope.message);
            });
        } else {
            $scope.title = 'Compose';
            if ($stateParams.messageUrl) {
                MessageService.getMessage($stateParams.messageUrl).then(function (data) {
                    $scope.title = 'Reply';
                    $scope.isReply = true;
                    $scope.message = data;
                    $scope.message.subject = ($scope.message.subject) ? 'Re: ' + $scope.message.subject : 'Re:';
                    $scope.message.content = '';

                    $scope.addEmployeeInfo($scope.message);
                });
            }
        }
    });
})();
