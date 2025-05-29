import { Router } from "express"
import Booking from "./model.js"
import { db } from "../../config/db.js"
import { JWTVerify } from "../../utils/jwt.js"

const router = Router()

router.post("/", async (req, res) => {
    db()

    const { place, user, price, total, checkin, checkout, guests, nights } = req.body

    try {
        const newBookingDoc = await Booking.create({
            place, 
            user, 
            price, 
            total, 
            checkin, 
            checkout, 
            guests, 
            nights,
        })

        res.json(newBookingDoc)
    } catch (err) {
        console.log(err)
        res.status(500).json("Deu erro ao criar a reserva")
    }
})

router.get("/owner", async (req, res) => {
    db()

    try {
        const { _id: id } = await JWTVerify(req)

        try {
            const bookingDocs = await Booking.find({ user: id }).populate("place")
            res.json(bookingDocs)
        } catch (err) {
            console.log(err)
            res.status(500).json("Deu erro ao buscar todas as reservas daquele usuário")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Deu erro ao validar o token do usuário")
    }
})

export default router