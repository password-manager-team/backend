import pg from 'pg';

export interface DBType {
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
}

export class Postgres {
    constructor(private db: DBType) {
      this.init();
    }
  
    async init() {
        const client = await this.getPool().connect();
        const res = await client.query(`
            CREATE TABLE IF NOT EXISTS TEST(
                id serial not null primary key,
                name varchar(32)
            );
            DELETE FROM TEST;
            INSERT INTO TEST (name) values ('My name 1');
            INSERT INTO TEST (name) values ('My name 2');
        `);
        return client;
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