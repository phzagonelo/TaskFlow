from flask import request, jsonify
from . import tasks_bp
from ..extensions import db
from ..models import Task, User
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity


@tasks_bp.route("", methods=["POST"])
@jwt_required()
def create_task():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    required_fields = ["title", "deadline"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    try:
        deadline = datetime.fromisoformat(data["deadline"])
    except ValueError:
        return jsonify({"error": "Invalid datetime format"}), 400

    task = Task(
        title=data["title"],
        status=data.get("status", "pending"),
        deadline=deadline,
        user_id=user_id,
        description=data.get("description")
    )

    db.session.add(task)
    db.session.commit()

    return jsonify(task.to_dict()), 201

@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = int(get_jwt_identity())

    tasks = Task.query.filter_by(user_id = user_id).all()

    return jsonify([task.to_dict() for task in tasks])

@tasks_bp.route("/<int:task_id>/status", methods=["PATCH"])
@jwt_required()
def update_status(task_id):
    user_id = int(get_jwt_identity())

    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    if task.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.get_json()

    VALID_STATUS = {"pending", "in_progress", "completed"}

    status = data.get("status", "pending")

    if status not in VALID_STATUS:
        return jsonify({"error": "Invalid status"}), 400

    new_status = data.get("status")

    task.status = new_status

    db.session.commit()

    return jsonify(task.to_dict()), 200