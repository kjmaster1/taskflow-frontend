import { useNavigate } from 'react-router-dom'
import { Trash2, FolderKanban } from 'lucide-react'
import type { Project } from '../../types'
import * as React from "react";

interface ProjectCardProps {
    project: Project
    onDelete: (id: number) => Promise<void>
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
    const navigate = useNavigate()

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        await onDelete(project.id)
    }

    return (
        <div
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-gray-600 hover:bg-gray-800/50 transition group"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FolderKanban size={18} className="text-blue-400 shrink-0" />
                    <div className="min-w-0">
                        <h3 className="font-semibold text-white truncate">{project.name}</h3>
                        {project.description && (
                            <p className="text-gray-400 text-sm mt-0.5 line-clamp-2">{project.description}</p>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="ml-3 p-1.5 text-gray-600 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition opacity-0 group-hover:opacity-100 shrink-0"
                    aria-label="Delete project"
                >
                    <Trash2 size={15} />
                </button>
            </div>
            <div className="mt-4 text-xs text-gray-500">
                Created {new Date(project.createdAt).toLocaleDateString('en-GB')}
            </div>
        </div>
    )
}