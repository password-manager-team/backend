import { Router } from "express"
import { authController } from "../instances.js"

const router = Router()

router.post("/register", authController.postRegister.bind(authController))
router.post("/login", authController.postLogin.bind(authController))

export default router
