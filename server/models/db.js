import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connectString;
let ssl;

if (process.env.NODE_ENV === 'test') {
  connectString = {
    user: 'postgres',
    host: 'localhost',
    database: 'epicmailtest',
    password: '10million',
    port: 5432,
  };
  ssl = true;
} else {
  connectString = {
    user: 'postgres',
    host: 'localhost',
    database: 'epicmail',
    password: '10million',
    port: 5432,
  };
  ssl = false;
}

const db = new Pool(connectString, ssl);
export default db;
