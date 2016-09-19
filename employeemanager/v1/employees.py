from flask import request

from . import api
from ..models import db, Employee
from ..decorators import json, collection


@api.route('/employees-public/', methods=['GET'])
@json()
@collection(Employee, custom_data='export_public_data', custom_url='get_public_url')
def get_employees_public():
    return Employee.query


@api.route('/employees-public/<int:id>', methods=['GET'])
@json(custom_data='export_public_data')
def get_employee_public(id):
    return Employee.query.get_or_404(id)


@api.route('/employees/', methods=['GET'])
@json()
@collection(Employee)
def get_employees():
    return Employee.query


@api.route('/employees/<int:id>', methods=['GET'])
@json()
def get_employee(id):
    return Employee.query.get_or_404(id)


@api.route('/employees/', methods=['POST'])
@json()
def new_employee():
    employee = Employee().import_data(request.get_json(force=True))
    db.session.add(employee)
    db.session.commit()
    return {}, 201, {'Location': employee.get_url()}


@api.route('/employees/<int:id>', methods=['PUT'])
@json()
def update_employee(id):
    employee = Employee.query.get_or_404(id)
    employee.import_data(request.get_json(force=True))
    db.session.add(employee)
    db.session.commit()
    return {}


@api.route('/employees/<int:id>', methods=['DELETE'])
@json()
def delete_employee(id):
    employee = Employee.query.get_or_404(id)
    db.session.delete(employee)
    db.session.commit()
    return {}
