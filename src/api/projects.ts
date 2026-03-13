import api from './axios'
import type { Project, CreateProjectRequest } from '../types'

export const projectsApi = {
    getAll: async (): Promise<Project[]> => {
        const response = await api.get<Project[]>('/projects')
        return response.data
    },

    create: async (data: CreateProjectRequest): Promise<Project> => {
        const response = await api.post<Project>('/projects', data)
        return response.data
    },

    update: async (id: number, data: Partial<CreateProjectRequest>): Promise<Project> => {
        const response = await api.patch<Project>(`/projects/${id}`, data)
        return response.data
    },

    remove: async (id: number): Promise<void> => {
        await api.delete(`/projects/${id}`)
    },
}