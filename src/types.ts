declare global {
  namespace Express {
    interface Locals {
      userID: string
    }
  }
}