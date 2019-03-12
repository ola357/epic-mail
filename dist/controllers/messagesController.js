"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messages = _interopRequireDefault(require("../models/messages"));

var _validate = _interopRequireDefault(require("../validators/validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var messagesController =
/*#__PURE__*/
function () {
  function messagesController() {
    _classCallCheck(this, messagesController);
  }

  _createClass(messagesController, null, [{
    key: "getRecievedMessages",
    value: function getRecievedMessages(req, res) {
      var inbox = [];

      for (var index = 0; index < _messages.default.length; index += 1) {
        if (_messages.default[index].status === 'read' || _messages.default[index].status === 'unread') {
          inbox.push(_messages.default[index]);
        }
      }

      res.status(200).send({
        status: 200,
        data: inbox
      });
    }
  }, {
    key: "getUnreadMessages",
    value: function getUnreadMessages(req, res) {
      var inbox = [];

      for (var index = 0; index < _messages.default.length; index += 1) {
        if (_messages.default[index].status === 'unread') {
          inbox.push(_messages.default[index]);
        }
      }

      res.status(200).send({
        status: 200,
        data: inbox
      });
    }
  }, {
    key: "getSentMessages",
    value: function getSentMessages(req, res) {
      var sent = [];

      for (var index = 0; index < _messages.default.length; index += 1) {
        if (_messages.default[index].status === 'sent') {
          sent.push(_messages.default[index]);
        }
      }

      res.status(200).send({
        status: 200,
        data: sent
      });
    }
  }, {
    key: "getSpecificMessage",
    value: function getSpecificMessage(req, res) {
      var message = _messages.default.find(function (inbox) {
        return inbox.id === parseInt(req.params.id, 10);
      });

      if (!message) {
        return res.status(404).send({
          status: 404,
          error: "The message with the given ID was not found."
        });
      }

      res.send({
        status: 200,
        data: [{
          id: message.id,
          createdOn: message.createdOn,
          subject: message.subject,
          senderId: message.senderId,
          recieverId: message.recieverId,
          parentMessageId: message.parentMessageId,
          status: message.status
        }]
      });
    }
  }, {
    key: "createNewMessage",
    value: function createNewMessage(req, res) {
      var _validate$createMessa = _validate.default.createMessage(req.body),
          error = _validate$createMessa.error;

      if (error) return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
      var _req$body = req.body,
          subject = _req$body.subject,
          message = _req$body.message,
          status = _req$body.status;
      var email = {
        id: _messages.default.length + 1,
        createdOn: Date.now(),
        subject: subject,
        message: message,
        parentMessageId: 1,
        status: status
      };

      _messages.default.push(email);

      res.send({
        status: 200,
        data: [email]
      });
    }
  }, {
    key: "deleteSpecificMessage",
    value: function deleteSpecificMessage(req, res) {
      var message = _messages.default.find(function (inbox) {
        return inbox.id === parseInt(req.params.id, 10);
      });

      if (!message) {
        return res.status(404).send({
          status: 404,
          error: "The message with the given ID was not found."
        });
      }

      var index = _messages.default.indexOf(message);

      _messages.default.splice(index, 1);

      res.send({
        status: 200,
        data: [{
          id: message.id,
          message: "".concat(message.id, " has been deleted")
        }]
      });
    }
  }]);

  return messagesController;
}();

var _default = messagesController;
exports.default = _default;