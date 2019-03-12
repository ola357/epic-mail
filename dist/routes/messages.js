"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessagesController = _interopRequireDefault(require("../controllers/MessagesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', _MessagesController.default.getRecievedMessages);
router.get('/unread', _MessagesController.default.getUnreadMessages);
router.get('/sent', _MessagesController.default.getSentMessages);
router.get('/:id', _MessagesController.default.getSpecificMessage);
router.post('/', _MessagesController.default.createNewMessage);
router.delete('/:id', _MessagesController.default.deleteSpecificMessage);
var _default = router;
exports.default = _default;