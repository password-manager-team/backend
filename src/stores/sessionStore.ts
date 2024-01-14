import type { RedisClientType } from "redis"

type SessionData = {
    userID: string
}

class SessionStore {
    private namespace: string
    constructor(private client: RedisClientType<any>) {
        this.namespace = "userSessions"
    }

    /**
     * Retrieves session data for a given sessionID.
     */
    async getSession(sessionID: string) {
        try {
            const data = await this.client.hGet(this.namespace, sessionID)
            if (data === undefined) {
                return data
            }

            return JSON.parse(data) as SessionData
        } catch (e) {
            if (e instanceof SyntaxError) {
                console.error("Parsing error")
            } else {
                console.error("Unhandled Redis error:", e)
            }

            return Promise.resolve(undefined)
        }
    }

    /**
     * Sets session data for a given session ID.
     * @returns Promise<boolean> which represents whether operation was successful or not
     */
    setSession(sessionID: string, data: SessionData) {
        try {
            const status = this.client.hSet(
                this.namespace,
                sessionID,
                JSON.stringify(data)
            )
            return true
        } catch (e) {
            console.error("Unhandled Redis error:", e)
            return Promise.resolve(false)
        }
    }
}

export default SessionStore
