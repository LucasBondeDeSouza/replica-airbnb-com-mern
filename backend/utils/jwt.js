import "dotenv/config";
import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY } = process.env;

export const JWTVerify = (req) => {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies;

        if (!token) {
            return reject(new Error("Token não encontrado"));
        }

        jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
            if (error) {
                console.error("Erro ao verificar JWT:", error);
                return reject(error);
            }

            resolve(userInfo);
        });
    });
};

export const JWTSign = (newUserObj) => {
    return new Promise((resolve, reject) => {
        jwt.sign(newUserObj, JWT_SECRET_KEY, { expiresIn: "1d" }, (error, token) => {
            if (error) {
                console.error("Erro ao assinar JWT:", error);
                return reject(error);
            }

            resolve(token);
        });
    });
};