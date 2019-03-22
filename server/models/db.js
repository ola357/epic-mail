import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
/* const connectString = {
  user: "postgres",
  host: "localhost",
  database: "epicmail",
  password: process.env.DbPassword,
  port: 5432,
}; */
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
// let ssl;
/* {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
} */
/* if (process.env.NODE_ENV === 'test') {
  connectString = {
    user: process.env.DbUser,
    host: process.env.DbHost,
    database: process.env.DbDatabaseTest,
    password: process.env.DbPassword,
    port: process.env.DbPort,
  };
  ssl = true;
} else {
  connectString = {
    user: process.env.DbUser,
    host: process.env.DbHost,
    database: process.env.DbDatabase,
    password: process.env.DbPassword,
    port: process.env.DbPort,
  };
  ssl = false;
}

const db = new Pool(connectString, ssl); */
// db.connect();
export default db;
