import type { Request, Response } from "express"
import type AuthService from "../services/AuthService.js"
import { z } from "zod"
import config from "../config.js"

class AuthController {
    constructor(private authService: AuthService) {}

    async postRegister(req: Request, res: Response) {
        const schema = z.object({
            body: z.object({
                email: z.string().email().min(6).max(254),
                passwordHash: z.string().max(512),
                passwordHint: z.string().min(1).max(32),
            }),
        })

        const validationResult = schema.safeParse(req)

        if (!validationResult.success) {
            return res.status(422).json({
                error: "Invalid data",
                stacktrace: validationResult.error.issues,
            })
        }

        const { email, passwordHash, passwordHint } = validationResult.data.body

        const user = await this.authService.register(
            email,
            passwordHash,
            passwordHint
        )

        if (user === null) {
            return res
                .status(400)
                .json({ error: "Failed to create an account" })
        }

        return res.status(200).json({ message: "Created an account" })
    }

    async postLogin(req: Request, res: Response) {
        const schema = z.object({
            body: z.object({
                email: z.string().email().min(6).max(254),
                passwordHash: z.string().max(512),
            }),
        })

        const validationResult = schema.safeParse(req)

        if (!validationResult.success) {
            return res.status(422).json({
                error: "Invalid data",
                stacktrace: validationResult.error.issues,
            })
        }

        const { email, passwordHash } = validationResult.data.body

        const sessionID = await this.authService.login(email, passwordHash)

        if (sessionID === null) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        res.cookie("sessionID", sessionID, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 365,
            secure: config.NODE_ENV !== "development",
        })

        return res.status(200).json({ message: "Logged in succesfully" })
    }
}

export default AuthController
