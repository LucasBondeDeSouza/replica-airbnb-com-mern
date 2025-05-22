import React, { useEffect, useState } from "react";
import axios from "axios"
import Booking from "../Booking";

export default () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const axiosGet = async () => {
            const { data } = await axios.get("/bookings/owner")
            setBookings(data)
        }

        axiosGet()
    }, [])

    return (
        <div className="flex w-full max-w-7xl flex-col gap-8">
            {bookings.map((booking) => (
                <Booking key={booking._id} booking={booking} />
            ))}
        </div>
    )
}