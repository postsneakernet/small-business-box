from flask import Blueprint

from employeemanager.decorators import json, cors

core = Blueprint('core', __name__)


@core.route('/')
@cors
@json()
def index():
    from employeemanager.v1 import get_catalog as v1_catalog
    return {'versions': {'v1': v1_catalog()}}
