import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from 'react'
import { authApi } from '../api/auth'
import type { User } from '../types'

interface AuthContextValue {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('taskflow_user')
        if (stored) {
            try {
                setUser(JSON.parse(stored) as User)
            } catch {
                localStorage.removeItem('taskflow_user')
            }
        }
        setLoading(false)
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        await authApi.login(email, password)
        const userData: User = { email }
        setUser(userData)
        localStorage.setItem('taskflow_user', JSON.stringify(userData))
    }, [])

    const register = useCallback(async (
        email: string,
        username: string,
        password: string
    ) => {
        await authApi.register(email, username, password)
    }, [])

    const logout = useCallback(async () => {
        await authApi.logout()
        setUser(null)
        localStorage.removeItem('taskflow_user')
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}