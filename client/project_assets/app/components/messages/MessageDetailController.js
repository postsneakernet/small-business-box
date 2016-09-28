(function () {
    var app = angular.module('sbb');

    app.controller('MessageDetailController',
                   function ($rootScope, $scope, $state, $stateParams, MessageService, EmployeeService) {
        if ($state.is('app.messages.detail')) {
            $scope.title = 'Message Detail';
            $scope.filter = $stateParams.filter;
            $scope.isReadOnly = true;

            $scope.startSpin();
            MessageService.getMessage($stateParams.messageUrl).then(function (data) {
                $scope.message = data;
                $scope.reply = function () {
                    $state.go('app.messages.compose', {messageUrl: $scope.message.self_url});
                };

                $scope.addEmployeeInfo($scope.message);

                if ($scope.filter !== 'outbox' && $scope.message && $scope.message.is_unread) {
                    MessageService.markMessageAsRead($scope.message.self_url,
                                {is_unread: false}).then(function (data) {
                        $scope.stopSpin();
                    });
                } else {
                    $scope.stopSpin();
                }
            });
        } else {
            $scope.title = 'Compose';
            $scope.composeMessage = { from_employee_id: $rootScope.currentUser.id };

            if ($stateParams.messageUrl) {
                $scope.startSpin();
                MessageService.getMessage($stateParams.messageUrl).then(function (data) {
                    $scope.title = 'Reply';
                    $scope.isReply = true;
                    $scope.message = data;
                    $scope.message.subject = ($scope.message.subject) ? 'Re: ' + $scope.message.subject : 'Re:';
                    $scope.message.content = '';

                    $scope.composeMessage.to_employee_id = $scope.message.from_employee_id; // reply to sender
                    $scope.composeMessage.subject = $scope.message.subject;

                    $scope.addEmployeeInfo($scope.message);
                    $scope.stopSpin();
                });
            } else {
                $scope.employeeArray = [];
                $scope.selectedEmployee = {};
            }
        }

        $scope.sendMessage = function (isValid) {
            if (isValid) {
                $scope.startSpin();
                MessageService.sendMessage($scope.composeMessage).then(function (data) {
                    $state.go('app.messages.list', {filter: 'inbox'});
                    $scope.stopSpin();
                });
            }
        };

        $scope.updateToEmployee = function () {
            if ($scope.selectedEmployee.employee) {
                $scope.composeMessage.to_employee_id = $scope.selectedEmployee.employee.id;
            } else {
                $scope.composeMessage.to_employee_id = '';
            }
        };

        $scope.clearSelectedEmployee = function () {
            $scope.selectedEmployee.employee = undefined;
            $scope.updateToEmployee();
        };

        $scope.searchEmployee = function (employee) {
            if (employee.length > 0) {
                $scope.startSpin();
                EmployeeService.findEmployee(employee).then(function (data) {
                    if (data.employees.length > 0) {
                        var employees = data.employees;
                        for (var i = 0; i < employees.length; ++i) {
                            employees[i].name = employees[i].first_name + ' ' + employees[i].last_name;
                        }
                        $scope.employeeArray = employees;
                    }
                    $scope.stopSpin();
                });
            }
        };
    });
})();
