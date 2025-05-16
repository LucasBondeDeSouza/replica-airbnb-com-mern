import React from "react"

export default ({ place, key }) => {

    return (
        <a href="/" className="flex flex-col gap-2">
            <img 
                src={place.photos[0]} 
                alt="Imagem da acomodação" 
                className="aspect-square object-cover rounded-2xl"
            />

            <div className="">
                <h3 className="text-xl font-semibold">{place.title}</h3>

                <p className="truncate text-gray-600">
                    {place.description}
                </p>
            </div>

            <p>
                <span className="font-semibold">R$ {place.price}</span> por noite
            </p>
        </a>
    )
}