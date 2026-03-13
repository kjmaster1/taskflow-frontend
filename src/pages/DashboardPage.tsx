import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FolderKanban, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import { ProjectCard } from '../components/projects/ProjectCard'
import { CreateProjectModal } from '../components/projects/CreateProjectModal'
import { ErrorBanner } from '../components/ui/ErrorBanner'
import { Spinner } from '../components/ui/Spinner'
import { Button } from '../components/ui/Button'

export default function DashboardPage() {
    const [showModal, setShowModal] = useState(false)
    const { user, logout } = useAuth()
    const { projects, loading, error, createProject, deleteProject, clearError } = useProjects()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    if (loading) return <Spinner />

    return (
        <div className="min-h-screen bg-gray-950">
            <nav className="border-b border-gray-800 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-white">Taskflow</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm hidden sm:block">{user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:block">Sign out</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Projects</h2>
                        <p className="text-gray-400 mt-1">Manage your projects and tasks</p>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
                        <Plus size={18} />
                        New Project
                    </Button>
                </div>

                {error && (
                    <div className="mb-6">
                        <ErrorBanner message={error} onDismiss={clearError} />
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <FolderKanban size={48} className="text-gray-700 mb-4" />
                        <h3 className="text-lg font-medium text-gray-300">No projects yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Create your first project to get started</p>
                        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
                            <Plus size={18} />
                            New Project
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onDelete={deleteProject}
                            />
                        ))}
                    </div>
                )}
            </main>

            {showModal && (
                <CreateProjectModal
                    onClose={() => setShowModal(false)}
                    onCreate={createProject}
                />
            )}
        </div>
    )
}