import { X } from 'lucide-react'

interface ErrorBannerProps {
    message: string
    onDismiss: () => void
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-4 hover:text-red-300 transition">
                <X size={14} />
            </button>
        </div>
    )
}