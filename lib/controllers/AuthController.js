"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Validates = _interopRequireDefault(require("../validators/Validates"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();
/**
 * Class representing API endpoints for
 * the route for Auth controller
 * @param { object } request
 * @param { object } response
 * @returns { object } response
 */


var AuthControllers =
/*#__PURE__*/
function () {
  function AuthControllers() {
    _classCallCheck(this, AuthControllers);
  }

  _createClass(AuthControllers, null, [{
    key: "userSignUp",

    /**
    *
    * POST /auth/signup
    * Route for signing up new users
    */
    value: function () {
      var _userSignUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _Validate$userSignup, error, _req$body, username, firstname, lastname, password, email, user, hashpassword, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Validate$userSignup = _Validates.default.userSignup(req.body), error = _Validate$userSignup.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 3:
                _req$body = req.body, username = _req$body.username, firstname = _req$body.firstname, lastname = _req$body.lastname, password = _req$body.password;
                email = username;
                _context.next = 7;
                return _db.default.query('SELECT * FROM users WHERE email = ($1)', [email]);

              case 7:
                user = _context.sent;

                if (!(user.rowCount !== 0)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "user already exists"
                }));

              case 10:
                _context.next = 12;
                return _bcrypt.default.hash(password, 10);

              case 12:
                hashpassword = _context.sent;
                _context.next = 15;
                return _db.default.query("INSERT INTO \"users\" (\"firstname\", \"lastname\", \"email\", \"password\")\n      VALUES ('".concat(firstname, "','").concat(lastname, "', '").concat(email, "', '").concat(hashpassword, "') RETURNING *"));

              case 15:
                user = _context.sent;
                // console.log(user);
                token = _jsonwebtoken.default.sign({
                  _id: user.rows[0].id,
                  _email: user.rows[0].email
                }, process.env.jwtPrivateKey); // await db.end();

                res.header('x-auth-token', token).send({
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
    /**
    *
    * POST /auth/login
    * Route for login users
    */

  }, {
    key: "userLogin",
    value: function () {
      var _userLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _Validate$userLogin, error, _req$body2, email, password, user, validPassword, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _Validate$userLogin = _Validates.default.userLogin(req.body), error = _Validate$userLogin.error;

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
                _context2.next = 6;
                return _db.default.query('SELECT * FROM users WHERE email = ($1)', [email]);

              case 6:
                user = _context2.sent;

                if (!(user.rowCount !== 1)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send('Invalid email or password'));

              case 9:
                _context2.next = 11;
                return _bcrypt.default.compare(password, user.rows[0].password);

              case 11:
                validPassword = _context2.sent;

                if (validPassword) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send({
                  status: 400,
                  error: "invalid email or password"
                }));

              case 14:
                token = _jsonwebtoken.default.sign({
                  _id: user.rows[0].id,
                  _email: user.rows[0].email
                }, process.env.jwtPrivateKey); // await db.end();

                res.send({
                  status: 200,
                  data: [{
                    token: token
                  }]
                });

              case 16:
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
  }, {
    key: "userResetPassword",
    value: function () {
      var _userResetPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _Validate$userReset, error;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _Validate$userReset = _Validates.default.userReset(req.body), error = _Validate$userReset.error;

                if (!error) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send({
                  status: 400,
                  error: error.details[0].message
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function userResetPassword(_x5, _x6) {
        return _userResetPassword.apply(this, arguments);
      }

      return userResetPassword;
    }()
  }]);

  return AuthControllers;
}();

var _default = AuthControllers;
exports.default = _default;