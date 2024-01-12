import ExampleController from "./controllers/exampleController.js"
import ExampleModel from "./models/exampleModel.js"
import ExampleService from "./services/exampleService.js"
import config from "./config.js"
import SessionStore from "./stores/sessionStore.js"
import Redis from "./db/redis.js"
import AuthController from "./controllers/authController.js"
import AuthService from "./services/AuthService.js"
import { Postgres } from "./db/postgres.js"

const { REDIS_URL } = config

const redisClient = await new Redis({ url: REDIS_URL }).connect()
const postgresClient = await new Postgres({
    host: config.POSTGRES_HOST,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    port: parseInt(config.POSTGRES_PORT)
}).init()

// Stores
export const sessionStore = new SessionStore(redisClient)

// Models
export const exampleModel = new ExampleModel(postgresClient)

// Services
export const exampleService = new ExampleService(exampleModel)
export const authService = new AuthService(exampleModel, sessionStore)

// Controllers
export const exampleController = new ExampleController(exampleService)
export const authController = new AuthController(authService)