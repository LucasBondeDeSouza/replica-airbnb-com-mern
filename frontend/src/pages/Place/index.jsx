import { MapPinIcon, SquaresPlusIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default () => {
    const { id } = useParams()
    const [place, setPlace] = useState(null)
    const [overlay, setOverlay] = useState(false)
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [guests, setGuests] = useState("")

    useEffect(() => {
        if (id) {
            const axiosGet = async () => {
                const { data } = await axios.get(`/places/${id}`)
                setPlace(data)
            }

            axiosGet()
        }
    }, [id])

    useEffect(() => {
        overlay
            ? document.body.classList.add("overflow-hidden")
            : document.body.classList.remove("overflow-hidden")
    }, [overlay])

    if (!place) return <></>

    return (
        <section>
            <div className="flex flex-col mx-auto max-w-7xl gap-6 p-8">

                {/* Titulos */}
                <div className="flex flex-col gap-1">
                    <div className="text-3xl font-bold">{place.title}</div>

                    <div className="flex items-center gap-1">
                        <MapPinIcon className="size-5" />
                        <p>{place.city}</p>
                    </div>
                </div>

                {/* Grade de Imagens */}
                <div className="relative grid grid-cols-[2fr_1fr] grid-rows-2 aspect-[3/2] rounded-2xl overflow-hidden gap-4">
                    {place.photos
                        .filter((photo, index) => index < 3)
                        .map((photo, index) => (
                            <img 
                                className={`${index === 0 && 'row-span-2 h-full'} aspect-square w-full object-cover transition hover:opacity-75 cursor-pointer`}
                                src={photo} 
                                alt="Imagem da acomodação"
                                onClick={() => setOverlay(true)}
                            />
                        ))
                    }

                    <div 
                        className="absolute right-2 bottom-2 bg-white border border-black rounded-xl py-1 px-2 flex items-center gap-2 transition hover:scale-105 cursor-pointer"
                        onClick={() => setOverlay(true)}
                    >
                        <SquaresPlusIcon className="size-5" />
                        <p>Mostrar mais imagens</p>
                    </div>
                </div>

                {/* Colunas */}
                <div className="grid grid-cols-2">
                    <div className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl font-bold">Descrição</p>
                            <p>{place.description}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-2xl font-bold">Horários e Restrições</p>
                            <div className="">
                                <p>Checkin: {place.checkin}</p>
                                <p>Checkout: {place.checkout}</p>
                                <p>Máximo de Convidados: {place.guests}</p>
                            </div>
                        </div>
                    </div>

                    <form className="flex flex-col gap-4 justify-self-center self-center border border-gray-300 rounded-2xl px-8 py-4">
                        <p className="text-2xl font-bold text-center">Preço: R$ {place.price} por noite</p>

                        {/* Checkin e Checkout */}
                        <div className="flex">
                            <div className="border border-gray-300 rounded-tl-2xl rounded-bl-2xl px-4 py-2">
                                <p className="font-bold">Checkin</p>
                                <input 
                                    type="date" 
                                    value={checkin}
                                    onChange={(e) => setCheckin(e.target.value)}
                                />
                            </div>

                            <div className="border border-l-0 border-gray-300 rounded-tr-2xl rounded-br-2xl px-4 py-2">
                                <p className="font-bold">Checkout</p>
                                <input 
                                    type="date" 
                                    value={checkout}
                                    onChange={(e) => setCheckout(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Convidados */}
                        <div className="flex flex-col gap-2 border border-gray-300 rounded-2xl px-4 py-2">
                            <p className="font-bold">N° de convidados</p>
                            <input 
                                type="number"
                                className="border border-gray-300 rounded-2xl px-4 py-2"
                                placeholder="2"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)} 
                            />
                        </div>
                    </form>
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
                    <p className="text-2xl font-bold">Informações Extras</p>
                    <p>{place.extras}</p>
                </div>

                {/* Overlay */}
                <div className={`${overlay ? 'flex' : 'hidden'} items-start bg-black inset-0 overflow-y-auto fixed`}>
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
                        <div className="grid aspect-[3/2] grid-cols-2 gap-4">
                            {place.photos.map((photo, index) => (
                                <img
                                    className="aspect-square w-full object-cover"
                                    src={photo}
                                    alt="Imagem da acomodação"
                                />
                            ))}
                        </div>
                    </div>

                    <button 
                        className="absolute right-2 top-2 bg-white rounded-full aspect-square w-8 text-black font-bold hover:scale-105 transition cursor-pointer"
                        onClick={() => setOverlay(false)}
                    >
                        X
                    </button>
                </div>
            </div>
        </section>
    )
}