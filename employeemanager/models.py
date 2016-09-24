import datetime

from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask_sqlalchemy import SQLAlchemy
from flask import url_for, current_app

from employeemanager.errors import ValidationError


db = SQLAlchemy()


class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)

    manager = db.relationship('Manager', uselist=False, cascade='all, delete-orphan',
                              passive_deletes=True, back_populates='department')

    def get_url(self):
        return url_for('api.get_department', id=self.id, _external=True)

    def export_data(self):
        url = None
        if self.manager:
            url = url_for('api.get_manager', id=self.manager.id, _external=True)
        return {'id': self.id,
                'self_url': self.get_url(),
                'name': self.name,
                'manager_url': url}

    def import_data(self, data):
        try:
            self.name = data['name']
        except KeyError as e:
            raise ValidationError('Invalid department: missing ' + e.args[0])
        return self


class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    ssn = db.Column(db.String(11), nullable=False)
    start_date = db.Column(db.Date, default=datetime.date.today())
    end_date = db.Column(db.Date)
    pay_rate = db.Column(db.Float, nullable=False)
    is_hourly = db.Column(db.Boolean, nullable=False, default=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    department = db.relationship('Department', backref=db.backref('employees', lazy='dynamic'))

    contact = db.relationship('Contact', uselist=False, cascade='all, delete-orphan',
                              passive_deletes=True, back_populates='employee')

    credential = db.relationship('Credential', uselist=False, cascade='all, delete-orphan',
                                 passive_deletes=True, back_populates='employee')

    def get_url(self):
        return url_for('api.get_employee', id=self.id, _external=True)

    def get_public_url(self):
        return url_for('api.get_employee_public', id=self.id, _external=True)

    def build_external_urls(self):
        message_url = url_for('api.get_employee_messages', id=self.id, _external=True)

        department_url = None
        if self.department_id:
            department_url = url_for('api.get_department', id=self.department_id, _external=True)

        contact_url = None
        if self.contact:
            contact_url = url_for('api.get_contact', id=self.contact.id, _external=True)

        return {'message_url': message_url,
                'department_url': department_url,
                'contact_url': contact_url}

    def export_data(self):
        urls = self.build_external_urls()

        return {'id': self.id,
                'self_url': self.get_url(),
                'first_name': self.first_name,
                'last_name': self.last_name,
                'ssn': self.ssn,
                'start_date': self.start_date,
                'end_date': self.end_date,
                'pay_rate': self.pay_rate,
                'is_hourly': self.is_hourly,
                'message_url': urls['message_url'],
                'contact_url': urls['contact_url'],
                'department_url': urls['department_url']}

    def export_public_data(self):
        urls = self.build_external_urls()

        return {'id': self.id,
                'self_url': self.get_public_url(),
                'first_name': self.first_name,
                'last_name': self.last_name,
                'contact_url': urls['contact_url'],
                'department_url': urls['department_url']}

    def import_data(self, data):
        try:
            self.first_name = data['first_name']
            self.last_name = data['last_name']
            self.ssn = data['ssn']
            self.pay_rate = data['pay_rate']
            self.is_hourly = data['is_hourly']

            if 'start_date' in data:
                self.start_date = data['start_date']
            if 'end_date' in data:
                self.end_date = data['end_date']
            if 'department_id' in data:
                self.department_id = data['department_id']
        except KeyError as e:
            raise ValidationError('Invalid employee: missing ' + e.args[0])
        return self


class Manager(db.Model):
    __tablename__ = 'managers'
    id = db.Column(db.Integer, primary_key=True)
    department_id = db.Column('department_id', db.Integer,
                              db.ForeignKey('departments.id', ondelete='CASCADE'),
                              unique=True, nullable=False)
    employee_id = db.Column('employee_id', db.Integer,
                            db.ForeignKey('employees.id', ondelete='CASCADE'),
                            nullable=False)

    department = db.relationship('Department', back_populates='manager')

    def get_url(self):
        return url_for('api.get_manager', id=self.id, _external=True)

    def export_data(self):
        return {'id': self.id,
                'self_url': self.get_url(),
                'employee_url': url_for('api.get_employee', id=self.employee_id, _external=True),
                'employee_public_url': url_for('api.get_employee_public',
                                               id=self.employee_id, _external=True),
                'department_url': url_for('api.get_department',
                                          id=self.department_id, _external=True)}

    def import_data(self, data):
        try:
            self.department_id = data['department_id']
            self.employee_id = data['employee_id']
        except KeyError as e:
            raise ValidationError('Invalid manager: missing ' + e.args[0])
        return self


class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(128), nullable=False)
    city = db.Column(db.String(64), nullable=False)
    state = db.Column(db.String(64), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    phone = db.Column(db.String(14), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    employee_id = db.Column('employee_id', db.Integer,
                            db.ForeignKey('employees.id', ondelete='CASCADE'),
                            unique=True, nullable=False)

    employee = db.relationship('Employee', back_populates='contact')

    def get_url(self):
        return url_for('api.get_contact', id=self.id, _external=True)

    def export_data(self):
        return {'id': self.id,
                'self_url': self.get_url(),
                'address': self.address,
                'city': self.city,
                'state': self.state,
                'zip_code': self.zip_code,
                'phone': self.phone,
                'email': self.email,
                'employee_public_url': url_for('api.get_employee_public',
                                               id=self.employee_id, _external=True),
                'employee_url': url_for('api.get_employee', id=self.employee_id, _external=True)}

    def import_data(self, data):
        try:
            self.address = data['address']
            self.city = data['city']
            self.state = data['state']
            self.zip_code = data['zip_code']
            self.phone = data['phone']
            self.email = data['email']
            self.employee_id = data['employee_id']
        except KeyError as e:
            raise ValidationError('Invalid contact: missing ' + e.args[0])
        return self


class Credential(db.Model):
    __tablename__ = 'credentials'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    employee_id = db.Column('employee_id', db.Integer,
                            db.ForeignKey('employees.id', ondelete='CASCADE'),
                            unique=True, nullable=False)

    employee = db.relationship('Employee', back_populates='credential')

    admin = db.relationship('Admin', uselist=False, cascade='all, delete-orphan',
                            passive_deletes=True, back_populates='credential')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expires_in=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expires_in=expires_in)
        return s.dumps({'id': self.id}).decode('utf-8')

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return None
        return Credential.query.get(data['id'])

    def get_url(self):
        return url_for('api.get_credential', id=self.id, _external=True)

    def export_data(self):
        return {'id': self.id,
                'self_url': self.get_url(),
                'username': self.username,
                'employee_url': url_for('api.get_employee', id=self.employee_id, _external=True)}

    def import_data(self, data):
        try:
            self.username = data['username']
            self.employee_id = data['employee_id']

            if 'password' in data:
                self.password = data['password']
            else:
                e = Employee.query.get(data['employee_id'])
                self.password = e.ssn
        except KeyError as e:
            raise ValidationError('Invalid credential: missing ' + e.args[0])
        return self


class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    credential_id = db.Column('credential_id', db.Integer,
                              db.ForeignKey('credentials.id', ondelete='CASCADE'),
                              unique=True, nullable=False)

    credential = db.relationship('Credential', back_populates='admin')

    def get_url(self):
        return url_for('api.get_admin', id=self.id, _external=True)

    def export_data(self):
        return {'id': self.id,
                'self_url': self.get_url(),
                'credential_url': url_for('api.get_credential',
                                          id=self.credential_id, _external=True)}

    def import_data(self, data):
        try:
            self.credential_id = data['credential_id']
        except KeyError as e:
            raise ValidationError('Invalid admin: missing ' + e.args[0])
        return self


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(64))
    content = db.Column(db.Text(), nullable=False)
    to_employee_id = db.Column('to_employee_id', db.Integer,
                               db.ForeignKey('employees.id', ondelete='CASCADE'),
                               nullable=False)
    from_employee_id = db.Column('from_employee_id', db.Integer, db.ForeignKey('employees.id'))
    is_unread = db.Column(db.Boolean, nullable=False, default=True)
    date = db.Column(db.DateTime, default=datetime.datetime.now())

    def get_url(self):
        return url_for('api.get_message', id=self.id, _external=True)

    def export_data(self):
        from_employee_url = None
        from_employee_public_url = None
        if self.from_employee_id:
            from_employee_url = url_for('api.get_employee', id=self.from_employee_id,
                                        _external=True)
            from_employee_public_url = url_for('api.get_employee_public',
                                               id=self.from_employee_id, _external=True)

        return {'id': self.id,
                'self_url': self.get_url(),
                'subject': self.subject,
                'content': self.content,
                'to_employee_public_url': url_for('api.get_employee_public',
                                                  id=self.to_employee_id, _external=True),
                'to_employee_url': url_for('api.get_employee',
                                           id=self.to_employee_id, _external=True),
                'from_employee_public_url': from_employee_public_url,
                'from_employee_url': from_employee_url,
                'is_unread': self.is_unread,
                'date': self.date}

    def import_data(self, data):
        try:
            self.content = data['content']
            self.to_employee_id = data['to_employee_id']
            self.from_employee_id = data['from_employee_id']
            self.is_unread = data['is_unread']

            if 'subject' in data:
                self.subject = data['subject']
            if 'from_employee_id' in data:
                self.from_employee_id = data['from_employee_id']
        except KeyError as e:
            raise ValidationError('Invalid message: missing ' + e.args[0])
        return self
