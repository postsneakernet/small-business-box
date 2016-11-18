(function () {
    var app = angular.module('sbb');

    app.constant('departmentConfig', {
        fetchError: 'An issue occured while getting department from server',
        fetchAllError: 'There was an issue retrieving departments from server'
    });
})();
