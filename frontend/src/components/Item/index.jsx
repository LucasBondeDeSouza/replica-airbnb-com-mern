import React from "react"

export default () => {

    return (
        <a href="/" className="flex flex-col gap-2">
            <img 
                src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-a920-61f7-bced-84427d6b2baa/raw?se=2025-04-24T17%3A45%3A51Z&sp=r&sv=2024-08-04&sr=b&scid=e41fdaab-abaa-54b2-85a7-36bd0201ecde&skoid=fa7966e7-f8ea-483c-919a-13acfd61d696&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-24T03%3A29%3A38Z&ske=2025-04-25T03%3A29%3A38Z&sks=b&skv=2024-08-04&sig=3v1BBst3Iw1YUqYff%2BrWlRYS20ZcnrmgfrLA1Nv6MpA%3D" 
                alt="Imagem da acomodação" 
                className="aspect-square object-cover rounded-2xl"
            />

            <div className="">
                <h3 className="text-xl font-semibold">Cabo Frio, Rio de Janeiro</h3>

                <p className="truncate text-gray-600">
                    Desfrute de dias inesquecíveis nessa charmosa casa em Cabo Frio, localizada a poucos passos da Praia do Forte. Ideal para famílias, casais ou grupos de amigos, o espaço combina conforto, estilo e uma localização privilegiada.
                </p>
            </div>

            <p>
                <span className="font-semibold">R$ 550</span> por noite
            </p>
        </a>
    )
}