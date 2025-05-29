import { Router } from "express"
import Booking from "./model.js"
import { db } from "../../config/db.js"
import { JWTVerify } from "../../utils/jwt.js"

const router = Router()

// Rota para criar nova reserva
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

// Rota para buscar reservas do usuário autenticado
router.get("/owner", async (req, res) => {
    db()

    try {
        const userInfo = await JWTVerify(req)

        if (!userInfo) {
            return res.status(401).json("Token não encontrado ou inválido")
        }

        const { _id: id } = userInfo

        try {
            const bookingDocs = await Booking.find({ user: id }).populate("place")
            res.json(bookingDocs)
        } catch (err) {
            console.log(err)
            res.status(500).json("Deu erro ao buscar as reservas do usuário")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Erro ao verificar o token")
    }
})

export default router