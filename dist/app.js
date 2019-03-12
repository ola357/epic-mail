"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require('@babel/polyfill');
require('@babel/register');
require('@babel/core');

var _express = _interopRequireWildcard(require("express"));

var _messages = _interopRequireDefault(require("./routes/messages"));

var _auth = _interopRequireDefault(require("./routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var app = (0, _express.default)();
app.use((0, _express.json)());
app.use('/api/v1/messages', _messages.default);
app.use('/api/v1/auth', _auth.default);
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});
var _default = server;
/* import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
 */

exports.default = _default;