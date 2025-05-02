'use client'
export const useAuth = () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
        return false
    } else {
        return true
    }
}