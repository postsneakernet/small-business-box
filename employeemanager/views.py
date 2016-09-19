from flask import Blueprint

from employeemanager.decorators import json

core = Blueprint('core', __name__)


@core.route('/')
@json()
def index():
    from employeemanager.v1 import get_catalog as v1_catalog
    return {'versions': {'v1': v1_catalog()}}
