import express from "express"
import 'dotenv/config'
import UserRoutes from './domains/users/routes.js'

const app = express()
const { PORT } = process.env

app.use(express.json())
app.use('/users', UserRoutes)

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`)
})