import { useState, useEffect, useCallback } from 'react'
import { projectsApi } from '../api/projects'
import type { Project, CreateProjectRequest } from '../types'

interface UseProjectsReturn {
    projects: Project[]
    loading: boolean
    error: string | null
    createProject: (data: CreateProjectRequest) => Promise<void>
    deleteProject: (id: number) => Promise<void>
    clearError: () => void
}

export function useProjects(): UseProjectsReturn {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProjects = useCallback(async () => {
        try {
            const data = await projectsApi.getAll()
            setProjects(data)
        } catch {
            setError('Failed to load projects')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchProjects()
    }, [fetchProjects])

    const createProject = useCallback(async (data: CreateProjectRequest) => {
        const project = await projectsApi.create(data)
        setProjects(prev => [...prev, project])
    }, [])

    const deleteProject = useCallback(async (id: number) => {
        await projectsApi.remove(id)
        setProjects(prev => prev.filter(p => p.id !== id))
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { projects, loading, error, createProject, deleteProject, clearError }
}