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

router.post('/login', async (req, res) => {
    db()
    const { email, password } = req.body

    try {
        const userDoc = await User.findOne({ email })
        
        if (userDoc) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password)
            const {name, _id} = userDoc
            passwordCorrect ? res.json({name, email, _id}) : res.status(400).json("Senha Inválida!")
        } else {
            res.status(400).json("Usuário não encontrado!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router