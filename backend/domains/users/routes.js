import { Router } from "express"
import { db } from "../../config/db.js"
import User from "./model.js"
import bcrypt from "bcryptjs"

const router = Router()
const bcryptSalt = bcrypt.genSaltSync()

router.get('/', async (req, res) => {
    db()
    try {
        const userDoc = await User.find()
        res.json(userDoc)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    db()

    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, bcryptSalt)

    try {
        const newUserDoc = await User.create({
            name,
            email,
            password: encryptedPassword,
        })

        res.json(newUserDoc)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router