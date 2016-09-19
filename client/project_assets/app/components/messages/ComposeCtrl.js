(function () {
    var app = angular.module('sbb');

    var ComposeCtrl = function ($scope) {
        $scope.title = 'Compose';
    };

    app.controller('ComposeCtrl', ComposeCtrl);
})();
