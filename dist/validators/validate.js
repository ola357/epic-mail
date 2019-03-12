"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validate =
/*#__PURE__*/
function () {
  function validate() {
    _classCallCheck(this, validate);
  }

  _createClass(validate, null, [{
    key: "userSignup",
    value: function userSignup(user) {
      var schema = {
        email: _joi.default.string().email().required(),
        firstName: _joi.default.string().required(),
        lastName: _joi.default.string().required(),
        password: _joi.default.string().alphanum().required()
      };
      return _joi.default.validate(user, schema);
    }
  }, {
    key: "userLogin",
    value: function userLogin(user) {
      var schema = {
        email: _joi.default.string().email().required(),
        password: _joi.default.string().alphanum().required()
      };
      return _joi.default.validate(user, schema);
    }
  }, {
    key: "createMessage",
    value: function createMessage(message) {
      var schema = {
        subject: _joi.default.string().max(50).min(1).required(),
        message: _joi.default.string().max(300).min(1).required(),
        status: _joi.default.string().lowercase().regex(/(draft|sent)/).required()
      };
      return _joi.default.validate(message, schema);
    }
  }]);

  return validate;
}();

var _default = validate;
exports.default = _default;