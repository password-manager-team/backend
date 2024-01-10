import type { RedisClientType } from "redis"

type SessionData = {
  // userID/email and other relevant data associated with the session goes here
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
    }
    catch(e) {
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
   * @returns Promise that resolves with the result of the operation,
   * 1 if a new field is created,
   * 0 if an existing field is updated,
   * -1 if an error occurred.
   */
  setSession(sessionID: string, data: SessionData) {
    try {
      return this.client.hSet(this.namespace, sessionID, JSON.stringify(data))
    }
    catch(e) {
      console.error("Unhandled Redis error:", e)
      return Promise.resolve(-1)
    }
  }
}

export default SessionStore