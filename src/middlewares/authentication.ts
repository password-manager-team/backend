import type { Request, Response, NextFunction } from "express"
import { sessionStore } from "../instances.js"

export async function authGuard(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Validate the sessionID cookie
    const { sessionID } = req.cookies
    if (typeof sessionID !== "string") {
        return res.status(401).json({ error: "Invalid sessionID" })
    }

    // Retrieve the session data from a Redis store
    const sessionData = await sessionStore.getSession(sessionID)
    if (!sessionData) {
        return res.status(401).json({ error: "Invalid sessionID" })
    }

    // Pass the userID to the subsequent middlewares
    res.locals.userID = sessionData.userID

    next()
}