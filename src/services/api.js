import axios from "axios"

// Instância base do Axios
// A URL vem do .env — nunca coloque a URL direto aqui
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor de REQUEST
// Injeta o token JWT em toda requisição automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@cidadeativa:token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de RESPONSE
// Se o token expirar (401), limpa o storage e redireciona para login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@cidadeativa:token")
      localStorage.removeItem("@cidadeativa:user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
