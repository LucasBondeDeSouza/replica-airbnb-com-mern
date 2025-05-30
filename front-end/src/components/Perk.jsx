import React from "react";
import { FaceSmileIcon, RadioIcon, ShieldCheckIcon, TruckIcon, TvIcon, WifiIcon } from "@heroicons/react/24/outline";

export default ({ perk }) => {
    const objectPerk = {
        wifi: (
            <>
                <WifiIcon className="size-6" />
                Wifi
            </>
        ),
        parking: (
            <>
                <TruckIcon className="size-6" />
                Estacionamento gratuito
            </>
        ),
        tv: (
            <>
                <TvIcon className="size-6" />
                TV
            </>
        ),
        radio: (
            <>
                <RadioIcon className="size-6" />
                Rádio
            </>
        ),
        pets: (
            <>
                <FaceSmileIcon className="size-6" />
                Pets
            </>
        ),
        entrance: (
            <>
                <ShieldCheckIcon className="size-6" />
                Entrada Privada
            </>
        )
    }

    return objectPerk[perk]
}