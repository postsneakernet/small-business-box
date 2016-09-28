(function () {
    var app = angular.module('sbb');

    app.constant('messageConfig', {
        sendError: 'Message not sent: There was an issue communicating with server',
        fetchError: 'There was an issue getting message from server',
        fetchAllError: 'There was an issue retrieving messages from server',
        markReadError: 'There was an issue marking message as read',
        sendSuccess: 'Message sent successfully'
    });
})();
