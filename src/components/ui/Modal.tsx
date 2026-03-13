import {type ReactNode, useEffect} from 'react'
import {X} from 'lucide-react'

interface ModalProps {
    title: string
    onClose: () => void
    children: ReactNode
}

export function Modal({title, onClose, children}: ModalProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-500 hover:text-white rounded-lg transition"
                    >
                        <X size={18}/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}