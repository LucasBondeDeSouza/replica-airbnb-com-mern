import React, { useState } from "react";
import axios from "axios";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Perks from "../Perks";
import { Navigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"

export default () => {
    const { user } = useUserContext()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [photos, setPhotos] = useState([])
    const [perks, setPerks] = useState([])
    const [description, setDescription] = useState("")
    const [extras, setExtras] = useState("")
    const [price, setPrice] = useState("")
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [guests, setGuests] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title && city && description && price && checkin && checkout && guests) {
            try {
                const newPlace = await axios.post('/places', {
                    owner: user._id, title, city, photos, description, extras, perks, price, checkin, checkout, guests,
                })
                console.log(newPlace)
                setRedirect(true)
            } catch (err) {
                console.error(JSON.stringify(err))
                alert('Deu erro ao criar um novo lugar!')
            }
        }
    }

    if (redirect) return <Navigate to="/account/places" />

    return (
        <form onSubmit={handleSubmit} className="w-full px-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-2xl font-bold ml-2">Título</label>
                <input 
                    type="text" 
                    placeholder="Digite o título do seu anúncio" 
                    className="rounded-full border border-gray-300 py-2 px-4"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-2xl font-bold ml-2">Cidade e País</label>
                <input 
                    type="text" 
                    placeholder="Digite a cidade e país do seu anúncio" 
                    className="rounded-full border border-gray-300 py-2 px-4"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="photos" className="text-2xl font-bold ml-2">Fotos</label>
                
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Adicione uma foto pelo link" 
                        className="rounded-full border border-gray-300 py-2 px-4 grow"
                        id="photos"
                        value={photos}
                        onChange={(e) => setPhotos(e.target.value)}
                    />

                    <button className="rounded-full border border-gray-300 px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer transition">Enviar Foto</button>
                </div>

                <div className="grid grid-cols-5 gap-4 mt-2">
                    <label htmlFor="file" className="flex gap-2 items-center justify-center border border-gray-300 rounded-2xl aspect-square cursor-pointer">
                        <input type="file" id="file" className="hidden" />
                        <ArrowUpTrayIcon className="size-6" />
                        <span className="hidden md:block">Upload</span>
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-2xl font-bold ml-2">Descrição</label>
                <textarea
                    placeholder="Digite a descrição do seu anúncio" 
                    className="rounded-2xl border border-gray-300 py-2 px-4 h-56 resize-none"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="perks" className="text-2xl font-bold ml-2">Comodidades</label>

                <Perks perks={perks} setPerks={setPerks} />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="extras" className="text-2xl font-bold ml-2">Informações Extras</label>
                <textarea
                    placeholder="Digite aqui qualquer tipo de informação extra sobre seu anúncio" 
                    className="rounded-2xl border border-gray-300 py-2 px-4 h-56 resize-none"
                    id="extras"
                    value={extras}
                    onChange={(e) => setExtras(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold ml-2">Restrições e Preços</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price" className="ml-2 text-xl font-bold">Preço</label>
                        <input 
                            type="number" 
                            placeholder="500" 
                            className="rounded-full border border-gray-300 py-2 px-4"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="checkin" className="ml-2 text-xl font-bold">Checkin</label>
                        <input 
                            type="text" 
                            placeholder="16:50" 
                            className="rounded-full border border-gray-300 py-2 px-4"
                            id="checkin"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="checkout" className="ml-2 text-xl font-bold">Checkout</label>
                        <input 
                            type="text" 
                            placeholder="12:00" 
                            className="rounded-full border border-gray-300 py-2 px-4"
                            id="checkin"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="guests" className="ml-2 text-xl font-bold">N° convidados</label>
                        <input 
                            type="number" 
                            placeholder="4" 
                            className="rounded-full border border-gray-300 py-2 px-4"
                            id="guests"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <button className="bg-primary-400 hover:bg-primary-500 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition">
                Salvar Informações
            </button>
        </form>
    )
}