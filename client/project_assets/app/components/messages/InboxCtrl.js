(function () {
    var app = angular.module('sbb');

    var InboxCtrl = function ($scope) {
        $scope.title = 'Inbox';
    };

    app.controller('InboxCtrl', InboxCtrl);
})();
