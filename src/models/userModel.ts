import type { PoolClient } from "pg"

class UserModel {
    constructor(private postgresClient: PoolClient) {}

    async createUser(
        email: string,
        passwordHash: string,
        passwordHint: string
    ) {
        try {
            const res = await this.postgresClient.query<{
                id: number
                name: string
            }>(
                "INSERT into Users (email, password_hash, password_hint) VALUES ($1, $2, $3)",
                [email, passwordHash, passwordHint]
            )
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async findUserByEmail(email: string) {
        try {
            const res = await this.postgresClient.query<{
                id: number
                email: string
            }>("SELECT id, email FROM Users WHERE email = $1", [email])
            return res.rows[0]
        } catch (e) {
            console.error(e)
            return null
        }
    }
}

export default UserModel
