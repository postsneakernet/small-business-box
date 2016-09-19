(function () {
    var app = angular.module('sbb');

    var SystemCtrl = function ($scope) {
        $scope.title = 'System Messages';
    };

    app.controller('SystemCtrl', SystemCtrl);
})();
