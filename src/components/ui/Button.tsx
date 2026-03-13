import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    loading?: boolean
}

export function Button({
                           variant = 'primary',
                           loading = false,
                           disabled,
                           children,
                           className = '',
                           ...props
                       }: ButtonProps) {
    const base = 'px-4 py-2.5 rounded-lg font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white focus:ring-blue-500',
        secondary: 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white focus:ring-red-500',
    }

    return (
        <button
            disabled={disabled ?? loading}
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </button>
    )
}