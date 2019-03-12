"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectEncrypter = _interopRequireDefault(require("object-encrypter"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validate = _interopRequireDefault(require("../validators/validate"));

var _users = require("../models/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var engine = (0, _objectEncrypter.default)('my secret');

var authControllers =
/*#__PURE__*/
function () {
  function authControllers() {
    _classCallCheck(this, authControllers);
  }

  _createClass(authControllers, null, [{
    key: "userSignUp",
    value: function () {
      var _userSignUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validate$userSignup, error, _req$body, email, firstName, lastName, password, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validate$userSignup = _validate.default.userSignup(req.body), error = _validate$userSignup.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 3:
                _req$body = req.body, email = _req$body.email, firstName = _req$body.firstName, lastName = _req$body.lastName, password = _req$body.password;
                user = _users.users.find(function (entry) {
                  return entry.email === email;
                });

                if (!user) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "user already exists"
                }));

              case 7:
                _context.t0 = _users.users.length + 1;
                _context.t1 = email;
                _context.t2 = firstName;
                _context.t3 = lastName;
                _context.next = 13;
                return _bcrypt.default.hash(password, _users.salt);

              case 13:
                _context.t4 = _context.sent;
                user = {
                  id: _context.t0,
                  email: _context.t1,
                  firstName: _context.t2,
                  lastName: _context.t3,
                  password: _context.t4
                };

                _users.users.push(user);

                token = engine.encrypt(user);
                res.send({
                  status: 200,
                  data: [{
                    token: token
                  }]
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function userSignUp(_x, _x2) {
        return _userSignUp.apply(this, arguments);
      }

      return userSignUp;
    }()
  }, {
    key: "userLogin",
    value: function () {
      var _userLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validate$userLogin, error, _req$body2, email, password, user, validPassword, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validate$userLogin = _validate.default.userLogin(req.body), error = _validate$userLogin.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 3:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                user = _users.users.find(function (entry) {
                  return entry.email === email;
                });

                if (user) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "invalid email"
                }));

              case 7:
                _context2.next = 9;
                return _bcrypt.default.compare(password, user.password);

              case 9:
                validPassword = _context2.sent;

                if (validPassword) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "invalid password"
                }));

              case 12:
                token = engine.encrypt(user);
                res.send({
                  status: 200,
                  data: [{
                    token: token
                  }]
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function userLogin(_x3, _x4) {
        return _userLogin.apply(this, arguments);
      }

      return userLogin;
    }()
  }]);

  return authControllers;
}();

var _default = authControllers;
exports.default = _default;