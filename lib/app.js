"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireWildcard(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _messages = _interopRequireDefault(require("./routes/messages"));

var _groups = _interopRequireDefault(require("./routes/groups"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _models = _interopRequireDefault(require("./models/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
var app = (0, _express.default)();

_dotenv.default.config(); // console.log(result.parsed);


app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
})); // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v2/messages', _messages.default);
app.use('/api/v2/groups', _groups.default);
app.use('/api/v2/auth', _auth.default);
(0, _models.default)();
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});
var _default = server;
exports.default = _default;