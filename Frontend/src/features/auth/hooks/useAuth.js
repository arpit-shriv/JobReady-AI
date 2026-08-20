import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    // `loading` here is ONLY for the one-time initial session check (below),
    // shared globally because Protected/PublicOnly need to know it before
    // deciding whether to redirect. It must NOT be reused for login/register/
    // logout actions — doing so previously caused Protected/PublicOnly to
    // swap out the whole page (unmounting Login/Register mid-submit and
    // wiping their local error/form state) every time an action ran.
    const { user, setUser, loading, setLoading } = context
    const [ error, setError ] = useState(null)
    const [ actionLoading, setActionLoading ] = useState(false)


    const handleLogin = async ({ email, password }) => {
        setActionLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setActionLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setActionLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setActionLoading(false)
        }
    }

    const handleLogout = async () => {
        setActionLoading(true)
        setError(null)
        try {
            const data = await logout()
            setUser(null)
            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setActionLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                // Silently ignore: this runs on every page load to check
                // if the visitor has an existing session, and failing here
                // just means they're logged out — not an error to surface.
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, actionLoading, error, handleRegister, handleLogin, handleLogout }
}