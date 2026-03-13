import {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {ArrowLeft, CheckCircle2, Circle, Plus, Timer} from 'lucide-react'
import {useTasks} from '../hooks/useTasks'
import {useProjects} from '../hooks/useProjects'
import {TaskCard} from '../components/tasks/TaskCard'
import {CreateTaskModal} from '../components/tasks/CreateTaskModal'
import {ErrorBanner} from '../components/ui/ErrorBanner'
import {Spinner} from '../components/ui/Spinner'
import {Button} from '../components/ui/Button'
import type {TaskStatus} from '../types'
import * as React from "react";

const COLUMNS: { status: TaskStatus; label: string; icon: React.ElementType; color: string }[] = [
    {status: 'TODO', label: 'To Do', icon: Circle, color: 'text-gray-400'},
    {status: 'IN_PROGRESS', label: 'In Progress', icon: Timer, color: 'text-blue-400'},
    {status: 'DONE', label: 'Done', icon: CheckCircle2, color: 'text-green-400'},
]

export default function ProjectPage() {
    const {id} = useParams<{ id: string }>()
    const projectId = Number(id)
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [transitioningId, setTransitioningId] = useState<number | null>(null)

    const {projects, loading: projectsLoading} = useProjects()
    const {
        tasks,
        loading: tasksLoading,
        error,
        createTask,
        transitionTask,
        deleteTask,
        clearError
    } = useTasks(projectId)

    const project = projects.find(p => p.id === projectId)

    const handleTransition = async (taskId: number, status: TaskStatus) => {
        setTransitioningId(taskId)
        try {
            await transitionTask(taskId, status)
        } finally {
            setTransitioningId(null)
        }
    }

    if (projectsLoading || tasksLoading) return <Spinner/>

    return (
        <div className="min-h-screen bg-gray-950">
            <nav className="border-b border-gray-800 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
                    >
                        <ArrowLeft size={16}/>
                        Back
                    </button>
                    <div className="h-4 w-px bg-gray-700"/>
                    <h1 className="text-xl font-bold text-white truncate">{project?.name}</h1>
                    {project?.description && (
                        <span className="text-gray-500 text-sm hidden md:block truncate">{project.description}</span>
                    )}
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400 text-sm">
                        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                    </p>
                    <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
                        <Plus size={18}/>
                        New Task
                    </Button>
                </div>

                {error && (
                    <div className="mb-6">
                        <ErrorBanner message={error} onDismiss={clearError}/>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COLUMNS.map(({status, label, icon: Icon, color}) => {
                        const columnTasks = tasks.filter(t => t.status === status)

                        return (
                            <div key={status}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Icon size={16} className={color}/>
                                    <h3 className={`font-medium text-sm ${color}`}>{label}</h3>
                                    <span
                                        className="ml-auto text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                                </div>

                                <div className="space-y-3">
                                    {columnTasks.length === 0 ? (
                                        <div
                                            className="text-center py-8 text-gray-700 text-sm border border-dashed border-gray-800 rounded-xl">
                                            No tasks
                                        </div>
                                    ) : (
                                        columnTasks.map(task => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                onTransition={handleTransition}
                                                onDelete={deleteTask}
                                                transitioning={transitioningId === task.id}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>

            {showModal && (
                <CreateTaskModal
                    onClose={() => setShowModal(false)}
                    onCreate={createTask}
                />
            )}
        </div>
    )
}