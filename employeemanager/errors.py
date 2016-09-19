from flask import jsonify


class ValidationError(ValueError):
    pass


def not_found(message):
    response = jsonify({'status': 404, 'error': 'not found', 'message': message})
    response.status_code = 404
    return response
