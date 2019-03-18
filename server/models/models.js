import db from './db';

const models = () => {
  db.query(`CREATE TABLE IF NOT EXISTS "messages"(
    “id” SERIAL PRIMARY KEY,
    “createdon” timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    “subject” VARCHAR NOT NULL,
    “message” VARCHAR NOT NULL,
    ”parentmessageid” INTEGER,
    “status” VARCHAR NOT NULL,
    “receiverid” INTEGER REFERENCES "users"(id) ON DELETE CASCADE,
    “senderid” INTEGER REFERENCES "users"(id) ON DELETE CASCADE
    )`).then(() => db.query(`CREATE TABLE IF NOT EXISTS "users"(
      "id" SERIAL PRIMARY KEY,
      "firstname" VARCHAR NOT NULL,
      "lastname" VARCHAR NOT NULL,
      "email" VARCHAR NOT NULL UNIQUE,
      "password" VARCHAR NOT NULL
    )`));
};
export default models;
