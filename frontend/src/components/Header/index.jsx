import React from "react";
import { Bars3Icon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default () => {

    return (
        <div className="shadow-md">
            <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <img className="h-10" src="https://cdn.prod.website-files.com/61b9e0dd381626819c8d4f83/65e2198d48039ba6444f602b_logo%20hashtag%20-%20h.webp" alt="Logo da Hashtag" />

                    <p className="text-2xl font-bold text-primary-400">ashbnb</p>
                </div>

                <div className="flex items-center border border-gray-300 pr-4 pl-6 py-2 rounded-full shadow-md">
                    <p className="pr-4 border-r border-r-gray-300">Qualquer lugar</p>
                    <p className="px-4 border-r border-r-gray-300">Qualquer semana</p>
                    <p className="px-4">Hóspedes?</p>
                    
                    <div className="bg-primary-400 rounded-full p-2 text-white cursor-pointer">
                        <MagnifyingGlassIcon className="size-4" />
                    </div>
                </div>

                <div className="flex items-center border border-gray-300 pr-4 pl-6 py-2 rounded-full gap-2 shadow-md">
                    <Bars3Icon className="size-5 text-gray-600" />
                    <UserCircleIcon className="size-8 text-gray-600" />
                    <p>Lucas</p>
                </div>
            </div>
        </div>
    )
}