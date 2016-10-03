(function () {
    var app = angular.module('sbb');

    app.constant('credentialConfig', {
        fetchError: 'An issue occured while getting credentials from server',
        saveError: 'There was an issue while trying to save credentials',
        saveSuccess: 'Your credentials have been saved'
    });
})();
