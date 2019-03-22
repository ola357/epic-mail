"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var connectString = {
  user: "postgres",
  host: "localhost",
  database: "epicmail",
  password: process.env.DbPassword,
  port: 5432
};
var db = new _pg.Pool(connectString); // let ssl;

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

var _default = db;
exports.default = _default;