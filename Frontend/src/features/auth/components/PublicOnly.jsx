import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

// Opposite of Protected: keeps already-logged-in users away from
// login/register pages by sending them back to the home page.
const PublicOnly = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    if (user) {
        return <Navigate to={'/'} replace />
    }

    return children
}

export default PublicOnly