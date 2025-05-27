import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
import { fileURLToPath } from "url"
import { dirname } from "path"

export const app = express()

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  'http://localhost:5173',
  'https://hashbnb.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use("/tmp", express.static(__dirname + '/tmp'))

app.use(routes)