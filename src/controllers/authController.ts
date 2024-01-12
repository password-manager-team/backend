import type { Request, Response } from "express"
import type AuthService from "../services/AuthService.js"
import { z } from "zod"

class AuthController {
    constructor(private authService: AuthService) {}

    async register(req: Request, res: Response) {
        const schema = z.object({
            email: z.string().email(),
            passwordHash: z.string(), // TODO: validate length
            passwordHint: z.string().min(1).max(32),
        })

        const validationResult = schema.safeParse({})

        if (!validationResult.success) {
            return res.status(422).json({ error: "Invalid data" })
        }

        const { email, passwordHash, passwordHint } = validationResult.data

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

    async login(req: Request, res: Response) {
        // TODO: req.body schema validation
        // email: string, passwordHash: string

        // replace code below with
        // const { email, passwordHash } = validatedData
        const email = "TODO"
        const passwordHash = "TODO"

        const sessionID = await this.authService.login(email, passwordHash)

        if (sessionID === null) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        // TODO: attach a sessionID cookie

        return res.status(200).json({ message: "Logged in succesfully" })
    }
}

export default AuthController
