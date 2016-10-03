from flask import request

from . import api
from ..models import db, Department
from ..decorators import json, collection, cors


@api.route('/departments/', methods=['GET'])
@cors
@json()
@collection(Department)
def get_departments():
    return Department.query


@api.route('/departments/<int:id>', methods=['GET'])
@cors
@json()
def get_department(id):
    return Department.query.get_or_404(id)


@api.route('/departments/', methods=['POST'])
@cors
@json()
def new_department():
    department = Department().import_data(request.get_json(force=True))
    db.session.add(department)
    db.session.commit()
    return {}, 201, {'Location': department.get_url()}


@api.route('/departments/<int:id>', methods=['PUT'])
@cors
@json()
def update_department(id):
    department = Department.query.get_or_404(id)
    department.import_data(request.get_json(force=True))
    db.session.add(department)
    db.session.commit()
    return {}


@api.route('/departments/<int:id>', methods=['DELETE'])
@cors
@json()
def delete_department(id):
    department = Department.query.get_or_404(id)
    db.session.delete(department)
    db.session.commit()
    return {}
