"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var models =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var createUsersTable, createMessagesTable, createInboxTable, createSentTable, createGroupsTable, createGroupMembersTable;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createUsersTable = "CREATE TABLE IF NOT EXISTS users(\n      id SERIAL PRIMARY KEY,\n      firstname VARCHAR NOT NULL,\n      lastname VARCHAR NOT NULL,\n      email VARCHAR NOT NULL UNIQUE,\n      password VARCHAR NOT NULL\n      );";
            createMessagesTable = "CREATE TABLE IF NOT EXISTS messages(\n    id SERIAL PRIMARY KEY,\n    createdon timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    subject VARCHAR NOT NULL,\n    message VARCHAR NOT NULL,\n    parentmessageid INTEGER,\n    receiverid INTEGER REFERENCES users(id) ON DELETE CASCADE,\n    senderid INTEGER REFERENCES users(id) ON DELETE CASCADE\n    );";
            createInboxTable = "CREATE TABLE IF NOT EXISTS inbox(\n      receiverid INTEGER REFERENCES users(id) ON DELETE CASCADE,\n      messageid INTEGER REFERENCES messages(id),\n      createdon timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,\n      status VARCHAR NOT NULL\n      );";
            createSentTable = "CREATE TABLE IF NOT EXISTS sent(\n        senderid INTEGER REFERENCES users(id) ON DELETE CASCADE,\n        messageid INTEGER REFERENCES messages(id),\n        createdon timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,\n        status VARCHAR NOT NULL\n        );";
            createGroupsTable = "CREATE TABLE IF NOT EXISTS groups(\n      id SERIAL PRIMARY KEY,\n      name VARCHAR NOT NULL\n      );";
            createGroupMembersTable = "CREATE TABLE IF NOT EXISTS groupmembers(\n        groupid INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,\n        memberid INTEGER REFERENCES users(id) ON DELETE CASCADE,\n        role VARCHAR NOT NULL\n        );";
            _context.next = 8;
            return _db.default.query("".concat(createUsersTable, " ").concat(createMessagesTable, " \n  ").concat(createSentTable, " ").concat(createInboxTable, " \n  ").concat(createGroupsTable, " ").concat(createGroupMembersTable));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function models() {
    return _ref.apply(this, arguments);
  };
}();

var _default = models;
exports.default = _default;