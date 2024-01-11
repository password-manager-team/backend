import type SessionStore from "../stores/sessionStore.js"

class AuthService {
    constructor(
        private userModel: unknown,
        private sessionStore: SessionStore
    ) {}

    async register(email: string, passwordHash: string, passwordHint: string) {
        // TODO: check if email is not in use

        // TODO: create the user

        // TODO: return the user
        return null
    }

    async login(email: string, passwordHash: string) {
        // TODO: check if credentials are correct

        // TODO: generate a sessionID and persist in sessionStore

        // TODO: return sessionID
        return null
    }
}

export default AuthService
