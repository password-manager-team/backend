import type { PoolClient } from "pg";

class ExampleModel {
  constructor(private postgresClient: PoolClient) {}

  async getExampleData() {
    try {
      const res = await this.postgresClient.query("SELECT * FROM TEST");
      return res.rows;
      
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default ExampleModel;
