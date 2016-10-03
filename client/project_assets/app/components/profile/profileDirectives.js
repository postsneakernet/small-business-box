(function () {
    var app = angular.module('sbb');

    app.directive('profileInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/profile/profileInfoTemplate.html'
        };
    });

    app.directive('profileContact', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/profile/profileContactTemplate.html'
        };
    });

    app.directive('profileUsername', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/profile/profileUsernameTemplate.html'
        };
    });

    app.directive('profilePassword', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/profile/profilePasswordTemplate.html'
        };
    });
})();
