import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from "react-router-dom";
import NewPlace from "../NewPlace";
import axios from "axios";

export default () => {
    const { action } = useParams()
    const [places, setPlaces] = useState([])

    useEffect(() => {
        const axiosGet = async () => {
            const { data } = await axios.get("/places/owner") 
            setPlaces(data)
        }

        axiosGet()
    }, [action])

    return (
        <div className="w-full max-w-7xl flex flex-col items-center">
            {action !== "new" ? (
                <div className="flex flex-col gap-8 items-center">
                    <Link
                        to="/account/places/new"
                        className="flex gap-2 bg-primary-400 hover:bg-primary-500 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"
                    >
                        <PlusCircleIcon className="size-6" />
                        Adicionar novo lugar
                    </Link>

                    {places.map(place => (
                        <Link to={`/account/places/new/${place._id}`} className="bg-gray-100 rounded-2xl p-6 flex items-center gap-6">
                            <img 
                                className="max-w-56 object-center aspect-square rounded-2xl" 
                                src={place.photos[0]} 
                                alt="Foto da Acomodação" 
                            />

                            <div className="flex flex-col gap-2">
                                <p className="text-2xl font-medium">{place.title}</p>
                                <p>{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <NewPlace />
            )}
        </div>
    )
}