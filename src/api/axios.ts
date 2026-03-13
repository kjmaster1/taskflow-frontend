import axios, { AxiosError } from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8081',
    withCredentials: true,
})

api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('taskflow_user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api