import pg from "pg"

export interface DBType {
    host: string
    user: string
    password: string
    database: string
    port: number
}

export class Postgres {
    constructor(private db: DBType) {}

    async init() {
        const client = await this.getPool().connect()

        const queryResults = await Promise.all([
            client.query(`
                CREATE TABLE IF NOT EXISTS Test(
                    id SERIAL NOT NULL PRIMARY KEY,
                    name VARCHAR(32)
                );
                DELETE FROM Test;
                INSERT INTO Test (name) values ('My name 1');
                INSERT INTO Test (name) values ('My name 2');
            `),
            client.query(`
                CREATE TABLE IF NOT EXISTS Users(
                    id SERIAL NOT NULL PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password_hash VARCHAR(512) NOT NULL,
                    password_hint VARCHAR(32) NOT NULL
                );
            `),
        ])

        return client
    }

    getPool() {
        return new pg.Pool({
            host: this.db.host,
            user: this.db.user,
            password: this.db.password,
            port: this.db.port,
            database: this.db.database,
        })
    }
}
