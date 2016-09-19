(function () {
    var app = angular.module('sbb');

    var SearchCtrl = function ($scope) {
        $scope.title = 'Search';
    };

    app.controller('SearchCtrl', SearchCtrl);
})();
