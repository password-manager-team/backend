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
                CREATE TABLE IF NOT EXISTS Vaults (
                  id SERIAL PRIMARY KEY,
                  userID INT REFERENCES Users(id) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS Folders (
                  id SERIAL PRIMARY KEY,
                  vaultID INT REFERENCES Vaults(id) ON DELETE CASCADE,
                  name VARCHAR(255) NOT NULL
                );
                CREATE TABLE IF NOT EXISTS Items (
                  id SERIAL PRIMARY KEY,
                  folderID INT REFERENCES Folders(id) ON DELETE CASCADE,
                  name VARCHAR(255) NULL,
                  domain VARCHAR(255) NOT NULL,
                  login VARCHAR(255) NOT NULL,
                  password VARCHAR(255) NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_vaults_userID ON Vaults(userID);
                CREATE INDEX IF NOT EXISTS idx_folders_vaultID ON Folders(vaultID);
                CREATE INDEX IF NOT EXISTS dx_items_folderID ON Items(folderID) Include (name, domain, login, password);
            `),

            client.query(`
                DELETE FROM Users;
                DELETE FROM Vaults;
                DELETE FROM Folders;
                DELETE FROM Items;
                INSERT INTO Users (id, email, password_hash, password_hint) VALUES
                (1, 'user1@example.com', 'hashedpassword1', 'My first pet’s name'),
                (2, 'user2@example.com', 'hashedpassword2', 'My favorite movie');
                INSERT INTO Vaults (id, userID) VALUES
                (1, 1),
                (2, 2);
                INSERT INTO Folders (id, vaultID, name) VALUES
                (1, 1, 'Personal'),
                (2, 1, 'Work'),
                (3, 2, 'Family');
                INSERT INTO Items (id, folderID, name, domain, login, password) VALUES
                (1, 1, 'Email Account', 'email.com', 'user1', 'password123'),
                (2, 2, 'Work Portal', 'work.com', 'user1work', 'workpass456'),
                (3, 3, 'Social Media', 'social.com', 'familyuser', 'familypass789');
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
