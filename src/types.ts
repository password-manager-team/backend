declare global {
  namespace Express {
    interface Locals {
      userID: string
    }
  }

  interface DBType {
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
  }
}