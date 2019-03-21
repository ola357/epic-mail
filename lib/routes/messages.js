"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../controllers/MessageController"));

var _Authorise = _interopRequireDefault(require("../middleware/Authorise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', _Authorise.default.protect, _MessageController.default.getRecievedMessages);
router.get('/unread', _Authorise.default.protect, _MessageController.default.getUnreadMessages);
router.get('/sent', _Authorise.default.protect, _MessageController.default.getSentMessages);
router.get('/:messageid', _Authorise.default.protect, _MessageController.default.getSpecificMessage);
router.post('/', _Authorise.default.protect, _MessageController.default.createNewMessage);
router.delete('/:id', _Authorise.default.protect, _MessageController.default.deleteSpecificMessage);
var _default = router;
exports.default = _default;