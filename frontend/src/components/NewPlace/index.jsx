import React, { useEffect, useState } from "react";
import axios from "axios";

import Perks from "../Perks";
import { Navigate, useParams } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import PhotoUploader from "../PhotoUploader";

export default () => {
    const { id } = useParams()
    const { user } = useUserContext()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [photoLink, setPhotoLink] = useState("")
    const [photos, setPhotos] = useState([])
    const [perks, setPerks] = useState([])
    const [description, setDescription] = useState("")
    const [extras, setExtras] = useState("")
    const [price, setPrice] = useState("")
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [guests, setGuests] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (id) {
            const axiosGet = async () => {
                const { data } = await axios.get(`/places/${id}`)
                
                setTitle(data.title)
                setCity(data.city)
                setPhotos(data.photos)
                setPerks(data.perks)
                setDescription(data.description)
                setExtras(data.extras)
                setPrice(data.price)
                setCheckin(data.checkin)
                setCheckout(data.checkout)
                setGuests(data.guests)
            }

            axiosGet()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title && city && photos.length > 0 && description && price && checkin && checkout && guests) {
            if (id) {
                try {
                    const modifiedPlacePlace = await axios.put(`/places/${id}`, {
                        title, city, photos, description, extras, perks, price, checkin, checkout, guests,
                    })
                } catch (err) {
                    console.error(JSON.stringify(err))
                    alert("Deu erro ao tentar atualizar o lugar")
                }
            } else {
                try {
                    const newPlace = await axios.post("/places", {
                        owner: user._id, title, city, photos, description, extras, perks, price, checkin, checkout, guests,
                    })
                } catch (err) {
                    console.error(JSON.stringify(err))
                    alert("Deu erro ao tentar criar um novo lugar")
                }
            }
            
            setRedirect(true)
        
        } else {
            alert("Preencha todas as informações antes de enviar")
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

            <PhotoUploader 
                photoLink={photoLink} 
                setPhotoLink={setPhotoLink} 
                photos={photos} 
                setPhotos={setPhotos} 
            />

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