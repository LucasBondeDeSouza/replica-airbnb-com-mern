import { db } from "../../config/db.js"
import { Router } from "express";
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";

const router = Router()

router.post('/', async (req, res) => {
    db()
    const {
        title,
        city,
        photos,
        description,
        extras,
        perks,
        price,
        checkin,
        checkout,
        guests,
    } = req.body

    try {
        const { _id: owner } = await JWTVerify(req)

        const newPlaceDoc = await Place.create({
            owner,
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests
        })

        res.json(newPlaceDoc)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

export default router