from flask import Flask

from employeemanager.config import DevelopmentConfig
from employeemanager.models import db
from employeemanager.errors import not_found


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)

    from employeemanager.v1 import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/v1')

    from employeemanager.views import core as core_blueprint
    app.register_blueprint(core_blueprint)

    @app.errorhandler(404)
    def not_found_error(e):
        return not_found('item not found')

    return app
