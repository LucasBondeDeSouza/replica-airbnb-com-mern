import React from "react";
import Perk from "../Perk";

export default ({ perks, setPerks }) => {

    const handleClick = (target) => {
        const newPerks = target.checked 
            ? [...perks, target.value] 
            : [...perks].filter((perk) => perk !== target.value)
        
        setPerks(newPerks)
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <label htmlFor="wifi" className="flex gap-2 items-center px-4 py-3 rounded-2xl border border-gray-300 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="wifi"
                    value="wifi"
                    checked={perks.includes("wifi")}
                    onChange={(e) => handleClick(e.target)}
                />
                <Perk perk={"wifi"} />
            </label>

            <label htmlFor="parking" className="flex gap-2 items-center px-4 py-3 rounded-2xl border border-gray-300 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="parking"
                    value="parking"
                    checked={perks.includes("parking")}
                    onChange={(e) => handleClick(e.target)}
                />
                <Perk perk={"parking"} />
            </label>

            <label htmlFor="tv" className="flex gap-2 items-center px-4 py-3 rounded-2xl border border-gray-300 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="tv"
                    value="tv"
                    checked={perks.includes("tv")}
                    onChange={(e) => handleClick(e.target)}
                />
                <Perk perk={"tv"} />
            </label>

            <label htmlFor="radio" className="flex gap-2 items-center px-4 py-3 rounded-2xl border border-gray-300 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="radio"
                    value="radio"
                    checked={perks.includes("radio")}
                    onChange={(e) => handleClick(e.target)}
                />
                <Perk perk={"radio"} />
            </label>

            <label htmlFor="pets" className="flex gap-2 items-center px-4 py-3 rounded-2xl border border-gray-300 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="pets"
                    value="pets"
                    checked={perks.includes("pets")}
                    onChange={(e) => handleClick(e.target)}
                />
                <Perk perk={"pets"} />
            </label>

            <label htmlFor="entrance" className="flex gap-2 items-center px-4 py-3 rounded-2xl border border-gray-300 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="entrance"
                    value="entrance"
                    checked={perks.includes("entrance")}
                    onChange={(e) => handleClick(e.target)}
                />
                <Perk perk={"entrance"} />
            </label>
        </div>
    )
}