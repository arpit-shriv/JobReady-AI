import axios from "axios"


const api = axios.create({
    baseURL: "https://jobready-ai-53ws.onrender.com",
    withCredentials: true
})

// If the request never reached the server (server down, no internet, CORS
// block etc.), axios error has no `err.response` at all — this needs a
// different message than "invalid credentials" from the backend.
function getErrorMessage(err, fallback) {
    if (err.response) {
        return err.response.data?.message || fallback
    }
    return "Unable to connect to the server. Please check your internet connection and try again."
}

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        throw new Error(getErrorMessage(err, "Something went wrong while registering. Please try again."))

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        throw new Error(getErrorMessage(err, "Invalid email or password."))
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {
        throw new Error(getErrorMessage(err, "Something went wrong while logging out."))
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        throw new Error(getErrorMessage(err, "Something went wrong while fetching your account."))
    }

}
