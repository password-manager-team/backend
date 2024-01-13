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
        // TODO: check if credentials are correct

        // TODO: generate a sessionID and persist in sessionStore

        // TODO: return sessionID
        return null
    }
}

export default AuthService
