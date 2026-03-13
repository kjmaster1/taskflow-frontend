import {useState, type ChangeEvent} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { ErrorBanner } from '../components/ui/ErrorBanner'
import type { AxiosError } from 'axios'
import type { ApiError } from '../types'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const { register, login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await register(email, username, password)
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>
            setError(axiosError.response?.data?.message ?? 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Taskflow</h1>
                    <p className="text-gray-400 mt-2">Create your account</p>
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
                            label="Username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="johndoe"
                            autoComplete="username"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                        />
                        <Button type="submit" loading={loading} className="w-full justify-center">
                            Create account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}