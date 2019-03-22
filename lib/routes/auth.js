"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/signup', _AuthController.default.userSignUp);
router.post('/login', _AuthController.default.userLogin);
router.post('/reset', _AuthController.default.userResetPassword);
var _default = router;
exports.default = _default;