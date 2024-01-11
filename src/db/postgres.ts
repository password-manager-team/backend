import pg from 'pg';


class Postgres {
    constructor(private db: DBType) {
      this.init();
    }
  
    async init() {
        this.getPool().connect(function(err, client, done) {
            if (err) {
                console.log(err);
                return;
            }
            client?.query(`
                CREATE TABLE IF NOT EXISTS TEST(
                    id serial not null primary key,
                    name varchar(32)
                );
                DELETE FROM TEST;
                INSERT INTO TEST (name) values ('My name 1');
                INSERT INTO TEST (name) values ('My name 2');
             `, [], (err, res) => {
                done();
             });
        });
    }

    getPool() {
        return new pg.Pool({
            host: this.db.host,
            user: this.db.user,
            password: this.db.password,
            port: this.db.port,
            database: this.db.database
        });
    }
  }
  
  export default Postgres