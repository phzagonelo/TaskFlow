import type { Task, User, CreateTaskData, CreateUserData, LoginData, LoginResponse } from './types'

const API_BASE_URL = 'http://127.0.0.1:5000'

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Invalid email or password')
  }

  return response.json()
}

export async function createUser(data: CreateUserData): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  return response.json()
}

export async function createTask(data: CreateTaskData): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  return response.json()
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json()
}

export async function updateTaskStatus(taskId: number, status: 'in_progress' | 'completed'): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update task status')
  }

  return response.json()
}
