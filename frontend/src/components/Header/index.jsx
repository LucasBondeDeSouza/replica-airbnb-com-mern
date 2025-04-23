import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons"

export default () => {

    return (
        <div className="shadow-md">
            <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <img className="h-10" src="https://cdn.prod.website-files.com/61b9e0dd381626819c8d4f83/65e2198d48039ba6444f602b_logo%20hashtag%20-%20h.webp" alt="Logo da Hashtag" />

                    <p className="text-2xl font-bold text-primary-400">ashbnb</p>
                </div>

                <div className="flex items-center border border-gray-300 pr-4 pl-6 py-2 rounded-full shadow">
                    <p className="pr-4 border-r border-r-gray-300">Qualquer lugar</p>
                    <p className="px-4 border-r border-r-gray-300">Qualquer semana</p>
                    <p className="px-4">Hóspedes?</p>
                    
                    <div className="bg-primary-400 text-white rounded-full size-7 flex justify-center items-center cursor-pointer">
                        <FontAwesomeIcon icon={faSearch} className="size-3" />
                    </div>
                </div>

                <div className="flex items-center border border-gray-300 pr-4 pl-6 py-2 rounded-full shadow">
                    <FontAwesomeIcon icon={faUserCircle} className="size-8" />
                    <FontAwesomeIcon icon={faBars} className="size-4" />
                </div>
            </div>
        </div>
    )
}