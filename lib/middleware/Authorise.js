"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Authorise =
/*#__PURE__*/
function () {
  function Authorise() {
    _classCallCheck(this, Authorise);
  }

  _createClass(Authorise, null, [{
    key: "protect",
    value: function protect(req, res, next) {
      var token = req.header('x-auth-token');
      if (!token) return res.status(401).send('Access denied. No token');

      try {
        var decoded = _jsonwebtoken.default.verify(token, process.env.jwtPrivateKey);

        req.user = decoded;
        next();
      } catch (ex) {
        res.status(400).send('Invalid token');
      }
    }
  }]);

  return Authorise;
}();

var _default = Authorise;
exports.default = _default;