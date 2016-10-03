from flask import request

from . import api
from ..models import db, Credential
from ..decorators import json, collection, cors


@api.route('/token/', methods=['POST'])
@cors
@json()
def new_token():
    pass


@api.route('/credentials/', methods=['GET'])
@cors
@json()
@collection(Credential)
def get_credentials():
    return Credential.query


@api.route('/credentials/<int:id>', methods=['GET'])
@cors
@json()
def get_credential(id):
    return Credential.query.get_or_404(id)


@api.route('/credentials/', methods=['POST'])
@cors
@json()
def new_credential():
    credential = Credential().import_data(request.get_json(force=True))
    db.session.add(credential)
    db.session.commit()
    return {}, 201, {'Location': credential.get_url()}


@api.route('/credentials/<int:id>', methods=['PUT'])
@cors
@json()
def update_credential(id):
    credential = Credential.query.get_or_404(id)
    credential.update_data(request.get_json(force=True))
    db.session.add(credential)
    db.session.commit()
    return {}


@api.route('/credentials/<int:id>', methods=['DELETE'])
@cors
@json()
def delete_credential(id):
    credential = Credential.query.get_or_404(id)
    db.session.delete(credential)
    db.session.commit()
    return {}
