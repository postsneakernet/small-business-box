(function () {
    var app = angular.module('sbb');

    app.constant('employeeConfig', {
        searchError: 'An issue occurred while searching for employee',
        fetchError: 'An issue occured while getting employee from server'
    });
})();
