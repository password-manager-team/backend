import express from "express"
import cookieparser from "cookie-parser"
import morgan from "morgan"
import exampleRouter from "./routers/exampleRouter.js"
import authRouter from "./routers/authRouter.js"

const app = express()

// Config
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieparser())

// Routes
app.use("/api", exampleRouter)
app.use("/auth", authRouter)

export default app