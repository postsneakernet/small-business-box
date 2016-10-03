(function () {
    var app = angular.module('sbb');

    app.controller('ProfileController', function ($scope, $rootScope, RestService, employeeConfig,
                departmentConfig, contactConfig, managerConfig, ManagerService, CredentialService,
                credentialConfig) {
        $scope.title = 'Profile';

        $scope.showChangeUsername = false;
        $scope.showUpdatePassword = false;
        $scope.contactEdit = false;
        $scope.showSsn = false;
        $scope.showPayRate = false;

        getProfile();

        $scope.toggleShowChangeUsername = function () {
            $scope.showChangeUsername = !$scope.showChangeUsername;
            if (!$scope.showChangeUsername) {
                $scope.changeUsername = {};
                $scope.changeUsernameForm.$setPristine();
                $scope.usernameExists = false;
            }
        };

        $scope.toggleShowUpdatePassword = function () {
            $scope.showUpdatePassword = !$scope.showUpdatePassword;
            if (!$scope.showUpdatePassword) {
                $scope.updatePassword = {};
                $scope.updatePasswordForm.$setPristine();
            }
        };

        $scope.toggleShowSsn = function () {
            $scope.showSsn = !$scope.showSsn;
        };

        $scope.toggleShowPayRate = function () {
            $scope.showPayRate = !$scope.showPayRate;
        };

        $scope.toggleContactEdit = function () {
            $scope.contactEdit = !$scope.contactEdit;
            if (!$scope.contactEdit) {
                $scope.contact = angular.copy($scope.originalContact);
                if (!$scope.contact) {
                    $scope.contactForm.$setPristine();
                }
            }
        };

        $scope.checkUsernameExists = function (username) {
            console.log('checkUsernameExists() called with username: ' + username);
            if (username && username.length > 0) {
                $scope.startSpin();
                CredentialService.findCredential(username).then(function (data) {
                    $scope.usernameExists = (data) ? true : false;
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(credentialConfig.fetchError, true);
                    $scope.stopSpin();
                });
            }
        };

        $scope.saveUsername = function (isValid) {
            if (!isValid) {
                console.log('form not valid');
                return;
            }

            $scope.startSpin();
            RestService.updateResource($scope.credential.self_url, $scope.changeUsername).then(function (data) {
                $scope.addAlert(credentialConfig.saveSuccess);
                getCredential();
                $rootScope.currentUser.username = $scope.changeUsername.username;
                $scope.toggleShowChangeUsername();
                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(credentialConfig.saveError, true);
                $scope.stopSpin();
            });
        };

        $scope.savePassword = function (isValid) {
            if (!isValid) {
                console.log('form not valid');
                return;
            }
            var credential = {
                username: $scope.credential.username,
                password: $scope.updatePassword.password,
                new_password: $scope.updatePassword.password1
            };

            $scope.startSpin();
            RestService.updateResource($scope.credential.self_url, credential).then(function (data) {
                $scope.addAlert(credentialConfig.saveSuccess);
                $scope.toggleShowUpdatePassword();
                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(credentialConfig.saveError, true);
                $scope.stopSpin();
            });
        };

        $scope.saveContact = function (isValid) {
            if (!isValid) {
                console.log('form not valid');
                return;
            }
            if ($scope.employee.contact_url) {
                $scope.startSpin();
                RestService.updateResource($scope.employee.contact_url, $scope.contact).then(function (data) {
                    $scope.addAlert(contactConfig.saveSuccess);
                    $scope.toggleContactEdit();
                    getContact();
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(contactConfig.saveError, true);
                    $scope.stopSpin();
                });
            } else {
                console.log($scope.contact);
                $scope.contact.employee_id = $scope.employee.id;
                $scope.startSpin();
                RestService.createResource($rootScope.endpoints.contacts_url, $scope.contact).then(
                            function (data) {
                    $scope.addAlert(contactConfig.saveSuccess);
                    $scope.toggleContactEdit();
                    getProfile();
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(contactConfig.saveError, true);
                    $scope.stopSpin();
                });
            }
        };

        function getProfile() {
            $scope.startSpin();
            RestService.getResource($rootScope.currentUser.self_url).then(function (data) {
                $scope.employee = data;

                getContact();
                getManagerStatus();
                getCredential();

                if ($scope.employee.department_url) {
                    $scope.startSpin();
                    RestService.getResource($scope.employee.department_url).then(function (data) {
                        $scope.department = data;
                        $scope.stopSpin();
                    }, function (data) {
                        $scope.addAlert(departmentConfig.fetchError, true);
                        $scope.stopSpin();
                    });
                }

                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(employeeConfig.fetchError, true);
                $scope.stopSpin();
            });
        }

        function getContact() {
            if ($scope.employee.contact_url) {
                $scope.startSpin();
                RestService.getResource($scope.employee.contact_url).then(function (data) {
                    $scope.contact = data;
                    $scope.originalContact = angular.copy(data);
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(contactConfig.fetchError, true);
                    $scope.stopSpin();
                });
            }

        }

        function getManagerStatus() {
            $scope.startSpin();
            ManagerService.findManager($scope.employee.id, true).then(function (data) {
                $scope.manager = data.managers[0];

                if ($scope.manager) {
                    $scope.startSpin();
                    RestService.getResource($scope.manager.department_url).then(function (data) {
                        $scope.managedDepartment = data;
                        $scope.stopSpin();
                    }, function (data) {
                        $scope.addAlert(departmentConfig.fetchError, true);
                        $scope.stopSpin();
                    });
                }

                $scope.stopSpin();
            }, function (data) {
                $scope.addAlert(managerConfig.fetchError, true);
                $scope.stopSpin();
            });
        }

        function getCredential() {
            if ($scope.employee.credential_url) {
                $scope.startSpin();
                RestService.getResource($scope.employee.credential_url).then(function (data) {
                    $scope.credential = data;
                    $scope.stopSpin();
                }, function (data) {
                    $scope.addAlert(credentialConfig.fetchError, true);
                    $scope.stopSpin();
                });
            }
        }
    });
})();
