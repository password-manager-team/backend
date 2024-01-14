import type { PoolClient } from "pg"

class UserModel {
    constructor(private postgresClient: PoolClient) {}

    async createUser(
        email: string,
        passwordHash: string,
        passwordHint: string
    ) {
        try {
            const user = await this.postgresClient.query<{
                id: string
                email: string
            }>(
                "INSERT INTO Users (email, password_hash, password_hint) VALUES ($1, $2, $3) RETURNING id, email",
                [email, passwordHash, passwordHint]
            )
            return user.rows[0] ?? null
        } catch (e) {
            console.error(e)
            return null
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
