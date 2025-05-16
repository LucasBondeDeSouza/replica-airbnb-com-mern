import React from "react";
import axios from "axios";

import { ArrowUpTrayIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";

export default ({ photoLink, setPhotoLink, photos, setPhotos }) => {

    const uploadByLink = async (e) => {
        e.preventDefault()

        if (photoLink) {
            try {
                const { data: filename } = await axios.post('/places/upload/link', {
                    link: photoLink,
                })

                setPhotos((prevValue) => [...prevValue, filename])
            } catch (err) {
                alert('Deu erro na hora do upload por link', JSON.stringify(err))
            }
        } else {
            alert('Não existe nenhum link a ser enviado!')
        }
    }

    const uploadPhoto = async (e) => {
        const { files } = e.target
        const formData = new FormData()
        const filesArray = [...files]

        filesArray.forEach((file) => formData.append("files", file))

        try {
            const { data: urlArray } = await axios.post('/places/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            setPhotos((prevValue) => [...prevValue, ...urlArray])
        } catch (err) {
            alert('Deu erro na hora do upload', JSON.stringify(err))
        }
    }

    const deletePhoto = (fileURL) => {
        const newPhotos = photos.filter(photo => photo !== fileURL)
        setPhotos(newPhotos)
    }

    const promotePhoto = (fileURL) => {
        const newPhotos = [fileURL, ...photos.filter(photo => photo !== fileURL)]
        setPhotos(newPhotos)
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="photos" className="text-2xl font-bold ml-2">Fotos</label>
                    
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Adicione uma foto pelo link" 
                    className="rounded-full border border-gray-300 py-2 px-4 grow"
                    id="photoLink"
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                />
    
                <button 
                    onClick={uploadByLink} 
                    className="rounded-full border border-gray-300 px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
                        Enviar Foto
                    </button>
            </div>
    
            <div className="grid grid-cols-5 gap-4 mt-2">
                {photos.map((photo) => (
                    <div className="relative">
                        <img 
                            key={photo}
                            className="aspect-square object-cover rounded-2xl"
                            src={`${photo}`}
                            alt="Imagens do lugar" 
                        />

                        <div className="flex absolute right-2 bottom-2 gap-1">
                            <div 
                                onClick={() => promotePhoto(photo)}
                                className="bg-gray-100 opacity-75 rounded-full p-2 cursor-pointer transition hover:bg-primary-400 hover:text-white"
                            >
                                <StarIcon className="size-6" />
                            </div>

                            <div 
                                onClick={() => deletePhoto(photo)}
                                className="bg-gray-100 opacity-75 rounded-full p-2 cursor-pointer transition hover:bg-primary-400 hover:text-white"
                            >
                                <TrashIcon className="size-6" />
                            </div>
                        </div>
                    </div>
                ))}

                <label htmlFor="file" className="flex gap-2 items-center justify-center border border-gray-300 rounded-2xl aspect-square cursor-pointer">
                    <input 
                        type="file" 
                        id="file" 
                        className="hidden" 
                        multiple
                        onChange={uploadPhoto}
                    />
                    <ArrowUpTrayIcon className="size-6" />
                    <span className="hidden md:block">Upload</span>
                </label>
            </div>
        </div>
    )
}