import {useState, type ChangeEvent} from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import type { CreateTaskRequest, TaskPriority } from '../../types'

interface CreateTaskModalProps {
    onClose: () => void
    onCreate: (data: CreateTaskRequest) => Promise<void>
}

export function CreateTaskModal({ onClose, onCreate }: CreateTaskModalProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<TaskPriority>('MEDIUM')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onCreate({ name, description: description || undefined, priority })
            onClose()
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal title="New Task" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Task name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="What needs to be done?"
                    autoFocus
                    required
                />
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description <span className="text-gray-500">(optional)</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        placeholder="Add more details..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as TaskPriority)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1 justify-center">
                        Cancel
                    </Button>
                    <Button type="submit" loading={loading} className="flex-1 justify-center">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}