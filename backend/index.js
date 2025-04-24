import express from "express"
import 'dotenv/config'

const app = express()
const { PORT } = process.env

app.get('/', (req, res) => {
    res.json("Olá, Mundo!")
})

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`)
})