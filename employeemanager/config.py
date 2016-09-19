import os


class Config(object):
    DEBUG = False
    SECRET_KEY = os.environ.get('PRODUCTION_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = 'postgresql:///sbb'


class DevelopmentConfig(Config):
    DEBUG = True
    SECRET_KEY = 'secret'
