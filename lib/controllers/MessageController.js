"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Validates = _interopRequireDefault(require("../validators/Validates"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class representing API endpoints for
 * the route for messages controller
 * @param { array } inbox
 * @param { array } sent
 *  @param { object } request
 * @param { object } response
 * @returns { object } response
 */
var MessagesController =
/*#__PURE__*/
function () {
  function MessagesController() {
    _classCallCheck(this, MessagesController);
  }

  _createClass(MessagesController, null, [{
    key: "getRecievedMessages",

    /**
     * Get all Recieved messages
     */
    value: function () {
      var _getRecievedMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userId, inbox;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.user._id;
                _context.next = 3;
                return _db.default.query("SELECT id, subject, message, parentmessageid, messages.senderid, inbox.receiverid, inbox.createdon, status \n      FROM messages \n      FULL JOIN inbox\n      ON inbox.messageid = messages.id \n      WHERE inbox.receiverid = ($1) ORDER BY inbox.createdon DESC", [userId]);

              case 3:
                inbox = _context.sent;

                if (!(inbox.rowCount === 0)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(200).send({
                  status: 200,
                  data: []
                }));

              case 6:
                res.status(200).send({
                  status: 200,
                  data: inbox.rows
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getRecievedMessages(_x, _x2) {
        return _getRecievedMessages.apply(this, arguments);
      }

      return getRecievedMessages;
    }()
    /**
     *
     * Get all unread messages
     */

  }, {
    key: "getUnreadMessages",
    value: function () {
      var _getUnreadMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var userId, inbox;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.user._id;
                _context2.next = 3;
                return _db.default.query("SELECT id, subject, message, parentmessageid, messages.senderid, inbox.receiverid, inbox.createdon, status \n      FROM messages \n      FULL JOIN inbox\n      ON inbox.messageid = messages.id \n      WHERE inbox.receiverid = ($1)\n      AND inbox.status = ($2) ORDER BY inbox.createdon DESC", [userId, "unread"]);

              case 3:
                inbox = _context2.sent;

                if (!(inbox.rowCount === 0)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(200).send({
                  status: 200,
                  data: []
                }));

              case 6:
                res.status(200).send({
                  status: 200,
                  data: inbox.rows
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUnreadMessages(_x3, _x4) {
        return _getUnreadMessages.apply(this, arguments);
      }

      return getUnreadMessages;
    }()
    /**
    * Get all sent messages
    *
    */

  }, {
    key: "getSentMessages",
    value: function () {
      var _getSentMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var userId, inbox;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = req.user._id;
                _context3.next = 3;
                return _db.default.query("SELECT id, subject, message, parentmessageid, messages.senderid, sent.senderid, sent.createdon, status \n      FROM messages \n      FULL JOIN sent\n      ON sent.messageid = messages.id \n      WHERE sent.senderid = ($1)\n      AND sent.status = ($2) ORDER BY sent.createdon DESC", [userId, "sent"]);

              case 3:
                inbox = _context3.sent;

                if (!(inbox.rowCount === 0)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(200).send({
                  status: 200,
                  data: []
                }));

              case 6:
                res.status(200).send({
                  status: 200,
                  data: inbox.rows
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getSentMessages(_x5, _x6) {
        return _getSentMessages.apply(this, arguments);
      }

      return getSentMessages;
    }()
    /**
     *
     * Get A Specific Message
     */

  }, {
    key: "getSpecificMessage",
    value: function () {
      var _getSpecificMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var mailId, mail, _mail$rows$, id, createdon, subject, message, senderid, receiverid, parentmessageid, status;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mailId = parseInt(req.params.messageid, 10); // eslint-disable-next-line no-restricted-globals

                if (!isNaN(mailId)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                _context4.next = 5;
                return _db.default.query("SELECT * FROM messages WHERE (receiverid = ($1) OR senderid = ($2)) \n      AND id = ($3) ", [req.user._id, req.user._id, mailId]);

              case 5:
                mail = _context4.sent;

                if (!(mail.rowCount === 0)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", res.status(404).send({
                  status: 404,
                  error: "The message with the given ID was not found."
                }));

              case 8:
                if (!(req.user_id === mail.rows[0].receiverid)) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 11;
                return _db.default.query("UPDATE inbox SET status = \"read\" WHERE receiverid = ($1) \n        AND messageid = ($2) RETURNING *", [mailId, mail.rows[0].id]);

              case 11:
                _mail$rows$ = mail.rows[0], id = _mail$rows$.id, createdon = _mail$rows$.createdon, subject = _mail$rows$.subject, message = _mail$rows$.message, senderid = _mail$rows$.senderid, receiverid = _mail$rows$.receiverid, parentmessageid = _mail$rows$.parentmessageid, status = _mail$rows$.status;
                res.send({
                  status: 200,
                  data: [{
                    id: id,
                    createdOn: createdon,
                    subject: subject,
                    message: message,
                    senderId: senderid,
                    receiverid: receiverid,
                    parentMessageId: parentmessageid,
                    status: status
                  }]
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getSpecificMessage(_x7, _x8) {
        return _getSpecificMessage.apply(this, arguments);
      }

      return getSpecificMessage;
    }()
    /* static async getSpecificMessage(req, res) {
      const mailId = parseInt(req.params.messageid, 10);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(mailId)) return res.status(400).send({ status: 400, error: "Bad Request" });
        const mail = await db.query(
        'SELECT * FROM messages WHERE id = ($1)', [mailId],
      );
        if ((mail.rowCount === 0)) {
        return res.status(404).send({
          status: 404,
          error: "The message with the given ID was not found.",
        });
      }
        if ((mail.rows[0].senderid !== req.user._id) && (mail.rows[0].receiverid !== req.user._id)) {
        return res.status(403).send({
          status: 403,
          error: "Unauthorized.",
        });
      }
        const {
        id, createdon, subject, message, senderid, receiverid, parentmessageid, status,
      } = mail.rows[0];
        if (req.user_id === receiverid) {
        await db.query(
          'UPDATE messages SET status = ($1) WHERE id = ($2) RETURNING *', ["read", mailId],
        );
      }
        res.send({
        status: 200,
        data: [{
          id,
          createdOn: createdon,
          subject,
          message,
          senderId: senderid,
          receiverid,
          parentMessageId: parentmessageid,
          status,
        }],
      });
    } */

    /**
     *
     * Create a New message
     */

  }, {
    key: "createNewMessage",
    value: function () {
      var _createNewMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var _Validate$createMessa, error, _req$body, address, subject, message, parentMessageId, status, result, receiverid, senderId, email;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _Validate$createMessa = _Validates.default.createMessage(req.body), error = _Validate$createMessa.error;

                if (!error) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 3:
                _req$body = req.body, address = _req$body.address, subject = _req$body.subject, message = _req$body.message, parentMessageId = _req$body.parentMessageId, status = _req$body.status;
                _context5.next = 6;
                return _db.default.query('SELECT * FROM users WHERE email = ($1)', [address]);

              case 6:
                result = _context5.sent;

                if (!(result.rowCount !== 1)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", res.status(400).send('Invalid email address'));

              case 9:
                receiverid = result.rows[0].id;
                senderId = req.user._id;
                _context5.next = 13;
                return _db.default.query("INSERT INTO messages(\n        subject, message, parentmessageId, receiverid, senderid) \n         VALUES($1,$2,$3,$4,$5) RETURNING *", [subject, message, parentMessageId, receiverid, senderId]);

              case 13:
                email = _context5.sent;
                _context5.next = 16;
                return _db.default.query("INSERT INTO inbox(\n        receiverid, messageid, status)\n        VALUES($1,$2,$3)", [email.rows[0].receiverid, email.rows[0].id, "unread"]);

              case 16:
                _context5.next = 18;
                return _db.default.query("INSERT INTO sent(\n        senderid, messageid, status)\n        VALUES($1,$2,$3)", [email.rows[0].senderid, email.rows[0].id, status]);

              case 18:
                res.send({
                  status: 200,
                  data: [email.rows]
                });

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createNewMessage(_x9, _x10) {
        return _createNewMessage.apply(this, arguments);
      }

      return createNewMessage;
    }()
    /**
     * Delete a Specific Message
     *
     */

  }, {
    key: "deleteSpecificMessage",
    value: function () {
      var _deleteSpecificMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var mailId, mail;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                mailId = parseInt(req.params.id, 10); // eslint-disable-next-line no-restricted-globals

                if (!isNaN(mailId)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                _context6.next = 5;
                return _db.default.query('SELECT * FROM messages WHERE id = ($1)', [mailId]);

              case 5:
                mail = _context6.sent;

                if (!(mail.rowCount === 0)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", res.status(404).send({
                  status: 404,
                  error: "The message with the given ID was not found."
                }));

              case 8:
                if (!(mail.rows[0].senderid !== req.user._id && mail.rows[0].receiverid !== req.user._id)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", res.status(403).send({
                  status: 403,
                  error: "Unauthorized."
                }));

              case 10:
                if (!(req.user_id === mail.rows[0].receiverid)) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 13;
                return _db.default.query('UPDATE messages SET receiverid = ($1) WHERE id = ($2) RETURNING *', [null, mailId]);

              case 13:
                res.send({
                  status: 200,
                  data: [{
                    message: "mail has been deleted"
                  }]
                });

              case 14:
                if (!(req.user_id === mail.rows[0].senderid)) {
                  _context6.next = 18;
                  break;
                }

                _context6.next = 17;
                return _db.default.query('UPDATE messages SET senderid = ($1) WHERE id = ($2) RETURNING *', [null, mailId]);

              case 17:
                res.send({
                  status: 200,
                  data: [{
                    message: "mail has been deleted"
                  }]
                });

              case 18:
                if (!(mail.rows[0].senderid === null && mail.rows[0].receiverid === null)) {
                  _context6.next = 22;
                  break;
                }

                _context6.next = 21;
                return _db.default.query("\n      DELETE FROM messages \n      WHERE id = ($1)", [mailId]);

              case 21:
                res.send({
                  status: 200,
                  data: [{
                    message: "message does not exist"
                  }]
                });

              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteSpecificMessage(_x11, _x12) {
        return _deleteSpecificMessage.apply(this, arguments);
      }

      return deleteSpecificMessage;
    }()
  }]);

  return MessagesController;
}();

var _default = MessagesController;
exports.default = _default;