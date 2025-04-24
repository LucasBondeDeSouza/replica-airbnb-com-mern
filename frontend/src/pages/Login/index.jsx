import React from "react";
import { Link } from "react-router-dom"

export default () => {

    return (
        <section className="flex items-center">
            <div className="mx-auto max-w-96 flex flex-col items-center gap-4 w-full">
                <h1 className="text-3xl font-bold">Faça seu login</h1>

                <form className="flex flex-col gap-2 w-full">
                    <input 
                        type="email" 
                        className="w-full rounded-full border border-gray-300 px-4 py-2"
                        placeholder="Digite seu e-mail" 
                    />
                    <input 
                        type="password" 
                        className="w-full rounded-full border border-gray-300 px-4 py-2" 
                        placeholder="Digite sua senha" 
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