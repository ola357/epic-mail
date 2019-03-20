import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connectString;
let ssl;

if (process.env.NODE_ENV === 'test') {
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

const db = new Pool(connectString, ssl);
export default db;
