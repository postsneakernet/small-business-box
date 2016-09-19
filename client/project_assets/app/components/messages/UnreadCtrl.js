(function () {
    var app = angular.module('sbb');

    var UnreadCtrl = function ($scope) {
        $scope.title = 'Unread';
    };

    app.controller('UnreadCtrl', UnreadCtrl);
})();
