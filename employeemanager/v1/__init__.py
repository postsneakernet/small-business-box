from flask import Blueprint, url_for


api = Blueprint('api', __name__)


def get_catalog():
    return {'departments_url': url_for('api.get_departments', _external=True),
            'employees_url': url_for('api.get_employees', _external=True),
            'employees_public_url': url_for('api.get_employees_public', _external=True),
            'managers_url': url_for('api.get_managers', _external=True),
            'contacts_url': url_for('api.get_contacts', _external=True),
            'credentials_url': url_for('api.get_credentials', _external=True),
            'admins_url': url_for('api.get_admins', _external=True),
            'messages_url': url_for('api.get_messages', _external=True)}

# avoid circular dependencies
from . import departments, employees, managers, contacts, credentials, admins, messages
