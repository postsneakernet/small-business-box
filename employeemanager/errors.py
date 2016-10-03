from flask import jsonify
from employeemanager.decorators import cors


class ValidationError(ValueError):
    pass


class AuthenticationError(ValueError):
    pass


@cors
def not_found(message):
    response = jsonify({'status': 404, 'error': 'not found', 'message': message})
    response.status_code = 404
    return response
