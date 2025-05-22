import { MapPinIcon, SquaresPlusIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import Perk from "../../components/Perk"
import Booking from "../../components/Booking"

export default () => {
    const { id } = useParams()
    const { user } = useUserContext()
    const [place, setPlace] = useState(null)
    const [overlay, setOverlay] = useState(false)
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [guests, setGuests] = useState("")
    const [booking, setBooking] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const numberOfDays = (date1, date2) => {
        const date1GMT = date1 + 'GMT-03:00'
        const date2GMT = date2 + 'GMT-03:00'

        const dateCheckin = new Date(date1GMT)
        const dateCheckout = new Date(date2GMT)

        return (
            (dateCheckout.getTime() - dateCheckin.getTime()) / (1000 * 60 * 60 * 24)
        )
    }

    useEffect(() => {
        if (place) {
            const axiosGet = async () => {
                const { data } = await axios.get("/bookings/owner")
                setBooking(
                    data.filter((booking) => {
                        return booking.place._id === place._id
                    })[0]
                )
            }

            axiosGet()
        }
    }, [place])

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

    const handleBooking = async (e) => {
        e.preventDefault()

        if (checkin && checkout && guests) {
            const nights = numberOfDays(checkin, checkout)

            const objectBooking = { 
                place: id, 
                user: user._id, 
                price: place.price, 
                total: place.price * nights, 
                checkin, 
                checkout, 
                guests, 
                nights
            }

            const { data } = await axios.post("/bookings", objectBooking)
            
            setRedirect(true)
        } else {
            alert("Preencha todas as informações antes de fazer uma reserva!")
        }
    }

    if (redirect) return <Navigate to="/account/bookings" /> 

    if (!place) return <></>

    return (
        <section>
            <div className="flex flex-col mx-auto max-w-7xl gap-4 sm:gap-6 p-4 sm:p-8">

                {/* Titulos */}
                <div className="flex flex-col sm:gap-1">
                    <div className="text-xl sm:text-3xl font-bold">{place.title}</div>

                    <div className="flex items-center gap-1">
                        <MapPinIcon className="size-5" />
                        <p>{place.city}</p>
                    </div>
                </div>

                {/* Booking */}
                {booking && <Booking booking={booking} place={true} />}

                {/* Grade de Imagens */}
                <div className="relative grid sm:grid-cols-[2fr_1fr] sm:grid-rows-2 aspect-square sm:aspect-[3/2] rounded-2xl overflow-hidden gap-4">
                    {place.photos
                        .filter((photo, index) => index < 3)
                        .map((photo, index) => (
                            <img 
                                key={photo}
                                className={`${index === 0 && 'row-span-2 h-full object-center'} aspect-square w-full sm:object-cover transition hover:opacity-75 cursor-pointer`}
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
                <div className={`grid ${!booking && 'grid-cols-1 md:grid-cols-2'}`}>
                    <div className="order-2 md:order-none p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg sm:text-2xl font-bold">Descrição</p>
                            <p>{place.description}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-lg sm:text-2xl font-bold">Horários e Restrições</p>
                            <div className="">
                                <p>Checkin: {place.checkin}</p>
                                <p>Checkout: {place.checkout}</p>
                                <p>Máximo de Convidados: {place.guests}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-lg sm:text-2xl font-bold">Diferenciais</p>

                            <div className="flex flex-col gap-2">
                                {place.perks.map((perk) => (
                                    <div key={perk} className="flex items-center gap-2">
                                        <Perk perk={perk} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {booking ? '' : (
                        <form className="order-1 md:order-none flex flex-col gap-4 justify-self-center self-center border border-gray-300 rounded-2xl px-4 sm:px-8 py-3 sm:py-4">
                            <p className="text-lg sm:text-2xl font-bold text-center">Preço: R$ {place.price} por noite</p>

                            {/* Checkin e Checkout */}
                            <div className="flex flex-col sm:flex-row">
                                <div className="border border-gray-300 rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-none sm:rounded-bl-2xl px-4 py-2">
                                    <p className="font-bold">Checkin</p>
                                    <input 
                                        className="w-full sm:w-auto"
                                        type="date" 
                                        value={checkin}
                                        onChange={(e) => setCheckin(e.target.value)}
                                    />
                                </div>

                                <div className="border border-t-0 sm:border-t sm:border-l-0 border-gray-300 rounded-bl-2xl sm:rounded-tr-2xl sm:rounded-bl-none rounded-br-2xl px-4 py-2">
                                    <p className="font-bold">Checkout</p>
                                    <input 
                                        className="w-full sm:w-auto"
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

                            {user ? (
                                <button 
                                    className="text-center bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white"
                                    onClick={handleBooking}
                                >
                                    Reservar
                                </button>
                            ) : (
                                <Link to="/login" className="text-center bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
                                    Faça seu Login
                                </Link>
                            )}
                            
                        </form>
                    )}
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
                    <p className="text-lg sm:text-2xl font-bold">Informações Extras</p>
                    <p>{place.extras}</p>
                </div>

                {/* Overlay */}
                <div className={`${overlay ? 'flex' : 'hidden'} items-start bg-black inset-0 overflow-y-auto fixed`}>
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {place.photos.map((photo, index) => (
                                <img
                                    key={index}
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