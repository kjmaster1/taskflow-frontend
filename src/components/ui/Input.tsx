import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                        error ? 'border-red-500' : 'border-gray-700'
                    }`}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'