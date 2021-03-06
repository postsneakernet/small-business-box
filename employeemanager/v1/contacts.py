from flask import request

from . import api
from ..models import db, Contact
from ..decorators import json, collection, cors


@api.route('/contacts/', methods=['GET'])
@cors
@json()
@collection(Contact)
def get_contacts():
    return Contact.query


@api.route('/contacts/<int:id>', methods=['GET'])
@cors
@json()
def get_contact(id):
    return Contact.query.get_or_404(id)


@api.route('/contacts/', methods=['POST'])
@cors
@json()
def new_contact():
    contact = Contact().import_data(request.get_json(force=True))
    db.session.add(contact)
    db.session.commit()
    return {}, 201, {'Location': contact.get_url()}


@api.route('/contacts/<int:id>', methods=['PUT'])
@cors
@json()
def update_contact(id):
    contact = Contact.query.get_or_404(id)
    contact.import_data(request.get_json(force=True))
    db.session.add(contact)
    db.session.commit()
    return {}


@api.route('/contacts/<int:id>', methods=['DELETE'])
@cors
@json()
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return {}
