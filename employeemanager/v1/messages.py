from flask import request
from sqlalchemy import or_

from . import api
from ..models import db, Message
from ..decorators import json, collection, cors


@api.route('/employees/<int:id>/messages/', methods=['GET'])
@cors
@json()
@collection(Message)
def get_employee_messages(id):
    return Message.query.filter(or_(Message.to_employee_id == id, Message.from_employee_id == id))


@api.route('/messages/', methods=['GET'])
@cors
@json()
@collection(Message)
def get_messages():
    return Message.query


@api.route('/messages/<int:id>', methods=['GET'])
@cors
@json()
def get_message(id):
    return Message.query.get_or_404(id)


@api.route('/messages/', methods=['POST'])
@json()
def new_message():
    message = Message().import_data(request.get_json(force=True))
    db.session.add(message)
    db.session.commit()
    return {}, 201, {'Location': message.get_url()}


@api.route('/messages/<int:id>', methods=['PUT'])
@json()
def update_message(id):
    message = Message.query.get_or_404(id)
    message.import_data(request.get_json(force=True))
    db.session.add(message)
    db.session.commit()
    return {}


@api.route('/messages/<int:id>', methods=['DELETE'])
@json()
def delete_message(id):
    message = Message.query.get_or_404(id)
    db.session.delete(message)
    db.session.commit()
    return {}
