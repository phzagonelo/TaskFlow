from flask import request, jsonify
from . import users_bp
from ..extensions import db
from ..models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token


@users_bp.route("", methods=["POST"])
def create_user():

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    required_fields = ["username", "email", "password"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    user = User(
        username=data["username"],
        email=data["email"],
        password_hash=generate_password_hash(data["password"])
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 201

@users_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error":"invalid credentials"}), 401
    
    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "user_id": user.id,
        "username": user.username
    }), 200