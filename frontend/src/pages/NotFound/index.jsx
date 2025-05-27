import React from "react";
import { Link } from "react-router-dom";

export default () => {

    return (
        <div className="flex items-center">
            <div className="mx-auto max-w-96 flex flex-col items-center gap-10 w-full">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-7xl font-bold">Oops!</h1>
                    <p className="text-lg">Não conseguimos encontrar a página que você está procurando.</p>
                </div>

                <Link to="/" className="w-full text-center rounded-full border bg-primary-400 text-white font-bold border-gray-300 px-4 py-2 cursor-pointer">
                    Home
                </Link>
            </div>
        </div>
    )
}