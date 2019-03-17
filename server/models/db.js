import { Pool } from 'pg';

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'epicmail',
  password: '10million',
  port: 5432,
});

export default db;
