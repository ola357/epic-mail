"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthControllers = _interopRequireDefault(require("../controllers/AuthControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/signup', _AuthControllers.default.userSignUp);
router.post('/login', _AuthControllers.default.userLogin);
var _default = router;
exports.default = _default;