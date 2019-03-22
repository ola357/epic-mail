"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Validates = _interopRequireDefault(require("../validators/Validates"));

var _db = _interopRequireDefault(require("../models/db"));

var _util = require("util");

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
var GroupsController =
/*#__PURE__*/
function () {
  function GroupsController() {
    _classCallCheck(this, GroupsController);
  }

  _createClass(GroupsController, null, [{
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _Validate$createGroup, error, name, group, groupid, memberid, role, member;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Validate$createGroup = _Validates.default.createGroup(req.body), error = _Validate$createGroup.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 3:
                name = req.body.name;
                _context.next = 6;
                return _db.default.query("INSERT INTO groups(name) \n      VALUES($1) RETURNING *", [name]);

              case 6:
                group = _context.sent;
                groupid = group.rows[0].id;
                memberid = req.user._id;
                role = "admin";
                _context.next = 12;
                return _db.default.query("INSERT INTO groupmembers(groupid, memberid, role) \n      VALUES($1, $2, $3) RETURNING *", [groupid, memberid, role]);

              case 12:
                member = _context.sent;
                res.status(200).send({
                  status: 200,
                  data: [{
                    id: group.rows[0].id,
                    name: group.rows[0].name,
                    role: member.rows[0].role
                  }]
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "getGroups",
    value: function () {
      var _getGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var userId, groups;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.user._id;
                _context2.next = 3;
                return _db.default.query("SELECT * FROM groupmembers \n      WHERE memberid = ($1) \n      INNER JOIN groups ON groupmembers.groupid = group.id", [userId]);

              case 3:
                groups = _context2.sent;

                if (!(groups.rowCount === 0 || groups === null)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(404).send({
                  status: 404,
                  error: "You haven't joined any group."
                }));

              case 6:
                res.status(200).send({
                  status: 200,
                  data: groups.rows
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getGroups(_x3, _x4) {
        return _getGroups.apply(this, arguments);
      }

      return getGroups;
    }()
  }, {
    key: "editGroupName",
    value: function () {
      var _editGroupName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var groupid, _Validate$createGroup2, error, name, memberid, member, group;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                groupid = parseInt(req.params.groupId, 10);

                if (!isNaN(groupid)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                _Validate$createGroup2 = _Validates.default.createGroup(req.body), error = _Validate$createGroup2.error;

                if (!error) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 6:
                name = req.body.name;
                memberid = req.user._id;
                _context3.next = 10;
                return _db.default.query("SELECT role FROM groupmembers\n        WHERE memberid = ($1)\n        AND groupid = ($2)", [memberid, groupid]);

              case 10:
                member = _context3.sent;

                if (!(member.rowCount === 0 || member.rows[0].role === null)) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", res.status(401).send({
                  status: 401,
                  error: "You are not a member of this group"
                }));

              case 13:
                _context3.next = 15;
                return _db.default.query("UPDATE groups \n        SET name = ($1) WHERE id = ($2) RETURNING *", [name, groupid]);

              case 15:
                group = _context3.sent;
                res.status(200).send({
                  status: 200,
                  data: [{
                    id: group.rows[0].id,
                    name: group.rows[0].name,
                    role: member.rows[0].role
                  }]
                });

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function editGroupName(_x5, _x6) {
        return _editGroupName.apply(this, arguments);
      }

      return editGroupName;
    }()
    /** *********************************
    * Delete a Group
    */

  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var groupid, memberid, member;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                groupid = parseInt(req.params.groupId, 10);

                if (!isNaN(groupid)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                memberid = req.user._id;
                _context4.next = 6;
                return _db.default.query("SELECT role FROM groupmembers\n        WHERE memberid = ($1)\n        AND groupid = ($2)", [memberid, groupid]);

              case 6:
                member = _context4.sent;

                if (!(member.rowCount === 0 || member.rows[0].role === 'member')) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", res.status(401).send({
                  status: 401,
                  error: "Not Allowed"
                }));

              case 9:
                _context4.next = 11;
                return _db.default.query("\n      DELETE FROM groups \n      WHERE id = ($1)", [groupid]);

              case 11:
                res.send({
                  status: 200,
                  data: [{
                    message: "group has been deleted"
                  }]
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteGroup(_x7, _x8) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
    /** **********************************
    * Adds a New user to Group
    */

  }, {
    key: "addUserToGroup",
    value: function () {
      var _addUserToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var groupid, _Validate$addGroupUse, error, _req$body, email, status, memberid, member, user, result;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                groupid = parseInt(req.params.groupId, 10);

                if (!isNaN(groupid)) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                _Validate$addGroupUse = _Validates.default.addGroupUser(req.body), error = _Validate$addGroupUse.error;

                if (!error) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 6:
                _req$body = req.body, email = _req$body.email, status = _req$body.status;
                memberid = req.user._id;
                _context5.next = 10;
                return _db.default.query("SELECT role FROM groupmembers\n        WHERE memberid = ($1)\n        AND groupid = ($2)", [memberid, groupid]);

              case 10:
                member = _context5.sent;

                if (!(member.rowCount === 0 || member.rows[0].role === 'member')) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", res.status(401).send({
                  status: 401,
                  error: "Not Allowed"
                }));

              case 13:
                _context5.next = 15;
                return _db.default.query("SELECT * FROM users\n        WHERE email = ($1)", [email]);

              case 15:
                user = _context5.sent;

                if (!(user.rowCount === 0)) {
                  _context5.next = 18;
                  break;
                }

                return _context5.abrupt("return", res.status(404).send({
                  status: 404,
                  error: "Not Allowed"
                }));

              case 18:
                _context5.next = 20;
                return _db.default.query("INSERT INTO groupmembers(groupid, memberid, role) \n      VALUES($1, $2, $3) RETURNING *", [groupid, user.rows[0].id, status]);

              case 20:
                result = _context5.sent;
                res.status(200).send({
                  status: 200,
                  data: [result.rows[0]]
                });

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addUserToGroup(_x9, _x10) {
        return _addUserToGroup.apply(this, arguments);
      }

      return addUserToGroup;
    }()
    /** ****************************************************
     * Delete
     * A User From a Group
     */

  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var groupid, userid, memberid, member;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                groupid = parseInt(req.params.groupId, 10);

                if (!isNaN(groupid)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                userid = parseInt(req.params.userId, 10);

                if (!isNaN(userid)) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 6:
                memberid = req.user._id;
                _context6.next = 9;
                return _db.default.query("SELECT role FROM groupmembers\n        WHERE memberid = ($1)\n        AND groupid = ($2)", [memberid, groupid]);

              case 9:
                member = _context6.sent;

                if (!(member.rowCount === 0 || member.rows[0].role === 'member')) {
                  _context6.next = 12;
                  break;
                }

                return _context6.abrupt("return", res.status(401).send({
                  status: 401,
                  error: "Not Allowed"
                }));

              case 12:
                _context6.next = 14;
                return _db.default.query("\n      DELETE FROM groupmembers \n      WHERE memberid = ($1) \n      AND groupid = ($2) ", [userid, groupid]);

              case 14:
                res.send({
                  status: 200,
                  data: [{
                    message: "user has been deleted"
                  }]
                });

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteUser(_x11, _x12) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
    /** ***********************************
     * Send Messages to Groups
     */

  }, {
    key: "createGroupMessages",
    value: function () {
      var _createGroupMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res) {
        var groupid, _Validate$createGroup3, error, memberid, member, _req$body2, subject, message, parentMessageId, status, _email$rows$, id, createdon, parentmessageid;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                groupid = parseInt(req.params.groupId, 10);

                if (!isNaN(groupid)) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "Bad Request"
                }));

              case 3:
                _Validate$createGroup3 = _Validates.default.createGroupMessage(req.body), error = _Validate$createGroup3.error;

                if (!error) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 6:
                memberid = req.user._id;
                _context8.next = 9;
                return _db.default.query("SELECT * FROM groupmembers\n        WHERE memberid = ($1)\n        AND groupid = ($2)", [memberid, groupid]);

              case 9:
                member = _context8.sent;

                if (!(member.rowCount === 0)) {
                  _context8.next = 12;
                  break;
                }

                return _context8.abrupt("return", res.status(401).send({
                  status: 401,
                  error: "Not Allowed"
                }));

              case 12:
                _req$body2 = req.body, subject = _req$body2.subject, message = _req$body2.message, parentMessageId = _req$body2.parentMessageId, status = _req$body2.status; // let email;

                member.rows.forEach(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(element) {
                    var receiverId, senderId, email;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            receiverId = element.memberid;
                            senderId = req.user._id;
                            _context7.next = 4;
                            return _db.default.query("INSERT INTO messages(\n          subject, message, parentmessageid, status, receiverid, senderid) \n           VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [subject, message, parentMessageId, status, receiverId, senderId]);

                          case 4:
                            email = _context7.sent;

                          case 5:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x15) {
                    return _ref.apply(this, arguments);
                  };
                }());
                console.log("balls: ", email);
                _email$rows$ = email.rows[0], id = _email$rows$.id, createdon = _email$rows$.createdon, parentmessageid = _email$rows$.parentmessageid;
                res.send({
                  status: 200,
                  data: [{
                    id: id,
                    createdon: createdon,
                    subject: email.rows[0].subject,
                    message: email.rows[0].message,
                    parentmessageid: parentmessageid,
                    status: email.rows[0].status
                  }]
                });

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function createGroupMessages(_x13, _x14) {
        return _createGroupMessages.apply(this, arguments);
      }

      return createGroupMessages;
    }()
  }]);

  return GroupsController;
}();

var _default = GroupsController;
exports.default = _default;