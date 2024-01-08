import { Router } from "express";
import ExampleController from "../controllers/exampleController.js";
import { exampleService } from "../instances.js";

const controller = new ExampleController(exampleService);

const router = Router();

// use bind to make sure the controller function keeps controller as 'this'
router.get("example", controller.getExamples.bind(controller));

export default router;
