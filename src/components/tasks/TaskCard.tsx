import { Circle, Timer, CheckCircle2, Trash2 } from 'lucide-react'
import type { Task, TaskStatus } from '../../types'

const STATUS_CONFIG: Record<TaskStatus, {
    color: string
    bg: string
    border: string
    icon: React.ElementType
}> = {
    TODO: {
        color: 'text-gray-400',
        bg: 'bg-gray-800',
        border: 'border-gray-700',
        icon: Circle,
    },
    IN_PROGRESS: {
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        icon: Timer,
    },
    DONE: {
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        icon: CheckCircle2,
    },
}

const PRIORITY_CONFIG = {
    LOW: 'text-gray-400 bg-gray-800',
    MEDIUM: 'text-yellow-400 bg-yellow-400/10',
    HIGH: 'text-red-400 bg-red-400/10',
}

const NEXT_STATUS: Partial<Record<TaskStatus, TaskStatus>> = {
    TODO: 'IN_PROGRESS',
    IN_PROGRESS: 'DONE',
}

const NEXT_STATUS_LABEL: Partial<Record<TaskStatus, string>> = {
    TODO: '→ In Progress',
    IN_PROGRESS: '→ Done',
}

interface TaskCardProps {
    task: Task
    onTransition: (taskId: number, status: TaskStatus) => Promise<void>
    onDelete: (taskId: number) => Promise<void>
    transitioning: boolean
}

export function TaskCard({ task, onTransition, onDelete, transitioning }: TaskCardProps) {
    const config = STATUS_CONFIG[task.status]
    const nextStatus = NEXT_STATUS[task.status]

    return (
        <div className={`${config.bg} border ${config.border} rounded-xl p-4 group`}>
            <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-white text-sm leading-snug">{task.name}</h4>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-1 text-gray-600 hover:text-red-400 rounded transition opacity-0 group-hover:opacity-100 shrink-0"
                    aria-label="Delete task"
                >
                    <Trash2 size={13} />
                </button>
            </div>

            {task.description && (
                <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{task.description}</p>
            )}

            <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_CONFIG[task.priority]}`}>
          {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
        </span>
                {nextStatus && (
                    <button
                        onClick={() => onTransition(task.id, nextStatus)}
                        disabled={transitioning}
                        className="text-xs text-gray-500 hover:text-blue-400 transition disabled:opacity-50"
                    >
                        {transitioning ? 'Updating...' : NEXT_STATUS_LABEL[task.status]}
                    </button>
                )}
            </div>

            {task.startedAt && (
                <p className="mt-2 text-xs text-gray-600">
                    Started {new Date(task.startedAt).toLocaleDateString('en-GB')}
                </p>
            )}
            {task.completedAt && (
                <p className="text-xs text-gray-600">
                    Completed {new Date(task.completedAt).toLocaleDateString('en-GB')}
                </p>
            )}
        </div>
    )
}