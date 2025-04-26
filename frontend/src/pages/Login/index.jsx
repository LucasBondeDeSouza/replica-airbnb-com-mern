import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { useUserContext } from "../../context/UserContext";

export default () => {
    const { user, setUser } = useUserContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email && password) {
            try {
                const { data: userDoc } = await axios.post('/users/login', {
                    email, password
                })
                setUser(userDoc)
                setRedirect(true)
            } catch (err) {
                alert(`Deu um erro ao logar: ${err.response.data}`)
            }
        } else {
            alert('Você precisa preencher o e-mail e a senha')
        }
    }

    if (redirect || user) return <Navigate to="/" />

    return (
        <section className="flex items-center">
            <div className="mx-auto max-w-96 flex flex-col items-center gap-4 w-full">
                <h1 className="text-3xl font-bold">Faça seu login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
                    <input 
                        type="email" 
                        className="w-full rounded-full border border-gray-300 px-4 py-2"
                        placeholder="Digite seu e-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className="w-full rounded-full border border-gray-300 px-4 py-2" 
                        placeholder="Digite sua senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full rounded-full border bg-primary-400 text-white font-bold border-gray-300 px-4 py-2 cursor-pointer">
                        Login
                    </button>
                </form>

                <p>Ainda não tem uma conta? <Link to='/register' className="underline font-semibold">Registre-se aqui!</Link></p>
            </div>
        </section>
    )
}