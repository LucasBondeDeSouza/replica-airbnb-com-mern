import { Router } from "express"
import { db } from "../../config/db.js"
import User from "./model.js"
import bcrypt from "bcryptjs"
import "dotenv/config"
import { JWTVerify, JWTSign } from "../../utils/jwt.js"

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

router.get('/profile', async (req, res) => {
    const userInfo = await JWTVerify(req)
    
    res.json(userInfo)
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
        const { _id } = newUserDoc
        const newUserObj = { name, email, _id }

        try {
            const token = await JWTSign(newUserObj)
            res.cookie("token", token).json(newUserObj)
        } catch (err) {
            res.status(500).json("Erro ao assinar com o JWT", err)
        }
    } catch (err) {
        res.status(500).json(err)
        throw err
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

            if (passwordCorrect) {
                const newUserObj = { name, email, _id }
                try {
                    const token = await JWTSign(newUserObj)
                    
                    res.cookie("token", token).json(newUserObj) 
                } catch (err) {
                    res.status(500).json("Erro ao assinar com o JWT", err)
                }
            } else {
                res.status(400).json("Senha Inválida!")
            }
        } else {
            res.status(400).json("Usuário não encontrado!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("token").json("Deslogado com sucesso!")
})

export default router