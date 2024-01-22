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
                INSERT INTO Test (name) VALUES ('My name 1');
                INSERT INTO Test (name) VALUES ('My name 2');
            `),
            client.query(`
                CREATE TABLE IF NOT EXISTS Users(
                    id SERIAL NOT NULL PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password_hash VARCHAR(512) NOT NULL,
                    password_hint VARCHAR(32) NOT NULL
                );
            `),
            client.query(`
                CREATE TABLE IF NOT EXISTS Folder(
                    id SERIAL NOT NULL PRIMARY KEY,
                    folder_name VARCHAR(31) NOT NULL,
                    position INTEGER,
                    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS Vault(
                    id SERIAL NOT NULL PRIMARY KEY,
                    domain VARCHAR(255) NOT NULL, 
                    username_email VARCHAR(255) NOT NULL, 
                    password VARCHAR(255) NOT NULL,
                    folder_id INTEGER REFERENCES Folder(id) ON DELETE SET NULL, 
                    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE, 
                    UNIQUE(user_id, domain, username_email)
                );
                CREATE INDEX IF NOT EXISTS idx_vault_user_id_folder_id ON Vault(user_id, folder_id) INCLUDE (domain, username_email, password);
                CREATE INDEX IF NOT EXISTS idx_folder_user_id ON Folder(user_id) INCLUDE (folder_name);
            `),
            // test data
            client.query(`
                DELETE FROM Users;
                DELETE FROM Vault;
                DELETE FROM Folder;
            `),
            client.query(`
                DELETE FROM Users;
                DELETE FROM Vault;
                DELETE FROM Folder;
                INSERT INTO Users (id, email, password_hash, password_hint)
                VALUES 
                    (1, 'user1@example.com', 'hash1', 'hint1'),
                    (2, 'user2@example.com', 'hash2', 'hint2'),
                    (3, 'user3@example.com', 'hash3', 'hint3');
            `),
            client.query(`
                INSERT INTO Folder (id, folder_name, position, user_id)
                VALUES 
                    (1, 'Work', 1, 1),
                    (2, 'Personal', 2, 1),
                    (3, 'Travel', 1, 2);
            `),
            client.query(`
                INSERT INTO Vault (id, domain, username_email, password, folder_id, user_id)
                VALUES 
                    (1, 'example.com', 'user1@example.com', 'password1', 1, 1),
                    (2, 'work.com', 'contact@work.com', 'password2', 1, 1),
                    (3, 'travel.com', 'booking@travel.com', 'password3', 3, 2);
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
