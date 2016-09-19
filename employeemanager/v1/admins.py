from flask import request

from . import api
from ..models import db, Admin
from ..decorators import json, collection


@api.route('/admins/', methods=['GET'])
@json()
@collection(Admin)
def get_admins():
    return Admin.query


@api.route('/admins/<int:id>', methods=['GET'])
@json()
def get_admin(id):
    return Admin.query.get_or_404(id)


@api.route('/admins/', methods=['POST'])
@json()
def new_admin():
    admin = Admin().import_data(request.get_json(force=True))
    db.session.add(admin)
    db.session.commit()
    return {}, 201, {'Location': admin.get_url()}


@api.route('/admins/<int:id>', methods=['PUT'])
@json()
def update_admin(id):
    admin = Admin.query.get_or_404(id)
    admin.import_data(request.get_json(force=True))
    db.session.add(admin)
    db.session.commit()
    return {}


@api.route('/admins/<int:id>', methods=['DELETE'])
@json()
def delete_admin(id):
    admin = Admin.query.get_or_404(id)
    db.session.delete(admin)
    db.session.commit()
    return {}
