(function () {
    var app = angular.module('sbb');

    app.constant('serviceConfig', {
        expand: '?expand=1',
        perPage: '&per_page=10',
        filter: '&filter='
    });
})();
