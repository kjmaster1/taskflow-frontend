import { useState, useEffect, useCallback } from 'react'
import { tasksApi } from '../api/tasks'
import type { Task, CreateTaskRequest, TaskStatus } from '../types'

interface UseTasksReturn {
    tasks: Task[]
    loading: boolean
    error: string | null
    createTask: (data: CreateTaskRequest) => Promise<void>
    transitionTask: (taskId: number, status: TaskStatus) => Promise<void>
    deleteTask: (taskId: number) => Promise<void>
    clearError: () => void
}

export function useTasks(projectId: number): UseTasksReturn {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTasks = useCallback(async () => {
        try {
            const data = await tasksApi.getAll(projectId)
            setTasks(data)
        } catch {
            setError('Failed to load tasks')
        } finally {
            setLoading(false)
        }
    }, [projectId])

    useEffect(() => {
        void fetchTasks()
    }, [fetchTasks])

    const createTask = useCallback(async (data: CreateTaskRequest) => {
        const task = await tasksApi.create(projectId, data)
        setTasks(prev => [...prev, task])
    }, [projectId])

    const transitionTask = useCallback(async (taskId: number, status: TaskStatus) => {
        const updated = await tasksApi.update(projectId, taskId, { status })
        setTasks(prev => prev.map(t => t.id === taskId ? updated : t))
    }, [projectId])

    const deleteTask = useCallback(async (taskId: number) => {
        await tasksApi.remove(projectId, taskId)
        setTasks(prev => prev.filter(t => t.id !== taskId))
    }, [projectId])

    const clearError = useCallback(() => setError(null), [])

    return { tasks, loading, error, createTask, transitionTask, deleteTask, clearError }
}