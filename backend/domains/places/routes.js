import { db } from "../../config/db.js"
import { Router } from "express";
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";
import { sendToS3, downloadImage, uploadImage } from "./controller.js";

const router = Router()

router.get('/', async (req, res) => {
    db()
    try {
        const placeDocs = await Place.find()

        res.json(placeDocs)
    } catch (err) {
        console.error(err)
        res.status(500).json("Deu erro ao encontrar as acomodações")
    }
})

router.get('/owner', async (req, res) => {
    db()
    try {
        const { _id } = await JWTVerify(req)

        try {
            const placeDocs = await Place.find({ owner: _id })

            res.json(placeDocs)
        } catch (err) {
            console.error(err)
            res.status(500).json("Deu erro ao encontrar as acomodações")
        }
    } catch (err) {
        console.error(err)
        res.status(500).json("Deu erro ao verificar o usuário")
    }
})

router.get('/:id', async (req, res) => {
    db()

    const { id: _id } = req.params

    try {
        const placeDoc = await Place.findOne({ _id })

        res.json(placeDoc)
    } catch (err) {
        console.error(err)
        res.status(500).json("Deu erro ao encontrar a acomodação")
    }
})

router.put('/:id', async (req, res) => {
    db()

    const { id: _id } = req.params

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
        const updatedPlaceDoc = await Place.findOneAndUpdate(
            { _id },
            {
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
            }
        )

        res.json(updatedPlaceDoc)
    } catch (err) {
        console.log(err)
        res.status(500).json("Deu erro ao atualizar a acomodação")
    }
})

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
        const { filename, fullPath, mimeType } = await downloadImage(link)

        const fileURL = await sendToS3(filename, fullPath, mimeType)

        res.json(fileURL)
    } catch (err) {
        console.error(err)
        res.status(500).json("Deu erro ao baixar a imagem")
    }
})

router.post('/upload', uploadImage().array("files", 10), async (req, res) => {
    const { files } = req

    const filesPromise = new Promise((resolve, reject) => {
        const fileURLArray = []

        files.forEach(async (file, index) => {
            const { filename, path, mimetype } = file

            try {
                const fileURL = await sendToS3(filename, path, mimetype)
                
                fileURLArray.push(fileURL)
            } catch (err) {
                console.error("Deu algum erro ao subir para o S3", err)
                reject(err)
            }
        })

        const idInterval = setInterval(() => {
            if (files.length === fileURLArray.length) {
                clearInterval(idInterval)
                resolve(fileURLArray)
            }
        }, 100)
    })

    const fileURLArrayResolved = await filesPromise

    res.json(fileURLArrayResolved)
})

export default router