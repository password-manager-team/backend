class ExampleModel {
  constructor(private db: unknown) {}

  async getExampleData() {
    try {
      // query the database and return the data
      const data = ["foo", "bar", "baz"];
      return data;
    } catch (e) {
      return null;
    }
  }
}

export default ExampleModel;
