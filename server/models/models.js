import db from './db';

const models = () => {
  db.query(`CREATE TABLE IF NOT EXISTS "users"(
      "id" SERIAL PRIMARY KEY,
      "firstname" VARCHAR NOT NULL,
      "lastname" VARCHAR NOT NULL,
      "email" VARCHAR NOT NULL UNIQUE,
      "password" VARCHAR NOT NULL
    )`).then(() => db.query(`CREATE TABLE IF NOT EXISTS "messages"(
      “id” SERIAL PRIMARY KEY ,
      “createdOn” timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP ,
      “subject” VARCHAR NOT NULL ,
      “message” VARCHAR NOT NULL ,
      ”parentMessageId” INTEGER,
      “status” VARCHAR NOT NULL,
      “receiverId” INTEGER REFERENCES "users"(id) ON DELETE CASCADE,
      “senderId” INTEGER REFERENCES "users"(id) ON DELETE CASCADE
    )`));
};
export default models;
