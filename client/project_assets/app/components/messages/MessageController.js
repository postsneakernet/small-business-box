(function () {
    var app = angular.module('sbb');

    app.controller('MessageController', function ($scope, $state) {
        $scope.search = {query: '', option: ''};

        $scope.setParentSearch = function setSearch() {
            $state.go('app.messages.list',
                {
                    filter: 'search',
                    option: $scope.search.option,
                    query: $scope.search.query
                },
                { reload: true }
            );
        };
    });
})();
