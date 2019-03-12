"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messagesController = _interopRequireDefault(require("../controllers/messagesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', _messagesController.default.getRecievedMessages);
router.get('/unread', _messagesController.default.getUnreadMessages);
router.get('/sent', _messagesController.default.getSentMessages);
router.get('/:id', _messagesController.default.getSpecificMessage);
router.post('/', _messagesController.default.createNewMessage);
router.delete('/:id', _messagesController.default.deleteSpecificMessage);
var _default = router;
exports.default = _default;