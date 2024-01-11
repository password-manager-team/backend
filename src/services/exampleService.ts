import type ExampleModel from "../models/exampleModel.js"

class ExampleService {
    constructor(private exampleModel: ExampleModel) {}

    async getSomeExamples() {
        const data = await this.exampleModel.getExampleData()
        return data
    }
}

export default ExampleService
