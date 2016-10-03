(function () {
    var app = angular.module('sbb');

    app.constant('contactConfig', {
        fetchError: 'An issue occured while getting contact from server',
        saveError: 'There was an issue while trying to save contact info',
        saveSuccess: 'Contact info has been saved'
    });
})();
