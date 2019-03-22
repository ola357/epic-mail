"use strict";

var _twilio = _interopRequireDefault(require("twilio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountSid = process.env.twilioAccountSid;
var authToken = process.env.twilioAuthToken;
var client = (0, _twilio.default)(accountSid, authToken);
client.messages.create({
  to: 'x',
  from: "z",
  body: "hello ola"
});