"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.salt = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailSuffix = "@epicmail.com";

var salt = _bcrypt.default.genSaltSync(5);

exports.salt = salt;
var users = [{
  id: 1,
  email: "ola357".concat(emailSuffix),
  firstName: 'olaoluwa',
  lastName: 'alli',
  password: _bcrypt.default.hashSync('abc123', salt)
}, {
  id: 2,
  email: "bim007".concat(emailSuffix),
  firstName: 'bimbo',
  lastName: 'lawal',
  password: _bcrypt.default.hashSync('efg678', salt)
}, {
  id: 3,
  email: "ada90".concat(emailSuffix),
  firstName: 'adaoma',
  lastName: 'jiburu',
  password: _bcrypt.default.hashSync('nitro89', salt)
}];
exports.users = users;