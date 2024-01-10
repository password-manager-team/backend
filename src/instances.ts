import ExampleController from "./controllers/exampleController.js"
import ExampleModel from "./models/exampleModel.js"
import ExampleService from "./services/exampleService.js"
import config from "./config.js"
import SessionStore from "./stores/sessionStore.js"
import Redis from "./db/redis.js"
import AuthController from "./controllers/authController.js"
import AuthService from "./services/AuthService.js"

const { REDIS_URL } = config

// Db
const db = null
const redisClient = await new Redis({ url: REDIS_URL }).connect()

// Stores
export const sessionStore = new SessionStore(redisClient)

// Models
export const exampleModel = new ExampleModel(db)

// Services
export const exampleService = new ExampleService(exampleModel)
export const authService = new AuthService(exampleModel, sessionStore)

// Controllers
export const exampleController = new ExampleController(exampleService)
export const authController = new AuthController(authService)
