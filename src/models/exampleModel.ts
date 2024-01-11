import type Postgres from "../db/postgres.js";

class ExampleModel {
  constructor(private postgresConn: Postgres) {}

  async getExampleData() {
    try {
      const client = await this.postgresConn.getPool().connect();
      const res = await client.query("SELECT * FROM TEST");
      // query the database and return the data
      //const data = ["foo", "bar", "baz"];
      return res.rows;
      
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default ExampleModel;
