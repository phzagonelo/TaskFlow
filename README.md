# Task Flow API

**Task Flow API** is a RESTful backend service for managing personal tasks.
It provides authentication and task management features through a secure API built with Python and Flask.

The main goal of this project is to practice **backend development and REST API design**, including authentication, database modeling, and protected routes.

A simple frontend client is included to consume the API and demonstrate its functionality, but **the backend API is the primary focus of the project**.

---

# Features

## Authentication

* User registration
* User login
* Password hashing
* JWT-based authentication

## Task Management

Authenticated users can:

* Create tasks
* View their own tasks
* Update task status
* Filter tasks by status *(implemented on the frontend)*

Each task belongs exclusively to its creator.

---

# Task Status

Tasks support three possible states:

```
pending
in_progress
completed
```

These statuses allow users to track task progress through the API.

---

# Tech Stack

## Backend (Main Focus)

* Flask
* Flask-SQLAlchemy
* Flask-Migrate
* Flask-JWT-Extended
* Flask-CORS
* SQLite

## Frontend (Secondary)

* Next.js
* React
* TypeScript
* SWR

The frontend was partially generated using **AI tools** to quickly create a user interface capable of interacting with the API.

The main development effort of this project was focused on the **backend API implementation**.

---

# Project Structure

```
task-flow
│
├ backend
│   ├ app
│   │   ├ models
│   │   ├ routes
│   │   └ extensions
│   │
│   ├ migrations
│   └ run.py
│
├ frontend
│
├ venv
├ .env
└ .gitignore
```

The backend and frontend are separated to follow a typical **API + client architecture**.

---

# API Endpoints

## Users

### Create User

POST `/users`

Creates a new user account.

Example request:

```json
{
  "username": "john",
  "email": "john@email.com",
  "password": "password123"
}
```

---

### Login

POST `/users/login`

Authenticates a user and returns a JWT token.

```json
{
  "email": "john@email.com",
  "password": "password123"
}
```

Example response:

```json
{
  "access_token": "JWT_TOKEN"
}
```

Authenticated requests must include the token:

```
Authorization: Bearer <token>
```

---

## Tasks

### Get Tasks

GET `/tasks`

Returns all tasks belonging to the authenticated user.

---

### Create Task

POST `/tasks`

Creates a new task.

Example request:

```json
{
  "title": "Study Flask",
  "description": "Review Flask routing and JWT",
  "deadline": "2026-04-01T18:00:00"
}
```

---

### Update Task Status

PATCH `/tasks/<task_id>/status`

Updates the status of a task.

Example request:

```json
{
  "status": "completed"
}
```

Only the task owner can update its status.

---

# Running the Project Locally

## Clone the repository

```
git clone https://github.com/phzagonelo/TaskFlow.git
cd task-flow
```

---

# Backend Setup

Create a virtual environment:

```
python -m venv venv
```

Activate it (Windows):

```
venv\Scripts\activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the backend server:

```
cd backend
flask run
```

The API will run on:

```
http://127.0.0.1:5000
```

---

# Frontend Setup

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# Security

* Passwords are stored using secure hashing.
* Authentication is handled with JWT tokens.
* Users can only access and modify their own tasks.

---

# Future Improvements

Planned improvements for the API:

* Edit task details
* Delete tasks
* Filtering and sorting on the backend
* Pagination
* Input validation improvements
* Unit tests
* API documentation (Swagger / OpenAPI)
* Deployment

---

# Learning Goals

This project was created to practice:

* REST API development
* Authentication with JWT
* Database modeling with SQLAlchemy
* Backend architecture with Flask
* Integration between API and frontend clients

---

# License

This project is open source and available under the **MIT License**.
