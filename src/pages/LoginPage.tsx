import {useState, type ChangeEvent} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { ErrorBanner } from '../components/ui/ErrorBanner'
import type { AxiosError } from 'axios'
import type { ApiError } from '../types'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>
            setError(axiosError.response?.data?.message ?? 'Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Taskflow</h1>
                    <p className="text-gray-400 mt-2">Sign in to your account</p>
                </div>

                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
                    {error && (
                        <div className="mb-6">
                            <ErrorBanner message={error} onDismiss={() => setError(null)} />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                        <Button type="submit" loading={loading} className="w-full justify-center">
                            Sign in
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}