from flask import request

from . import api
from ..models import db, Manager
from ..decorators import json, collection, cors


@api.route('/managers/', methods=['GET'])
@cors
@json()
@collection(Manager)
def get_managers():
    return Manager.query


@api.route('/managers/<int:id>', methods=['GET'])
@cors
@json()
def get_manager(id):
    return Manager.query.get_or_404(id)


@api.route('/managers/', methods=['POST'])
@cors
@json()
def new_manager():
    manager = Manager().import_data(request.get_json(force=True))
    db.session.add(manager)
    db.session.commit()
    return {}, 201, {'Location': manager.get_url()}


@api.route('/managers/<int:id>', methods=['PUT'])
@cors
@json()
def update_manager(id):
    manager = Manager.query.get_or_404(id)
    manager.import_data(request.get_json(force=True))
    db.session.add(manager)
    db.session.commit()
    return {}


@api.route('/managers/<int:id>', methods=['DELETE'])
@cors
@json()
def delete_manager(id):
    manager = Manager.query.get_or_404(id)
    db.session.delete(manager)
    db.session.commit()
    return {}
