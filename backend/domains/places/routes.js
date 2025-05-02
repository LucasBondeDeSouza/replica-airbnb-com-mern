import { db } from "../../config/db.js"
import { Router } from "express";
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";
import { downloadImage } from "../../utils/imageDownloader.js";
import { __dirname } from "../../server.js";

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

router.post('/upload/link', async (req, res) => {
    const { link } = req.body

    try {
        const filename = await downloadImage(link, `${__dirname}/tmp/`)
        res.json(filename)
    } catch (err) {
        console.error(err)
        res.status(500).json("Deu erro ao baixar a imagem")
    }
})

export default router