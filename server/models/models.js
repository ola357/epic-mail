import db from './db';

const models = async () => {
  const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR NOT NULL,
      lastname VARCHAR NOT NULL,
      email VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL
      );`;
  const createMessagesTable = `CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    createdon timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subject VARCHAR NOT NULL,
    message VARCHAR NOT NULL,
    parentmessageid INTEGER,
    receiverid INTEGER REFERENCES users(id) ON DELETE CASCADE,
    senderid INTEGER REFERENCES users(id) ON DELETE CASCADE
    );`;
  const createInboxTable = `CREATE TABLE IF NOT EXISTS inbox(
      receiverid INTEGER REFERENCES users(id) ON DELETE CASCADE,
      messageid INTEGER REFERENCES messages(id),
      createdon timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR NOT NULL
      );`;
  const createSentTable = `CREATE TABLE IF NOT EXISTS sent(
        senderid INTEGER REFERENCES users(id) ON DELETE CASCADE,
        messageid INTEGER REFERENCES messages(id),
        createdon timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR NOT NULL
        );`;
  const createGroupsTable = `CREATE TABLE IF NOT EXISTS groups(
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL
      );`;
  const createGroupMembersTable = `CREATE TABLE IF NOT EXISTS groupmembers(
        groupid INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
        memberid INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role VARCHAR NOT NULL
        );`;
  await db.query(`${createUsersTable} ${createMessagesTable} 
  ${createSentTable} ${createInboxTable} 
  ${createGroupsTable} ${createGroupMembersTable}`);
};
export default models;
