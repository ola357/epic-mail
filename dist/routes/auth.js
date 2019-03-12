"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authControllers = _interopRequireDefault(require("../controllers/authControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/signup', _authControllers.default.userSignUp);
router.post('/login', _authControllers.default.userLogin);
var _default = router;
exports.default = _default;