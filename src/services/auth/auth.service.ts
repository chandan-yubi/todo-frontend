import { fetchWrapper } from "../../helpers/fetch.wrapper";

const baseUrl = "http://localhost:3000/api/v1"

export const authService = {
    login,
    logout,
    isLoggedIn,
    registerUser,
}


function login(email: string, password: string) {
    return fetchWrapper.post(baseUrl + "/login", { email:email, password_digest: password })
}

function logout() {
    localStorage.removeItem("authToken")
}

function isLoggedIn() {
    return !!localStorage.getItem("authToken")
}

function registerUser(name: string, email: string, password: string) {
    const body = {
        name: name,
        email: email,
        password_digest: password
    }
    return fetchWrapper.post(baseUrl + "/users", body)
}