"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _GroupsController = _interopRequireDefault(require("../controllers/GroupsController"));

var _Authorise = _interopRequireDefault(require("../middleware/Authorise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _Authorise.default.protect, _GroupsController.default.createGroup);
router.get('/', _Authorise.default.protect, _GroupsController.default.getGroups);
router.patch('/:groupId/name', _Authorise.default.protect, _GroupsController.default.editGroupName);
router.delete('/:groupId', _Authorise.default.protect, _GroupsController.default.deleteGroup);
router.post('/:groupId/users', _Authorise.default.protect, _GroupsController.default.addUserToGroup);
router.post('/:groupId/messages', _Authorise.default.protect, _GroupsController.default.createGroupMessages);
router.delete('/:groupId/users/:userId', _Authorise.default.protect, _GroupsController.default.deleteUser);
var _default = router;
exports.default = _default;