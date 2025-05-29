import "dotenv/config"
import jwt from "jsonwebtoken"

const { JWT_SECRET_KEY } = process.env

export const JWTVerify = (req) => {
    const { token } = req.cookies

    return new Promise((resolve, reject) => {
        if (!token) {
            return reject(new Error("Token não enviado"))
        }

        jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
            if (error) {
                console.error("Erro ao verificar token:", error)
                return reject(error)
            }

            resolve(userInfo)
        })
    })
}

export const JWTSign = (newUserObj) => {
    return new Promise((resolve, reject) => {
        jwt.sign(newUserObj, JWT_SECRET_KEY, {expiresIn: "1d"}, (error, token) => {
            if (error) {
                console.error(error)
                reject(error)
            }
    
            resolve(token)
        })
    })
}