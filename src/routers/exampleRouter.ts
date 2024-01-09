import { Router } from "express";
import { exampleController } from "../instances.js";

const router = Router();

// use bind to make sure the method keeps the controller as 'this'
router.get("/example", exampleController.getExamples.bind(exampleController));

export default router;
