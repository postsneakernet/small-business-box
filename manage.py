from flask_script import Server, Manager

from employeemanager.app import create_app
from employeemanager.models import db


manager = Manager(create_app)
manager.add_command("runserver", Server(host='0.0.0.0'))


@manager.command
def createdb(testdata=False):
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        if testdata:

            import glob
            from flask_fixtures.loaders import JSONLoader
            from flask_fixtures import load_fixtures

            for fixture_dir in app.config.get('FIXTURES_DIRS', ['./employeemanager/fixtures/']):
                for fixture_file in glob.glob(fixture_dir + '/*.json'):
                    print("loading data in " + fixture_file)
                    fixtures = JSONLoader().load(fixture_file)
                    load_fixtures(db, fixtures)


@manager.shell
def make_shell_context():
    from employeemanager import models
    return dict(app=create_app(), db=db, models=models)


if __name__ == '__main__':
    manager.run()
