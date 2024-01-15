import { randomUUID } from "crypto"
import type UserModel from "../models/userModel.js"
import type SessionStore from "../stores/sessionStore.js"

class AuthService {
    constructor(
        private userModel: UserModel,
        private sessionStore: SessionStore
    ) {}

    async register(email: string, passwordHash: string, passwordHint: string) {
        return this.userModel.createUser(email, passwordHash, passwordHint)
    }

    async login(email: string, passwordHash: string) {
        const user = await this.userModel.findUserByEmail(email)

        if (user === null) {
            return null
        }

        const passwordIsCorrect = passwordHash === user.password_hash

        if (!passwordIsCorrect) {
            return null
        }

        const sessionID = randomUUID() as string

        const writeSuccess = await this.sessionStore.setSession(sessionID, {
            userID: user.id.toString(),
        })

        if (!writeSuccess) {
            return null
        }

        return sessionID
    }
}

export default AuthService
