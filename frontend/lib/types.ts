export interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  deadline: string
  user_id: number
}

export interface User {
  id: number
  username: string
  email: string
}

export type TaskStatus = Task['status']

export interface CreateTaskData {
  title: string
  description: string
  deadline: string
}

export interface CreateUserData {
  username: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user_id: number
  username: string
}

export interface AuthUser {
  token: string
  user_id: number
  username: string
}
