export interface Project {
    id: number
    name: string
    description: string | null
    createdAt: string
}

export interface Task {
    id: number
    name: string
    description: string | null
    status: TaskStatus
    priority: TaskPriority
    createdAt: string
    startedAt: string | null
    completedAt: string | null
    dueDate: string | null
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface User {
    email: string
}

export interface ApiError {
    status: number
    message: string
    timestamp: string
}

export interface CreateProjectRequest {
    name: string
    description?: string
}

export interface CreateTaskRequest {
    name: string
    description?: string
    priority: TaskPriority
    dueDate?: string
}

export interface UpdateTaskRequest {
    name?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    dueDate?: string
}