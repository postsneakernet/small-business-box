(function () {
    var app = angular.module('sbb');

    var DetailCtrl = function ($scope) {
        $scope.title = 'Detail';
    };

    app.controller('DetailCtrl', DetailCtrl);
})();
