import api from './axios'
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types'

export const tasksApi = {
    getAll: async (projectId: number): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/projects/${projectId}/tasks`)
        return response.data
    },

    create: async (projectId: number, data: CreateTaskRequest): Promise<Task> => {
        const response = await api.post<Task>(`/projects/${projectId}/tasks`, data)
        return response.data
    },

    update: async (projectId: number, taskId: number, data: UpdateTaskRequest): Promise<Task> => {
        const response = await api.patch<Task>(`/projects/${projectId}/tasks/${taskId}`, data)
        return response.data
    },

    remove: async (projectId: number, taskId: number): Promise<void> => {
        await api.delete(`/projects/${projectId}/tasks/${taskId}`)
    },
}