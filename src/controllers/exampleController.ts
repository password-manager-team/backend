import type { Request, Response } from "express";
import type ExampleService from "../services/exampleService.js";

class ExampleController {
  constructor(private exampleService: ExampleService) {}

  async getExamples(req: Request, res: Response) {
    const items = await this.exampleService.getSomeExamples();
    res.status(200).json({ items });
  }
}

export default ExampleController;
