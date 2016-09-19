(function () {
    var app = angular.module('sbb');

    var OutboxCtrl = function ($scope) {
        $scope.title = 'Outbox';
    };

    app.controller('OutboxCtrl', OutboxCtrl);
})();
