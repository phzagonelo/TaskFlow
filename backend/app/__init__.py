from flask import Flask
from config import Config
from .extensions import db, login_manager
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def create_app():

    app = Flask(__name__)
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True
    )
    app.config.from_object(Config)
    
    db.init_app(app)
    login_manager.init_app(app)

    '''from .main import main_bp
    app.register_blueprint(main_bp)'''

    from .tasks import tasks_bp
    app.register_blueprint(tasks_bp, url_prefix="/tasks")

    from .users import users_bp
    app.register_blueprint(users_bp, url_prefix="/users")

    migrate = Migrate(app, db)

    app.config["JWT_SECRET_KEY"] = "secret-key"
    jwt = JWTManager(app)

    from . import models

    return app