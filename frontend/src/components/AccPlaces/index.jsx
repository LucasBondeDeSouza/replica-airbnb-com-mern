import React from "react";
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from "react-router-dom";
import NewPlace from "../NewPlace";

export default () => {
    const { action } = useParams()

    return (
        <div className="w-full max-w-7xl flex flex-col items-center">
            {action !== "new" ? (
                <Link
                    to="/account/places/new"
                    className="flex gap-2 bg-primary-400 hover:bg-primary-500 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"
                >
                    <PlusCircleIcon className="size-6" />
                    Adicionar novo lugar
                </Link>
            ) : (
                <NewPlace />
            )}
        </div>
    )
}