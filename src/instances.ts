import ExampleModel from "./models/exampleModel.js";
import ExampleService from "./services/exampleService.js";

// Db
const db = null;

// Models
export const exampleModel = new ExampleModel(db);

// Services
export const exampleService = new ExampleService(exampleModel);
