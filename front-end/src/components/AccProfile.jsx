import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default () => {
    const {user, setUser} = useUserContext()
    const [redirect, setRedirect] = useState(false)

    const logout = async () => {
        try {
            const { data } = await axios.post("/users/logout")
            setUser(null)
            setRedirect(true)
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }

    if (redirect) return <Navigate to="/" />

    return (
        <div className="flex flex-col items-center gap-4">
            <p>Logado com {user?.name} ({user?.email})</p>

            <button onClick={logout} className="min-w-44 bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition text-white">
                Logout
            </button>
        </div>
    )
}