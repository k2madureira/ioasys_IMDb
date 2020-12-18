"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 3333;

_app.default.listen(port, () => {
  console.log(`🚀 Server start on port ${port}`);
});