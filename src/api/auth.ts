import api from './axios'

export const authApi = {
    register: async (email: string, username: string, password: string): Promise<void> => {
        await api.post('/users/register', { email, username, password })
    },

    login: async (email: string, password: string): Promise<void> => {
        await api.post('/users/login', { email, password })
    },

    logout: async (): Promise<void> => {
        await api.post('/users/logout')
    },
}