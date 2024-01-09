import express from "express"
import cookieparser from "cookie-parser"
import exampleRouter from "./routers/exampleRouter.js"

const app = express()

// Config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieparser())

// Routes
app.use("/api", exampleRouter)

export default app
