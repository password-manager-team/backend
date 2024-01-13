import type { PoolClient } from "pg"

class ExampleModel {
    constructor(private postgresClient: PoolClient) {}

    async getExampleData() {
        try {
            const res = await this.postgresClient.query<{
                id: number
                name: string
            }>("SELECT id, name FROM Test")
            return res.rows
        } catch (e) {
            console.error(e)
            return null
        }
    }
}

export default ExampleModel
